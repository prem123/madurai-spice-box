/**
 * Central site configuration.
 *
 * ⚠️  IMPORTANT: Replace WHATSAPP_NUMBER with the real business WhatsApp number
 * (international format, digits only, no "+", no spaces). Example for India:
 *   "919876543210"  ->  +91 98765 43210
 */
export const siteConfig = {
  name: "Madurai Spice Box",
  tagline: "Pure Traditional Masalas, Made the Madurai Way",
  description:
    "Freshly ground, preservative-free South Indian spice powders and traditional health mixes — homemade quality from Madurai. Order easily on WhatsApp.",
  url: "https://maduraispicebox.com",
  // ---- EDIT THESE ----
  whatsappNumber: "919739868438", // country code + number, no +
  phoneDisplay: "+91 97398 68438",
  email: "orders@maduraispicebox.com",
  address:
    "27, Ground Floor, Ramalinga Nagar,\nNear Janaki Nagar, HMS Colony,\nTheni Main Road, Madurai,\nTamil Nadu – 625016",
  instagram: "https://instagram.com/maduraispicebox",
  facebook: "https://facebook.com/maduraispicebox",
  // --------------------
  shippingFee: 100,
  freeShippingThreshold: 1599,
  locale: "en_IN",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Healthy Choice", href: "/healthy-choice" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
] as const;
