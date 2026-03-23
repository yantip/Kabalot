export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  telegram_chat_id: number | null;
  default_project_id: string | null;
  pending_telegram_file_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

export type ProjectFieldSetting = {
  id: string;
  project_id: string;
  field_name: string;
  is_enabled: boolean;
  display_order: number;
};

export type BotConnection = {
  id: string;
  user_id: string;
  token: string;
  telegram_chat_id: number | null;
  status: "pending" | "active" | "expired" | "revoked";
  expires_at: string;
  connected_at: string | null;
  created_at: string;
};

export type Receipt = {
  id: string;
  project_id: string;
  user_id: string;
  image_url: string;
  vendor_name: string | null;
  total_amount: number | null;
  receipt_date: string | null;
  currency: string | null;
  vat_amount: number | null;
  receipt_number: string | null;
  category: string | null;
  notes: string | null;
  raw_text: string | null;
  status: "processing" | "needs_review" | "confirmed" | "failed";
  extraction_confidence: number | null;
  image_hash: string | null;
  is_duplicate_suspect: boolean;
  created_at: string;
  updated_at: string;
};

export type ExtractionLog = {
  id: string;
  receipt_id: string;
  raw_response: Record<string, unknown> | null;
  model_used: string | null;
  tokens_used: number | null;
  processing_time_ms: number | null;
  error: string | null;
  created_at: string;
};

export type Subscription = {
  id: string;
  user_id: string;
  plan_id: "free" | "pro";
  status: "active" | "cancelled" | "past_due";
  current_period_start: string | null;
  current_period_end: string | null;
  payment_provider: string | null;
  payment_provider_sub_id: string | null;
  created_at: string;
  updated_at: string;
};

export type StarPayment = {
  id: string;
  user_id: string;
  telegram_payment_charge_id: string;
  telegram_user_id: number;
  amount_stars: number;
  payload: Record<string, unknown>;
  refunded: boolean;
  created_at: string;
};

export type ProjectWithReceiptCount = Project & {
  receipt_count: number;
};
