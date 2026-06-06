"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Plus, MessageCircle } from "lucide-react";
import { type Product } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { formatINR } from "@/lib/utils";
import { productOrderLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function QuickView({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.open);

  const handleAdd = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      weight: product.weight,
      image: product.image,
    });
    onOpenChange(false);
    toast.success(`${product.name} added to cart`, {
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
              {product.description}
            </DialogDescription>

            <ul className="mt-4 space-y-1.5">
              {product.benefits.slice(0, 3).map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-sm text-brand-700"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-brand-800">
                {formatINR(product.price)}
              </span>
              {!product.inStock && (
                <Badge variant="accent">Out of stock</Badge>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-2">
              {product.inStock ? (
                <>
                  <Button onClick={handleAdd}>
                    <Plus className="h-4 w-4" /> Add to Cart
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
                </>
              ) : (
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
                    <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
                  </a>
                </Button>
              )}
              <Link
                href={`/product/${product.slug}`}
                className="mt-1 text-center text-sm font-medium text-spice underline-offset-4 hover:underline"
                onClick={() => onOpenChange(false)}
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
