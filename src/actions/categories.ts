"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { CATEGORIES } from "@/lib/constants";

export async function getCategories() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("user_categories")
    .select("*")
    .eq("user_id", user.id)
    .order("display_order");

  return (data ?? []) as Array<{
    id: string;
    name: string;
    display_order: number;
  }>;
}

export async function seedDefaultCategories() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "לא מחובר" };

  const rows = CATEGORIES.map((name, i) => ({
    user_id: user.id,
    name,
    display_order: i,
  }));

  const { error } = await supabase.from("user_categories").insert(rows);
  if (error) return { error: "שגיאה ביצירת קטגוריות ברירת מחדל" };

  revalidatePath("/settings");
  return { success: true };
}

export async function addCategory(name: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "לא מחובר" };

  const trimmed = name.trim();
  if (!trimmed) return { error: "שם הקטגוריה לא יכול להיות ריק" };

  const { data: existing } = await supabase
    .from("user_categories")
    .select("id")
    .eq("user_id", user.id)
    .order("display_order", { ascending: false })
    .limit(1);

  const nextOrder = existing && existing.length > 0
    ? (existing[0] as { id: string }).display_order ?? 0 + 1
    : 0;

  const { error } = await supabase.from("user_categories").insert({
    user_id: user.id,
    name: trimmed,
    display_order: nextOrder,
  });

  if (error) {
    if (error.code === "23505") return { error: "קטגוריה עם שם זה כבר קיימת" };
    return { error: "שגיאה ביצירת הקטגוריה" };
  }

  revalidatePath("/settings");
  return { success: true };
}

export async function updateCategory(categoryId: string, name: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "לא מחובר" };

  const trimmed = name.trim();
  if (!trimmed) return { error: "שם הקטגוריה לא יכול להיות ריק" };

  const { error } = await supabase
    .from("user_categories")
    .update({ name: trimmed })
    .eq("id", categoryId)
    .eq("user_id", user.id);

  if (error) {
    if (error.code === "23505") return { error: "קטגוריה עם שם זה כבר קיימת" };
    return { error: "שגיאה בעדכון הקטגוריה" };
  }

  revalidatePath("/settings");
  return { success: true };
}

export async function deleteCategory(categoryId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "לא מחובר" };

  const { error } = await supabase
    .from("user_categories")
    .delete()
    .eq("id", categoryId)
    .eq("user_id", user.id);

  if (error) return { error: "שגיאה במחיקת הקטגוריה" };

  revalidatePath("/settings");
  return { success: true };
}
