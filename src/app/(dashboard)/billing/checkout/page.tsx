import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getUserSubscription } from "@/actions/billing";
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
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Sparkles,
  Check,
  Shield,
} from "lucide-react";
import { PayPalSubscribeButton } from "@/components/billing/paypal-subscribe-button";

export default async function CheckoutPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/?auth=login");

  const subscription = await getUserSubscription();
  if (subscription.plan_id === "pro") redirect("/billing/manage");

  const plan = PLANS.pro;
  const paypalPlanId = process.env.PAYPAL_PLAN_ID;

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
          <h1 className="text-3xl font-bold tracking-tight">שדרוג לתוכנית מקצועית</h1>
          <p className="text-sm text-muted-foreground">
            תשלום מאובטח באמצעות PayPal
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-5">
        <Card className="sm:col-span-2 border-0 surface h-fit rounded-2xl">
          <CardHeader className="pb-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 mb-2">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base font-bold">{plan.name}</CardTitle>
            <CardDescription>סיכום הזמנה</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="space-y-2.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Separator />
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold">סה&quot;כ לחודש</span>
              <span className="text-2xl font-bold">₪{plan.price}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="sm:col-span-3 border-0 surface rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 font-bold">
              <Shield className="h-4 w-4 text-muted-foreground" />
              תשלום מאובטח
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {paypalPlanId ? (
              <PayPalSubscribeButton planId={paypalPlanId} />
            ) : (
              <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive text-center">
                מערכת התשלומים אינה מוגדרת. פנה לתמיכה.
              </div>
            )}

            <div className="flex items-center gap-2 justify-center pt-1">
              <Shield className="h-3.5 w-3.5 text-muted-foreground/50" />
              <p className="text-xs text-muted-foreground/60">
                התשלום מעובד באופן מאובטח על ידי PayPal. ניתן לבטל בכל עת.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
