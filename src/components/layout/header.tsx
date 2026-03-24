import { createClient } from "@/lib/supabase/server";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "בוקר טוב";
  if (hour < 17) return "צהריים טובים";
  return "ערב טוב";
}

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user?.id ?? "")
    .single();

  const greeting = getGreeting();
  const displayName = profile?.full_name || user?.email;

  return (
    <div className="pb-1">
      <p className="text-lg text-muted-foreground">
        {greeting},{" "}
        <span className="font-bold text-primary">{displayName}</span>
      </p>
    </div>
  );
}
