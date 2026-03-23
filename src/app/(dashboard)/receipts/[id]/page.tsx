"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import {
  updateReceipt,
  confirmReceipt,
  retryExtraction,
  deleteReceipt,
} from "@/actions/receipts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/receipts/status-badge";
import { CATEGORIES, CURRENCIES } from "@/lib/constants";
import { getCategories } from "@/actions/categories";
import type { Receipt } from "@/lib/supabase/types";
import type { ReceiptStatus } from "@/lib/constants";
import { toast } from "sonner";
import {
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Save,
  Trash2,
  AlertTriangle,
} from "lucide-react";

export default function ReceiptDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [retrying, setRetrying] = useState(false);

  const [vendorName, setVendorName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [receiptDate, setReceiptDate] = useState("");
  const [currency, setCurrency] = useState("");
  const [vatAmount, setVatAmount] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [categoryOptions, setCategoryOptions] = useState<string[]>([...CATEGORIES]);

  useEffect(() => {
    async function load() {
      const [supabase, userCategories] = await Promise.all([
        Promise.resolve(createClient()),
        getCategories(),
      ]);

      if (userCategories.length > 0) {
        setCategoryOptions(userCategories.map((c) => c.name));
      }

      const { data } = await supabase
        .from("receipts")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setReceipt(data as Receipt);
        setVendorName(data.vendor_name ?? "");
        setTotalAmount(data.total_amount?.toString() ?? "");
        setReceiptDate(data.receipt_date ?? "");
        setCurrency(data.currency ?? "ILS");
        setVatAmount(data.vat_amount?.toString() ?? "");
        setReceiptNumber(data.receipt_number ?? "");
        setCategory(data.category ?? "");
        setNotes(data.notes ?? "");
      }
      setLoading(false);
    }
    load();
  }, [id]);

  async function handleSave() {
    setSaving(true);
    const result = await updateReceipt(id, {
      vendor_name: vendorName || null,
      total_amount: totalAmount ? parseFloat(totalAmount) : null,
      receipt_date: receiptDate || null,
      currency: currency || null,
      vat_amount: vatAmount ? parseFloat(vatAmount) : null,
      receipt_number: receiptNumber || null,
      category: category || null,
      notes: notes || null,
    });

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("הקבלה עודכנה בהצלחה");
    }
    setSaving(false);
  }

  async function handleConfirm() {
    setSaving(true);
    await handleSave();
    const result = await confirmReceipt(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("הקבלה אושרה");
      setReceipt((prev) => (prev ? { ...prev, status: "confirmed" } : null));
    }
    setSaving(false);
  }

  async function handleRetry() {
    setRetrying(true);
    const result = await retryExtraction(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("החילוץ הסתיים בהצלחה");
      router.refresh();
      window.location.reload();
    }
    setRetrying(false);
  }

  async function handleDelete() {
    if (!confirm("האם אתה בטוח שברצונך למחוק את הקבלה?")) return;
    const result = await deleteReceipt(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("הקבלה נמחקה");
      router.push(result.projectId ? `/projects/${result.projectId}` : "/");
    }
  }

  if (loading) {
    return <div className="text-center text-muted-foreground py-16">טוען...</div>;
  }

  if (!receipt) {
    return <div className="text-center text-muted-foreground py-16">הקבלה לא נמצאה</div>;
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-1.5 rounded-xl"
          >
            <ArrowRight className="h-4 w-4" />
            חזרה
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">פרטי קבלה</h1>
          <StatusBadge status={receipt.status as ReceiptStatus} />
          {receipt.is_duplicate_suspect && (
            <Badge variant="outline" className="bg-warm-amber/10 text-warm-amber border-warm-amber/20 gap-1.5">
              <AlertTriangle className="h-3 w-3" />
              חשד לכפילות
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {receipt.status === "failed" && (
            <Button variant="outline" onClick={handleRetry} disabled={retrying} className="gap-1.5 rounded-xl">
              <RefreshCw className={`h-4 w-4 me-1 ${retrying ? "animate-spin" : ""}`} />
              נסה שוב
            </Button>
          )}
          <Button variant="destructive" size="sm" onClick={handleDelete} className="gap-1.5 rounded-xl">
            <Trash2 className="h-4 w-4" />
            מחק
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-sm shadow-foreground/[0.03] border-r-[3px] border-r-warm-amber/50 rounded-2xl">
          <CardHeader>
            <CardTitle>תמונת קבלה</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-hidden rounded-xl ring-1 ring-warm-amber/20 bg-muted/20 shadow-inner aspect-[3/4]">
              <Image
                src={receipt.image_url}
                alt="תמונת קבלה"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {receipt.extraction_confidence != null && (
              <p className="mt-3 text-xs text-muted-foreground">
                רמת ביטחון בחילוץ:{" "}
                <span className="font-bold text-foreground">{Math.round(Number(receipt.extraction_confidence) * 100)}%</span>
              </p>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-0 shadow-sm shadow-foreground/[0.03] border-r-[3px] border-r-primary/50 rounded-2xl">
            <CardHeader>
              <CardTitle>נתוני הקבלה</CardTitle>
              <CardDescription>
                ערוך את הנתונים שחולצו מהקבלה
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vendorName">שם הספק</Label>
                <Input
                  id="vendorName"
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalAmount">סכום כולל</Label>
                  <Input
                    id="totalAmount"
                    type="number"
                    step="0.01"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    dir="ltr"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">מטבע</Label>
                  <Select value={currency} onValueChange={(v) => v && setCurrency(v)}>
                    <SelectTrigger id="currency" className="rounded-xl">
                      <SelectValue placeholder="בחר מטבע" />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="receiptDate">תאריך</Label>
                  <Input
                    id="receiptDate"
                    type="date"
                    value={receiptDate}
                    onChange={(e) => setReceiptDate(e.target.value)}
                    dir="ltr"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vatAmount">מע&quot;מ</Label>
                  <Input
                    id="vatAmount"
                    type="number"
                    step="0.01"
                    value={vatAmount}
                    onChange={(e) => setVatAmount(e.target.value)}
                    dir="ltr"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="receiptNumber">מספר קבלה</Label>
                <Input
                  id="receiptNumber"
                  value={receiptNumber}
                  onChange={(e) => setReceiptNumber(e.target.value)}
                  dir="ltr"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">קטגוריה</Label>
                <Select value={category} onValueChange={(v) => v && setCategory(v)}>
                  <SelectTrigger id="category" className="rounded-xl">
                    <SelectValue placeholder="בחר קטגוריה" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">הערות</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="rounded-xl"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2.5">
            <Button onClick={handleSave} disabled={saving} variant="outline" className="gap-1.5 rounded-xl">
              <Save className="h-4 w-4" />
              {saving ? "שומר..." : "שמור"}
            </Button>
            {receipt.status !== "confirmed" && (
              <Button onClick={handleConfirm} disabled={saving} className="gap-1.5 rounded-xl btn-gradient shadow-lg shadow-primary/15">
                <CheckCircle2 className="h-4 w-4" />
                שמור ואשר
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
