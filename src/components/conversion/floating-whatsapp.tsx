"use client";

import { MessageCircle } from "lucide-react";
import { enquiryLink } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <a
      href={enquiryLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 md:bottom-6 md:right-6"
    >
      <span className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-800 shadow-card md:group-hover:inline-block">
        Chat with us
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center">
        <span className="absolute inline-flex h-full w-full rounded-full bg-whatsapp/60 animate-pulse-ring" />
        <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-card transition-transform duration-200 group-hover:scale-105">
          <MessageCircle className="h-7 w-7" />
        </span>
      </span>
    </a>
  );
}
