import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SettingsLoading() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-fade-in">
      <div className="space-y-2.5">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-4 w-48" />
      </div>

      <Card className="border-0 surface rounded-2xl">
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-3.5 w-28" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center py-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex justify-between items-center py-2">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-24" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 surface rounded-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-3.5 w-20" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
          <Skeleton className="h-8 w-24 rounded-xl" />
        </CardContent>
      </Card>

      <Card className="border-0 surface rounded-2xl">
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-3.5 w-52" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-36 rounded-xl" />
        </CardContent>
      </Card>
    </div>
  );
}
