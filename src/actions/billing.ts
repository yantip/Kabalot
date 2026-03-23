"use server";

import { createClient, createServiceClient } from "@/lib/supabase/server";
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

export async function upgradeToPro() {
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
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
    })
    .eq("user_id", user.id);

  if (error) return { error: "שגיאה בשדרוג התוכנית" };

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

  const { error } = await service
    .from("subscriptions")
    .update({ status: "cancelled" })
    .eq("user_id", user.id);

  if (error) return { error: "שגיאה בביטול המנוי" };

  revalidatePath("/billing");
  revalidatePath("/");
  return { success: true };
}

export async function reactivateSubscription() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "לא מחובר" };

  const service = createServiceClient();

  const { error } = await service
    .from("subscriptions")
    .update({
      plan_id: "free",
      status: "active",
      current_period_end: null,
      payment_provider: null,
      payment_provider_sub_id: null,
    })
    .eq("user_id", user.id);

  if (error) return { error: "שגיאה בהחזרת התוכנית" };

  revalidatePath("/billing");
  revalidatePath("/");
  return { success: true };
}
