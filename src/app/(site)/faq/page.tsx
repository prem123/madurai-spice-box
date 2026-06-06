import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { FaqSection } from "@/components/home/faq-section";
import { WhatsAppCTA } from "@/components/home/whatsapp-cta";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ — Orders, Payment & Delivery",
  description:
    "Answers to common questions about ordering on WhatsApp, payment options, shipping times, freshness and returns at Madurai Spice Box.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero
        eyebrow="Help Centre"
        title="Frequently Asked Questions"
        subtitle="Got a question? We've answered the most common ones below. Still stuck? Just message us on WhatsApp."
      />
      <FaqSection />
      <WhatsAppCTA />
    </>
  );
}
