"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderOpen,
  Settings,
  LogOut,
  Receipt,
  CreditCard,
} from "lucide-react";
import { signOut } from "@/actions/auth";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "לוח בקרה", icon: LayoutDashboard },
  { href: "/projects", label: "פרויקטים", icon: FolderOpen },
  { href: "/billing", label: "תוכנית", icon: CreditCard },
  { href: "/settings", label: "הגדרות", icon: Settings },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop / tablet top nav */}
      <nav className="sticky top-0 z-40 w-full bg-background/70 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-warm-amber text-primary-foreground shadow-md shadow-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30">
              <Receipt className="h-4.5 w-4.5" />
            </div>
            <span className="text-lg font-bold tracking-tight">קבלות</span>
          </Link>

          <div className="hidden sm:flex items-center gap-0.5 rounded-2xl bg-muted/50 p-1 ring-1 ring-border/40">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-background text-foreground shadow-sm shadow-foreground/[0.04] ring-1 ring-border/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-gradient-to-l from-primary to-warm-amber" />
                  )}
                </Link>
              );
            })}
          </div>

          <form action={signOut}>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              type="submit"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">התנתק</span>
            </Button>
          </form>
        </div>
        <div className="h-px bg-gradient-to-l from-transparent via-border/60 to-transparent" />
      </nav>

      {/* Mobile bottom tab bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 sm:hidden">
        <div className="h-px bg-gradient-to-l from-transparent via-border/60 to-transparent" />
        <nav className="flex items-center justify-around bg-background/80 backdrop-blur-2xl px-2 pb-[env(safe-area-inset-bottom)] pt-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-all duration-200 min-w-[60px]",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground active:text-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "drop-shadow-[0_0_6px_oklch(0.44_0.16_270_/_0.4)]")} />
                <span className="text-[10px] font-medium leading-none">{item.label}</span>
                {isActive && (
                  <span className="h-0.5 w-4 rounded-full bg-gradient-to-l from-primary to-warm-amber mt-0.5" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
