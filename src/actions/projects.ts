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
    isDefault: formData.get("isDefault") === "on",
    enabledFields,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  if (parsed.data.isDefault) {
    await supabase
      .from("projects")
      .update({ is_default: false })
      .eq("user_id", user.id);
  }

  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      user_id: user.id,
      name: parsed.data.name,
      description: parsed.data.description ?? null,
      is_default: parsed.data.isDefault ?? false,
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

  if (parsed.data.isDefault) {
    await supabase
      .from("profiles")
      .update({ default_project_id: project.id })
      .eq("id", user.id);
  }

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
    isDefault: formData.get("isDefault") === "on",
    enabledFields: enabledFields.length > 0 ? enabledFields : undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  if (parsed.data.isDefault) {
    await supabase
      .from("projects")
      .update({ is_default: false })
      .eq("user_id", user.id);
  }

  const updates: Record<string, unknown> = {};
  if (parsed.data.name) updates.name = parsed.data.name;
  if (parsed.data.description !== undefined)
    updates.description = parsed.data.description;
  if (parsed.data.isDefault !== undefined)
    updates.is_default = parsed.data.isDefault;

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

  if (parsed.data.isDefault) {
    await supabase
      .from("profiles")
      .update({ default_project_id: projectId })
      .eq("id", user.id);
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

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId)
    .eq("user_id", user.id);

  if (error) return { error: "שגיאה במחיקת הפרויקט" };

  revalidatePath("/projects");
  redirect("/projects");
}
