"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import {
  useCart,
  cartSubtotal,
  cartShipping,
  cartTotal,
} from "@/lib/cart-store";
import { orderLink } from "@/lib/whatsapp";
import { formatINR } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function CartDrawer() {
  const { items, isOpen, setOpen, increment, decrement, removeItem } =
    useCart();

  const subtotal = cartSubtotal(items);
  const shipping = cartShipping(subtotal);
  const total = cartTotal(items);
  const remaining = siteConfig.freeShippingThreshold - subtotal;

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col p-0 sm:max-w-md">
        <SheetHeader className="border-b border-brand-100">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-spice" />
            Your Cart ({items.reduce((s, i) => s + i.qty, 0)})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-beige">
              <ShoppingBag className="h-9 w-9 text-spice" />
            </div>
            <div>
              <p className="font-serif text-xl font-semibold text-brand-800">
                Your cart is empty
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add some freshly ground masalas to get started.
              </p>
            </div>
            <Button asChild onClick={() => setOpen(false)}>
              <Link href="/shop">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            {shipping > 0 ? (
              <div className="border-b border-brand-100 bg-beige/40 px-6 py-3">
                <p className="text-xs text-brand-700">
                  Add{" "}
                  <span className="font-bold">{formatINR(remaining)}</span> more
                  for{" "}
                  <span className="font-semibold text-whatsapp-dark">
                    FREE delivery
                  </span>
                </p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-brand-100">
                  <div
                    className="h-full rounded-full bg-whatsapp transition-all"
                    style={{
                      width: `${Math.min(
                        100,
                        (subtotal / siteConfig.freeShippingThreshold) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="border-b border-brand-100 bg-whatsapp/10 px-6 py-3">
                <p className="text-xs font-semibold text-whatsapp-dark">
                  🎉 You&apos;ve unlocked FREE delivery!
                </p>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.slug} className="flex gap-3">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-beige/40">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-brand-800">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.weight} · {formatINR(item.price)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.slug)}
                          aria-label={`Remove ${item.name}`}
                          className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-chilli/10 hover:text-chilli"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border border-brand-100">
                          <button
                            onClick={() => decrement(item.slug)}
                            aria-label="Decrease quantity"
                            className="flex h-8 w-8 items-center justify-center rounded-full text-brand-700 transition-colors hover:bg-brand-50"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-7 text-center text-sm font-semibold">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => increment(item.slug)}
                            aria-label="Increase quantity"
                            className="flex h-8 w-8 items-center justify-center rounded-full text-brand-700 transition-colors hover:bg-brand-50"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-brand-800">
                          {formatINR(item.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Summary */}
            <div className="border-t border-brand-100 bg-white px-6 py-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-brand-800">
                    {formatINR(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-medium text-brand-800">
                    {shipping === 0 ? "FREE" : formatINR(shipping)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-dashed border-brand-100 pt-2 text-base font-bold text-brand-800">
                  <span>Total</span>
                  <span>{formatINR(total)}</span>
                </div>
              </div>

              <Button asChild variant="whatsapp" size="lg" className="mt-4 w-full">
                <a
                  href={orderLink(items)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" /> Place Order on WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="mt-1 w-full"
                onClick={() => setOpen(false)}
              >
                <Link href="/cart">View full cart & add details</Link>
              </Button>
              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                No payment on site · Pay securely on WhatsApp after confirmation
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
