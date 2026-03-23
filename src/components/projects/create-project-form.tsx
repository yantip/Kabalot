"use client";

import { useState } from "react";
import { createProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldSelector } from "@/components/projects/field-selector";
import { RECEIPT_FIELDS, type ReceiptFieldKey } from "@/lib/constants";
import { Loader2 } from "lucide-react";

export function CreateProjectForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [enabledFields, setEnabledFields] = useState<ReceiptFieldKey[]>(
    Object.entries(RECEIPT_FIELDS)
      .filter(([, v]) => v.defaultEnabled)
      .map(([k]) => k as ReceiptFieldKey)
  );

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    enabledFields.forEach((f) => formData.append("enabledFields", f));

    const result = await createProject(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">שם הפרויקט</Label>
        <Input id="name" name="name" placeholder='לדוגמה: "הוצאות משרד"' required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">תיאור (אופציונלי)</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="תיאור קצר של הפרויקט"
          rows={2}
        />
      </div>

      <FieldSelector enabledFields={enabledFields} onChange={setEnabledFields} />

      <label className="flex items-center gap-2">
        <Checkbox name="isDefault" />
        <span className="text-sm">הגדר כפרויקט ברירת מחדל</span>
      </label>

      <Button type="submit" disabled={loading || enabledFields.length === 0} className="gap-2 rounded-xl btn-gradient shadow-lg shadow-primary/15">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "יוצר פרויקט..." : "צור פרויקט"}
      </Button>
    </form>
  );
}
