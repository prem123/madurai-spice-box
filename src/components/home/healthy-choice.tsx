import Image from "next/image";
import Link from "next/link";
import { Heart, Dumbbell, Sprout, Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

const benefits = [
  { icon: Heart, title: "Supports Digestion", desc: "Gentle, traditional recipes that are kind to your gut." },
  { icon: Dumbbell, title: "Builds Strength", desc: "Protein-rich grains and pulses for everyday energy." },
  { icon: Sprout, title: "Traditional Nutrition", desc: "Time-tested Tamil home remedies, made authentically." },
  { icon: Leaf, title: "Rich in Natural Ingredients", desc: "Millets, nuts and grains — nothing artificial." },
];

export function HealthyChoiceSection() {
  return (
    <section className="section bg-beige/40">
      <div className="container-tight grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <span className="eyebrow">Healthy Choice Collection</span>
          <h2 className="heading-lg mt-4">
            Traditional nutrition,
            <br /> made for modern life
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            Our Healthy Choice range — Uzhundhu Kali Mix, Vendaya Kali Mix and a
            31-ingredient Health Mix — brings the wisdom of Tamil kitchens into
            your daily routine.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-spice shadow-soft">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-brand-800">{title}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Button asChild size="lg" className="mt-8">
            <Link href="/healthy-choice">
              Explore Healthy Choice <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>

        <Reveal delay={1} className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-white/60 shadow-card">
            <Image
              src="/products/health-mix.webp"
              alt="Madurai Spice Box Health Mix with 31 natural ingredients"
              fill
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
