"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  generateBotToken,
  checkTelegramConnection,
} from "@/actions/telegram";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  ExternalLink,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

type WizardStep = 1 | 2 | 3;

export function TelegramWizard() {
  const [step, setStep] = useState<WizardStep>(1);
  const [deepLink, setDeepLink] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [checking, setChecking] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Stop polling on unmount
  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const generateLink = useCallback(async () => {
    setGenerating(true);
    setError(null);
    const result = await generateBotToken();
    if (result.error) {
      setError(result.error);
    } else if (result.deepLink) {
      setDeepLink(result.deepLink);
    }
    setGenerating(false);
  }, []);

  // Auto-generate link when entering step 2
  useEffect(() => {
    if (step === 2 && !deepLink && !generating) {
      generateLink();
    }
  }, [step, deepLink, generating, generateLink]);

  // Start polling when entering step 3
  useEffect(() => {
    if (step !== 3) return;
    setChecking(true);

    async function poll() {
      const result = await checkTelegramConnection();
      if (result.connected) {
        setConnected(true);
        setChecking(false);
        if (pollRef.current) clearInterval(pollRef.current);
        // Redirect after a short celebration
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      }
    }

    poll(); // Check immediately
    pollRef.current = setInterval(poll, 3000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [step]);

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {([1, 2, 3] as const).map((s) => (
            <div
              key={s}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                s === step
                  ? "w-8 bg-primary"
                  : s < step
                  ? "w-2 bg-primary/40"
                  : "w-2 bg-muted-foreground/20"
              )}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="surface p-8 sm:p-10 animate-scale-in">
          {step === 1 && <StepWelcome onNext={() => setStep(2)} />}

          {step === 2 && (
            <StepConnect
              deepLink={deepLink}
              generating={generating}
              error={error}
              onRegenerate={generateLink}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <StepVerify
              connected={connected}
              checking={checking}
              onBack={() => {
                setChecking(false);
                if (pollRef.current) clearInterval(pollRef.current);
                setStep(2);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────── Step 1: Welcome ─────── */

function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center space-y-6">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#2AABEE]/10">
        <MessageCircle className="h-10 w-10 text-[#2AABEE]" />
      </div>

      <div className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight">
          חבר את הטלגרם שלך
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
          כדי להתחיל להשתמש בקבלות, צריך לחבר את חשבון הטלגרם שלך לבוט שלנו.
        </p>
      </div>

      <div className="space-y-3 pt-2">
        {[
          {
            icon: Send,
            text: "שלח תמונת קבלה ישירות מטלגרם",
          },
          {
            icon: Sparkles,
            text: "הנתונים יחולצו אוטומטית תוך שניות",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl bg-muted/50 p-3.5 text-right"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <item.icon className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium">{item.text}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={onNext}
        className="w-full h-12 text-sm font-bold rounded-xl shadow-md gap-2 mt-2"
      >
        יאללה, מתחילים
        <ArrowLeft className="h-4 w-4" />
      </Button>
    </div>
  );
}

/* ─────── Step 2: Generate & Open Link ─────── */

function StepConnect({
  deepLink,
  generating,
  error,
  onRegenerate,
  onNext,
  onBack,
}: {
  deepLink: string | null;
  generating: boolean;
  error: string | null;
  onRegenerate: () => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="text-center space-y-6">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#2AABEE]/10">
        <ExternalLink className="h-10 w-10 text-[#2AABEE]" />
      </div>

      <div className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight">
          פתח את הבוט בטלגרם
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
          לחץ על הכפתור למטה כדי לפתוח את הבוט, ואז לחץ{" "}
          <span className="font-bold text-foreground">Start</span> בטלגרם.
        </p>
      </div>

      {error && (
        <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3.5 text-sm text-destructive">
          {error}
        </div>
      )}

      {generating ? (
        <div className="flex items-center justify-center gap-2 py-4">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">יוצר קישור...</span>
        </div>
      ) : deepLink ? (
        <div className="space-y-3">
          <a
            href={deepLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex w-full h-12 items-center justify-center gap-2 rounded-xl font-bold text-sm shadow-md transition-colors",
              "bg-[#2AABEE] text-white hover:bg-[#229ED9]"
            )}
          >
            <MessageCircle className="h-5 w-5" />
            פתח בטלגרם
          </a>

          <div className="rounded-xl bg-muted/50 border border-border/40 p-4">
            <div className="flex items-start gap-3 text-right">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                <span className="text-xs font-bold text-primary">!</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                לאחר פתיחת הבוט, לחץ על כפתור{" "}
                <span className="font-bold text-foreground">Start</span>{" "}
                בטלגרם. הקישור תקף ל-10 דקות.
              </p>
            </div>
          </div>

          <button
            onClick={onRegenerate}
            className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors flex items-center gap-1 mx-auto"
          >
            <RefreshCw className="h-3 w-3" />
            קישור לא עובד? צור חדש
          </button>
        </div>
      ) : null}

      <div className="flex gap-3 pt-2">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex-1 h-11 text-sm rounded-xl text-muted-foreground"
        >
          חזרה
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 h-11 text-sm font-bold rounded-xl shadow-md gap-2"
          disabled={!deepLink}
        >
          עשיתי, חיברתי
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

/* ─────── Step 3: Verify ─────── */

function StepVerify({
  connected,
  checking,
  onBack,
}: {
  connected: boolean;
  checking: boolean;
  onBack: () => void;
}) {
  if (connected) {
    return (
      <div className="text-center space-y-6 py-4 animate-scale-in">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            מעולה! החשבון מחובר 🎉
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            הכל מוכן. מעביר אותך ללוח הבקרה...
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>

      <div className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight">
          מחכה לחיבור...
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
          פתחת את הבוט בטלגרם ולחצת Start?
          <br />
          אנחנו בודקים אם החשבון חובר.
        </p>
      </div>

      {checking && (
        <div className="flex items-center justify-center gap-2 py-2">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
            <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
            <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
          </div>
          <span className="text-sm text-muted-foreground">בודק...</span>
        </div>
      )}

      <Button
        variant="ghost"
        onClick={onBack}
        className="h-11 text-sm rounded-xl text-muted-foreground"
      >
        חזרה לשלב הקודם
      </Button>
    </div>
  );
}
