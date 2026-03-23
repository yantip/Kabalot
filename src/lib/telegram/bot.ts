function getTelegramApi() {
  return `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
}

export function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function sendMessage(
  chatId: number,
  text: string,
  options?: {
    reply_markup?: unknown;
    parse_mode?: "HTML" | "Markdown";
  }
) {
  const res = await fetch(`${getTelegramApi()}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: options?.parse_mode ?? "HTML",
      reply_markup: options?.reply_markup,
    }),
  });
  const data = await res.json();
  if (!data.ok) {
    console.error("Telegram sendMessage failed:", data);
  }
  return data;
}

export async function getFileUrl(fileId: string): Promise<string | null> {
  const res = await fetch(`${getTelegramApi()}/getFile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ file_id: fileId }),
  });

  const data = await res.json();
  if (!data.ok || !data.result?.file_path) return null;

  return `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${data.result.file_path}`;
}

export async function setWebhook(url: string) {
  const res = await fetch(`${getTelegramApi()}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url,
      secret_token: process.env.TELEGRAM_WEBHOOK_SECRET,
    }),
  });
  return res.json();
}
