import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUserSubscription, getMonthlyUsage } from "@/actions/billing";
import { PLANS } from "@/lib/plans";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button-variants";
import { FolderOpen, Receipt, AlertCircle, CheckCircle2, ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [
    { data: profile },
    { count: projectCount },
    { count: receiptCount },
    { count: pendingCount },
    { count: confirmedCount },
    subscription,
    monthlyUsage,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("telegram_chat_id")
      .eq("id", user.id)
      .single(),
    supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id),
    supabase
      .from("receipts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id),
    supabase
      .from("receipts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("status", "needs_review"),
    supabase
      .from("receipts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("status", "confirmed"),
    getUserSubscription(),
    getMonthlyUsage(),
  ]);

  const isConnected = !!profile?.telegram_chat_id;

  const currentPlan = PLANS[subscription.plan_id as keyof typeof PLANS] ?? PLANS.free;
  const usagePercent = Math.min((monthlyUsage / currentPlan.receiptsPerMonth) * 100, 100);
  const isNearLimit = usagePercent >= 80 && subscription.plan_id === "free";

  const stats = [
    {
      label: 'סה"כ קבלות',
      value: receiptCount ?? 0,
      icon: Receipt,
      accentBg: "bg-gradient-to-br from-warm-amber/15 to-warm-amber/5",
      iconColor: "text-warm-amber",
      borderColor: "border-r-warm-amber",
      hero: true,
    },
    {
      label: "פרויקטים",
      value: projectCount ?? 0,
      icon: FolderOpen,
      accentBg: "bg-primary/[0.08]",
      iconColor: "text-primary",
      borderColor: "border-r-primary",
    },
    {
      label: "ממתינות לבדיקה",
      value: pendingCount ?? 0,
      icon: AlertCircle,
      accentBg: "bg-warm-rose/10",
      iconColor: "text-warm-rose",
      borderColor: "border-r-warm-rose",
    },
    {
      label: "מאושרות",
      value: confirmedCount ?? 0,
      icon: CheckCircle2,
      accentBg: "bg-warm-green/10",
      iconColor: "text-warm-green",
      borderColor: "border-r-warm-green",
    },
  ];

  return (
    <div className="space-y-8">
      {!isConnected && (
        <div className="animate-slide-up rounded-2xl bg-gradient-to-l from-warm-amber/[0.1] via-warm-amber/[0.04] to-transparent ring-1 ring-warm-amber/15 p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-warm-amber/25 to-warm-amber/10">
              <MessageCircle className="h-5.5 w-5.5 text-warm-amber" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-foreground text-base">חבר את הטלגרם שלך</p>
              <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                שלח תמונות של קבלות ישירות מטלגרם והנתונים יחולצו אוטומטית
              </p>
            </div>
            <Link href="/settings" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0 gap-2 rounded-xl")}>
              הגדרות
              <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Bento stat grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card
            key={stat.label}
            className={cn(
              "animate-slide-up border-0 shadow-sm shadow-foreground/[0.03] card-glow overflow-hidden border-r-[3px]",
              stat.borderColor,
              stat.hero && "col-span-2 lg:col-span-2",
              `stagger-${i + 1}`
            )}
          >
            <CardContent className={cn("pt-5", stat.hero && "pt-6 pb-6")}>
              <div className="flex items-center justify-between mb-3">
                <span className={cn(
                  "font-medium text-muted-foreground",
                  stat.hero ? "text-base" : "text-sm"
                )}>{stat.label}</span>
                <div className={cn(
                  "flex items-center justify-center rounded-xl",
                  stat.accentBg,
                  stat.hero ? "h-11 w-11" : "h-9 w-9"
                )}>
                  <stat.icon className={cn(stat.iconColor, stat.hero ? "h-5.5 w-5.5" : "h-4 w-4")} />
                </div>
              </div>
              <div className={cn(
                "font-bold tabular-nums tracking-tight",
                stat.hero ? "text-5xl" : "text-3xl"
              )}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {subscription.plan_id === "free" && (
        <div className={cn(
          "animate-slide-up stagger-5 rounded-2xl p-5 transition-colors ring-1",
          isNearLimit
            ? "bg-gradient-to-l from-warm-rose/[0.08] via-warm-amber/[0.04] to-transparent ring-warm-rose/20"
            : "bg-gradient-to-l from-primary/[0.06] via-primary/[0.02] to-transparent ring-border/50"
        )}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                isNearLimit ? "bg-warm-rose/15" : "bg-primary/[0.1]"
              )}>
                <Sparkles className={cn("h-5 w-5", isNearLimit ? "text-warm-rose" : "text-primary")} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold">
                  תוכנית {currentPlan.name} — {monthlyUsage}/{currentPlan.receiptsPerMonth} קבלות החודש
                </p>
                <div className="mt-2 h-2 w-full max-w-52 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-700 ease-out",
                      isNearLimit
                        ? "bg-gradient-to-l from-warm-rose to-warm-amber shadow-[0_0_8px] shadow-warm-rose/30"
                        : "bg-gradient-to-l from-primary to-primary/60"
                    )}
                    style={{ width: `${usagePercent}%` }}
                  />
                </div>
              </div>
            </div>
            <Link href="/billing" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0 gap-2 rounded-xl")}>
              {isNearLimit ? "שדרג" : "פרטים"}
              <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}

      {(projectCount ?? 0) === 0 && (
        <Card className="animate-slide-up stagger-6 border-dashed border-2 border-border/50 bg-gradient-to-br from-primary/[0.03] to-transparent shadow-none rounded-2xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-warm-amber/10 mb-3">
              <FolderOpen className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-xl font-bold">התחל עכשיו</CardTitle>
            <CardDescription className="text-base">צור את הפרויקט הראשון שלך כדי להתחיל לאסוף קבלות</CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-8">
            <Link href="/projects/new" className={cn(buttonVariants(), "rounded-xl btn-gradient shadow-lg shadow-primary/20 h-10 px-6")}>
              צור פרויקט חדש
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
