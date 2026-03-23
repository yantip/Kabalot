"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/receipts/status-badge";
import { RECEIPT_STATUSES } from "@/lib/constants";
import { Receipt as ReceiptIcon } from "lucide-react";
import type { Receipt } from "@/lib/supabase/types";
import type { ReceiptStatus } from "@/lib/constants";

const STATUS_LABELS: Record<string, string> = {
  all: "כל הסטטוסים",
  ...Object.fromEntries(
    Object.entries(RECEIPT_STATUSES).map(([k, v]) => [k, v.label])
  ),
};

interface ReceiptTableProps {
  receipts: Receipt[];
  enabledFields: string[];
}

export function ReceiptTable({ receipts, enabledFields }: ReceiptTableProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    let result = receipts;

    if (status !== "all") {
      result = result.filter((r) => r.status === status);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (r) => r.vendor_name?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [receipts, search, status]);

  return (
    <>
      <div className="rounded-2xl bg-muted/30 ring-1 ring-border/40 p-3.5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
          <Input
            placeholder="חפש לפי שם ספק..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs bg-background/80 border-border/50 rounded-xl"
          />
          <Select value={status} onValueChange={(v) => v && setStatus(v)}>
            <SelectTrigger className="w-full sm:w-40 bg-background/80 border-border/50 rounded-xl">
              <SelectValue>
                {STATUS_LABELS[status] ?? "כל הסטטוסים"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">הכל</SelectItem>
              {Object.entries(RECEIPT_STATUSES).map(([key, val]) => (
                <SelectItem key={key} value={key}>
                  {val.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/50 bg-gradient-to-br from-warm-green/[0.04] to-transparent p-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-warm-green/20 to-warm-green/5 mb-4">
            <ReceiptIcon className="h-7 w-7 text-warm-green" />
          </div>
          <h3 className="text-lg font-bold tracking-tight">
            {receipts.length === 0 ? "אין קבלות" : "אין תוצאות"}
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground max-w-sm leading-relaxed">
            {receipts.length === 0
              ? "שלח תמונת קבלה דרך בוט הטלגרם כדי להתחיל"
              : "נסה לשנות את מילות החיפוש או הסינון"}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl ring-1 ring-border/40 bg-card/50 shadow-sm shadow-foreground/[0.03]">
          <Table>
            <TableHeader>
              <TableRow className="border-border/40 bg-gradient-to-l from-muted/50 to-muted/30 hover:bg-muted/40">
                {enabledFields.includes("vendor_name") && (
                  <TableHead className="font-semibold text-foreground/90">שם הספק</TableHead>
                )}
                {enabledFields.includes("total_amount") && (
                  <TableHead className="font-semibold text-foreground/90">סכום</TableHead>
                )}
                {enabledFields.includes("receipt_date") && (
                  <TableHead className="font-semibold text-foreground/90">תאריך</TableHead>
                )}
                {enabledFields.includes("currency") && (
                  <TableHead className="font-semibold text-foreground/90">מטבע</TableHead>
                )}
                {enabledFields.includes("vat_amount") && (
                  <TableHead className="font-semibold text-foreground/90">מע&quot;מ</TableHead>
                )}
                {enabledFields.includes("receipt_number") && (
                  <TableHead className="font-semibold text-foreground/90">מספר קבלה</TableHead>
                )}
                {enabledFields.includes("category") && (
                  <TableHead className="font-semibold text-foreground/90">קטגוריה</TableHead>
                )}
                {enabledFields.includes("notes") && (
                  <TableHead className="font-semibold text-foreground/90">הערות</TableHead>
                )}
                <TableHead className="font-semibold text-foreground/90">סטטוס</TableHead>
                <TableHead className="w-[1%]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((receipt) => (
                <TableRow
                  key={receipt.id}
                  className="border-border/30 transition-colors duration-150 hover:bg-warm-amber/[0.04]"
                >
                  {enabledFields.includes("vendor_name") && (
                    <TableCell className="font-medium">{receipt.vendor_name ?? "—"}</TableCell>
                  )}
                  {enabledFields.includes("total_amount") && (
                    <TableCell dir="ltr" className="text-end tabular-nums font-medium">
                      {receipt.total_amount != null
                        ? Number(receipt.total_amount).toFixed(2)
                        : "—"}
                    </TableCell>
                  )}
                  {enabledFields.includes("receipt_date") && (
                    <TableCell>
                      {receipt.receipt_date
                        ? new Date(receipt.receipt_date).toLocaleDateString("he-IL")
                        : "—"}
                    </TableCell>
                  )}
                  {enabledFields.includes("currency") && (
                    <TableCell>{receipt.currency ?? "—"}</TableCell>
                  )}
                  {enabledFields.includes("vat_amount") && (
                    <TableCell dir="ltr" className="text-end tabular-nums">
                      {receipt.vat_amount != null
                        ? Number(receipt.vat_amount).toFixed(2)
                        : "—"}
                    </TableCell>
                  )}
                  {enabledFields.includes("receipt_number") && (
                    <TableCell>{receipt.receipt_number ?? "—"}</TableCell>
                  )}
                  {enabledFields.includes("category") && (
                    <TableCell>{receipt.category ?? "—"}</TableCell>
                  )}
                  {enabledFields.includes("notes") && (
                    <TableCell className="max-w-[200px] truncate">
                      {receipt.notes ?? "—"}
                    </TableCell>
                  )}
                  <TableCell>
                    <StatusBadge status={receipt.status as ReceiptStatus} />
                  </TableCell>
                  <TableCell className="text-end">
                    <Link
                      href={`/receipts/${receipt.id}`}
                      className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-lg")}
                    >
                      ערוך
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
