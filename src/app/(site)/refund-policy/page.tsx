import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/legal/legal-layout";

export const metadata: Metadata = {
  title: "Refund & Replacement Policy",
  description:
    "Madurai Spice Box food products are non-returnable. Replacements offered for wrong, damaged or missing items reported within 24 hours.",
  alternates: { canonical: "/refund-policy" },
};

const sections: LegalSection[] = [
  {
    id: "non-returnable",
    heading: "Food Products Are Non-Returnable",
    body: (
      <p>
        For hygiene and safety reasons,{" "}
        <strong>food products are non-returnable and non-refundable</strong> once
        delivered. We appreciate your understanding — this protects the quality
        and safety of every order.
      </p>
    ),
  },
  {
    id: "replacements",
    heading: "When We Offer a Replacement",
    body: (
      <>
        <p>We&apos;re happy to offer a replacement only if:</p>
        <ul>
          <li>A <strong>wrong item</strong> was delivered</li>
          <li>You received a <strong>damaged product</strong></li>
          <li>An <strong>item is missing</strong> from your order</li>
        </ul>
      </>
    ),
  },
  {
    id: "report-window",
    heading: "Reporting Window",
    body: (
      <p>
        <strong>Customers must report any issue within 24 hours</strong> of
        delivery, with clear photos of the product and packaging, via WhatsApp.
        Requests made after 24 hours cannot be accepted.
      </p>
    ),
  },
  {
    id: "process",
    heading: "How to Request a Replacement",
    body: (
      <p>
        Message us on WhatsApp with your order details and photos. Once verified,
        we&apos;ll arrange a replacement or a suitable resolution at no extra
        cost to you.
      </p>
    ),
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalLayout
      title="Refund & Replacement Policy"
      subtitle="Your satisfaction matters. Here's how we handle wrong, damaged or missing items."
      sections={sections}
      currentHref="/refund-policy"
    />
  );
}
