"use client";

import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart, cartCount } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

export function CartButton({ className }: { className?: string }) {
  const items = useCart((s) => s.items);
  const open = useCart((s) => s.open);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const count = mounted ? cartCount(items) : 0;

  return (
    <button
      onClick={open}
      aria-label={`Open cart, ${count} items`}
      className={cn(
        "relative flex h-11 w-11 items-center justify-center rounded-full text-brand-700 transition-colors hover:bg-brand-50",
        className
      )}
    >
      <ShoppingBag className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-chilli px-1 text-[11px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}
