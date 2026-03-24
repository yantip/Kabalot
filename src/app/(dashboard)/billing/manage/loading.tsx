import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ManageBillingLoading() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-xl" />
        <div className="space-y-1.5">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      <Card className="border-0 surface rounded-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="space-y-1.5">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-3.5 w-20" />
              </div>
            </div>
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
          <Skeleton className="h-8 w-28 rounded-xl" />
        </CardContent>
      </Card>

      <Card className="border-0 surface rounded-2xl">
        <CardHeader className="pb-3 space-y-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-3.5 w-48" />
        </CardHeader>
        <CardContent>
          <div className="rounded-xl ring-1 ring-border/50 p-10 flex flex-col items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-2xl" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3.5 w-44" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
