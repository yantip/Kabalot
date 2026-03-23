"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  CreditCard,
  Lock,
  Sparkles,
  Check,
} from "lucide-react";
import { PLANS } from "@/lib/plans";

export default function CheckoutPage() {
  const plan = PLANS.pro;

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
            השלם את התשלום כדי להתחיל
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-5">
        <Card className="sm:col-span-2 border-0 shadow-sm shadow-foreground/[0.03] h-fit border-r-[3px] border-r-warm-amber/50 rounded-2xl">
          <CardHeader className="pb-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-warm-amber/25 to-warm-amber/5 mb-2">
              <Sparkles className="h-5 w-5 text-warm-amber" />
            </div>
            <CardTitle className="text-base font-bold">{plan.name}</CardTitle>
            <CardDescription>סיכום הזמנה</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="space-y-2.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-warm-green shrink-0" />
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

        <Card className="sm:col-span-3 border-0 shadow-sm shadow-foreground/[0.03] rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 font-bold">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              פרטי תשלום
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-name">שם בעל הכרטיס</Label>
              <Input
                id="card-name"
                placeholder="ישראל ישראלי"
                disabled
                className="bg-muted/50 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-number">מספר כרטיס</Label>
              <Input
                id="card-number"
                placeholder="0000 0000 0000 0000"
                disabled
                className="bg-muted/50 tabular-nums rounded-xl"
                dir="ltr"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="card-expiry">תוקף</Label>
                <Input
                  id="card-expiry"
                  placeholder="MM / YY"
                  disabled
                  className="bg-muted/50 tabular-nums rounded-xl"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-cvc">CVV</Label>
                <Input
                  id="card-cvc"
                  placeholder="•••"
                  disabled
                  className="bg-muted/50 tabular-nums rounded-xl"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="rounded-xl bg-warm-amber/[0.06] ring-1 ring-warm-amber/15 p-5 text-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-amber/15 mx-auto">
                <Lock className="h-4.5 w-4.5 text-warm-amber" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                חיבור לשירות תשלום בקרוב
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                אזור זה ישולב עם ספק תשלום מאובטח. כרגע מדובר בתצוגה מקדימה בלבד.
              </p>
            </div>

            <Button className="w-full rounded-xl" disabled>
              <Lock className="h-3.5 w-3.5 me-1" />
              שלם ₪{plan.price} לחודש
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
