"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signup } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await signup(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <Card className="border-0 bg-card shadow-2xl shadow-black/20 rounded-2xl">
      <CardHeader className="text-center space-y-5 pb-2 pt-8">
        <div className="mx-auto">
          <Image
            src="/imgs/Kabalot-logo.png"
            alt="קבלות"
            width={140}
            height={50}
            className="h-12 w-auto"
            priority
          />
        </div>
        <div className="space-y-1.5">
          <p className="text-sm text-muted-foreground">צור חשבון חדש כדי להתחיל לנהל קבלות</p>
        </div>
      </CardHeader>
      <CardContent className="px-6 sm:px-8">
        <form action={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3.5 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="fullName">שם מלא</Label>
            <Input id="fullName" name="fullName" placeholder="ישראל ישראלי" className="h-12 rounded-xl" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">אימייל</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              dir="ltr"
              className="h-12 rounded-xl"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">סיסמה</Label>
            <Input
              id="password"
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
      </CardContent>
      <CardFooter className="justify-center border-0 bg-transparent pb-8">
        <p className="text-sm text-muted-foreground">
          כבר יש לך חשבון?{" "}
          <Link href="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline">
            התחבר
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
