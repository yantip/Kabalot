import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/layout/footer";
import { AuthDialog } from "@/components/auth/auth-dialog";
import {
  Send,
  Cpu,
  FileSpreadsheet,
  ArrowLeft,
  Check,
  MessageCircle,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import {
  FlowConnectorBetween,
  FlowConnectorVertical,
} from "@/components/landing/flow-connectors";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Nav ── */}
      <header className="sticky top-0 z-40 w-full bg-nav shadow-lg shadow-black/10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/imgs/Kabalot-logo.png"
              alt="קבלות"
              width={90}
              height={32}
              className="h-7 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/?auth=login"
              scroll={false}
              className="text-sm font-medium text-nav-foreground/70 hover:text-nav-foreground transition-colors px-3 py-2"
            >
              התחברות
            </Link>
            <Link
              href="/?auth=signup"
              scroll={false}
              className="text-sm font-bold bg-primary text-primary-foreground rounded-lg px-4 py-2 shadow-sm hover:bg-primary/90 transition-colors"
            >
              הרשמה חינם
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-transparent" />
          <div className="absolute top-[-30%] left-[10%] h-[600px] w-[600px] rounded-full bg-primary/[0.06] blur-[140px]" />
          <div className="absolute bottom-[-20%] right-[5%] h-[400px] w-[400px] rounded-full bg-primary/[0.04] blur-[120px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 sm:pt-24 pb-20 sm:pb-32 text-center">
          <ScrollReveal variant="fade-up-soft">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8">
              <Zap className="h-3.5 w-3.5" />
              ניהול קבלות חכם — בלי כאב ראש
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={60}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] max-w-3xl mx-auto">
              צלם קבלה.
              <br />
              <span className="text-primary">הנתונים מוכנים.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={120}>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              שלח תמונה של קבלה בטלגרם — הבינה המלאכותית תחלץ את כל הנתונים אוטומטית.
              ייצוא לאקסל בקליק אחד. פשוט ככה.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={180}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/?auth=signup"
                scroll={false}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-base rounded-xl px-8 py-3.5 shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30"
              >
                התחל בחינם
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-3.5"
              >
                איך זה עובד?
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={240}>
            <p className="mt-4 text-xs text-muted-foreground/60">ללא כרטיס אשראי · 5 קבלות בחודש בחינם</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 3‑Step Flow ── */}
      <section id="how-it-works" className="py-20 sm:py-28 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              שלושה צעדים. זה הכל.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              מהקבלה ביד — לגיליון אקסל מסודר. בלי הקלדות, בלי סריקות, בלי בזבוז זמן.
            </p>
          </ScrollReveal>

          <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:items-stretch lg:justify-center w-full max-w-7xl mx-auto overflow-visible">
            <ScrollReveal delay={0} className="flex-1 min-w-0 relative z-[1]">
              <div className="relative surface surface-hover p-8 text-center group h-full">
                <div className="absolute -top-4 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-md">
                  1
                </div>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Send className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">שלח תמונה בטלגרם</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  צלם את הקבלה עם הטלפון ושלח לבוט הטלגרם שלנו. זה ממש כמו לשלוח הודעה לחבר.
                </p>
                <div className="mt-6 rounded-xl bg-muted/50 p-4 border border-border/40">
                  <div className="flex items-center gap-3 text-right">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2AABEE]/10">
                      <MessageCircle className="h-4 w-4 text-[#2AABEE]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium">קבלות Bot</p>
                      <p className="text-xs text-muted-foreground mt-0.5">קיבלתי את הקבלה! מעבד...</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <FlowConnectorVertical className="lg:hidden" />
            <div className="hidden lg:flex relative z-[3] shrink-0 -mx-2 md:-mx-3 min-w-[3.25rem] max-w-[4.5rem] sm:min-w-[3.5rem] sm:max-w-[5rem] items-center justify-center self-center py-6">
              <FlowConnectorBetween variant="loop" />
            </div>

            <ScrollReveal delay={100} className="flex-1 min-w-0 relative z-[1]">
              <div className="relative surface surface-hover p-8 text-center group h-full">
                <div className="absolute -top-4 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-md">
                  2
                </div>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Cpu className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">AI מחלץ את הנתונים</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  הבינה המלאכותית מזהה את הספק, הסכום, התאריך, המע&quot;מ ושאר הפרטים — אוטומטית.
                </p>
                <div className="mt-6 rounded-xl bg-muted/50 p-4 border border-border/40 text-right space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-mono tabular-nums text-primary font-semibold">₪156.80</span>
                    <span className="text-muted-foreground">סכום</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-medium">שופרסל דיל</span>
                    <span className="text-muted-foreground">ספק</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-mono tabular-nums">24/03/2026</span>
                    <span className="text-muted-foreground">תאריך</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <FlowConnectorVertical className="lg:hidden" />
            <div className="hidden lg:flex relative z-[3] shrink-0 -mx-2 md:-mx-3 min-w-[3.25rem] max-w-[4.5rem] sm:min-w-[3.5rem] sm:max-w-[5rem] items-center justify-center self-center py-6">
              <FlowConnectorBetween variant="wave" />
            </div>

            <ScrollReveal delay={200} className="flex-1 min-w-0 relative z-[1]">
              <div className="relative surface surface-hover p-8 text-center group h-full">
                <div className="absolute -top-4 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-md">
                  3
                </div>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-6 group-hover:scale-105 transition-transform duration-300">
                  <FileSpreadsheet className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">ייצוא לאקסל בקליק</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  כל הקבלות מסודרות בטבלה. ייצוא לקובץ Excel או CSV — מוכן לרואה חשבון.
                </p>
                <div className="mt-6 rounded-xl bg-primary/[0.06] p-4 border border-primary/10">
                  <div className="flex items-center justify-center gap-2">
                    <FileSpreadsheet className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold text-primary">project_receipts.xlsx</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">12 קבלות · ₪3,240.50</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 sm:py-28 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              למה <span className="text-primary">קבלות</span>?
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Zap,
                title: "מהיר",
                desc: "חילוץ נתונים תוך שניות. בלי טפסים, בלי המתנה.",
              },
              {
                icon: ShieldCheck,
                title: "מאובטח",
                desc: "הנתונים שלך מוצפנים ושמורים. אנחנו לא חולקים עם אף אחד.",
              },
              {
                icon: MessageCircle,
                title: "דרך טלגרם",
                desc: "שלח קבלות מכל מקום — ישירות מהטלפון, בלי להוריד אפליקציה.",
              },
              {
                icon: FileSpreadsheet,
                title: "ייצוא חכם",
                desc: "Excel, CSV — הכל מוכן לרואה חשבון או להנהלת חשבונות.",
              },
            ].map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 75} variant="scale-in">
                <div className="surface p-6 space-y-3 h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              תמחור פשוט, בלי הפתעות
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              התחל בחינם. שדרג כשצריך.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
            <ScrollReveal delay={0}>
            <div className="surface p-8 space-y-6 h-full">
              <div>
                <h3 className="text-lg font-bold">חינמי</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">₪0</span>
                  <span className="text-sm text-muted-foreground">/ חודש</span>
                </div>
              </div>
              <ul className="space-y-3">
                {["5 קבלות בחודש", "עד 3 פרויקטים", "חילוץ נתונים אוטומטי", "ייצוא CSV"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/?auth=signup"
                scroll={false}
                className="block w-full text-center bg-muted text-foreground font-bold text-sm rounded-xl px-4 py-3 hover:bg-muted/80 transition-colors"
              >
                התחל בחינם
              </Link>
            </div>
            </ScrollReveal>

            <ScrollReveal delay={90}>
            <div className="relative surface ring-2 ring-primary/30 p-8 space-y-6 h-full">
              <div className="absolute -top-3 right-6 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-md">
                מומלץ
              </div>
              <div>
                <h3 className="text-lg font-bold">מקצועי</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">₪30</span>
                  <span className="text-sm text-muted-foreground">/ חודש</span>
                </div>
              </div>
              <ul className="space-y-3">
                {["500 קבלות בחודש", "פרויקטים ללא הגבלה", "חילוץ נתונים אוטומטי", "ייצוא CSV + Excel", "תמיכה בעדיפות"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/?auth=signup"
                scroll={false}
                className="block w-full text-center bg-primary text-primary-foreground font-bold text-sm rounded-xl px-4 py-3 shadow-md hover:bg-primary/90 transition-colors"
              >
                התחל עכשיו
              </Link>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal variant="fade-up-soft">
            <div className="relative surface overflow-hidden px-8 py-14 sm:py-20 sm:px-16 text-center">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/[0.06] via-transparent to-primary/[0.03]" />
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-xl mx-auto">
                מוכן להפסיק לבזבז זמן על קבלות?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-lg mx-auto">
                הצטרף לאלפי עסקים שכבר מנהלים קבלות בצורה חכמה.
              </p>
              <div className="mt-8">
                <Link
                  href="/?auth=signup"
                  scroll={false}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-base rounded-xl px-8 py-3.5 shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all duration-200"
                >
                  הרשמה חינם
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />

      <Suspense>
        <AuthDialog />
      </Suspense>
    </div>
  );
}
