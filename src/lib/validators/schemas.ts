import { z } from "zod/v4";

export const loginSchema = z.object({
  email: z.email("כתובת אימייל לא תקינה"),
  password: z.string().min(6, "סיסמה חייבת להכיל לפחות 6 תווים"),
});

export const signupSchema = z.object({
  email: z.email("כתובת אימייל לא תקינה"),
  password: z.string().min(6, "סיסמה חייבת להכיל לפחות 6 תווים"),
  fullName: z.string().min(2, "שם חייב להכיל לפחות 2 תווים"),
});

export const createProjectSchema = z.object({
  name: z.string().min(1, "שם הפרויקט הוא שדה חובה"),
  description: z.string().optional(),
  enabledFields: z.array(z.string()).min(1, "יש לבחור לפחות שדה אחד"),
});

export const updateProjectSchema = z.object({
  name: z.string().min(1, "שם הפרויקט הוא שדה חובה").optional(),
  description: z.string().optional(),
  enabledFields: z.array(z.string()).min(1, "יש לבחור לפחות שדה אחד").optional(),
});

export const updateReceiptSchema = z.object({
  vendor_name: z.string().nullable().optional(),
  total_amount: z.number().nullable().optional(),
  receipt_date: z.string().nullable().optional(),
  currency: z.string().nullable().optional(),
  vat_amount: z.number().nullable().optional(),
  receipt_number: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  status: z.enum(["processing", "needs_review", "confirmed", "failed"]).optional(),
});

export const extractionResultSchema = z.object({
  vendor_name: z.string().nullable(),
  total_amount: z.number().nullable(),
  receipt_date: z.string().nullable(),
  currency: z.string().nullable(),
  vat_amount: z.number().nullable(),
  receipt_number: z.string().nullable(),
  notes: z.string().nullable(),
  raw_text_summary: z.string().nullable(),
  confidence: z.number().min(0).max(1),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type UpdateReceiptInput = z.infer<typeof updateReceiptSchema>;
export type ExtractionResult = z.infer<typeof extractionResultSchema>;
