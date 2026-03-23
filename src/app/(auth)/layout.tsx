export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-background to-warm-amber/[0.06]" />
        <div className="absolute top-[-30%] right-[-15%] h-[700px] w-[700px] rounded-full bg-primary/[0.06] blur-[120px] animate-mesh" />
        <div className="absolute bottom-[-25%] left-[-15%] h-[600px] w-[600px] rounded-full bg-warm-amber/[0.08] blur-[100px] animate-mesh" style={{ animationDelay: "-7s" }} />
        <div className="absolute top-[40%] left-[30%] h-[400px] w-[400px] rounded-full bg-warm-green/[0.04] blur-[80px] animate-mesh" style={{ animationDelay: "-14s" }} />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>
      <div className="w-full max-w-[440px] animate-scale-in">{children}</div>
    </div>
  );
}
