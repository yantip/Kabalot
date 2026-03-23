export const RECEIPT_FIELDS = {
  vendor_name: { key: "vendor_name", label: "שם הספק", defaultEnabled: true },
  total_amount: { key: "total_amount", label: "סכום כולל", defaultEnabled: true },
  receipt_date: { key: "receipt_date", label: "תאריך", defaultEnabled: true },
  currency: { key: "currency", label: "מטבע", defaultEnabled: true },
  vat_amount: { key: "vat_amount", label: 'מע"מ', defaultEnabled: false },
  receipt_number: { key: "receipt_number", label: "מספר קבלה", defaultEnabled: false },
  notes: { key: "notes", label: "הערות", defaultEnabled: false },
  category: { key: "category", label: "קטגוריה", defaultEnabled: false },
} as const;

export type ReceiptFieldKey = keyof typeof RECEIPT_FIELDS;

export const RECEIPT_FIELD_KEYS = Object.keys(RECEIPT_FIELDS) as ReceiptFieldKey[];

export const RECEIPT_STATUSES = {
  processing: { key: "processing", label: "בעיבוד", color: "bg-yellow-100 text-yellow-800" },
  needs_review: { key: "needs_review", label: "לבדיקה", color: "bg-blue-100 text-blue-800" },
  confirmed: { key: "confirmed", label: "מאושר", color: "bg-green-100 text-green-800" },
  failed: { key: "failed", label: "נכשל", color: "bg-red-100 text-red-800" },
} as const;

export type ReceiptStatus = keyof typeof RECEIPT_STATUSES;

export const CATEGORIES = [
  "מזון ומשקאות",
  "נסיעות",
  "ציוד משרדי",
  "שירותים מקצועיים",
  "תקשורת",
  "שכירות",
  "ביטוח",
  "אחר",
] as const;

export const CURRENCIES = ["ILS", "USD", "EUR", "GBP"] as const;

export const BOT_CONNECTION_TOKEN_EXPIRY_MINUTES = 10;
