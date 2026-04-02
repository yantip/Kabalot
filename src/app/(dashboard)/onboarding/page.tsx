import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TelegramWizard } from "@/components/onboarding/telegram-wizard";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/?auth=login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("telegram_chat_id")
    .eq("id", user.id)
    .single();

  // Already connected → go straight to dashboard
  if (profile?.telegram_chat_id) {
    redirect("/dashboard");
  }

  return <TelegramWizard />;
}
