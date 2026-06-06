"use client";

import Link from "next/link";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useCart,
  cartCount,
  cartTotal,
} from "@/lib/cart-store";
import { orderLink } from "@/lib/whatsapp";
import { formatINR } from "@/lib/utils";

export function StickyMobileBar() {
  const items = useCart((s) => s.items);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const count = mounted ? cartCount(items) : 0;
  if (count === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-brand-100 bg-cream/95 px-4 py-3 backdrop-blur-md shadow-[0_-4px_24px_-8px_rgba(139,69,19,0.18)] md:hidden">
      <div className="flex items-center gap-3">
        <Link
          href="/cart"
          className="flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3 py-2.5"
        >
          <div className="relative">
            <ShoppingBag className="h-5 w-5 text-brand-700" />
            <span className="absolute -right-2 -top-2 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-chilli px-1 text-[10px] font-bold text-white">
              {count}
            </span>
          </div>
          <span className="text-sm font-bold text-brand-800">
            {formatINR(cartTotal(items))}
          </span>
        </Link>
        <a
          href={orderLink(items)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp text-sm font-semibold text-white shadow-soft active:scale-[0.98]"
        >
          <MessageCircle className="h-5 w-5" /> Order on WhatsApp
        </a>
      </div>
    </div>
  );
}
