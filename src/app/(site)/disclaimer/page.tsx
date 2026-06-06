import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/legal/legal-layout";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Health information provided by Madurai Spice Box is for educational purposes only and is not medical advice. Consult a healthcare professional.",
  alternates: { canonical: "/disclaimer" },
};

const sections: LegalSection[] = [
  {
    id: "educational",
    heading: "For Educational Purposes Only",
    body: (
      <p>
        Any health, wellness or nutritional information shared on this website or
        on our packaging is provided{" "}
        <strong>for general educational and informational purposes only</strong>.
        It is based on traditional knowledge and is not intended to diagnose,
        treat, cure or prevent any disease.
      </p>
    ),
  },
  {
    id: "not-medical",
    heading: "Not Medical Advice",
    body: (
      <p>
        The content on this website{" "}
        <strong>is not a substitute for professional medical advice</strong>,
        diagnosis or treatment. Individual results may vary, and traditional
        benefits described are not guaranteed.
      </p>
    ),
  },
  {
    id: "consult",
    heading: "Consult a Professional",
    body: (
      <p>
        Always <strong>consult a qualified healthcare professional</strong>{" "}
        before making changes to your diet, especially if you are pregnant,
        nursing, have a medical condition, allergies, or are taking medication.
      </p>
    ),
  },
  {
    id: "allergens",
    heading: "Allergen Note",
    body: (
      <p>
        Our products may contain or be processed alongside nuts, sesame, gluten
        and other allergens. Please check ingredients carefully and reach out on
        WhatsApp if you have specific dietary concerns.
      </p>
    ),
  },
];

export default function DisclaimerPage() {
  return (
    <LegalLayout
      title="Disclaimer"
      subtitle="Important information about the health and wellness content we share."
      sections={sections}
      currentHref="/disclaimer"
    />
  );
}
