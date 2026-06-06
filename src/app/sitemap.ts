import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/store";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();
  const products = await getAllProducts();

  const staticRoutes = [
    "",
    "/shop",
    "/healthy-choice",
    "/about",
    "/contact",
    "/faq",
    "/privacy-policy",
    "/terms-conditions",
    "/shipping-policy",
    "/refund-policy",
    "/disclaimer",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
