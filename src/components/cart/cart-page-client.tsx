"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { useCart, cartSubtotal, cartTotal } from "@/lib/cart-store";
import { orderLink } from "@/lib/whatsapp";
import { formatINR } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CartPageClient() {
  const { items, increment, decrement, removeItem, clear } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const subtotal = cartSubtotal(items);
  const total = cartTotal(items);

  const placeOrder = () => {
    const link = orderLink(items);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  if (!mounted) {
    return (
      <div className="container-tight py-20 text-center text-muted-foreground">
        Loading your cart…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-tight flex flex-col items-center justify-center gap-5 py-24 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-beige">
          <ShoppingBag className="h-11 w-11 text-spice" />
        </div>
        <div>
          <h1 className="font-serif text-3xl font-semibold text-brand-800">
            Your cart is empty
          </h1>
          <p className="mt-2 text-muted-foreground">
            Discover our freshly ground masalas and traditional health mixes.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-tight grid gap-8 py-10 lg:grid-cols-[1fr_380px] lg:items-start">
      {/* Items + form */}
      <div className="space-y-8">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-3xl font-semibold text-brand-800">
              Shopping Cart
            </h1>
            <button
              onClick={clear}
              className="text-sm text-muted-foreground underline-offset-4 hover:text-chilli hover:underline"
            >
              Clear cart
            </button>
          </div>

          <ul className="mt-6 space-y-4">
            {items.map((item) => (
              <li
                key={item.slug}
                className="flex gap-4 rounded-2xl border border-brand-100 bg-white p-3 shadow-soft sm:p-4"
              >
                <Link
                  href={`/product/${item.slug}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-beige/40"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        className="font-serif text-lg font-semibold text-brand-800 hover:text-spice"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {item.weight} · {formatINR(item.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.slug)}
                      aria-label={`Remove ${item.name}`}
                      className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-chilli/10 hover:text-chilli"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-full border border-brand-100">
                      <button
                        onClick={() => decrement(item.slug)}
                        aria-label="Decrease quantity"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-brand-700 hover:bg-brand-50"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => increment(item.slug)}
                        aria-label="Increase quantity"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-brand-700 hover:bg-brand-50"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-bold text-brand-800">
                      {formatINR(item.price * item.qty)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sticky summary */}
      <div className="lg:sticky lg:top-24">
        <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-card">
          <h2 className="font-serif text-2xl font-semibold text-brand-800">
            Order Summary
          </h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>
                Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)
              </span>
              <span className="font-medium text-brand-800">
                {formatINR(subtotal)}
              </span>
            </div>
            <p className="rounded-lg bg-beige/50 px-3 py-2 text-xs text-brand-700">
              Shipping is calculated and confirmed on WhatsApp.
            </p>
            <div className="flex justify-between border-t border-dashed border-brand-100 pt-3 text-lg font-bold text-brand-800">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
          </div>

          <Button
            type="button"
            onClick={placeOrder}
            variant="whatsapp"
            size="lg"
            className="mt-5 w-full"
          >
            <MessageCircle className="h-5 w-5" /> Place Order on WhatsApp
          </Button>

          <div className="mt-5 space-y-2 rounded-xl bg-beige/40 p-4 text-xs text-brand-700">
            <p className="flex items-center gap-2 font-semibold text-brand-800">
              <ShieldCheck className="h-4 w-4 text-whatsapp-dark" /> How it works
            </p>
            <p>1. Tap “Place Order on WhatsApp” — your order summary is generated automatically.</p>
            <p>2. We confirm availability and share payment details (UPI / QR / bank transfer / link).</p>
            <p>3. Pay securely on WhatsApp — we ship after payment confirmation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
