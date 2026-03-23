"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  createProjectSchema,
  updateProjectSchema,
} from "@/lib/validators/schemas";
import { RECEIPT_FIELDS, RECEIPT_FIELD_KEYS } from "@/lib/constants";

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "לא מחובר" };

  const enabledFields = formData.getAll("enabledFields") as string[];

  const parsed = createProjectSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description") || undefined,
    enabledFields,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      user_id: user.id,
      name: parsed.data.name,
      description: parsed.data.description ?? null,
    })
    .select()
    .single();

  if (error || !project) {
    return { error: "שגיאה ביצירת הפרויקט" };
  }

  const fieldSettings = RECEIPT_FIELD_KEYS.map((key, index) => ({
    project_id: project.id,
    field_name: key,
    is_enabled: parsed.data.enabledFields.includes(key),
    display_order: index,
  }));

  await supabase.from("project_field_settings").insert(fieldSettings);

  redirect(`/projects/${project.id}`);
}

export async function updateProject(projectId: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "לא מחובר" };

  const enabledFields = formData.getAll("enabledFields") as string[];

  const parsed = updateProjectSchema.safeParse({
    name: formData.get("name") || undefined,
    description: formData.get("description") || undefined,
    enabledFields: enabledFields.length > 0 ? enabledFields : undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const updates: Record<string, unknown> = {};
  if (parsed.data.name) updates.name = parsed.data.name;
  if (parsed.data.description !== undefined)
    updates.description = parsed.data.description;

  if (Object.keys(updates).length > 0) {
    const { error } = await supabase
      .from("projects")
      .update(updates)
      .eq("id", projectId)
      .eq("user_id", user.id);

    if (error) return { error: "שגיאה בעדכון הפרויקט" };
  }

  if (parsed.data.enabledFields) {
    await supabase
      .from("project_field_settings")
      .delete()
      .eq("project_id", projectId);

    const fieldSettings = RECEIPT_FIELD_KEYS.map((key, index) => ({
      project_id: projectId,
      field_name: key,
      is_enabled: parsed.data.enabledFields!.includes(key),
      display_order: index,
    }));

    await supabase.from("project_field_settings").insert(fieldSettings);
  }

  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/projects");
  return { success: true };
}

export async function deleteProject(projectId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "לא מחובר" };

  const { data: receipts } = await supabase
    .from("receipts")
    .select("image_url")
    .eq("project_id", projectId)
    .eq("user_id", user.id);

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId)
    .eq("user_id", user.id);

  if (error) return { error: "שגיאה במחיקת הפרויקט" };

  if (receipts && receipts.length > 0) {
    const paths = receipts
      .map((r) => extractStoragePath(r.image_url))
      .filter((p): p is string => p !== null);
    if (paths.length > 0) {
      await supabase.storage.from("receipts").remove(paths);
    }
  }

  revalidatePath("/projects");
  redirect("/projects");
}

function extractStoragePath(imageUrl: string): string | null {
  const marker = "/storage/v1/object/public/receipts/";
  const idx = imageUrl.indexOf(marker);
  if (idx === -1) return null;
  return imageUrl.slice(idx + marker.length);
}
