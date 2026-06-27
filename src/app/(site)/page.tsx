import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { BestSellers } from "@/components/home/best-sellers";
import { ReelsSection } from "@/components/home/reels-section";
import { HealthyChoiceSection } from "@/components/home/healthy-choice";
import { Comparison } from "@/components/home/comparison";
import { Story } from "@/components/home/story";
import { Testimonials } from "@/components/home/testimonials";
import { FaqSection } from "@/components/home/faq-section";
import { WhatsAppCTA } from "@/components/home/whatsapp-cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  // Note: FAQ structured data lives only on /faq to keep a single URL eligible
  // for FAQ rich results (avoids duplicate FAQPage across home and /faq).
  return (
    <>
      <Hero />
      <TrustBar />
      <ReelsSection />
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
