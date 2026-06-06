import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/cart-page-client";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review your Madurai Spice Box order and place it directly on WhatsApp. No payment on site — pay securely after confirmation.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return <CartPageClient />;
}
