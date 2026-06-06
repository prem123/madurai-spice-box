import type { Metadata } from "next";
import { Heart, Dumbbell, Sprout, Leaf } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { getProductsByCategory } from "@/lib/store";
import { WhatsAppCTA } from "@/components/home/whatsapp-cta";

export const metadata: Metadata = {
  title: "Healthy Choice — Traditional Health Mixes",
  description:
    "Uzhundhu Kali Mix, Vendaya Kali Mix and a 31-ingredient Health Mix. Traditional Tamil nutrition for strength, digestion and everyday wellness.",
  alternates: { canonical: "/healthy-choice" },
};

const benefits = [
  { icon: Heart, title: "Supports Digestion", desc: "Gentle, traditional recipes kind to your gut." },
  { icon: Dumbbell, title: "Builds Strength", desc: "Protein-rich grains and pulses for energy." },
  { icon: Sprout, title: "Traditional Nutrition", desc: "Time-tested Tamil home wisdom." },
  { icon: Leaf, title: "Rich in Natural Ingredients", desc: "Millets, nuts and grains — nothing artificial." },
];

export default async function HealthyChoicePage() {
  const items = await getProductsByCategory("healthy-choice");
  return (
    <>
      <PageHero
        eyebrow="Healthy Choice Collection"
        title="Traditional Nutrition, Naturally"
        subtitle="Wholesome mixes rooted in Tamil tradition — made for strength, digestion and everyday wellness."
      />

      <section className="section">
        <div className="container-tight">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i}>
                <div className="flex h-full flex-col items-start gap-3 rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-beige text-spice">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="font-serif text-lg font-semibold text-brand-800">
                    {title}
                  </p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-4">
        <div className="container-tight">
          <SectionHeading
            eyebrow="The Range"
            title="Our Healthy Choice Products"
          />
          <div className="mt-10">
            <ProductGrid products={items} />
          </div>
        </div>
      </section>

      <WhatsAppCTA />
    </>
  );
}
