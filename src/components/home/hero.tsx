"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Leaf, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { enquiryLink } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient spice-texture">
      <div className="container-tight grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-8 lg:py-28">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.5, 0.3, 1] }}
          className="text-center lg:text-left"
        >
          <span className="eyebrow mx-auto lg:mx-0">
            <Leaf className="h-3.5 w-3.5" /> Freshly Ground in Madurai
          </span>
          <h1 className="heading-xl mt-5">
            Pure Traditional Masalas
            <span className="block text-spice">Made the Madurai Way</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-brand-700/80 lg:mx-0">
            Freshly ground. No preservatives. Homemade quality. Authentic South
            Indian spice powders &amp; traditional health mixes, delivered to
            your door.
          </p>

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/shop">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="whatsapp"
              size="lg"
              className="w-full sm:w-auto"
            >
              <a href={enquiryLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" /> Order on WhatsApp
              </a>
            </Button>
          </div>

          <div className="mt-7 flex items-center justify-center gap-5 text-sm text-brand-700 lg:justify-start">
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-spice text-spice" />
                ))}
              </div>
              <span className="font-semibold">4.9/5</span>
            </div>
            <span className="h-4 w-px bg-brand-200" />
            <span>
              <span className="font-semibold text-brand-800">2,000+</span> happy
              kitchens
            </span>
          </div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.5, 0.3, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/60 shadow-card">
            <Image
              src="/products/garam-masala.webp"
              alt="Madurai Spice Box freshly ground masala pack"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 520px"
              className="object-cover"
            />
          </div>

          {/* Floating cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -left-3 top-8 hidden rounded-2xl border border-brand-100 bg-white/90 px-4 py-3 shadow-card backdrop-blur sm:block"
          >
            <p className="text-xs text-muted-foreground">100% Natural</p>
            <p className="font-serif text-lg font-semibold text-brand-800">
              No Preservatives
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="absolute -right-3 bottom-8 hidden rounded-2xl border border-brand-100 bg-white/90 px-4 py-3 shadow-card backdrop-blur sm:block"
          >
            <p className="text-xs text-muted-foreground">Small Batch</p>
            <p className="font-serif text-lg font-semibold text-brand-800">
              Freshly Ground
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
