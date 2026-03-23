"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RECEIPT_FIELDS, type ReceiptFieldKey } from "@/lib/constants";

interface FieldSelectorProps {
  enabledFields: ReceiptFieldKey[];
  onChange?: (fields: ReceiptFieldKey[]) => void;
  readOnly?: boolean;
}

export function FieldSelector({
  enabledFields,
  onChange,
  readOnly = false,
}: FieldSelectorProps) {
  const handleToggle = (fieldKey: ReceiptFieldKey, checked: boolean) => {
    if (readOnly || !onChange) return;
    if (checked) {
      onChange([...enabledFields, fieldKey]);
    } else {
      onChange(enabledFields.filter((f) => f !== fieldKey));
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">שדות לעקוב</Label>
      <div className="grid grid-cols-2 gap-2.5">
        {Object.entries(RECEIPT_FIELDS).map(([key, field]) => {
          const isChecked = enabledFields.includes(key as ReceiptFieldKey);
          return (
            <label
              key={key}
              className={`flex items-center gap-2.5 rounded-xl border p-3.5 cursor-pointer transition-all duration-200 ${
                isChecked
                  ? "border-primary/30 bg-primary/[0.04] shadow-sm"
                  : "border-border/60 hover:border-border hover:bg-muted/30"
              }`}
            >
              <Checkbox
                name="enabledFields"
                value={key}
                checked={isChecked}
                onCheckedChange={(checked) =>
                  handleToggle(key as ReceiptFieldKey, !!checked)
                }
                disabled={readOnly}
              />
              <span className="text-sm">{field.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
