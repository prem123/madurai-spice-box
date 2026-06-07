import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function Story() {
  return (
    <section className="section bg-warm-gradient text-cream">
      <div className="container-tight grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[2rem] border border-cream/20 shadow-card">
            <Image
              src="/brand/logo.webp"
              alt="Madurai Spice Box logo"
              fill
              sizes="(max-width: 1024px) 80vw, 400px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={1}>
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
            Our Story
          </span>
          <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
            From a Madurai kitchen to yours
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-cream/85">
            <p>
              Madurai Spice Box began with a simple belief — that the masalas in
              your kitchen should taste exactly like the ones our grandmothers
              ground at home. No shortcuts, no preservatives, no compromise.
            </p>
            <p>
              Every batch is roasted and stone-ground in small quantities using
              traditional Madurai recipes and carefully selected ingredients. We
              pack only after your order, so what reaches you is always fresh,
              aromatic and full of life.
            </p>
            <p>
              It&apos;s more than spice — it&apos;s family, heritage, health and
              trust, sealed into every pack.
            </p>
          </div>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="mt-7 bg-cream text-brand-800 hover:bg-white"
          >
            <Link href="/about">
              Read Our Full Story <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
