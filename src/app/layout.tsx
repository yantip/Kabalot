import type { Metadata } from "next";
import { Rubik, Heebo } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="he" dir="rtl" className={`${rubik.variable} ${heebo.variable} h-full`}>
      <body className="min-h-full font-sans antialiased grain">
        {children}
        <Toaster position="bottom-left" dir="rtl" />
      </body>
    </html>
  );
}
