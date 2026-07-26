"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { enquiryLink } from "@/lib/whatsapp";

/**
 * Two crops of the same artwork, chosen by breakpoint.
 *
 * The banner is 2.4:1 with its headline baked in, which stops being legible
 * below ~640px wide. Under `lg` we serve a portrait recomposition instead —
 * temple and message stacked above the product lineup — so nothing is lost on
 * a phone, it is just reflowed. From `lg` up, the original wide banner.
 *
 * Both images stay mounted and are toggled with CSS, so each one's `sizes`
 * collapses to 1px at the breakpoint where it is hidden — that keeps the
 * browser from preloading the copy it will not paint. The headline lives in
 * the artwork at every size, so the real <h1> is sr-only throughout.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient spice-texture">
      <div className="container-tight py-10 sm:py-14 lg:py-16">
        <h1 className="sr-only">
          From the Heart of Madurai — Authentic South Indian Spices &amp; Health
          Mixes
        </h1>
        <p className="sr-only">Where tradition meets every meal.</p>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.21, 0.5, 0.3, 1] }}
        >
          {/* Mobile / tablet: temple and message above, product lineup below */}
          <div className="mx-auto max-w-sm overflow-hidden rounded-[1.5rem] border border-white/60 shadow-card lg:hidden">
            <Image
              src="/brand/hero-banner-mobile.webp"
              alt="From the Heart of Madurai — the Meenakshi Amman temple above the Madurai Spice Box range of sambar, kuzhambu, red chilli, coriander, turmeric, curry leaves and moringa powders with health mix and ready mixes"
              width={910}
              height={1536}
              priority
              sizes="(min-width: 1024px) 1px, (min-width: 640px) 384px, 100vw"
              className="h-auto w-full"
            />
          </div>

          {/* Desktop: the original wide banner */}
          <div className="hidden overflow-hidden rounded-[2rem] border border-white/60 shadow-card lg:block">
            <Image
              src="/brand/hero-banner.webp"
              alt="From the Heart of Madurai — authentic South Indian spice powders and traditional health mixes from Madurai Spice Box, pictured with the Meenakshi Amman temple"
              width={1600}
              height={666}
              priority
              sizes="(min-width: 1024px) 1152px, 1px"
              className="h-auto w-full"
            />
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.5, 0.3, 1] }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.21, 0.5, 0.3, 1] }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-brand-700"
        >
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-spice text-spice" />
              ))}
            </div>
            <span className="font-semibold">4.9/5</span>
          </div>
          <span className="hidden h-4 w-px bg-brand-200 sm:block" />
          <span>
            <span className="font-semibold text-brand-800">2,000+</span> happy
            kitchens
          </span>
          <span className="hidden h-4 w-px bg-brand-200 sm:block" />
          <span>
            <span className="font-semibold text-brand-800">No Preservatives</span>{" "}
            · 100% Natural
          </span>
          <span className="hidden h-4 w-px bg-brand-200 sm:block" />
          <span>
            <span className="font-semibold text-brand-800">Freshly Ground</span>{" "}
            · Small Batch
          </span>
        </motion.div>
      </div>
    </section>
  );
}
