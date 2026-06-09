"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag, MessageCircle } from "lucide-react";
import { type Product } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { formatINR } from "@/lib/utils";
import { productOrderLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

/**
 * The reel "flash page" — a quick-buy popup built on the existing Radix Dialog
 * (which already provides focus trap, Escape-to-close, overlay-click-to-close
 * and accessible labelling via DialogTitle/Description). Add to Cart calls the
 * existing `useCart.addItem` — no new cart logic.
 */
export function ReelQuickBuy({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.open);
  const [qty, setQty] = useState(1);

  // Reset quantity whenever a new product opens.
  useEffect(() => {
    if (open) setQty(1);
  }, [open, product?.slug]);

  if (!product) return null;

  const showStrike =
    product.originalPrice != null && product.originalPrice > product.price;

  const handleAdd = () => {
    addItem(
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        weight: product.weight,
        image: product.image,
      },
      qty
    );
    onOpenChange(false);
    toast.success(`${qty} × ${product.name} added to cart`, {
      action: { label: "View cart", onClick: () => openCart() },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 sm:p-0">
        <div className="grid gap-0 sm:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-t-3xl bg-beige/40 sm:rounded-l-3xl sm:rounded-tr-none">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, 320px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col p-6">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-spice">
              {product.categoryLabel} · {product.weight}
            </span>
            <DialogTitle className="mt-1">{product.name}</DialogTitle>
            <DialogDescription className="mt-2">
              {product.shortDesc}
            </DialogDescription>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-brand-800">
                {formatINR(product.price)}
              </span>
              {showStrike && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatINR(product.originalPrice!)}
                </span>
              )}
            </div>

            {/* Quantity */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center rounded-full border border-brand-200 bg-white">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-brand-700 transition-colors hover:bg-brand-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-9 text-center font-semibold">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-brand-700 transition-colors hover:bg-brand-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-muted-foreground">
                Subtotal:{" "}
                <span className="font-bold text-brand-800">
                  {formatINR(product.price * qty)}
                </span>
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <Button onClick={handleAdd}>
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </Button>
              <Button asChild variant="whatsapp">
                <a
                  href={productOrderLink(
                    product.name,
                    product.weight,
                    product.price
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" /> Order on WhatsApp
                </a>
              </Button>
              <Link
                href={`/product/${product.slug}`}
                onClick={() => onOpenChange(false)}
                className="mt-1 text-center text-sm font-medium text-spice underline-offset-4 hover:underline"
              >
                View full details
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
