import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    // Kept under 60 chars to avoid SERP truncation; leads with brand then
    // primary keywords (South Indian masalas + health mix).
    default: `${siteConfig.name} — Pure South Indian Masalas & Health Mix`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Madurai masala",
    "South Indian spice powder",
    "homemade sambar powder",
    "garam masala online",
    "natural spice powder Tamil Nadu",
    "health mix",
    "buy masala on WhatsApp",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Pure Traditional Masalas`,
    description: siteConfig.description,
    images: [
      {
        url: "/brand/og-image.webp",
        width: 1024,
        height: 1024,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Pure Traditional Masalas`,
    description: siteConfig.description,
    images: ["/brand/og-image.webp"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/brand/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF8F0",
  width: "device-width",
  initialScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgId = `${siteConfig.url}/#organization`;
  const websiteId = `${siteConfig.url}/#website`;
  const storeId = `${siteConfig.url}/#store`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/brand/logo.webp`,
        },
        image: `${siteConfig.url}/brand/og-image.webp`,
        email: siteConfig.email,
        telephone: `+${siteConfig.whatsappNumber}`,
        sameAs: [siteConfig.instagram, siteConfig.facebook],
        founder: {
          "@type": "Person",
          name: "Umarani",
          jobTitle: "Founder",
          description:
            "Home cook of four decades and government-certified caterer (Tamil Nadu Women Skill Development Initiative, 2003), founder of Madurai Spice Box.",
        },
        knowsAbout: [
          "South Indian spice powders",
          "Madurai masala",
          "Traditional Tamil health mixes",
          "Preservative-free homemade masala",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: `+${siteConfig.whatsappNumber}`,
          email: siteConfig.email,
          areaServed: "IN",
          availableLanguage: ["en", "ta"],
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en-IN",
        publisher: { "@id": orgId },
      },
      {
        "@type": ["Store", "LocalBusiness"],
        "@id": storeId,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        image: `${siteConfig.url}/brand/og-image.webp`,
        logo: `${siteConfig.url}/brand/logo.webp`,
        telephone: `+${siteConfig.whatsappNumber}`,
        email: siteConfig.email,
        parentOrganization: { "@id": orgId },
        sameAs: [siteConfig.instagram, siteConfig.facebook],
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "27, Ground Floor, Ramalinga Nagar, Near Janaki Nagar, HMS Colony, Theni Main Road",
          addressLocality: "Madurai",
          addressRegion: "Tamil Nadu",
          postalCode: "625016",
          addressCountry: "IN",
        },
        areaServed: { "@type": "Country", name: "India" },
        currenciesAccepted: "INR",
        paymentAccepted: "UPI, Bank Transfer",
        priceRange: "₹₹",
        servesCuisine: "South Indian",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
