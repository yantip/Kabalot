import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const event = JSON.parse(body);

    console.log("PayPal webhook event:", event.event_type, event.resource?.id);

    const supabase = createServiceClient();

    switch (event.event_type) {
      case "BILLING.SUBSCRIPTION.ACTIVATED":
      case "BILLING.SUBSCRIPTION.RENEWED": {
        const subscriptionId = event.resource?.id;
        if (!subscriptionId) break;

        // Find user by paypal subscription ID
        const { data: sub } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("payment_provider_sub_id", subscriptionId)
          .single();

        if (sub) {
          await supabase
            .from("subscriptions")
            .update({
              plan_id: "pro",
              status: "active",
              current_period_start: new Date().toISOString(),
              current_period_end: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
              ).toISOString(),
            })
            .eq("user_id", sub.user_id);
        }
        break;
      }

      case "BILLING.SUBSCRIPTION.CANCELLED":
      case "BILLING.SUBSCRIPTION.EXPIRED": {
        const subscriptionId = event.resource?.id;
        if (!subscriptionId) break;

        const { data: sub } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("payment_provider_sub_id", subscriptionId)
          .single();

        if (sub) {
          await supabase
            .from("subscriptions")
            .update({
              plan_id: "free",
              status: "active",
              payment_provider: null,
              payment_provider_sub_id: null,
              current_period_end: null,
            })
            .eq("user_id", sub.user_id);
        }
        break;
      }

      case "BILLING.SUBSCRIPTION.SUSPENDED": {
        const subscriptionId = event.resource?.id;
        if (!subscriptionId) break;

        const { data: sub } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("payment_provider_sub_id", subscriptionId)
          .single();

        if (sub) {
          await supabase
            .from("subscriptions")
            .update({ status: "past_due" })
            .eq("user_id", sub.user_id);
        }
        break;
      }

      case "PAYMENT.SALE.COMPLETED": {
        // Recurring payment received — extend period
        const billingAgreementId = event.resource?.billing_agreement_id;
        if (!billingAgreementId) break;

        const { data: sub } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("payment_provider_sub_id", billingAgreementId)
          .single();

        if (sub) {
          await supabase
            .from("subscriptions")
            .update({
              status: "active",
              current_period_start: new Date().toISOString(),
              current_period_end: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
              ).toISOString(),
            })
            .eq("user_id", sub.user_id);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("PayPal webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
