"use client";

import { cn } from "@/lib/utils";

const dash = "6 5";

type Variant = "loop" | "wave";

/** Tip at (x,y), pointing left toward the next step. */
function ArrowHead({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M 0 0 L 8 -4.5 L 8 4.5 Z"
        fill="currentColor"
        fillOpacity={0.88}
      />
    </g>
  );
}

/** Desktop: compact dashed path between steps (RTL: right → left). */
export function FlowConnectorBetween({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  // Shorter horizontal span (narrower gap = wider cards)
  const paths: Record<Variant, { d: string; arrow: { x: number; y: number } }> =
    {
      loop: {
        d: "M 118 40 C 102 40 96 34 88 40 C 80 46 72 40 64 40 C 54 40 48 26 42 40 C 36 54 28 40 20 40 L 14 40",
        arrow: { x: 14, y: 40 },
      },
      wave: {
        d: "M 116 40 C 96 40 84 52 72 40 C 60 28 48 40 28 40 L 18 40",
        arrow: { x: 18, y: 40 },
      },
    };

  const { d, arrow } = paths[variant];

  return (
    <div
      className={cn(
        "pointer-events-none select-none flex items-center justify-center",
        className
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 128 72"
        className="h-14 w-[7rem] max-w-[7.5rem] sm:w-[7.75rem] text-primary overflow-visible"
        fill="none"
      >
        <path
          d={d}
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dash}
          fill="none"
          strokeOpacity={0.88}
          className="flow-connector-hand"
        />
        <ArrowHead x={arrow.x} y={arrow.y} />
      </svg>
    </div>
  );
}

/** Mobile: compact vertical wavy connector. */
export function FlowConnectorVertical({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center py-2 pointer-events-none select-none",
        className
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 40 96"
        className="h-24 w-10 text-primary overflow-visible"
        fill="none"
      >
        <path
          d="M 20 6 C 20 28 32 40 20 50 C 8 60 20 72 20 92"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dash}
          fill="none"
          strokeOpacity={0.88}
          className="flow-connector-hand"
        />
        <path
          d="M 20 92 l -3.5 -9 h 7 z"
          fill="currentColor"
          fillOpacity={0.85}
        />
      </svg>
    </div>
  );
}
