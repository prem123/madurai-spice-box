import { MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { enquiryLink } from "@/lib/whatsapp";

export function WhatsAppCTA() {
  return (
    <section className="section">
      <div className="container-tight">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-brand-800 px-6 py-14 text-center text-cream shadow-card sm:px-12 sm:py-16">
          {/* glow */}
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-spice/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-whatsapp/20 blur-3xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
              <ShieldCheck className="h-3.5 w-3.5" /> Order in 60 seconds
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl font-serif text-3xl font-semibold leading-tight sm:text-5xl">
              Ready to Order?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-cream/80 sm:text-lg">
              Browse our products and order directly through WhatsApp. Quick,
              personal and secure — pay only after we confirm your order.
            </p>
            <Button
              asChild
              variant="whatsapp"
              size="lg"
              className="mt-8 h-14 px-8 text-base"
            >
              <a href={enquiryLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" /> Open WhatsApp Catalog
              </a>
            </Button>
            <p className="mt-4 text-xs text-cream/60">
              UPI · QR Code · Bank Transfer · Payment Link
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
