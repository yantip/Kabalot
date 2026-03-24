import Link from "next/link";
import Image from "next/image";

const legalLinks = [
  { href: "/terms", label: "תנאי שימוש" },
  { href: "/privacy", label: "מדיניות פרטיות" },
  { href: "/refund", label: "מדיניות החזרים" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/imgs/Kabalot-logo.png"
              alt="קבלות"
              width={80}
              height={28}
              className="h-6 w-auto opacity-70"
            />
          </div>

          <nav className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 pt-6 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground/70">
            &copy; {year} קבלות. כל הזכויות שמורות. |{" "}
            <a href="mailto:support@kabalot.app" className="hover:text-foreground transition-colors">
              support@kabalot.app
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
