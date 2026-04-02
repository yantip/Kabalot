"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { login, signup } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";

type AuthTab = "login" | "signup";
type SignupStep = "form" | "verify";
type AuthSubmitting = "login" | "signup" | null;

/** Tab switch often completes in one frame; keep bar visibly busy at least this long. */
const MIN_TAB_SWITCH_MS = 240;

export function AuthDialog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authParam = searchParams.get("auth") as AuthTab | null;

  const [tab, setTab] = useState<AuthTab>(authParam === "login" ? "login" : "signup");
  const [signupStep, setSignupStep] = useState<SignupStep>("form");
  const [verifyEmail, setVerifyEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<AuthSubmitting>(null);
  /** Until URL `auth` matches, tab switch is in progress (router.replace is async). */
  const [tabSwitchTarget, setTabSwitchTarget] = useState<AuthTab | null>(null);
  const tabSwitchStartedAtRef = useRef<number | null>(null);

  const isOpen = authParam === "login" || authParam === "signup";
  const tabBarBusy = submitting !== null || tabSwitchTarget !== null;

  useEffect(() => {
    if (authParam === "login" || authParam === "signup") {
      setTab(authParam);
      setError(null);
      setSubmitting(null);
      if (authParam === "login") {
        setSignupStep("form");
        setVerifyEmail(null);
      }
    }
  }, [authParam]);

  useEffect(() => {
    if (!tabSwitchTarget) return;
    if (authParam !== tabSwitchTarget) return;
    const started = tabSwitchStartedAtRef.current ?? Date.now();
    const elapsed = Date.now() - started;
    const remaining = Math.max(0, MIN_TAB_SWITCH_MS - elapsed);
    const id = window.setTimeout(() => {
      setTabSwitchTarget(null);
      tabSwitchStartedAtRef.current = null;
    }, remaining);
    return () => clearTimeout(id);
  }, [authParam, tabSwitchTarget]);

  useEffect(() => {
    if (!isOpen) {
      setSignupStep("form");
      setVerifyEmail(null);
      setSubmitting(null);
      setTabSwitchTarget(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const close = useCallback(() => {
    router.push("/", { scroll: false });
  }, [router]);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting("login");
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setSubmitting(null);
    }
  }

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting("signup");
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await signup(formData);
    if (result?.error) {
      setError(result.error);
      setSubmitting(null);
      return;
    }
    if (result && "verifyEmail" in result && result.verifyEmail) {
      setVerifyEmail(result.email);
      setSignupStep("verify");
    }
    setSubmitting(null);
  }

  function switchTab(newTab: AuthTab) {
    if (submitting || tabSwitchTarget) return;
    setError(null);
    if (newTab === "login") {
      setSignupStep("form");
      setVerifyEmail(null);
    }
    if (newTab === authParam) {
      setTab(newTab);
      tabSwitchStartedAtRef.current = null;
      return;
    }
    tabSwitchStartedAtRef.current = Date.now();
    setTabSwitchTarget(newTab);
    setTab(newTab);
    router.replace(`/?auth=${newTab}`, { scroll: false });
  }

  if (!isOpen) return null;

  const signupTabSpinner =
    submitting === "signup" ||
    (tab === "signup" && tabSwitchTarget === "signup");
  const loginTabSpinner =
    submitting === "login" ||
    (tab === "login" && tabSwitchTarget === "login");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={close}
      />

      <div className="relative w-full max-w-[420px] animate-scale-in">
        <div className="bg-card rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
          <button
            onClick={close}
            className="absolute top-4 left-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="text-center pt-8 pb-2 px-6">
            <div className="mx-auto mb-5">
              <Image
                src="/imgs/Kabalot-logo.png"
                alt="קבלות"
                width={140}
                height={50}
                className="h-10 w-auto mx-auto"
              />
            </div>

            {!(tab === "signup" && signupStep === "verify") && (
              <div className="relative">
                <div
                  className={cn(
                    "flex items-center rounded-xl bg-muted p-1 gap-1 transition-[opacity,filter] duration-200",
                    tabBarBusy &&
                      "pointer-events-none opacity-[0.38] saturate-0 contrast-[0.92] shadow-inner"
                  )}
                  aria-busy={tabBarBusy}
                >
                  <button
                    type="button"
                    tabIndex={tabBarBusy ? -1 : 0}
                    aria-disabled={tabBarBusy}
                    disabled={tabBarBusy}
                    onClick={() => switchTab("signup")}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 min-h-10 text-sm font-medium transition-colors duration-200",
                      tabBarBusy
                        ? "cursor-not-allowed bg-transparent text-muted-foreground shadow-none"
                        : "cursor-pointer",
                      !tabBarBusy &&
                        tab === "signup" &&
                        "bg-card text-foreground shadow-sm",
                      !tabBarBusy &&
                        tab !== "signup" &&
                        "text-muted-foreground hover:text-foreground",
                      !tabBarBusy && tab === "signup" && "hover:text-foreground"
                    )}
                  >
                    {signupTabSpinner && (
                      <Loader2
                        className="h-4 w-4 shrink-0 animate-spin text-foreground/50"
                        aria-hidden
                      />
                    )}
                    <span className={cn(tabBarBusy && "text-muted-foreground")}>
                      הרשמה
                    </span>
                  </button>
                  <button
                    type="button"
                    tabIndex={tabBarBusy ? -1 : 0}
                    aria-disabled={tabBarBusy}
                    disabled={tabBarBusy}
                    onClick={() => switchTab("login")}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 min-h-10 text-sm font-medium transition-colors duration-200",
                      tabBarBusy
                        ? "cursor-not-allowed bg-transparent text-muted-foreground shadow-none"
                        : "cursor-pointer",
                      !tabBarBusy &&
                        tab === "login" &&
                        "bg-card text-foreground shadow-sm",
                      !tabBarBusy &&
                        tab !== "login" &&
                        "text-muted-foreground hover:text-foreground",
                      !tabBarBusy && tab === "login" && "hover:text-foreground"
                    )}
                  >
                    {loginTabSpinner && (
                      <Loader2
                        className="h-4 w-4 shrink-0 animate-spin text-foreground/50"
                        aria-hidden
                      />
                    )}
                    <span className={cn(tabBarBusy && "text-muted-foreground")}>
                      התחברות
                    </span>
                  </button>
                </div>
                {tabBarBusy && (
                  <div
                    className="absolute inset-0 z-10 cursor-wait rounded-[inherit]"
                    aria-hidden
                  />
                )}
              </div>
            )}
          </div>

          <div className="px-6 sm:px-8 pt-5 pb-8">

            {tab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3.5 text-sm text-destructive">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="login-email">אימייל</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    dir="ltr"
                    className="h-12 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">סיסמה</Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    dir="ltr"
                    className="h-12 rounded-xl"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 text-sm font-bold rounded-xl shadow-md gap-2"
                  disabled={submitting === "login"}
                >
                  {submitting === "login" && (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  )}
                  {submitting === "login" ? "מתחבר..." : "התחבר"}
                </Button>
              </form>
            ) : signupStep === "verify" ? (
              <div className="space-y-6 text-center py-2">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Mail className="h-8 w-8" strokeWidth={1.75} />
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-foreground">
                    בדוק את המייל שלך
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    שלחנו קישור אימות לכתובת:
                  </p>
                  {verifyEmail && (
                    <p
                      className="text-base font-semibold text-foreground break-all"
                      dir="ltr"
                    >
                      {verifyEmail}
                    </p>
                  )}
                  <div className="rounded-xl bg-muted/60 border border-border/40 p-4 mt-2">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      לחץ על הקישור במייל כדי להפעיל את החשבון.
                      <br />
                      לאחר הלחיצה תתחבר אוטומטית.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground/60 pt-2">
                  לא קיבלת? בדוק בתיקיית הספאם.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                {error && (
                  <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3.5 text-sm text-destructive">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="signup-fullName">שם מלא</Label>
                  <Input
                    id="signup-fullName"
                    name="fullName"
                    placeholder="ישראל ישראלי"
                    className="h-12 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">אימייל</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    dir="ltr"
                    className="h-12 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">סיסמה</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="לפחות 6 תווים"
                    dir="ltr"
                    className="h-12 rounded-xl"
                    required
                    minLength={6}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 text-sm font-bold rounded-xl shadow-md gap-2"
                  disabled={submitting === "signup"}
                >
                  {submitting === "signup" && (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  )}
                  {submitting === "signup" ? "נרשם..." : "צור חשבון"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
