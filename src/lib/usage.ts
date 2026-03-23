import { createServiceClient } from "@/lib/supabase/server";
import { PLANS } from "@/lib/plans";

interface UsageResult {
  allowed: boolean;
  usage: number;
  limit: number;
  planId: string;
}

interface ProjectLimitResult {
  allowed: boolean;
  count: number;
  limit: number;
  planId: string;
}

export async function checkReceiptLimit(userId: string): Promise<UsageResult> {
  const supabase = createServiceClient();

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("plan_id, status")
    .eq("user_id", userId)
    .single();

  const planId = sub?.status === "active" ? (sub.plan_id ?? "free") : "free";
  const plan = PLANS[planId as keyof typeof PLANS] ?? PLANS.free;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const { count } = await supabase
    .from("receipts")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", startOfMonth);

  const usage = count ?? 0;

  return {
    allowed: usage < plan.receiptsPerMonth,
    usage,
    limit: plan.receiptsPerMonth,
    planId,
  };
}

export async function checkProjectLimit(userId: string): Promise<ProjectLimitResult> {
  const supabase = createServiceClient();

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("plan_id, status")
    .eq("user_id", userId)
    .single();

  const planId = sub?.status === "active" ? (sub.plan_id ?? "free") : "free";
  const plan = PLANS[planId as keyof typeof PLANS] ?? PLANS.free;

  const { count } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  const projectCount = count ?? 0;

  return {
    allowed: projectCount < plan.projectsLimit,
    count: projectCount,
    limit: plan.projectsLimit,
    planId,
  };
}
