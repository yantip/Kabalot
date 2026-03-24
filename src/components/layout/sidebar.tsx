"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderOpen,
  Settings,
  LogOut,
  CreditCard,
} from "lucide-react";
import { signOut } from "@/actions/auth";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "לוח בקרה", icon: LayoutDashboard },
  { href: "/projects", label: "פרויקטים", icon: FolderOpen },
  { href: "/billing", label: "תוכנית", icon: CreditCard },
  { href: "/settings", label: "הגדרות", icon: Settings },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop / tablet top nav */}
      <nav className="sticky top-0 z-40 w-full bg-nav shadow-lg shadow-black/10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <Image
              src="/imgs/Kabalot-logo.png"
              alt="קבלות"
              width={90}
              height={32}
              className="h-7 w-auto brightness-0 invert transition-opacity duration-200 group-hover:opacity-80"
              priority
            />
          </Link>

          <div className="hidden sm:flex items-center gap-1 rounded-xl bg-white/[0.08] p-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-nav-foreground/70 hover:text-nav-foreground hover:bg-white/[0.06]"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <form action={signOut}>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-nav-foreground/60 hover:text-nav-foreground hover:bg-white/[0.08] transition-colors duration-200"
              type="submit"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">התנתק</span>
            </Button>
          </form>
        </div>
      </nav>

      {/* Mobile bottom tab bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 sm:hidden">
        <nav className="flex items-center justify-around bg-nav/95 backdrop-blur-xl px-2 pb-[env(safe-area-inset-bottom)] pt-1 shadow-[0_-1px_12px_rgba(0,0,0,0.15)]">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-all duration-200 min-w-[60px]",
                  isActive
                    ? "text-primary"
                    : "text-nav-foreground/50 active:text-nav-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5")} />
                <span className="text-[10px] font-medium leading-none">{item.label}</span>
                {isActive && (
                  <span className="h-0.5 w-4 rounded-full bg-primary mt-0.5" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
