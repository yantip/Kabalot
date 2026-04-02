import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Supabase email-confirmation callback.
 *
 * The confirmation email links to /auth/callback?code=<…>.
 * This route exchanges the code for a session and redirects
 * the user to the dashboard (on success) or the login dialog
 * (on failure).
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Confirmed & logged-in → go straight to dashboard
      return NextResponse.redirect(new URL("/dashboard", origin));
    }
  }

  // Fallback: something went wrong → open login dialog
  return NextResponse.redirect(new URL("/?auth=login", origin));
}
