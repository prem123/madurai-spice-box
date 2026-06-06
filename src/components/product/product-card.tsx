"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Plus, Star } from "lucide-react";
import { type Product } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuickView } from "@/components/product/quick-view";
import { toast } from "sonner";
import { useState } from "react";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.open);
  const [quickOpen, setQuickOpen] = useState(false);

  const handleAdd = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      weight: product.weight,
      image: product.image,
    });
    toast.success(`${product.name} added to cart`, {
      action: { label: "View cart", onClick: () => openCart() },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-soft transition-shadow duration-300 hover:shadow-card"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-beige/40">
        <Link href={`/product/${product.slug}`} aria-label={product.name}>
          <Image
            src={product.image}
            alt={`${product.name} — ${product.categoryLabel}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.bestseller && (
            <Badge className="gap-1 bg-chilli text-white shadow-soft">
              <Star className="h-3 w-3 fill-current" /> Bestseller
            </Badge>
          )}
          {product.badge && (
            <Badge variant="secondary" className="shadow-soft">
              {product.badge}
            </Badge>
          )}
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-cream/70 backdrop-blur-[2px]">
            <span className="rounded-full bg-brand-800 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cream">
              Out of stock
            </span>
          </div>
        )}

        {/* Quick view (hover) */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex translate-y-3 justify-center opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            size="sm"
            variant="outline"
            className="w-full border-white/40 bg-white/90 backdrop-blur hover:bg-white"
            onClick={() => setQuickOpen(true)}
          >
            <Eye className="h-4 w-4" /> Quick View
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-spice">
          {product.categoryLabel}
        </span>
        <Link href={`/product/${product.slug}`} className="mt-1">
          <h3 className="font-serif text-lg font-semibold leading-tight text-brand-800 transition-colors group-hover:text-spice">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.shortDesc}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-brand-800">
              {formatINR(product.price)}
            </span>
            <span className="text-xs text-muted-foreground">
              / {product.weight}
            </span>
          </div>
        </div>

        <div className="mt-3">
          {product.inStock ? (
            <Button onClick={handleAdd} className="w-full" size="sm">
              <Plus className="h-4 w-4" /> Add to Cart
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setQuickOpen(true)}
            >
              Notify / Enquire
            </Button>
          )}
        </div>
      </div>

      <QuickView product={product} open={quickOpen} onOpenChange={setQuickOpen} />
    </motion.div>
  );
}
