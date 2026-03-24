"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
  /** Slightly different motion curve for hero vs sections */
  variant?: "fade-up" | "fade-up-soft" | "scale-in";
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  variant = "fade-up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "scroll-reveal",
        variant === "fade-up" && "scroll-reveal--fade-up",
        variant === "fade-up-soft" && "scroll-reveal--fade-up-soft",
        variant === "scale-in" && "scroll-reveal--scale-in",
        visible && "scroll-reveal--visible",
        className
      )}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
