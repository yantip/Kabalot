import OpenAI from "openai";
import { createServiceClient } from "@/lib/supabase/server";
import { extractionResultSchema, type ExtractionResult } from "@/lib/validators/schemas";
import { normalizeExtractionResult } from "./normalize";
import { EXTRACTION_SYSTEM_PROMPT, EXTRACTION_USER_PROMPT } from "./prompt";
import { createHash } from "crypto";

let _openai: OpenAI | null = null;
function getOpenAI() {
  if (!_openai) _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return _openai;
}

interface ProcessResult {
  success: boolean;
  data?: ExtractionResult;
  error?: string;
}

export async function processReceipt(
  receiptId: string,
  imageUrl: string
): Promise<ProcessResult> {
  const supabase = createServiceClient();
  const startTime = Date.now();

  try {
    const response = await getOpenAI().chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: EXTRACTION_SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            { type: "text", text: EXTRACTION_USER_PROMPT },
            { type: "image_url", image_url: { url: imageUrl, detail: "high" } },
          ],
        },
      ],
      max_tokens: 1000,
      temperature: 0.1,
    });

    const processingTime = Date.now() - startTime;
    const rawContent = response.choices[0]?.message?.content ?? "";
    const tokensUsed = response.usage?.total_tokens ?? null;

    let parsed: Record<string, unknown>;
    try {
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      parsed = JSON.parse(jsonMatch?.[0] ?? rawContent);
    } catch {
      await logExtraction(supabase, receiptId, {
        raw_response: { content: rawContent },
        model_used: "gpt-4o",
        tokens_used: tokensUsed,
        processing_time_ms: processingTime,
        error: "Failed to parse JSON response",
      });

      await supabase
        .from("receipts")
        .update({ status: "failed" })
        .eq("id", receiptId);

      return { success: false, error: "Failed to parse extraction response" };
    }

    const normalized = normalizeExtractionResult(parsed);
    const validation = extractionResultSchema.safeParse(normalized);

    if (!validation.success) {
      await logExtraction(supabase, receiptId, {
        raw_response: parsed,
        model_used: "gpt-4o",
        tokens_used: tokensUsed,
        processing_time_ms: processingTime,
        error: `Validation failed: ${validation.error.message}`,
      });

      await supabase
        .from("receipts")
        .update({ status: "failed" })
        .eq("id", receiptId);

      return { success: false, error: "Extraction validation failed" };
    }

    const data = validation.data;
    const status = data.confidence >= 0.7 ? "needs_review" : "needs_review";

    const duplicateHash = computeDuplicateHash(data);
    let isDuplicate = false;

    if (duplicateHash) {
      const { data: existing } = await supabase
        .from("receipts")
        .select("id")
        .eq("image_hash", duplicateHash)
        .neq("id", receiptId)
        .limit(1);

      isDuplicate = (existing?.length ?? 0) > 0;
    }

    await supabase
      .from("receipts")
      .update({
        vendor_name: data.vendor_name,
        total_amount: data.total_amount,
        receipt_date: data.receipt_date,
        currency: data.currency,
        vat_amount: data.vat_amount,
        receipt_number: data.receipt_number,
        notes: data.notes,
        raw_text: data.raw_text_summary,
        status,
        extraction_confidence: data.confidence,
        image_hash: duplicateHash,
        is_duplicate_suspect: isDuplicate,
      })
      .eq("id", receiptId);

    await logExtraction(supabase, receiptId, {
      raw_response: parsed,
      model_used: "gpt-4o",
      tokens_used: tokensUsed,
      processing_time_ms: processingTime,
      error: null,
    });

    return { success: true, data };
  } catch (error) {
    const processingTime = Date.now() - startTime;

    await logExtraction(supabase, receiptId, {
      raw_response: null,
      model_used: "gpt-4o",
      tokens_used: null,
      processing_time_ms: processingTime,
      error: error instanceof Error ? error.message : "Unknown error",
    });

    await supabase
      .from("receipts")
      .update({ status: "failed" })
      .eq("id", receiptId);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

function computeDuplicateHash(data: ExtractionResult): string | null {
  if (!data.vendor_name && data.total_amount == null) return null;

  const parts = [
    data.vendor_name?.toLowerCase().trim() ?? "",
    data.total_amount?.toString() ?? "",
    data.receipt_date ?? "",
  ].join("|");

  return createHash("sha256").update(parts).digest("hex").slice(0, 16);
}

async function logExtraction(
  supabase: ReturnType<typeof createServiceClient>,
  receiptId: string,
  log: {
    raw_response: unknown;
    model_used: string;
    tokens_used: number | null;
    processing_time_ms: number;
    error: string | null;
  }
) {
  await supabase.from("extraction_logs").insert({
    receipt_id: receiptId,
    raw_response: log.raw_response as Record<string, unknown>,
    model_used: log.model_used,
    tokens_used: log.tokens_used,
    processing_time_ms: log.processing_time_ms,
    error: log.error,
  });
}
