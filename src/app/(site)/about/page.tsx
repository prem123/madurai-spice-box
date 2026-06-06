import type { Metadata } from "next";
import Image from "next/image";
import { Leaf, Heart, Hammer, ShieldCheck, Users, Sparkles } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { WhatsAppCTA } from "@/components/home/whatsapp-cta";

export const metadata: Metadata = {
  title: "About Us — Our Madurai Story",
  description:
    "Madurai Spice Box brings traditional, freshly ground masalas and health mixes from a Madurai kitchen to yours — homemade quality, no preservatives, full of trust.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: Hammer, title: "Freshly Ground", desc: "Roasted and stone-ground in small batches for maximum aroma." },
  { icon: Leaf, title: "100% Natural", desc: "No preservatives, no artificial colours, no fillers — ever." },
  { icon: Heart, title: "Homemade Quality", desc: "Traditional recipes passed down through generations." },
  { icon: ShieldCheck, title: "Built on Trust", desc: "We pack only after you order, so freshness is guaranteed." },
  { icon: Users, title: "Family Values", desc: "Made with the same care we cook for our own family." },
  { icon: Sparkles, title: "Authentic Madurai", desc: "The true taste of Tamil Nadu in every single pack." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="From a Madurai Kitchen to Yours"
        subtitle="Traditional recipes, homemade quality and authentic Madurai flavours — sealed into every pack with love."
      />

      <section className="section">
        <div className="container-tight grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] border border-brand-100 shadow-card">
              <Image
                src="/brand/og-image.webp"
                alt="Madurai Spice Box traditional spices"
                fill
                sizes="(max-width: 1024px) 90vw, 460px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="heading-lg">A taste worth protecting</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Madurai Spice Box was born from a simple longing — for masalas
                that taste exactly like the ones ground at home, in the heart of
                Madurai. Somewhere along the way, convenience replaced quality,
                and real flavour was lost to mass production and preservatives.
              </p>
              <p>
                We set out to change that. Using carefully selected ingredients
                and time-honoured Tamil recipes, we roast and grind every batch
                in small quantities. Nothing artificial goes in — just pure,
                honest spice.
              </p>
              <p>
                Because we pack only after you order, every pack reaches you
                fresh, fragrant and full of life. That&apos;s our promise:
                authentic Madurai flavour, homemade quality, and a brand you can
                trust with your family&apos;s health.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-beige/40">
        <div className="container-tight">
          <SectionHeading
            eyebrow="What We Stand For"
            title="The Madurai Spice Box Promise"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i % 3}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
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

      <WhatsAppCTA />
    </>
  );
}
