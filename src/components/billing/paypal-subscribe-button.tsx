"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { activatePayPalSubscription } from "@/actions/billing";
import { Loader2, CheckCircle2 } from "lucide-react";

interface PayPalSubscribeButtonProps {
  planId: string;
}

export function PayPalSubscribeButton({ planId }: PayPalSubscribeButtonProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "processing" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const renderedRef = useRef(false);

  useEffect(() => {
    if (renderedRef.current) return;

    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    if (!clientId) {
      setStatus("error");
      setErrorMsg("PayPal is not configured");
      return;
    }

    // Check if script already loaded
    const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
    if (existingScript && (window as any).paypal) {
      renderButton();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&intent=subscription&currency=ILS`;
    script.async = true;
    script.onload = () => renderButton();
    script.onerror = () => {
      setStatus("error");
      setErrorMsg("שגיאה בטעינת PayPal");
    };
    document.body.appendChild(script);

    function renderButton() {
      if (!containerRef.current || renderedRef.current) return;
      renderedRef.current = true;

      const paypal = (window as any).paypal;
      if (!paypal?.Buttons) {
        setStatus("error");
        setErrorMsg("PayPal SDK failed to load");
        return;
      }

      paypal.Buttons({
        style: {
          shape: "rect",
          color: "gold",
          layout: "vertical",
          label: "subscribe",
          borderRadius: 12,
        },
        createSubscription: (_data: any, actions: any) => {
          return actions.subscription.create({ plan_id: planId });
        },
        onApprove: async (data: any) => {
          setStatus("processing");
          const result = await activatePayPalSubscription(data.subscriptionID);
          if (result.success) {
            setStatus("success");
            setTimeout(() => {
              router.push("/billing/manage");
              router.refresh();
            }, 1500);
          } else {
            setStatus("error");
            setErrorMsg(result.error ?? "שגיאה בהפעלת המנוי");
          }
        },
        onError: (err: any) => {
          console.error("PayPal error:", err);
          setStatus("error");
          setErrorMsg("שגיאה בתשלום. נסה שוב.");
        },
      }).render(containerRef.current).then(() => {
        setStatus("ready");
      });
    }

    return () => {
      // Cleanup not strictly needed since PayPal manages its own buttons
    };
  }, [planId, router]);

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-6 animate-scale-in">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <CheckCircle2 className="h-7 w-7 text-primary" />
        </div>
        <p className="font-bold text-primary">המנוי הופעל בהצלחה! 🎉</p>
        <p className="text-sm text-muted-foreground">מועבר לדף ניהול המנוי...</p>
      </div>
    );
  }

  if (status === "processing") {
    return (
      <div className="flex flex-col items-center gap-3 py-6">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium text-muted-foreground">מפעיל את המנוי...</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {status === "loading" && (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}
      <div ref={containerRef} className={status === "loading" ? "opacity-0 h-0 overflow-hidden" : ""} />
      {status === "error" && errorMsg && (
        <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3.5 text-sm text-destructive text-center">
          {errorMsg}
        </div>
      )}
    </div>
  );
}
