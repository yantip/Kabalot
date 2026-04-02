"use server";

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

  return { success: true as const };
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

  const result = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.fullName,
      },
    },
  });

  if (result.error) {
    if (isEmailAlreadyRegisteredError(result.error)) {
      return { error: EMAIL_ALREADY_REGISTERED_HE };
    }
    // If user was actually created despite the error (transient issue),
    // still show the verify screen instead of a confusing error.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((result as any).data?.user?.id) {
      return { verifyEmail: true as const, email: parsed.data.email };
    }
    return { error: "שגיאה בהרשמה. נסה שוב." };
  }

  const { data } = result;

  // Supabase returns data.user with empty identities[] for already-existing
  // but unconfirmed emails (security feature to prevent email enumeration).
  // Treat this as "email already registered".
  if (
    data.user &&
    (!data.user.identities || data.user.identities.length === 0)
  ) {
    return { error: EMAIL_ALREADY_REGISTERED_HE };
  }

  if (data.session) {
    return { success: true as const };
  }

  return { verifyEmail: true as const, email: parsed.data.email };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return { success: true as const };
}
