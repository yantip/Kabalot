import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getUserSubscription, getMonthlyUsage } from "@/actions/billing";
import { PLANS } from "@/lib/plans";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Sparkles, Zap, ArrowLeft, Star } from "lucide-react";

export default async function BillingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [subscription, usage] = await Promise.all([
    getUserSubscription(),
    getMonthlyUsage(),
  ]);

  const currentPlan = PLANS[subscription.plan_id as keyof typeof PLANS] ?? PLANS.free;
  const usagePercent = Math.min((usage / currentPlan.receiptsPerMonth) * 100, 100);
  const isNearLimit = usagePercent >= 80;

  return (
    <div className="mx-auto max-w-3xl space-y-8 animate-slide-up">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight">תוכנית וחיוב</h1>
        <p className="text-sm text-muted-foreground">
          נהל את התוכנית והשימוש שלך
        </p>
      </div>

      <Card className="border-0 surface rounded-2xl">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold">שימוש חודשי</span>
            <span className={cn(
              "text-sm tabular-nums font-bold",
              isNearLimit ? "text-destructive" : "text-muted-foreground"
            )}>
              {usage} / {currentPlan.receiptsPerMonth} קבלות
            </span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700 ease-out",
                isNearLimit
                  ? "bg-destructive"
                  : "bg-primary"
              )}
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          {isNearLimit && subscription.plan_id === "free" && (
            <p className="text-xs text-destructive mt-2.5 font-medium">
              את/ה מתקרב/ת למגבלת התוכנית החינמית. שדרג/י לתוכנית מקצועית לקבלות נוספות.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Free plan */}
        <Card className={cn(
          "border-0 surface relative overflow-hidden transition-all rounded-2xl",
          subscription.plan_id === "free" && "ring-2 ring-primary/30"
        )}>
          {subscription.plan_id === "free" && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                התוכנית הנוכחית
              </span>
            </div>
          )}
          <CardHeader className="pt-12 pb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted mb-3">
              <Zap className="h-6 w-6 text-muted-foreground" />
            </div>
            <CardTitle className="text-lg font-bold">{PLANS.free.name}</CardTitle>
            <CardDescription>לתחילת עבודה ובדיקת המערכת</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight">₪0</span>
              <span className="text-sm text-muted-foreground">/ חודש</span>
            </div>
            <ul className="space-y-3">
              {PLANS.free.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Check className="h-3 w-3 text-muted-foreground" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Pro plan */}
        <Card className={cn(
          "border-0 surface relative overflow-hidden transition-all rounded-2xl",
          subscription.plan_id === "pro"
            ? "ring-2 ring-primary/30"
            : "ring-2 ring-primary/20 bg-primary/[0.02]"
        )}>
          {subscription.plan_id === "pro" && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                התוכנית הנוכחית
              </span>
            </div>
          )}
          {subscription.plan_id === "free" && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                <Sparkles className="h-3 w-3" />
                מומלץ
              </span>
            </div>
          )}
          <CardHeader className="pt-12 pb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-3">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg font-bold">{PLANS.pro.name}</CardTitle>
            <CardDescription>לעסקים ולמשתמשים מתקדמים</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight flex items-center gap-1.5">
                {PLANS.pro.starPrice} <Star className="h-7 w-7 text-primary fill-primary" />
              </span>
              <span className="text-sm text-muted-foreground">/ חודש</span>
            </div>
            <ul className="space-y-3">
              {PLANS.pro.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            {subscription.plan_id === "free" ? (
              <Link
                href="/billing/checkout"
                className={cn(
                  buttonVariants(),
                  "w-full rounded-xl shadow-md"
                )}
              >
                שדרג עכשיו
                <ArrowLeft className="h-3.5 w-3.5 me-1" />
              </Link>
            ) : (
              <Link
                href="/billing/manage"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full rounded-xl"
                )}
              >
                נהל מנוי
              </Link>
            )}
          </CardContent>
        </Card>
      </div>

      {subscription.plan_id === "pro" && (
        <div className="text-center">
          <Link
            href="/billing/manage"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "gap-2 rounded-xl"
            )}
          >
            נהל את המנוי שלך
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
