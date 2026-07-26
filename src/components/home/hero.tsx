"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { enquiryLink } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient spice-texture">
      <div className="container-tight py-10 sm:py-14 lg:py-16">
        {/* The headline lives inside the banner artwork, so keep a readable
            heading for screen readers and search engines. */}
        <h1 className="sr-only">
          From the Heart of Madurai — Authentic South Indian Spices &amp; Health
          Mixes
        </h1>

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.21, 0.5, 0.3, 1] }}
          className="overflow-hidden rounded-[1.5rem] border border-white/60 shadow-card sm:rounded-[2rem]"
        >
          <Image
            src="/brand/hero-banner.webp"
            alt="From the Heart of Madurai — authentic South Indian spice powders and traditional health mixes from Madurai Spice Box, pictured with the Meenakshi Amman temple"
            width={1600}
            height={666}
            priority
            sizes="(max-width: 1200px) 100vw, 1152px"
            className="h-auto w-full"
          />
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.21, 0.5, 0.3, 1] }}
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
          transition={{ duration: 0.6, delay: 0.3, ease: [0.21, 0.5, 0.3, 1] }}
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
