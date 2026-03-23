"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { updateProject, deleteProject } from "@/actions/projects";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldSelector } from "@/components/projects/field-selector";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReceiptFieldKey } from "@/lib/constants";

export default function ProjectSettingsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [enabledFields, setEnabledFields] = useState<ReceiptFieldKey[]>([]);

  useEffect(() => {
    async function loadProject() {
      const supabase = createClient();
      const { data: project } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (project) {
        setName(project.name);
        setDescription(project.description ?? "");
        setIsDefault(project.is_default);
      }

      const { data: fields } = await supabase
        .from("project_field_settings")
        .select("*")
        .eq("project_id", id)
        .eq("is_enabled", true);

      if (fields) {
        setEnabledFields(fields.map((f) => f.field_name as ReceiptFieldKey));
      }

      setLoading(false);
    }
    loadProject();
  }, [id]);

  async function handleSave() {
    setSaving(true);
    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    if (isDefault) formData.set("isDefault", "on");
    enabledFields.forEach((f) => formData.append("enabledFields", f));

    const result = await updateProject(id, formData);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("הפרויקט עודכן בהצלחה");
      router.refresh();
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (!confirm("האם אתה בטוח שברצונך למחוק את הפרויקט? כל הקבלות ימחקו.")) return;
    await deleteProject(id);
  }

  if (loading) {
    return <div className="text-center text-muted-foreground py-12">טוען...</div>;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-slide-up">
      <div className="flex items-center gap-3">
        <Link
          href={`/projects/${id}`}
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5 rounded-xl")}
        >
          <ArrowRight className="h-4 w-4" />
          חזרה
        </Link>
        <div className="space-y-0.5">
          <h1 className="text-3xl font-bold tracking-tight">הגדרות פרויקט</h1>
          <p className="text-sm text-muted-foreground">עדכן את פרטי הפרויקט והשדות</p>
        </div>
      </div>

      <Card className="border-0 shadow-sm shadow-foreground/[0.03] border-r-[3px] border-r-primary/50 rounded-2xl">
        <CardHeader>
          <CardTitle>פרטים כלליים</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">שם הפרויקט</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">תיאור</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="rounded-xl"
            />
          </div>
          <label className="flex items-center gap-2">
            <Checkbox
              checked={isDefault}
              onCheckedChange={(checked) => setIsDefault(!!checked)}
            />
            <span className="text-sm">פרויקט ברירת מחדל</span>
          </label>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm shadow-foreground/[0.03] border-r-[3px] border-r-warm-amber/50 rounded-2xl">
        <CardHeader>
          <CardTitle>שדות</CardTitle>
          <CardDescription>בחר אילו שדות יוצגו בטבלת הקבלות</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldSelector enabledFields={enabledFields} onChange={setEnabledFields} />
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button onClick={handleSave} disabled={saving} className="rounded-xl btn-gradient shadow-lg shadow-primary/15">
          {saving ? "שומר..." : "שמור שינויים"}
        </Button>
        <Button variant="destructive" onClick={handleDelete} className="rounded-xl">
          מחק פרויקט
        </Button>
      </div>
    </div>
  );
}
