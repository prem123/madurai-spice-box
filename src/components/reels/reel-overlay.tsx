"use client";

import { ShoppingBag } from "lucide-react";
import { type Product } from "@/lib/products";
import { formatINR } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/** Shared reel overlay: legibility gradient, full-card tap target, and the
 *  title / price / "Shop now" block. Price comes live from the product. */
export function ReelOverlay({
  product,
  onShopNow,
}: {
  product: Product;
  onShopNow?: (product: Product) => void;
}) {
  const showStrike =
    product.originalPrice != null && product.originalPrice > product.price;

  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />

      {/* Tap anywhere opens quick-buy */}
      <button
        type="button"
        onClick={() => onShopNow?.(product)}
        aria-label={`Shop ${product.name}`}
        className="absolute inset-0 z-10 cursor-pointer"
      />

      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-2 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
          {product.categoryLabel}
        </p>
        <h3 className="font-serif text-xl font-semibold leading-tight text-white">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-white">
            {formatINR(product.price)}
          </span>
          {showStrike && (
            <span className="text-sm text-white/60 line-through">
              {formatINR(product.originalPrice!)}
            </span>
          )}
          <span className="text-xs text-white/70">/ {product.weight}</span>
        </div>
        <Button
          type="button"
          variant="whatsapp"
          size="sm"
          onClick={() => onShopNow?.(product)}
          className="relative z-20 mt-1 w-full bg-spice hover:bg-brand-500"
        >
          <ShoppingBag className="h-4 w-4" /> Shop now
        </Button>
      </div>
    </>
  );
}
