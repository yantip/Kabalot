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
  MessageCircle,
  Star,
} from "lucide-react";

export default async function CheckoutPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const subscription = await getUserSubscription();
  if (subscription.plan_id === "pro") redirect("/billing/manage");

  const { data: profile } = await supabase
    .from("profiles")
    .select("telegram_chat_id")
    .eq("id", user.id)
    .single();

  const isConnected = !!profile?.telegram_chat_id;
  const plan = PLANS.pro;
  const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "your_bot";

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
            תשלום באמצעות Telegram Stars
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
              <span className="text-2xl font-bold flex items-center gap-1">
                {plan.starPrice} <Star className="h-5 w-5 text-primary fill-primary" />
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="sm:col-span-3 border-0 surface rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 font-bold">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              תשלום דרך טלגרם
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-xl bg-primary/[0.05] ring-1 ring-primary/15 p-5 space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-semibold text-center">
                התשלום מתבצע באמצעות Telegram Stars
              </p>
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                שלח את הפקודה <code className="bg-muted px-1.5 py-0.5 rounded-md font-mono">/upgrade</code> לבוט הטלגרם שלנו
                כדי לקבל חשבונית תשלום ישירות בטלגרם
              </p>
            </div>

            {isConnected ? (
              <a
                href={`https://t.me/${botUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants(),
                  "w-full rounded-xl shadow-md"
                )}
              >
                <MessageCircle className="h-4 w-4 me-2" />
                פתח את הבוט ושלח /upgrade
              </a>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground text-center">
                  כדי לשלם, חבר קודם את חשבון הטלגרם שלך
                </p>
                <Link
                  href="/settings"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full rounded-xl"
                  )}
                >
                  חבר טלגרם בהגדרות
                  <ArrowRight className="h-3.5 w-3.5 ms-2" />
                </Link>
              </div>
            )}

            <p className="text-xs text-muted-foreground text-center">
              Telegram Stars הוא אמצעי תשלום דיגיטלי מאובטח של טלגרם
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
