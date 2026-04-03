import { createServiceClient } from "@/lib/supabase/server";
import {
  sendMessage,
  getFileUrl,
  escapeHtml,
} from "./bot";
import { processReceipt } from "@/lib/extraction/extract-receipt";
import { checkReceiptLimit } from "@/lib/usage";
import { PLANS } from "@/lib/plans";
import { randomUUID } from "crypto";

interface TelegramUpdate {
  message?: {
    message_id: number;
    from?: { id: number; first_name?: string };
    chat: { id: number };
    text?: string;
    photo?: Array<{ file_id: string; file_size?: number; width: number; height: number }>;
  };
  callback_query?: {
    id: string;
    from: { id: number };
    message?: { chat: { id: number } };
    data?: string;
  };
}

export async function handleTelegramUpdate(update: TelegramUpdate) {
  if (update.callback_query) {
    await handleCallbackQuery(update.callback_query);
    return;
  }

  const message = update.message;
  if (!message) return;

  const chatId = message.chat.id;

  const text = message.text?.trim();

  if (text?.startsWith("/start")) {
    const token = text.replace("/start", "").trim();
    if (token) {
      await handleStartCommand(chatId, message.from?.id ?? chatId, token);
    } else {
      const appUrl = process.env.TELEGRAM_APP_URL || process.env.NEXT_PUBLIC_APP_URL || "https://kabalot.online";
      await sendMessage(
        chatId,
        `ברוכים הבאים לקבלות!\n\nכדי לחבר את החשבון שלך, <a href="${appUrl}">היכנס לאפליקציה</a> ולחץ על 'חבר טלגרם' בהגדרות.`,
        { parse_mode: "HTML" }
      );
    }
    return;
  }

  if (text === "/upgrade") {
    await handleUpgradeCommand(chatId);
    return;
  }

  if (text === "/optout") {
    await handleOptoutCommand(chatId);
    return;
  }

  if (text === "/paysupport") {
    await sendMessage(
      chatId,
      "לתמיכה בנושא תשלומים, פנה אלינו דרך האפליקציה בכתובת:\n" +
      `${process.env.TELEGRAM_APP_URL || process.env.NEXT_PUBLIC_APP_URL}/settings`
    );
    return;
  }

  if (message.photo && message.photo.length > 0) {
    await handlePhotoMessage(chatId, message.from?.id ?? chatId, message.photo);
    return;
  }

  await sendMessage(chatId, "שלח לי תמונה של קבלה ואחלץ עבורך את הנתונים.\n\nפקודות נוספות:\n/upgrade - שדרג לתוכנית מקצועית\n/optout - נתק את החשבון מהבוט");
}

async function handleUpgradeCommand(chatId: number) {
  const supabase = createServiceClient();
  const appUrl = process.env.TELEGRAM_APP_URL || process.env.NEXT_PUBLIC_APP_URL || "https://kabalot.online";

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("telegram_chat_id", chatId)
    .single();

  if (!profile) {
    await sendMessage(
      chatId,
      `החשבון שלך לא מחובר. <a href="${appUrl}">היכנס לאפליקציה</a> ולחץ על 'חבר טלגרם' בהגדרות.`,
      { parse_mode: "HTML" }
    );
    return;
  }

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("plan_id, status, current_period_end")
    .eq("user_id", profile.id)
    .single();

  if (sub?.plan_id === "pro" && sub.status === "active") {
    const endDate = sub.current_period_end
      ? new Date(sub.current_period_end).toLocaleDateString("he-IL")
      : "";
    await sendMessage(
      chatId,
      `✨ אתה כבר במנוי <b>${PLANS.pro.name}</b>!\n` +
      (endDate ? `\nהמנוי תקף עד ${endDate}` : ""),
      { parse_mode: "HTML" }
    );
    return;
  }

  await sendMessage(
    chatId,
    `שדרג לתוכנית <b>${PLANS.pro.name}</b> תמורת ₪${PLANS.pro.price} לחודש:\n` +
    `\n• ${PLANS.pro.receiptsPerMonth} קבלות בחודש\n` +
    `• פרויקטים ללא הגבלה\n\n` +
    `<a href="${appUrl}/billing/checkout">לחץ כאן לשדרוג</a>`,
    { parse_mode: "HTML" }
  );
}

async function handleOptoutCommand(chatId: number) {
  const supabase = createServiceClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("telegram_chat_id", chatId)
    .single();

  if (!profile) {
    await sendMessage(chatId, "החשבון שלך לא מחובר כרגע.");
    return;
  }

  // Clear telegram_chat_id from profile
  await supabase
    .from("profiles")
    .update({ telegram_chat_id: null, pending_telegram_file_id: null })
    .eq("id", profile.id);

  // Revoke active bot connections
  await supabase
    .from("bot_connections")
    .update({ status: "revoked" })
    .eq("user_id", profile.id)
    .eq("status", "active");

  await sendMessage(
    chatId,
    "✅ החשבון נותק בהצלחה.\n\nלא תקבל/י יותר הודעות מהבוט.\nאם תרצה/י להתחבר שוב, היכנס/י לאפליקציה ולחץ/י על 'חבר טלגרם' בהגדרות."
  );
}

async function sendUpgradePrompt(chatId: number, usage: number, limit: number) {
  const appUrl = process.env.TELEGRAM_APP_URL || process.env.NEXT_PUBLIC_APP_URL || "https://kabalot.online";
  await sendMessage(
    chatId,
    `⚠️ הגעת למגבלת הקבלות החודשית (${usage}/${limit}).\n\n` +
    `שדרג לתוכנית <b>${PLANS.pro.name}</b> תמורת ₪${PLANS.pro.price} לחודש:\n` +
    `• ${PLANS.pro.receiptsPerMonth} קבלות בחודש\n` +
    `• פרויקטים ללא הגבלה\n\n` +
    `<a href="${appUrl}/billing/checkout">לחץ כאן לשדרוג</a>`,
    { parse_mode: "HTML" }
  );
}

async function handleStartCommand(
  chatId: number,
  telegramUserId: number,
  token: string
) {
  const supabase = createServiceClient();

  const { data: connection, error: connError } = await supabase
    .from("bot_connections")
    .select("*")
    .eq("token", token)
    .eq("status", "pending")
    .single();

  if (connError || !connection) {
    console.error("bot_connections lookup failed:", connError?.message ?? "no matching row");
    await sendMessage(chatId, "הקישור לא תקין או שפג תוקפו. נסה שוב מהאפליקציה.");
    return;
  }

  if (new Date(connection.expires_at) < new Date()) {
    await supabase
      .from("bot_connections")
      .update({ status: "expired" })
      .eq("id", connection.id);
    await sendMessage(chatId, "פג תוקף הקישור. צור קישור חדש מהאפליקציה.");
    return;
  }

  const { error: activateError } = await supabase
    .from("bot_connections")
    .update({
      status: "active",
      telegram_chat_id: chatId,
      connected_at: new Date().toISOString(),
    })
    .eq("id", connection.id);

  if (activateError) {
    console.error("bot_connections activate failed:", activateError.message);
    await sendMessage(chatId, "❌ שגיאה בחיבור. נסה שוב.");
    return;
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ telegram_chat_id: chatId })
    .eq("id", connection.user_id);

  if (profileError) {
    console.error("profile telegram_chat_id update failed:", profileError.message);
    await supabase
      .from("bot_connections")
      .update({ status: "revoked" })
      .eq("id", connection.id);
    await sendMessage(chatId, "❌ שגיאה בחיבור. נסה שוב.");
    return;
  }

  await sendMessage(
    chatId,
    "החשבון חובר בהצלחה! 🎉\n\nעכשיו אפשר לשלוח לי תמונות של קבלות ואחלץ מהן את הנתונים באופן אוטומטי."
  );
}

async function handlePhotoMessage(
  chatId: number,
  _telegramUserId: number,
  photos: Array<{ file_id: string; file_size?: number; width: number; height: number }>
) {
  const supabase = createServiceClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("telegram_chat_id", chatId)
    .single();

  if (!profile) {
    const appUrl = process.env.TELEGRAM_APP_URL || process.env.NEXT_PUBLIC_APP_URL || "https://kabalot.online";
    await sendMessage(
      chatId,
      `החשבון שלך לא מחובר. <a href="${appUrl}">היכנס לאפליקציה</a> ולחץ על 'חבר טלגרם' בהגדרות.`,
      { parse_mode: "HTML" }
    );
    return;
  }

  const usageCheck = await checkReceiptLimit(profile.id);
  if (!usageCheck.allowed) {
    await sendUpgradePrompt(chatId, usageCheck.usage, usageCheck.limit);
    return;
  }

  const { data: projects } = await supabase
    .from("projects")
    .select("id, name")
    .eq("user_id", profile.id)
    .order("created_at");

  if (!projects || projects.length === 0) {
    await sendMessage(chatId, "אין לך פרויקטים. צור פרויקט חדש באפליקציה קודם.");
    return;
  }

  const largestPhoto = photos[photos.length - 1];

  await supabase
    .from("profiles")
    .update({ pending_telegram_file_id: largestPhoto.file_id })
    .eq("id", profile.id);

  if (projects.length === 1) {
    await processAndSendReceipt(supabase, chatId, profile.id, projects[0].id, largestPhoto.file_id);
    return;
  }

  const buttons = projects.map((p) => [
    { text: `📁 ${p.name}`, callback_data: `proj:${p.id}` },
  ]);

  await sendMessage(chatId, "לאיזה פרויקט לשייך את הקבלה?", {
    reply_markup: { inline_keyboard: buttons },
  });
}

async function processAndSendReceipt(
  supabase: ReturnType<typeof createServiceClient>,
  chatId: number,
  userId: string,
  projectId: string,
  fileId: string,
) {
  try {
    const fileUrl = await getFileUrl(fileId);

    if (!fileUrl) {
      await sendMessage(chatId, "❌ לא הצלחתי להוריד את התמונה. נסה שוב.");
      return;
    }

    const imageResponse = await fetch(fileUrl);
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    const fileName = `${userId}/${randomUUID()}.jpg`;
    const { error: uploadError } = await supabase.storage
      .from("receipts")
      .upload(fileName, imageBuffer, {
        contentType: "image/jpeg",
        upsert: false,
      });

    if (uploadError) {
      await sendMessage(chatId, "❌ שגיאה בשמירת התמונה. נסה שוב.");
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("receipts").getPublicUrl(fileName);

    const { data: receipt, error: insertError } = await supabase
      .from("receipts")
      .insert({
        project_id: projectId,
        user_id: userId,
        image_url: publicUrl,
        status: "processing",
      })
      .select()
      .single();

    if (insertError || !receipt) {
      await sendMessage(chatId, "❌ שגיאה בשמירת הקבלה. נסה שוב.");
      return;
    }

    const result = await processReceipt(receipt.id, publicUrl);
    const appUrl = process.env.TELEGRAM_APP_URL || process.env.NEXT_PUBLIC_APP_URL;

    if (result.success && result.data) {
      const d = result.data;
      const lines = [
        "✅ <b>קבלה נקלטה בהצלחה!</b>",
        "",
        d.vendor_name ? `🏪 ספק: ${escapeHtml(d.vendor_name)}` : null,
        d.total_amount != null
          ? `💰 סכום: ${d.total_amount}${d.currency ? ` ${escapeHtml(d.currency)}` : ""}`
          : null,
        d.receipt_date ? `📅 תאריך: ${escapeHtml(d.receipt_date)}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      const link = `${appUrl}/receipts/${receipt.id}`;
      await sendMessage(chatId, `${lines}\n\n🔗 <a href="${link}">בדוק ואשר באפליקציה</a>`, {
        parse_mode: "HTML",
      });
    } else {
      await sendMessage(
        chatId,
        `⚠️ הקבלה נשמרה אך לא הצלחתי לחלץ את כל הנתונים.\nתוכל לערוך ולאשר אותה באפליקציה:\n${appUrl}/receipts/${receipt.id}`
      );
    }

    await supabase
      .from("profiles")
      .update({ pending_telegram_file_id: null })
      .eq("id", userId);
  } catch (error) {
    console.error("Error processing receipt:", error);
    await sendMessage(chatId, "❌ אירעה שגיאה בעיבוד הקבלה. נסה שוב מאוחר יותר.");
  }
}

async function handleCallbackQuery(query: {
  id: string;
  from: { id: number };
  message?: { chat: { id: number } };
  data?: string;
}) {
  if (!query.data || !query.message) return;

  const supabase = createServiceClient();
  const chatId = query.message.chat.id;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, pending_telegram_file_id")
    .eq("telegram_chat_id", chatId)
    .single();

  if (!profile) return;

  const [action, targetId] = query.data.split(":");
  if (!targetId) return;

  if (action === "proj") {
    const fileId = profile.pending_telegram_file_id;
    if (!fileId) {
      await sendMessage(chatId, "⏳ פג תוקף הבקשה. שלח את התמונה שוב.");
      await answerCallback(query.id);
      return;
    }

    const usageCheck = await checkReceiptLimit(profile.id);
    if (!usageCheck.allowed) {
      await sendUpgradePrompt(chatId, usageCheck.usage, usageCheck.limit);
      await answerCallback(query.id);
      return;
    }

    await answerCallback(query.id, "מעבד את הקבלה...");
    await processAndSendReceipt(supabase, chatId, profile.id, targetId, fileId);
    return;
  }

  if (action === "confirm") {
    await supabase
      .from("receipts")
      .update({ status: "confirmed" })
      .eq("id", targetId)
      .eq("user_id", profile.id);

    await sendMessage(chatId, "✅ הקבלה אושרה!");
  } else if (action === "review") {
    await supabase
      .from("receipts")
      .update({ status: "needs_review" })
      .eq("id", targetId)
      .eq("user_id", profile.id);

    await sendMessage(chatId, "👁 הקבלה סומנה לבדיקה.");
  }

  await answerCallback(query.id);
}

async function answerCallback(callbackQueryId: string, text?: string) {
  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/answerCallbackQuery`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        callback_query_id: callbackQueryId,
        ...(text ? { text } : {}),
      }),
    }
  );
}
