import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/legal/legal-layout";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms governing orders, pricing, product images and order acceptance at Madurai Spice Box.",
  alternates: { canonical: "/terms-conditions" },
};

const sections: LegalSection[] = [
  {
    id: "pricing",
    heading: "Pricing",
    body: (
      <p>
        All prices are listed in Indian Rupees (₹) and are inclusive of
        applicable charges unless stated otherwise. <strong>Prices may change</strong>{" "}
        at any time without prior notice. The price confirmed on WhatsApp at the
        time of order is the price that applies to that order.
      </p>
    ),
  },
  {
    id: "order-acceptance",
    heading: "Order Acceptance",
    body: (
      <p>
        Adding products to your cart or sending an order message does not
        guarantee acceptance. <strong>Orders are accepted only after confirmation</strong>{" "}
        from Madurai Spice Box on WhatsApp, subject to availability.
      </p>
    ),
  },
  {
    id: "product-images",
    heading: "Product Images",
    body: (
      <p>
        We make every effort to display our products accurately. However,{" "}
        <strong>product images may vary slightly</strong> from the actual product
        due to lighting, photography and natural variation in spices and
        ingredients.
      </p>
    ),
  },
  {
    id: "right-to-refuse",
    heading: "Right to Refuse Orders",
    body: (
      <p>
        <strong>
          Madurai Spice Box reserves the right to refuse or cancel any order
        </strong>{" "}
        at our discretion — for example, due to stock unavailability, pricing
        errors, or delivery limitations. In such cases, any amount already paid
        will be refunded in full.
      </p>
    ),
  },
  {
    id: "payment",
    heading: "Payment",
    body: (
      <p>
        No payment is collected on this website. Payment is collected manually on
        WhatsApp via UPI, QR code, bank transfer or payment link. Orders are
        shipped only after payment is confirmed.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before placing your order."
      sections={sections}
      currentHref="/terms-conditions"
    />
  );
}
