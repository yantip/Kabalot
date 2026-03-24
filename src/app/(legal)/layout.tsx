import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/layout/footer";
import { ArrowRight } from "lucide-react";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 w-full bg-nav shadow-lg shadow-black/10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/imgs/Kabalot-logo.png"
              alt="קבלות"
              width={90}
              height={32}
              className="h-7 w-auto transition-opacity duration-200 group-hover:opacity-80"
            />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-nav-foreground/70 hover:text-nav-foreground transition-colors"
          >
            חזרה לאפליקציה
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-16">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
