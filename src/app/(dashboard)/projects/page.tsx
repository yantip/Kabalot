import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { ProjectCard } from "@/components/projects/project-card";
import { Plus, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function ProjectsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [{ data: projects }, { data: receiptRows }] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("receipts")
      .select("project_id")
      .eq("user_id", user.id),
  ]);

  const countsByProject = new Map<string, number>();
  (receiptRows ?? []).forEach((r) => {
    countsByProject.set(r.project_id, (countsByProject.get(r.project_id) ?? 0) + 1);
  });

  const projectsWithCounts = (projects ?? []).map((project) => ({
    ...project,
    receipt_count: countsByProject.get(project.id) ?? 0,
  }));

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            פרויקטים
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg leading-relaxed">
            נהל את הפרויקטים שלך ואת הקבלות בכל אחד
          </p>
        </div>
        <Link
          href="/projects/new"
          className={cn(
            buttonVariants(),
            "gap-2 shrink-0 rounded-xl btn-gradient shadow-lg shadow-primary/15 h-10 px-5"
          )}
        >
          <Plus className="h-4 w-4" />
          פרויקט חדש
        </Link>
      </div>

      {projectsWithCounts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/50 bg-gradient-to-br from-warm-amber/[0.04] to-transparent p-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-warm-amber/20 to-warm-amber/5 mb-4">
            <FolderOpen className="h-8 w-8 text-warm-amber" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">אין פרויקטים</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs leading-relaxed">
            צור את הפרויקט הראשון שלך כדי להתחיל לאסוף קבלות
          </p>
          <Link
            href="/projects/new"
            className={cn(
              buttonVariants(),
              "mt-6 rounded-xl btn-gradient shadow-lg shadow-primary/15"
            )}
          >
            צור פרויקט
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projectsWithCounts.map((project, i) => (
            <div
              key={project.id}
              className={cn(
                "animate-slide-up",
                `stagger-${(i % 8) + 1}`
              )}
            >
              <ProjectCard
                id={project.id}
                name={project.name}
                description={project.description}
                receiptCount={project.receipt_count}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
