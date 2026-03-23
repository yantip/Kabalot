import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SettingsLoading() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-fade-in">
      <div className="space-y-2.5">
        <Skeleton className="h-9 w-24 shimmer" />
        <Skeleton className="h-4 w-48 shimmer" />
      </div>

      <Card className="border-0 shadow-sm shadow-foreground/[0.03] border-r-[3px] border-r-primary/20 rounded-2xl">
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-16 shimmer" />
          <Skeleton className="h-3.5 w-28 shimmer" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center py-2">
            <Skeleton className="h-4 w-12 shimmer" />
            <Skeleton className="h-4 w-40 shimmer" />
          </div>
          <div className="flex justify-between items-center py-2">
            <Skeleton className="h-4 w-8 shimmer" />
            <Skeleton className="h-4 w-24 shimmer" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm shadow-foreground/[0.03] border-r-[3px] border-r-warm-amber/20 rounded-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl shimmer" />
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-28 shimmer" />
              <Skeleton className="h-3.5 w-20 shimmer" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20 shimmer" />
            <Skeleton className="h-4 w-24 shimmer" />
          </div>
          <Skeleton className="h-2 w-full rounded-full shimmer" />
          <Skeleton className="h-8 w-24 rounded-xl shimmer" />
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm shadow-foreground/[0.03] border-r-[3px] border-r-primary/20 rounded-2xl">
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-28 shimmer" />
          <Skeleton className="h-3.5 w-52 shimmer" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-36 rounded-xl shimmer" />
        </CardContent>
      </Card>
    </div>
  );
}
