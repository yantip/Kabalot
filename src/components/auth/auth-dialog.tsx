"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { login, signup } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type AuthTab = "login" | "signup";

export function AuthDialog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authParam = searchParams.get("auth") as AuthTab | null;

  const [tab, setTab] = useState<AuthTab>(authParam === "login" ? "login" : "signup");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isOpen = authParam === "login" || authParam === "signup";

  useEffect(() => {
    if (authParam === "login" || authParam === "signup") {
      setTab(authParam);
      setError(null);
    }
  }, [authParam]);

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

  async function handleLogin(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  async function handleSignup(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await signup(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  function switchTab(newTab: AuthTab) {
    setTab(newTab);
    setError(null);
    router.replace(`/?auth=${newTab}`, { scroll: false });
  }

  if (!isOpen) return null;

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

            <div className="flex items-center rounded-xl bg-muted p-1 gap-1">
              <button
                onClick={() => switchTab("signup")}
                className={cn(
                  "flex-1 rounded-lg py-2 text-sm font-medium transition-all duration-200",
                  tab === "signup"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                הרשמה
              </button>
              <button
                onClick={() => switchTab("login")}
                className={cn(
                  "flex-1 rounded-lg py-2 text-sm font-medium transition-all duration-200",
                  tab === "login"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                התחברות
              </button>
            </div>
          </div>

          <div className="px-6 sm:px-8 pt-5 pb-8">
            {error && (
              <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3.5 text-sm text-destructive mb-5">
                {error}
              </div>
            )}

            {tab === "login" ? (
              <form action={handleLogin} className="space-y-4">
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
                  className="w-full h-12 text-sm font-bold rounded-xl shadow-md"
                  disabled={loading}
                >
                  {loading ? "מתחבר..." : "התחבר"}
                </Button>
              </form>
            ) : (
              <form action={handleSignup} className="space-y-4">
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
                  className="w-full h-12 text-sm font-bold rounded-xl shadow-md"
                  disabled={loading}
                >
                  {loading ? "נרשם..." : "צור חשבון"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
