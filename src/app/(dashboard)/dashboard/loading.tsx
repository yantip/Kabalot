import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border-0 surface">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-10 rounded-xl" />
              </div>
              <Skeleton className="h-10 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="surface p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-2 w-52 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-8 w-16 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
