import Link from "next/link";

type LegalPageShellProps = {
  title: string;
  effectiveDate: string;
  lastUpdated: string;
  children: React.ReactNode;
};

export function LegalPageShell({
  title,
  effectiveDate,
  lastUpdated,
  children,
}: LegalPageShellProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="rounded-2xl border bg-card p-6 shadow-sm sm:p-10">
          <header className="mb-8 space-y-3 border-b pb-6">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
            <p className="text-sm text-muted-foreground">Effective date: {effectiveDate}</p>
            <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          </header>

          <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-p:text-foreground/90 prose-li:text-foreground/90 sm:prose-base">
            {children}
          </div>

          <footer className="mt-10 border-t pt-6 text-sm text-muted-foreground">
            <p className="mb-3">
              Questions about these policies can be sent to{" "}
              <a href="mailto:support@kabalot.app" className="underline underline-offset-4">
                support@kabalot.app
              </a>
              .
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/terms-of-service" className="underline underline-offset-4">
                Terms of Service
              </Link>
              <Link href="/privacy-policy" className="underline underline-offset-4">
                Privacy Policy
              </Link>
              <Link href="/refund-policy" className="underline underline-offset-4">
                Refund Policy
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}
