"use server";

import { redirect } from "next/navigation";
import type { AuthError } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { loginSchema, signupSchema } from "@/lib/validators/schemas";

const EMAIL_ALREADY_REGISTERED_HE =
  "האימייל הזה כבר קיים במערכת";

function isEmailAlreadyRegisteredError(error: AuthError): boolean {
  const code = error.code;
  if (
    code === "email_exists" ||
    code === "user_already_exists" ||
    code === "identity_already_exists"
  ) {
    return true;
  }
  const m = error.message.toLowerCase();
  return (
    m.includes("already registered") ||
    m.includes("user already exists") ||
    m.includes("email address is already") ||
    m.includes("email already") ||
    m.includes("already been registered")
  );
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: "אימייל או סיסמה שגויים" };
  }

  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    fullName: formData.get("fullName"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.fullName,
      },
    },
  });

  if (error) {
    if (isEmailAlreadyRegisteredError(error)) {
      return { error: EMAIL_ALREADY_REGISTERED_HE };
    }
    return { error: "שגיאה בהרשמה. נסה שוב." };
  }

  if (data.session) {
    redirect("/dashboard");
  }

  return { verifyEmail: true as const, email: parsed.data.email };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
