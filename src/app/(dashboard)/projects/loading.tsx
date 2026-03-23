import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ProjectsLoading() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2.5">
          <Skeleton className="h-9 w-36 shimmer" />
          <Skeleton className="h-4 w-56 shimmer" />
        </div>
        <Skeleton className="h-10 w-32 rounded-xl shimmer" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border-0 shadow-sm shadow-foreground/[0.03] border-r-[3px] border-r-warm-amber/20">
            <CardContent className="pt-5 space-y-4">
              <div className="flex items-start gap-4">
                <Skeleton className="h-11 w-11 rounded-xl shimmer shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-28 shimmer" />
                  <Skeleton className="h-3.5 w-40 shimmer" />
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Skeleton className="h-7 w-7 rounded-lg shimmer" />
                <Skeleton className="h-4 w-20 shimmer" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
