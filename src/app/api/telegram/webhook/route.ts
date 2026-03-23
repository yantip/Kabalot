import { NextRequest, NextResponse } from "next/server";
import { handleTelegramUpdate } from "@/lib/telegram/handlers";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-telegram-bot-api-secret-token");

  if (secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    console.error("Webhook auth failed: invalid secret token");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const update = await request.json();
    const logType = update.pre_checkout_query
      ? "[pre_checkout_query]"
      : update.message?.successful_payment
        ? "[successful_payment]"
        : update.message?.text ?? (update.message?.photo ? "[photo]" : "[other]");
    console.log("Telegram webhook received:", logType);
    await handleTelegramUpdate(update);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ ok: true });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", message: "Telegram webhook endpoint is reachable" });
}
