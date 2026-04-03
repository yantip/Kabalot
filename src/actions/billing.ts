"use server";

import { createClient, createServiceClient } from "@/lib/supabase/server";
import { cancelPayPalSubscription } from "@/lib/paypal";
import { revalidatePath } from "next/cache";
import type { PlanId } from "@/lib/plans";
import type { Subscription } from "@/lib/supabase/types";

export async function getUserSubscription(): Promise<Subscription> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const service = createServiceClient();

  const { data: sub } = await service
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (sub) return sub as Subscription;

  const { data: newSub, error } = await service
    .from("subscriptions")
    .insert({ user_id: user.id, plan_id: "free", status: "active" })
    .select()
    .single();

  if (error || !newSub) throw new Error("Failed to create subscription");

  return newSub as Subscription;
}

export async function getMonthlyUsage(): Promise<number> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return 0;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const { count } = await supabase
    .from("receipts")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", startOfMonth);

  return count ?? 0;
}

/**
 * Called from the client after PayPal onApprove fires.
 * Saves the PayPal subscription ID and upgrades the user to pro.
 */
export async function activatePayPalSubscription(paypalSubscriptionId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "לא מחובר" };

  const service = createServiceClient();

  const { error } = await service
    .from("subscriptions")
    .update({
      plan_id: "pro",
      status: "active",
      payment_provider: "paypal",
      payment_provider_sub_id: paypalSubscriptionId,
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
    })
    .eq("user_id", user.id);

  if (error) return { error: "שגיאה בהפעלת המנוי" };

  revalidatePath("/billing");
  revalidatePath("/");
  return { success: true };
}

export async function cancelSubscription() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "לא מחובר" };

  const service = createServiceClient();

  // Get current subscription to find PayPal sub ID
  const { data: sub } = await service
    .from("subscriptions")
    .select("payment_provider_sub_id, payment_provider")
    .eq("user_id", user.id)
    .single();

  // Cancel on PayPal side if applicable
  if (sub?.payment_provider === "paypal" && sub?.payment_provider_sub_id) {
    try {
      await cancelPayPalSubscription(sub.payment_provider_sub_id);
    } catch (e) {
      console.error("PayPal cancel error:", e);
      // Continue anyway — downgrade locally even if PayPal API fails
    }
  }

  const { error } = await service
    .from("subscriptions")
    .update({
      plan_id: "free",
      status: "active",
      payment_provider: null,
      payment_provider_sub_id: null,
      current_period_end: null,
    })
    .eq("user_id", user.id);

  if (error) return { error: "שגיאה בביטול המנוי" };

  revalidatePath("/billing");
  revalidatePath("/");
  return { success: true };
}
