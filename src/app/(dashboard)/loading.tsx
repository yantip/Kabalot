import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {/* Hero card */}
        <Card className="col-span-2 border-0 shadow-sm shadow-foreground/[0.03] border-r-[3px] border-r-warm-amber/30">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between mb-3">
              <Skeleton className="h-5 w-24 shimmer" />
              <Skeleton className="h-11 w-11 rounded-xl shimmer" />
            </div>
            <Skeleton className="h-12 w-20 shimmer" />
          </CardContent>
        </Card>
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="border-0 shadow-sm shadow-foreground/[0.03] border-r-[3px] border-r-muted">
            <CardContent className="pt-5">
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-4 w-20 shimmer" />
                <Skeleton className="h-9 w-9 rounded-xl shimmer" />
              </div>
              <Skeleton className="h-9 w-16 shimmer" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-2xl ring-1 ring-border/40 p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <Skeleton className="h-10 w-10 rounded-xl shimmer" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-44 shimmer" />
              <Skeleton className="h-2 w-52 rounded-full shimmer" />
            </div>
          </div>
          <Skeleton className="h-8 w-16 rounded-xl shimmer" />
        </div>
      </div>
    </div>
  );
}
