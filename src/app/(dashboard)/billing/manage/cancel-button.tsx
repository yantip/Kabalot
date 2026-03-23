"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cancelSubscription } from "@/actions/billing";
import { toast } from "sonner";

export function CancelSubscriptionButton() {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleCancel() {
    if (!confirming) {
      setConfirming(true);
      return;
    }

    setLoading(true);
    const result = await cancelSubscription();

    if (result.error) {
      toast.error(result.error);
      setLoading(false);
      setConfirming(false);
      return;
    }

    toast.success("המנוי בוטל בהצלחה");
    router.refresh();
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="destructive"
          size="sm"
          onClick={handleCancel}
          disabled={loading}
          className="rounded-xl"
        >
          {loading ? "מבטל..." : "אישור ביטול"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setConfirming(false)}
          disabled={loading}
          className="rounded-xl"
        >
          חזרה
        </Button>
      </div>
    );
  }

  return (
    <Button variant="outline" size="sm" onClick={handleCancel} className="rounded-xl">
      בטל מנוי
    </Button>
  );
}
