"use client";

import { useState } from "react";
import { generateBotToken, disconnectTelegram } from "@/actions/telegram";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle, ExternalLink, Unplug, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface ConnectTelegramProps {
  isConnected: boolean;
}

export function ConnectTelegram({ isConnected }: ConnectTelegramProps) {
  const [deepLink, setDeepLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerateLink() {
    setLoading(true);
    const result = await generateBotToken();
    if (result.error) {
      toast.error(result.error);
    } else if (result.deepLink) {
      setDeepLink(result.deepLink);
    }
    setLoading(false);
  }

  async function handleDisconnect() {
    if (!confirm("האם אתה בטוח שברצונך לנתק את חשבון הטלגרם?")) return;
    const result = await disconnectTelegram();
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("הטלגרם נותק בהצלחה");
      setDeepLink(null);
    }
  }

  if (isConnected) {
    return (
      <Card className="border-0 surface rounded-2xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>טלגרם מחובר</CardTitle>
              <CardDescription>חשבון הטלגרם שלך מחובר לבוט</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            שלח תמונת קבלה לבוט בטלגרם והנתונים יחולצו אוטומטית.
          </p>
          <Button variant="outline" onClick={handleDisconnect} className="gap-1.5 rounded-xl">
            <Unplug className="h-4 w-4" />
            נתק טלגרם
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 surface rounded-2xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <MessageCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>חיבור טלגרם</CardTitle>
            <CardDescription>
              חבר את חשבון הטלגרם שלך כדי לשלוח קבלות דרך הבוט
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!deepLink ? (
          <Button onClick={handleGenerateLink} disabled={loading} className="gap-2 rounded-xl shadow-md">
            {loading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <MessageCircle className="h-4 w-4" />
            )}
            צור קישור חיבור
          </Button>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              לחץ על הכפתור כדי לפתוח את הבוט בטלגרם ולחבר את החשבון.
              <br />
              הקישור תקף ל-10 דקות.
            </p>
            <div className="flex gap-2">
              <a href={deepLink} target="_blank" rel="noopener noreferrer" className={buttonVariants({ className: "rounded-xl shadow-md" })}>
                <ExternalLink className="h-4 w-4 me-2" />
                פתח בטלגרם
              </a>
              <Button variant="outline" onClick={handleGenerateLink} className="gap-1.5 rounded-xl">
                <RefreshCw className="h-4 w-4" />
                קישור חדש
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
