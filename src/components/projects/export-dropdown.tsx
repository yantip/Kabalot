"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { Download, FileSpreadsheet, FileText, ChevronDown } from "lucide-react";

export function ExportDropdown({ projectId }: { projectId: string }) {
  function download(path: string) {
    window.open(path, "_blank");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "gap-2 h-9 pr-3 pl-2 shadow-sm shadow-foreground/[0.03]"
        )}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-warm-green/15">
          <Download className="h-3.5 w-3.5 text-warm-green" />
        </span>
        ייצוא
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="gap-2"
          onClick={() => download(`/api/export/${projectId}`)}
        >
          <FileText className="h-4 w-4 text-muted-foreground" />
          ייצוא CSV
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => download(`/api/export/${projectId}/excel`)}
        >
          <FileSpreadsheet className="h-4 w-4 text-warm-green" />
          ייצוא Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
