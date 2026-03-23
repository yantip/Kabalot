"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { updateReceiptSchema } from "@/lib/validators/schemas";
import { processReceipt } from "@/lib/extraction/extract-receipt";

export async function updateReceipt(
  receiptId: string,
  data: Record<string, unknown>
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "לא מחובר" };

  const parsed = updateReceiptSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const updates: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(parsed.data)) {
    if (value !== undefined) {
      updates[key] = value;
    }
  }

  const { error } = await supabase
    .from("receipts")
    .update(updates)
    .eq("id", receiptId)
    .eq("user_id", user.id);

  if (error) return { error: "שגיאה בעדכון הקבלה" };

  const { data: receipt } = await supabase
    .from("receipts")
    .select("project_id")
    .eq("id", receiptId)
    .single();

  if (receipt) {
    revalidatePath(`/projects/${receipt.project_id}`);
  }
  revalidatePath(`/receipts/${receiptId}`);

  return { success: true };
}

export async function confirmReceipt(receiptId: string) {
  return updateReceipt(receiptId, { status: "confirmed" });
}

export async function retryExtraction(receiptId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "לא מחובר" };

  const { data: receipt } = await supabase
    .from("receipts")
    .select("*")
    .eq("id", receiptId)
    .eq("user_id", user.id)
    .single();

  if (!receipt) return { error: "הקבלה לא נמצאה" };

  await supabase
    .from("receipts")
    .update({ status: "processing" })
    .eq("id", receiptId);

  const result = await processReceipt(receiptId, receipt.image_url);

  revalidatePath(`/receipts/${receiptId}`);
  revalidatePath(`/projects/${receipt.project_id}`);

  if (!result.success) {
    return { error: "החילוץ נכשל. נסה שוב מאוחר יותר." };
  }

  return { success: true };
}

export async function deleteReceipt(receiptId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "לא מחובר" };

  const { data: receipt } = await supabase
    .from("receipts")
    .select("project_id, image_url")
    .eq("id", receiptId)
    .eq("user_id", user.id)
    .single();

  const { error } = await supabase
    .from("receipts")
    .delete()
    .eq("id", receiptId)
    .eq("user_id", user.id);

  if (error) return { error: "שגיאה במחיקת הקבלה" };

  if (receipt?.image_url) {
    await deleteStorageImage(supabase, receipt.image_url);
  }

  if (receipt) {
    revalidatePath(`/projects/${receipt.project_id}`);
  }

  return { success: true, projectId: receipt?.project_id };
}

function extractStoragePath(imageUrl: string): string | null {
  const marker = "/storage/v1/object/public/receipts/";
  const idx = imageUrl.indexOf(marker);
  if (idx === -1) return null;
  return imageUrl.slice(idx + marker.length);
}

async function deleteStorageImage(
  supabase: Awaited<ReturnType<typeof createClient>>,
  imageUrl: string,
) {
  const path = extractStoragePath(imageUrl);
  if (path) {
    await supabase.storage.from("receipts").remove([path]);
  }
}
