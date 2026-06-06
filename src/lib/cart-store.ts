"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { siteConfig } from "./site";

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  weight: string;
  image: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  increment: (slug: string) => void;
  decrement: (slug: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  setOpen: (open: boolean) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (item, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.slug === item.slug);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.slug === item.slug ? { ...i, qty: i.qty + qty } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, qty }] };
        }),
      removeItem: (slug) =>
        set((state) => ({
          items: state.items.filter((i) => i.slug !== slug),
        })),
      setQty: (slug, qty) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.slug === slug ? { ...i, qty } : i))
            .filter((i) => i.qty > 0),
        })),
      increment: (slug) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.slug === slug ? { ...i, qty: i.qty + 1 } : i
          ),
        })),
      decrement: (slug) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.slug === slug ? { ...i, qty: i.qty - 1 } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      setOpen: (open) => set({ isOpen: open }),
    }),
    { name: "msb-cart" }
  )
);

// ---- Derived helpers (pure functions) ----
export const cartCount = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.qty, 0);

export const cartSubtotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.qty, 0);

export const cartShipping = (subtotal: number) =>
  subtotal === 0 || subtotal >= siteConfig.freeShippingThreshold
    ? 0
    : siteConfig.shippingFee;

export const cartTotal = (items: CartItem[]) => {
  const subtotal = cartSubtotal(items);
  return subtotal + cartShipping(subtotal);
};
