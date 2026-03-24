"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/** Horizontal connector for RTL row: flow moves toward the next step (left). */
export function FlowConnectorHorizontal({ className }: { className?: string }) {
  const id = useId();
  const gid = `flow-h-${id.replace(/:/g, "")}`;

  return (
    <div
      className={cn(
        "flex items-center justify-center pointer-events-none select-none",
        className
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 72 36"
        className="h-9 w-[4.5rem] sm:w-[5rem] text-primary max-w-full"
        fill="none"
      >
        <defs>
          <linearGradient id={gid} x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
            <stop offset="55%" stopColor="currentColor" stopOpacity="0.45" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <path
          d="M 68 18 H 14"
          stroke={`url(#${gid})`}
          strokeWidth="2"
          strokeLinecap="round"
          className="flow-connector-line"
        />
        <path
          d="M 18 11 L 8 18 L 18 25"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.9"
        />
        <circle cx="68" cy="18" r="3" fill="currentColor" fillOpacity="0.35" />
      </svg>
    </div>
  );
}

/** Vertical connector for stacked steps on small screens. */
export function FlowConnectorVertical({ className }: { className?: string }) {
  const id = useId();
  const gid = `flow-v-${id.replace(/:/g, "")}`;

  return (
    <div
      className={cn(
        "flex items-center justify-center py-1 pointer-events-none select-none",
        className
      )}
      aria-hidden
    >
      <svg viewBox="0 0 36 56" className="h-14 w-9 text-primary" fill="none">
        <defs>
          <linearGradient id={gid} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <path
          d="M 18 6 V 42"
          stroke={`url(#${gid})`}
          strokeWidth="2"
          strokeLinecap="round"
          className="flow-connector-line"
        />
        <path
          d="M 11 38 L 18 48 L 25 38"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.9"
        />
        <circle cx="18" cy="6" r="3" fill="currentColor" fillOpacity="0.35" />
      </svg>
    </div>
  );
}
