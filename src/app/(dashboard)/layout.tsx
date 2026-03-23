import { Suspense } from "react";
import { Navbar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Skeleton } from "@/components/ui/skeleton";

function HeaderFallback() {
  return (
    <div className="pb-2">
      <Skeleton className="h-5 w-40 shimmer" />
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8 pb-24 sm:pb-8 space-y-6">
          <Suspense fallback={<HeaderFallback />}>
            <Header />
          </Suspense>
          {children}
        </div>
      </main>
    </div>
  );
}
