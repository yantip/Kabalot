"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { BOT_CONNECTION_TOKEN_EXPIRY_MINUTES } from "@/lib/constants";

export async function generateBotToken() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "לא מחובר" };

  await supabase
    .from("bot_connections")
    .update({ status: "expired" })
    .eq("user_id", user.id)
    .eq("status", "pending");

  const token = randomUUID();
  const expiresAt = new Date(
    Date.now() + BOT_CONNECTION_TOKEN_EXPIRY_MINUTES * 60 * 1000
  ).toISOString();

  const { error } = await supabase.from("bot_connections").insert({
    user_id: user.id,
    token,
    status: "pending",
    expires_at: expiresAt,
  });

  if (error) {
    console.error("bot_connections insert error:", error);
    return { error: `שגיאה ביצירת טוקן חיבור: ${error.message}` };
  }

  const botUsername = process.env.TELEGRAM_BOT_USERNAME;
  const deepLink = `https://t.me/${botUsername}?start=${token}`;

  return { token, deepLink };
}

export async function disconnectTelegram() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "לא מחובר" };

  await supabase
    .from("bot_connections")
    .update({ status: "revoked" })
    .eq("user_id", user.id)
    .eq("status", "active");

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ telegram_chat_id: null, pending_telegram_file_id: null })
    .eq("id", user.id);

  if (profileError) {
    console.error("disconnect profile update failed:", profileError.message);
    return { error: "שגיאה בניתוק הטלגרם" };
  }

  revalidatePath("/settings");
  return { success: true };
}
