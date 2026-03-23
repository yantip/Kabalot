"use client";

import { useState } from "react";
import {
  addCategory,
  updateCategory,
  deleteCategory,
  seedDefaultCategories,
} from "@/actions/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Pencil, Trash2, Check, X, Loader2, Tag } from "lucide-react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  display_order: number;
}

interface ManageCategoriesProps {
  categories: Category[];
}

export function ManageCategories({ categories: initial }: ManageCategoriesProps) {
  const [categories, setCategories] = useState(initial);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [seeding, setSeeding] = useState(false);

  async function handleAdd() {
    if (!newName.trim()) return;
    setAdding(true);
    const result = await addCategory(newName);
    if (result.error) {
      toast.error(result.error);
    } else {
      setCategories((prev) => [...prev, { id: crypto.randomUUID(), name: newName.trim(), display_order: prev.length }]);
      setNewName("");
      toast.success("קטגוריה נוספה");
    }
    setAdding(false);
  }

  async function handleUpdate(id: string) {
    if (!editName.trim()) return;
    const result = await updateCategory(id, editName);
    if (result.error) {
      toast.error(result.error);
    } else {
      setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, name: editName.trim() } : c)));
      setEditingId(null);
      toast.success("קטגוריה עודכנה");
    }
  }

  async function handleDelete(id: string) {
    const result = await deleteCategory(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.success("קטגוריה נמחקה");
    }
  }

  async function handleSeedDefaults() {
    setSeeding(true);
    const result = await seedDefaultCategories();
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("קטגוריות ברירת מחדל נוצרו");
      window.location.reload();
    }
    setSeeding(false);
  }

  return (
    <Card className="border-0 shadow-sm shadow-foreground/[0.03] border-r-[3px] border-r-warm-rose/40 rounded-2xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-warm-rose/15 to-warm-rose/5">
            <Tag className="h-5 w-5 text-warm-rose" />
          </div>
          <div>
            <CardTitle>קטגוריות</CardTitle>
            <CardDescription>נהל את הקטגוריות לסיווג קבלות</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.length === 0 && (
          <div className="text-center py-4 space-y-3">
            <p className="text-sm text-muted-foreground">אין קטגוריות עדיין</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSeedDefaults}
              disabled={seeding}
              className="gap-2 rounded-xl"
            >
              {seeding && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              הוסף קטגוריות ברירת מחדל
            </Button>
          </div>
        )}

        {categories.length > 0 && (
          <div className="space-y-1.5">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center gap-2 rounded-xl px-3 py-2 bg-muted/30 ring-1 ring-border/30"
              >
                {editingId === cat.id ? (
                  <>
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleUpdate(cat.id)}
                      className="h-8 flex-1 rounded-lg text-sm"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleUpdate(cat.id)}
                      className="shrink-0"
                    >
                      <Check className="h-3.5 w-3.5 text-warm-green" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => setEditingId(null)}
                      className="shrink-0"
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 text-sm font-medium">{cat.name}</span>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => {
                        setEditingId(cat.id);
                        setEditName(cat.name);
                      }}
                      className="shrink-0 opacity-60 hover:opacity-100"
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleDelete(cat.id)}
                      className="shrink-0 opacity-60 hover:opacity-100 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="שם קטגוריה חדשה..."
            className="rounded-xl"
          />
          <Button
            onClick={handleAdd}
            disabled={adding || !newName.trim()}
            size="sm"
            className="gap-1.5 shrink-0 rounded-xl"
          >
            {adding ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
            הוסף
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
