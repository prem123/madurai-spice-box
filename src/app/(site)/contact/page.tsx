import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Facebook } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { enquiryLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Madurai Spice Box on WhatsApp, phone or email. We're here to help with orders, payments and any questions.",
  alternates: { canonical: "/contact" },
};

const details = [
  { icon: MapPin, label: "Address", value: siteConfig.address },
  { icon: Phone, label: "Phone / WhatsApp", value: siteConfig.phoneDisplay, href: `tel:+${siteConfig.whatsappNumber}` },
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Clock, label: "Order Hours", value: "Mon–Sat · 9:00 AM – 8:00 PM" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="We'd Love to Hear From You"
        title="Get in Touch"
        subtitle="The fastest way to reach us is WhatsApp — we usually reply within minutes during order hours."
      />

      <section className="section">
        <div className="container-tight grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* WhatsApp-first card */}
          <Reveal>
            <div className="rounded-3xl bg-warm-gradient p-8 text-cream shadow-card">
              <MessageCircle className="h-10 w-10" />
              <h2 className="mt-4 font-serif text-2xl font-semibold">
                Order or enquire on WhatsApp
              </h2>
              <p className="mt-2 text-cream/85">
                Browse, ask questions and place your order directly in chat. We
                share UPI, QR code, bank transfer or payment link to complete
                your order securely.
              </p>
              <Button
                asChild
                variant="whatsapp"
                size="lg"
                className="mt-6 bg-whatsapp hover:bg-whatsapp-dark"
              >
                <a href={enquiryLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" /> Chat with Us Now
                </a>
              </Button>
              <div className="mt-6 flex gap-3">
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/15 transition-colors hover:bg-cream/25"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/15 transition-colors hover:bg-cream/25"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {details.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-beige text-spice">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-spice">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="mt-1 block text-sm font-medium text-brand-800 hover:text-spice"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-brand-800">
                      {value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
