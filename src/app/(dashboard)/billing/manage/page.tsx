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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, Sparkles, Receipt } from "lucide-react";
import { CancelSubscriptionButton } from "./cancel-button";

export default async function ManageBillingPage() {
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

  const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    active: { label: "פעיל", variant: "default" },
    cancelled: { label: "בוטל", variant: "secondary" },
    past_due: { label: "איחור בתשלום", variant: "destructive" },
  };

  const statusInfo = statusLabels[subscription.status] ?? statusLabels.active;

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-slide-up">
      <div className="flex items-center gap-3">
        <Link
          href="/billing"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon-sm" }),
            "rounded-xl"
          )}
        >
          <ArrowRight className="h-4 w-4" />
        </Link>
        <div className="space-y-0.5">
          <h1 className="text-3xl font-bold tracking-tight">ניהול מנוי</h1>
          <p className="text-sm text-muted-foreground">
            צפה בפרטי המנוי והיסטוריית החיובים
          </p>
        </div>
      </div>

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
                  <Receipt className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div>
                <CardTitle className="text-base font-bold">תוכנית {currentPlan.name}</CardTitle>
                <CardDescription>
                  {subscription.plan_id === "pro"
                    ? `₪${currentPlan.price} לחודש`
                    : "ללא עלות"}
                </CardDescription>
              </div>
            </div>
            <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
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

          {subscription.current_period_end && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">תאריך חידוש</span>
              <span className="font-medium tabular-nums" dir="ltr">
                {new Date(subscription.current_period_end).toLocaleDateString("he-IL")}
              </span>
            </div>
          )}

          <div className="flex gap-2 pt-1">
            {subscription.plan_id === "free" ? (
              <Link
                href="/billing/checkout"
                className={cn(buttonVariants({ size: "sm" }), "rounded-xl shadow-md")}
              >
                שדרג למקצועי
              </Link>
            ) : (
              <CancelSubscriptionButton />
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 surface rounded-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold">היסטוריית חשבוניות</CardTitle>
          <CardDescription>רשימת החיובים והחשבוניות שלך</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl ring-1 ring-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="font-semibold">תאריך</TableHead>
                  <TableHead className="font-semibold">תיאור</TableHead>
                  <TableHead className="font-semibold">סכום</TableHead>
                  <TableHead className="font-semibold">סטטוס</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4}>
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted mb-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-semibold text-muted-foreground">
                        אין חשבוניות עדיין
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        חשבוניות יופיעו כאן לאחר חיוב ראשון
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
