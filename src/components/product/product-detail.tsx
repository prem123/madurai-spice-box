"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Minus,
  Plus,
  Check,
  MessageCircle,
  ShoppingBag,
  Leaf,
  ChevronRight,
} from "lucide-react";
import { type Product } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { formatINR } from "@/lib/utils";
import { productOrderLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-brand-100 py-3 last:border-0">
      <p className="text-xs font-semibold uppercase tracking-wider text-spice">
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-brand-700">{value}</p>
    </div>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.open);

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
    toast.success(`${qty} × ${product.name} added to cart`, {
      action: { label: "View cart", onClick: () => openCart() },
    });
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav className="container-tight flex items-center gap-1.5 py-4 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-brand-700">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/shop" className="hover:text-brand-700">
          Shop
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-brand-700">{product.name}</span>
      </nav>

      <div className="container-tight grid gap-10 pb-16 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-brand-100 bg-beige/40 shadow-card">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {product.bestseller && (
                <Badge className="bg-chilli text-white shadow-soft">
                  Bestseller
                </Badge>
              )}
              {product.badge && (
                <Badge variant="secondary" className="shadow-soft">
                  {product.badge}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-spice">
            {product.categoryLabel}
          </span>
          <h1 className="mt-1 font-serif text-3xl font-semibold text-brand-800 sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold text-brand-800">
              {formatINR(product.price)}
            </span>
            <span className="text-sm text-muted-foreground">
              / {product.weight}
            </span>
            {product.inStock ? (
              <Badge variant="secondary" className="ml-auto gap-1 text-whatsapp-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" /> In stock
              </Badge>
            ) : (
              <Badge variant="accent" className="ml-auto">
                Out of stock
              </Badge>
            )}
          </div>

          <p className="mt-5 text-base leading-relaxed text-brand-700">
            {product.description}
          </p>

          {/* Benefits */}
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {product.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-brand-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp-dark" />
                {b}
              </li>
            ))}
          </ul>

          {/* Qty + actions */}
          {product.inStock ? (
            <div className="mt-7">
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-full border border-brand-200 bg-white">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="flex h-11 w-11 items-center justify-center rounded-full text-brand-700 transition-colors hover:bg-brand-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-semibold">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="flex h-11 w-11 items-center justify-center rounded-full text-brand-700 transition-colors hover:bg-brand-50"
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

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Button onClick={handleAdd} size="lg" className="flex-1">
                  <ShoppingBag className="h-5 w-5" /> Add to Cart
                </Button>
                <Button asChild variant="whatsapp" size="lg" className="flex-1">
                  <a
                    href={productOrderLink(
                      product.name,
                      product.weight,
                      product.price
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-5 w-5" /> Order on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-7">
              <Button asChild variant="whatsapp" size="lg" className="w-full sm:w-auto">
                <a
                  href={productOrderLink(
                    product.name,
                    product.weight,
                    product.price
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" /> Enquire on WhatsApp
                </a>
              </Button>
            </div>
          )}

          <div className="mt-5 flex items-center gap-2 rounded-xl bg-beige/50 px-4 py-3 text-xs text-brand-700">
            <Leaf className="h-4 w-4 shrink-0 text-spice" />
            Freshly ground &amp; packed only after you order · No preservatives ·
            Pay securely on WhatsApp after confirmation
          </div>

          {/* Details */}
          <div className="mt-8 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
            <h2 className="font-serif text-xl font-semibold text-brand-800">
              Product Details
            </h2>
            <div className="mt-2">
              <DetailRow label="Weight" value={product.weight} />
              <DetailRow label="Ingredients" value={product.ingredients} />
              <DetailRow label="How to Use" value={product.usage} />
              <DetailRow label="Storage" value={product.storage} />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      {product.inStock && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-brand-100 bg-cream/95 px-4 py-3 backdrop-blur-md shadow-[0_-4px_24px_-8px_rgba(139,69,19,0.18)] md:hidden">
          <div className="flex items-center gap-3">
            <div className="leading-tight">
              <p className="text-xs text-muted-foreground">{product.weight}</p>
              <p className="text-lg font-bold text-brand-800">
                {formatINR(product.price)}
              </p>
            </div>
            <Button onClick={handleAdd} className="flex-1">
              <ShoppingBag className="h-4 w-4" /> Add
            </Button>
            <Button asChild variant="whatsapp" className="flex-1">
              <a
                href={productOrderLink(
                  product.name,
                  product.weight,
                  product.price
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" /> Order
              </a>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
