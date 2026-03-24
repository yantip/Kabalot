import { Badge } from "@/components/ui/badge";
import type { ReceiptStatus } from "@/lib/constants";

const statusConfig: Record<
  ReceiptStatus,
  { label: string; className: string; dotClassName: string }
> = {
  processing: {
    label: "בעיבוד",
    className: "bg-warning/10 text-warning border-warning/20",
    dotClassName: "bg-warning animate-pulse",
  },
  needs_review: {
    label: "לבדיקה",
    className: "bg-info/10 text-info border-info/20",
    dotClassName: "bg-info",
  },
  confirmed: {
    label: "מאושר",
    className: "bg-primary/10 text-primary border-primary/20",
    dotClassName: "bg-primary",
  },
  failed: {
    label: "נכשל",
    className: "bg-destructive/10 text-destructive border-destructive/20",
    dotClassName: "bg-destructive",
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
