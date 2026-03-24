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
import { Receipt as ReceiptIcon, Search } from "lucide-react";
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
      <div className="surface p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
          <div className="relative max-w-xs flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="חפש לפי שם ספק..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10 bg-background rounded-xl"
            />
          </div>
          <Select value={status} onValueChange={(v) => v && setStatus(v)}>
            <SelectTrigger className="w-full sm:w-40 bg-background rounded-xl">
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
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/20 p-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
            <ReceiptIcon className="h-7 w-7 text-primary" />
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
        <div className="overflow-hidden surface">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 bg-muted/40 hover:bg-muted/40">
                {enabledFields.includes("vendor_name") && (
                  <TableHead className="font-semibold text-foreground">שם הספק</TableHead>
                )}
                {enabledFields.includes("total_amount") && (
                  <TableHead className="font-semibold text-foreground">סכום</TableHead>
                )}
                {enabledFields.includes("receipt_date") && (
                  <TableHead className="font-semibold text-foreground">תאריך</TableHead>
                )}
                {enabledFields.includes("currency") && (
                  <TableHead className="font-semibold text-foreground">מטבע</TableHead>
                )}
                {enabledFields.includes("vat_amount") && (
                  <TableHead className="font-semibold text-foreground">מע&quot;מ</TableHead>
                )}
                {enabledFields.includes("receipt_number") && (
                  <TableHead className="font-semibold text-foreground">מספר קבלה</TableHead>
                )}
                {enabledFields.includes("category") && (
                  <TableHead className="font-semibold text-foreground">קטגוריה</TableHead>
                )}
                {enabledFields.includes("notes") && (
                  <TableHead className="font-semibold text-foreground">הערות</TableHead>
                )}
                <TableHead className="font-semibold text-foreground">סטטוס</TableHead>
                <TableHead className="w-[1%]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((receipt) => (
                <TableRow
                  key={receipt.id}
                  className="border-border/40 transition-colors duration-150 hover:bg-primary/[0.03]"
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
                      className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-lg text-primary hover:text-primary")}
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
