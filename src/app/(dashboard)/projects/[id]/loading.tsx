import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectDetailLoading() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-3.5">
          <Skeleton className="h-12 w-12 rounded-xl shrink-0 shimmer" />
          <div className="space-y-2.5">
            <Skeleton className="h-8 w-48 shimmer" />
            <Skeleton className="h-4 w-64 shimmer" />
          </div>
        </div>
        <div className="flex gap-2.5">
          <Skeleton className="h-9 w-28 rounded-xl shimmer" />
          <Skeleton className="h-9 w-24 rounded-xl shimmer" />
        </div>
      </div>

      <div className="rounded-2xl bg-muted/30 ring-1 ring-border/40 p-3.5">
        <div className="flex gap-3">
          <Skeleton className="h-9 w-full max-w-xs rounded-xl shimmer" />
          <Skeleton className="h-9 w-40 rounded-xl shimmer" />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl ring-1 ring-border/40 bg-card/50">
        <div className="bg-gradient-to-l from-muted/50 to-muted/30 px-4 py-3.5 flex gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-16 shimmer" />
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-6 px-4 py-4 border-b border-border/30 last:border-0">
            <Skeleton className="h-4 w-24 shimmer" />
            <Skeleton className="h-4 w-16 shimmer" />
            <Skeleton className="h-4 w-20 shimmer" />
            <Skeleton className="h-4 w-10 shimmer" />
            <Skeleton className="h-5 w-14 rounded-full shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}
