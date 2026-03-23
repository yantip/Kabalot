import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { buttonVariants } from "@/components/ui/button-variants";

import { cn } from "@/lib/utils";
import { Settings, FolderOpen } from "lucide-react";
import { ExportDropdown } from "@/components/projects/export-dropdown";
import { ReceiptTable } from "@/components/projects/receipt-table";
import type { Receipt } from "@/lib/supabase/types";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [{ data: project }, { data: fieldSettings }, { data: receipts }] =
    await Promise.all([
      supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single(),
      supabase
        .from("project_field_settings")
        .select("*")
        .eq("project_id", id)
        .eq("is_enabled", true)
        .order("display_order"),
      supabase
        .from("receipts")
        .select("*")
        .eq("project_id", id)
        .order("created_at", { ascending: false }),
    ]);

  if (!project) notFound();

  const enabledFields = (fieldSettings ?? []).map((f) => f.field_name);

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-3.5 min-w-0">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-warm-amber/20 to-warm-amber/5">
            <FolderOpen className="h-6 w-6 text-warm-amber" />
          </div>
          <div className="min-w-0 space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            {project.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <ExportDropdown projectId={id} />
          <Link
            href={`/projects/${id}/settings`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "gap-2 h-9 pr-3 pl-2 rounded-xl shadow-sm shadow-foreground/[0.03]"
            )}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-warm-rose/15">
              <Settings className="h-3.5 w-3.5 text-warm-rose" />
            </span>
            הגדרות
          </Link>
        </div>
      </div>

      <ReceiptTable
        receipts={(receipts ?? []) as Receipt[]}
        enabledFields={enabledFields}
      />
    </div>
  );
}
