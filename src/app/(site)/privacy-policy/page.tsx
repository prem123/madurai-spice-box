import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/legal/legal-layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Madurai Spice Box collects, uses and protects your personal information including name, phone, address, email and WhatsApp communication.",
  alternates: { canonical: "/privacy-policy" },
};

const sections: LegalSection[] = [
  {
    id: "info-we-collect",
    heading: "Information We Collect",
    body: (
      <>
        <p>
          To process and deliver your order, we collect only the information
          you choose to share with us, including:
        </p>
        <ul>
          <li><strong>Customer Name</strong> — to address and label your order.</li>
          <li><strong>Phone Number</strong> — for order confirmation and delivery updates.</li>
          <li><strong>Delivery Address</strong> — to ship your products.</li>
          <li><strong>Email</strong> — for receipts and important communication (optional).</li>
        </ul>
      </>
    ),
  },
  {
    id: "whatsapp",
    heading: "WhatsApp Communication",
    body: (
      <p>
        Orders are placed and confirmed via WhatsApp. When you message us, your
        WhatsApp number and chat content are used solely to process your order,
        share payment details and provide delivery updates. We do not sell or
        share your WhatsApp data with third parties.
      </p>
    ),
  },
  {
    id: "marketing",
    heading: "Marketing Communication",
    body: (
      <p>
        With your consent, we may occasionally send you offers, new product
        announcements and updates via WhatsApp, SMS or email. You can opt out at
        any time by simply replying <strong>STOP</strong> or messaging us.
      </p>
    ),
  },
  {
    id: "data-security",
    heading: "Data Security",
    body: (
      <p>
        We take reasonable measures to protect your personal information from
        unauthorised access, misuse or disclosure. Since no payment is collected
        on this website, we never store your card, UPI or banking details.
        Payment is handled directly between you and us on WhatsApp.
      </p>
    ),
  },
  {
    id: "your-rights",
    heading: "Your Rights",
    body: (
      <p>
        You may request access to, correction of, or deletion of your personal
        information at any time by contacting us. We retain your details only as
        long as necessary to fulfil orders and meet legal obligations.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Your trust matters to us. Here's exactly how we handle and protect your information."
      sections={sections}
      currentHref="/privacy-policy"
    />
  );
}
