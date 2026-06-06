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
    default: `${siteConfig.name} — Pure Traditional Masalas Made the Madurai Way`,
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
  icons: { icon: "/brand/logo.webp", apple: "/brand/logo.webp" },
};

export const viewport: Viewport = {
  themeColor: "#FFF8F0",
  width: "device-width",
  initialScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/brand/og-image.webp`,
    telephone: `+${siteConfig.whatsappNumber}`,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Madurai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    priceRange: "₹₹",
    servesCuisine: "South Indian",
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
