import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const pingHebrew = localFont({
  src: "../../public/fonts/ping/PingHebrewVF.woff2",
  variable: "--font-ping",
  display: "swap",
});

export const metadata: Metadata = {
  title: "קבלות — ניהול קבלות חכם",
  description: "איסוף וניהול קבלות לפי פרויקט עם חילוץ נתונים אוטומטי",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${pingHebrew.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">
        {children}
        <Toaster position="bottom-left" dir="rtl" />
      </body>
    </html>
  );
}
