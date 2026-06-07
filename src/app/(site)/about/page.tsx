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
    "Meet Umarani, founder of Madurai Spice Box. Four decades of home cooking and traditional Tamil recipes, now sharing freshly ground masalas and health mixes — homemade quality, no preservatives.",
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

      {/* Founder's story */}
      <section className="section bg-beige/40">
        <div className="container-tight">
          <SectionHeading
            eyebrow="Meet the Founder"
            title="The Heart Behind Madurai Spice Box"
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-[360px_1fr] lg:items-start">
            <Reveal>
              <figure className="lg:sticky lg:top-24">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-brand-100 bg-white shadow-card">
                  <Image
                    src="/brand/founder-umarani.webp"
                    alt="Umarani, Founder of Madurai Spice Box"
                    fill
                    sizes="(max-width: 1024px) 80vw, 360px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-4 text-center">
                  <p className="font-serif text-xl font-semibold text-brand-800">
                    Umarani
                  </p>
                  <p className="text-sm font-medium text-spice">
                    Founder, Madurai Spice Box
                  </p>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={1}>
              <div className="rounded-[2rem] border border-brand-100 bg-white p-7 shadow-soft sm:p-10">
                <p className="font-serif text-2xl font-semibold text-spice">
                  Vanakkam,
                </p>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                  <p>
                    I am Umarani, and Madurai Spice Box is a reflection of my
                    lifelong passion for cooking.
                  </p>
                  <p>
                    At 60 years of age, I still find my greatest joy in the
                    kitchen. For more than four decades, I have spent countless
                    hours cooking, experimenting, learning, refining, and
                    perfecting recipes for my family. What started as a daily act
                    of love gradually became a treasure of recipes passed down
                    through tradition and perfected through experience.
                  </p>
                  <p>
                    In 2003, through an opportunity provided by the Government of
                    Tamil Nadu&apos;s Women Skill Development Initiative, I
                    completed a catering course in Madurai. This experience
                    strengthened my knowledge of food preparation and quality
                    while complementing the traditional cooking wisdom I had
                    gained over the years.
                  </p>
                  <p>
                    Every spice blend, masala, and health product from Madurai
                    Spice Box is made using the same recipes I prepare for my own
                    family. I strongly believe that food made with care for loved
                    ones is very different from food made for mass production.
                    That is why we prepare our products in small batches to
                    preserve freshness, consistency, and the authentic homemade
                    taste that has been part of our kitchen for generations.
                  </p>
                  <p>
                    My commitment is simple: no artificial flavors, no artificial
                    colors, and no preservatives. Only carefully selected
                    ingredients, traditional methods, and recipes perfected over a
                    lifetime.
                  </p>
                  <p>
                    Through Madurai Spice Box, my dream is to share healthy,
                    homemade, preservative-free foods with families everywhere
                    while preserving the authentic flavors and rich culinary
                    traditions of Madurai.
                  </p>
                  <p>
                    From my kitchen in Madurai to your family&apos;s table, every
                    pack carries a story of hard work, passion, tradition, and
                    trust.
                  </p>
                </div>
                <div className="mt-6 border-t border-brand-100 pt-5">
                  <p className="text-muted-foreground">With love,</p>
                  <p className="mt-1 font-serif text-2xl font-semibold text-brand-800">
                    Umarani
                  </p>
                  <p className="text-sm font-medium text-spice">
                    Founder, Madurai Spice Box
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-tight grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <Image
                src="/brand/logo.webp"
                alt="Madurai Spice Box logo"
                fill
                sizes="(max-width: 1024px) 90vw, 460px"
                className="object-contain drop-shadow-xl"
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
