import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a0a] via-[#0d2b0d] to-[#152815]" />
        <div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-primary/[0.12] blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/[0.08] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>
      <div className="w-full max-w-[440px] animate-scale-in">{children}</div>
      <nav className="mt-8 flex items-center gap-4 text-xs text-white/30">
        <Link href="/terms" className="hover:text-white/60 transition-colors">תנאי שימוש</Link>
        <span>·</span>
        <Link href="/privacy" className="hover:text-white/60 transition-colors">פרטיות</Link>
        <span>·</span>
        <Link href="/refund" className="hover:text-white/60 transition-colors">החזרים</Link>
      </nav>
    </div>
  );
}
