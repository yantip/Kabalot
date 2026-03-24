"use client";

import { cn } from "@/lib/utils";

const dash = "6 5";

type Variant = "loop" | "wave";

/** Tip at (x,y), pointing left toward the next step. */
function ArrowHead({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M 0 0 L 9 -5.5 L 9 5.5 Z"
        fill="currentColor"
        fillOpacity={0.88}
      />
    </g>
  );
}

/** Desktop: whimsical dashed path between steps (RTL: flows left toward next card). */
export function FlowConnectorBetween({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  // Path runs right → left (RTL: from step N toward step N+1)
  const paths: Record<Variant, { d: string; arrow: { x: number; y: number } }> =
    {
      loop: {
        d: "M 208 46 C 188 46 178 46 168 40 C 156 32 148 32 142 42 C 136 52 128 48 118 46 C 98 46 88 18 78 46 C 68 72 52 46 38 46 C 28 46 22 46 14 46",
        arrow: { x: 14, y: 46 },
      },
      wave: {
        d: "M 206 44 C 172 44 158 72 132 46 C 106 20 88 72 62 46 C 44 28 28 44 16 44",
        arrow: { x: 16, y: 44 },
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
        viewBox="0 0 220 92"
        className="h-[5.5rem] w-[min(100%,13rem)] sm:w-[15rem] md:w-[17rem] text-primary overflow-visible"
        fill="none"
      >
        <path
          d={d}
          stroke="currentColor"
          strokeWidth="2.15"
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

/** Mobile: wavy vertical dashed connector (top → bottom). */
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
        viewBox="0 0 48 120"
        className="h-28 w-12 text-primary overflow-visible"
        fill="none"
      >
        <path
          d="M 24 8 C 24 32 38 48 24 60 C 10 72 24 88 24 112"
          stroke="currentColor"
          strokeWidth="2.15"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dash}
          fill="none"
          strokeOpacity={0.88}
          className="flow-connector-hand"
        />
        <path
          d="M 24 112 l -4 -10 h 8 z"
          fill="currentColor"
          fillOpacity={0.85}
        />
      </svg>
    </div>
  );
}
