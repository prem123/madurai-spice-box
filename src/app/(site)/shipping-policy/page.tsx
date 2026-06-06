import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/legal/legal-layout";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "Shipping timelines and process at Madurai Spice Box. Tamil Nadu 2–5 days, rest of India 4–8 days. Tracking shared on WhatsApp.",
  alternates: { canonical: "/shipping-policy" },
};

const sections: LegalSection[] = [
  {
    id: "processing",
    heading: "Order Processing",
    body: (
      <p>
        <strong>Orders are processed only after payment confirmation.</strong>{" "}
        Once your payment is received and verified on WhatsApp, we begin packing
        your freshly ground order with care.
      </p>
    ),
  },
  {
    id: "dispatch",
    heading: "Dispatch & Verification",
    body: (
      <p>
        <strong>Shipping starts after payment verification.</strong> We typically
        dispatch within 1–2 working days of confirmed payment. As our products
        are freshly packed to order, this ensures you receive them at their best.
      </p>
    ),
  },
  {
    id: "delivery-times",
    heading: "Estimated Delivery Times",
    body: (
      <ul>
        <li><strong>Tamil Nadu:</strong> 2–5 working days</li>
        <li><strong>Rest of India:</strong> 4–8 working days</li>
      </ul>
    ),
  },
  {
    id: "tracking",
    heading: "Order Tracking",
    body: (
      <p>
        <strong>Tracking details are shared via WhatsApp</strong> once your order
        is dispatched, so you always know where your spices are.
      </p>
    ),
  },
  {
    id: "delays",
    heading: "Delays",
    body: (
      <p>
        Delivery times are estimates and may occasionally be affected by
        courier delays, weather, festivals or remote locations. We&apos;ll keep
        you updated on WhatsApp if anything changes.
      </p>
    ),
  },
];

export default function ShippingPolicyPage() {
  return (
    <LegalLayout
      title="Shipping Policy"
      subtitle="How and when your freshly ground masalas reach your doorstep."
      sections={sections}
      currentHref="/shipping-policy"
    />
  );
}
