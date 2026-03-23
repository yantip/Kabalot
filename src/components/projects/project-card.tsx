"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FolderOpen, Receipt, MoreHorizontal, Settings, Trash2 } from "lucide-react";
import { deleteProject } from "@/actions/projects";
import { toast } from "sonner";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string | null;
  receiptCount: number;
}

export function ProjectCard({
  id,
  name,
  description,
  receiptCount,
}: ProjectCardProps) {
  const router = useRouter();

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("האם אתה בטוח שברצונך למחוק את הפרויקט? כל הקבלות ימחקו.")) return;
    const result = await deleteProject(id);
    if (result?.error) {
      toast.error(result.error);
    }
  }

  return (
    <div className="group relative">
      <Link href={`/projects/${id}`}>
        <Card className="h-full cursor-pointer border-0 border-r-[3px] border-r-warm-amber/60 ring-0 shadow-sm shadow-foreground/[0.03] card-glow overflow-hidden transition-all duration-300">
          <CardHeader className="flex flex-row items-start gap-4 px-5 pt-5 pb-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-warm-amber/20 to-warm-amber/5">
              <FolderOpen className="h-5 w-5 text-warm-amber" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 pe-8">
                <CardTitle className="truncate text-base font-bold">{name}</CardTitle>
              </div>
              {description && (
                <CardDescription className="mt-2 truncate">
                  {description}
                </CardDescription>
              )}
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-5">
            <div className="flex items-center gap-2.5 text-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-warm-amber/10">
                <Receipt className="h-3.5 w-3.5 text-warm-amber" />
              </div>
              <span>
                <span className="tabular-nums font-semibold text-warm-amber">
                  {receiptCount}
                </span>{" "}
                <span className="text-muted-foreground">קבלות</span>
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>

      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon-xs" className="bg-background/80 backdrop-blur-sm shadow-sm rounded-lg" />
            }
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="bottom">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/projects/${id}/settings`);
              }}
            >
              <Settings className="h-3.5 w-3.5 me-2" />
              הגדרות
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5 me-2" />
              מחק פרויקט
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
