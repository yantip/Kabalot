import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getUserSubscription, getMonthlyUsage } from "@/actions/billing";
import { getCategories } from "@/actions/categories";
import { PLANS } from "@/lib/plans";
import { ConnectTelegram } from "@/components/telegram/connect-telegram";
import { ManageCategories } from "@/components/settings/manage-categories";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Sparkles, Zap } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [{ data: profile }, subscription, usage, categories] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    getUserSubscription(),
    getMonthlyUsage(),
    getCategories(),
  ]);

  const isConnected = !!profile?.telegram_chat_id;
  const currentPlan = PLANS[subscription.plan_id as keyof typeof PLANS] ?? PLANS.free;
  const usagePercent = Math.min((usage / currentPlan.receiptsPerMonth) * 100, 100);

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight">הגדרות</h1>
          <p className="text-sm text-muted-foreground">נהל את החשבון וההגדרות שלך</p>
        </div>
        {isConnected && (
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-semibold text-primary ring-1 ring-primary/20">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            טלגרם מחובר
          </span>
        )}
      </div>

      <Card className="border-0 surface rounded-2xl">
        <CardHeader>
          <CardTitle>פרופיל</CardTitle>
          <CardDescription>פרטי החשבון שלך</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border/40 last:border-0">
            <span className="text-sm text-muted-foreground">אימייל</span>
            <span className="text-sm font-medium" dir="ltr">
              {user.email}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-muted-foreground">שם</span>
            <span className="text-sm font-medium">{profile?.full_name || "—"}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 surface rounded-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                subscription.plan_id === "pro"
                  ? "bg-primary/10"
                  : "bg-muted"
              )}>
                {subscription.plan_id === "pro" ? (
                  <Sparkles className="h-5 w-5 text-primary" />
                ) : (
                  <Zap className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div>
                <CardTitle className="text-base">תוכנית {currentPlan.name}</CardTitle>
                <CardDescription>
                  {subscription.plan_id === "pro"
                    ? `₪${currentPlan.price} לחודש`
                    : "ללא עלות"}
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">שימוש חודשי</span>
            <span className="tabular-nums font-semibold">
              {usage} / {currentPlan.receiptsPerMonth} קבלות
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700 ease-out",
                usagePercent >= 80
                  ? "bg-destructive"
                  : "bg-primary"
              )}
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          <Link
            href="/billing"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "gap-2 rounded-xl"
            )}
          >
            נהל תוכנית
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </CardContent>
      </Card>

      <ManageCategories categories={categories} />

      <ConnectTelegram isConnected={isConnected} />
    </div>
  );
}
