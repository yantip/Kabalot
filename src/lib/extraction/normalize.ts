import type { ExtractionResult } from "@/lib/validators/schemas";

const CURRENCY_MAP: Record<string, string> = {
  "₪": "ILS",
  NIS: "ILS",
  שקל: "ILS",
  "ש״ח": "ILS",
  'ש"ח': "ILS",
  $: "USD",
  "€": "EUR",
  "£": "GBP",
};

export function normalizeCurrency(raw: string | null): string | null {
  if (!raw) return null;
  const upper = raw.trim().toUpperCase();
  return CURRENCY_MAP[raw.trim()] ?? CURRENCY_MAP[upper] ?? upper;
}

export function normalizeAmount(raw: unknown): number | null {
  if (raw === null || raw === undefined) return null;
  if (typeof raw === "number") return Math.round(raw * 100) / 100;
  if (typeof raw === "string") {
    const cleaned = raw.replace(/[^\d.\-,]/g, "").replace(",", ".");
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : Math.round(num * 100) / 100;
  }
  return null;
}

export function normalizeDate(raw: string | null): string | null {
  if (!raw) return null;

  const isoMatch = raw.match(/^\d{4}-\d{2}-\d{2}/);
  if (isoMatch) return isoMatch[0];

  const ddmmyyyy = raw.match(/(\d{1,2})[/.\-](\d{1,2})[/.\-](\d{4})/);
  if (ddmmyyyy) {
    const [, day, month, year] = ddmmyyyy;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  const date = new Date(raw);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split("T")[0];
  }

  return null;
}

export function normalizeExtractionResult(raw: Record<string, unknown>): ExtractionResult {
  return {
    vendor_name: typeof raw.vendor_name === "string" ? raw.vendor_name : null,
    total_amount: normalizeAmount(raw.total_amount),
    receipt_date: normalizeDate(
      typeof raw.receipt_date === "string" ? raw.receipt_date : null
    ),
    currency: normalizeCurrency(
      typeof raw.currency === "string" ? raw.currency : null
    ),
    vat_amount: normalizeAmount(raw.vat_amount),
    receipt_number:
      typeof raw.receipt_number === "string" ? raw.receipt_number : null,
    notes: typeof raw.notes === "string" ? raw.notes : null,
    raw_text_summary:
      typeof raw.raw_text_summary === "string" ? raw.raw_text_summary : null,
    confidence:
      typeof raw.confidence === "number"
        ? Math.max(0, Math.min(1, raw.confidence))
        : 0.5,
  };
}
