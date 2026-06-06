"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Loader2, Star } from "lucide-react";
import { type Product } from "@/lib/products";
import { toggleStock, deleteProduct } from "@/app/admin/actions";
import { formatINR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function StockSwitch({ product }: { product: Product }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [on, setOn] = useState(product.inStock);

  const flip = () => {
    const next = !on;
    setOn(next);
    start(async () => {
      await toggleStock(product.slug, next);
      router.refresh();
    });
  };

  return (
    <button
      onClick={flip}
      disabled={pending}
      role="switch"
      aria-checked={on}
      aria-label={`Toggle stock for ${product.name}`}
      className="inline-flex items-center gap-2"
    >
      <span
        className={`relative h-6 w-11 rounded-full transition-colors ${
          on ? "bg-whatsapp" : "bg-brand-200"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            on ? "translate-x-[1.375rem]" : "translate-x-0.5"
          }`}
        />
      </span>
      <span
        className={`text-xs font-semibold ${
          on ? "text-whatsapp-dark" : "text-muted-foreground"
        }`}
      >
        {pending ? "…" : on ? "In stock" : "Out of stock"}
      </span>
    </button>
  );
}

function DeleteButton({ product }: { product: Product }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();

  const confirm = () => {
    start(async () => {
      await deleteProduct(product.slug);
      setOpen(false);
      router.refresh();
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={`Delete ${product.name}`}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-chilli/10 hover:text-chilli"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete {product.name}?</DialogTitle>
            <DialogDescription>
              This permanently removes the product from your store. This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={confirm}
              disabled={pending}
            >
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Deleting…
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function InventoryTable({ products }: { products: Product[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-soft">
      {/* Desktop header */}
      <div className="hidden grid-cols-[1fr_120px_120px_180px_90px] gap-4 border-b border-brand-100 bg-beige/40 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-brand-700 md:grid">
        <span>Product</span>
        <span>Category</span>
        <span>Price</span>
        <span>Stock</span>
        <span className="text-right">Actions</span>
      </div>

      <ul className="divide-y divide-brand-100">
        {products.map((p) => (
          <li
            key={p.slug}
            className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-[1fr_120px_120px_180px_90px] md:items-center md:gap-4"
          >
            {/* Product */}
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-beige/40">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 truncate font-semibold text-brand-800">
                  {p.name}
                  {p.bestseller && (
                    <Star className="h-3.5 w-3.5 shrink-0 fill-spice text-spice" />
                  )}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {p.weight}
                </p>
              </div>
            </div>

            {/* Category */}
            <div>
              <Badge variant="secondary" className="md:bg-transparent md:px-0">
                {p.categoryLabel}
              </Badge>
            </div>

            {/* Price */}
            <div className="font-semibold text-brand-800">
              {formatINR(p.price)}
            </div>

            {/* Stock */}
            <div>
              <StockSwitch product={p} />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-start gap-1 md:justify-end">
              <Link
                href={`/admin/products/${p.slug}/edit`}
                aria-label={`Edit ${p.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-700 transition-colors hover:bg-brand-50"
              >
                <Pencil className="h-4 w-4" />
              </Link>
              <DeleteButton product={p} />
            </div>
          </li>
        ))}
      </ul>

      {products.length === 0 && (
        <p className="px-5 py-12 text-center text-muted-foreground">
          No products yet. Add your first product to get started.
        </p>
      )}
    </div>
  );
}
