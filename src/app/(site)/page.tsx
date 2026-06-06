import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { BestSellers } from "@/components/home/best-sellers";
import { HealthyChoiceSection } from "@/components/home/healthy-choice";
import { Comparison } from "@/components/home/comparison";
import { Story } from "@/components/home/story";
import { Testimonials } from "@/components/home/testimonials";
import { FaqSection } from "@/components/home/faq-section";
import { WhatsAppCTA } from "@/components/home/whatsapp-cta";
import { faqs } from "@/lib/faq";

export default function HomePage() {
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
      <Hero />
      <TrustBar />
      <BestSellers />
      <HealthyChoiceSection />
      <Comparison />
      <Story />
      <Testimonials />
      <FaqSection />
      <WhatsAppCTA />
    </>
  );
}
