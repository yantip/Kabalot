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

export async function sendInvoice(
  chatId: number,
  options: {
    title: string;
    description: string;
    payload: string;
    currency: string;
    prices: Array<{ label: string; amount: number }>;
  }
) {
  const body: Record<string, unknown> = {
    chat_id: chatId,
    title: options.title,
    description: options.description,
    payload: options.payload,
    currency: options.currency,
    prices: options.prices,
  };

  const res = await fetch(`${getTelegramApi()}/sendInvoice`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.ok) {
    console.error("Telegram sendInvoice failed:", data);
  }
  return data;
}

export async function answerPreCheckoutQuery(
  preCheckoutQueryId: string,
  ok: boolean,
  errorMessage?: string
) {
  const body: Record<string, unknown> = {
    pre_checkout_query_id: preCheckoutQueryId,
    ok,
  };
  if (!ok && errorMessage) {
    body.error_message = errorMessage;
  }

  const res = await fetch(`${getTelegramApi()}/answerPreCheckoutQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.ok) {
    console.error("Telegram answerPreCheckoutQuery failed:", data);
  }
  return data;
}

export async function refundStarPayment(
  telegramUserId: number,
  telegramPaymentChargeId: string
) {
  const res = await fetch(`${getTelegramApi()}/refundStarPayment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: telegramUserId,
      telegram_payment_charge_id: telegramPaymentChargeId,
    }),
  });
  return res.json();
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
