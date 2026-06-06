"use client";

import { Toaster } from "sonner";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { FloatingWhatsApp } from "@/components/conversion/floating-whatsapp";
import { StickyMobileBar } from "@/components/conversion/sticky-mobile-bar";
import { SocialProof } from "@/components/conversion/social-proof";
import { ExitIntent } from "@/components/conversion/exit-intent";

export function Providers() {
  return (
    <>
      <CartDrawer />
      <FloatingWhatsApp />
      <StickyMobileBar />
      <SocialProof />
      <ExitIntent />
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          style: {
            borderRadius: "1rem",
            fontFamily: "var(--font-inter)",
          },
        }}
      />
    </>
  );
}
