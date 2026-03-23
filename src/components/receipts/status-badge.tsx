import { Badge } from "@/components/ui/badge";
import type { ReceiptStatus } from "@/lib/constants";

const statusConfig: Record<
  ReceiptStatus,
  { label: string; className: string; dotClassName: string }
> = {
  processing: {
    label: "בעיבוד",
    className: "bg-warm-amber/10 text-warm-amber border-warm-amber/20",
    dotClassName: "bg-warm-amber animate-pulse",
  },
  needs_review: {
    label: "לבדיקה",
    className: "bg-primary/10 text-primary border-primary/20",
    dotClassName: "bg-primary",
  },
  confirmed: {
    label: "מאושר",
    className: "bg-warm-green/10 text-warm-green border-warm-green/20",
    dotClassName: "bg-warm-green",
  },
  failed: {
    label: "נכשל",
    className: "bg-warm-rose/10 text-warm-rose border-warm-rose/20",
    dotClassName: "bg-warm-rose",
  },
};

export function StatusBadge({ status }: { status: ReceiptStatus }) {
  const config = statusConfig[status];
  if (!config) return null;

  return (
    <Badge variant="outline" className={`gap-1.5 ${config.className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dotClassName}`} />
      {config.label}
    </Badge>
  );
}
