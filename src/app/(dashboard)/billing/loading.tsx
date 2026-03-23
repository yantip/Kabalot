import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function BillingLoading() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 animate-fade-in">
      <div className="space-y-2.5">
        <Skeleton className="h-9 w-36 shimmer" />
        <Skeleton className="h-4 w-44 shimmer" />
      </div>

      <Card className="border-0 shadow-sm shadow-foreground/[0.03] border-r-[3px] border-r-primary/20 rounded-2xl">
        <CardContent className="pt-5 pb-5 space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24 shimmer" />
            <Skeleton className="h-4 w-28 shimmer" />
          </div>
          <Skeleton className="h-3 w-full rounded-full shimmer" />
        </CardContent>
      </Card>

      <div className="grid gap-5 sm:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="border-0 shadow-sm shadow-foreground/[0.03] rounded-2xl">
            <CardHeader className="pt-12 pb-3 space-y-3">
              <Skeleton className="h-12 w-12 rounded-xl shimmer" />
              <Skeleton className="h-5 w-20 shimmer" />
              <Skeleton className="h-3.5 w-40 shimmer" />
            </CardHeader>
            <CardContent className="space-y-5">
              <Skeleton className="h-10 w-20 shimmer" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="flex items-center gap-2.5">
                    <Skeleton className="h-5 w-5 rounded-full shimmer" />
                    <Skeleton className="h-4 w-32 shimmer" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
