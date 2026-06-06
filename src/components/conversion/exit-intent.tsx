"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Sparkles } from "lucide-react";
import { enquiryLink } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const KEY = "msb-exit-shown";

export function ExitIntent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY)) return;

    let armed = true;
    const trigger = () => {
      if (!armed) return;
      armed = false;
      sessionStorage.setItem(KEY, "1");
      setOpen(true);
    };

    // Desktop: mouse leaves viewport top
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    // Mobile / fallback: after 35s
    const timer = setTimeout(trigger, 35000);

    document.addEventListener("mouseout", onMouseOut);
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md overflow-hidden p-0">
        <div className="bg-warm-gradient px-6 py-8 text-center text-cream">
          <Sparkles className="mx-auto h-8 w-8" />
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em]">
            Wait — before you go
          </p>
        </div>
        <div className="px-6 pb-7 pt-5 text-center">
          <DialogTitle className="text-2xl">
            Get free delivery on your first order
          </DialogTitle>
          <DialogDescription className="mt-2 text-base">
            Message us on WhatsApp now and mention{" "}
            <span className="font-bold text-spice">FRESH10</span> for a special
            welcome offer on freshly ground masalas.
          </DialogDescription>
          <Button asChild variant="whatsapp" size="lg" className="mt-5 w-full">
            <a
              href={enquiryLink(
                `Hello ${siteConfig.name}, I'd like to claim the FRESH10 welcome offer. Please share your products and prices.`
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" /> Claim My Offer on WhatsApp
            </a>
          </Button>
          <button
            onClick={() => setOpen(false)}
            className="mt-3 text-xs text-muted-foreground underline-offset-4 hover:underline"
          >
            No thanks, I&apos;ll keep browsing
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
