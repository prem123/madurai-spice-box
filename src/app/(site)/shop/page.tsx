import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ShopClient } from "@/components/shop/shop-client";
import { getAllProducts, getCategoriesWithCounts } from "@/lib/store";

export const metadata: Metadata = {
  title: "Shop All Masalas & Health Mixes",
  description:
    "Browse our full range of freshly ground South Indian spice powders and traditional health mixes. Filter, search and order easily on WhatsApp.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategoriesWithCounts(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Our Collection"
        title="Freshly Ground, Just for You"
        subtitle="Every pack is roasted and ground in small batches, then packed only after you order — for unbeatable freshness."
      />
      <section className="section">
        <div className="container-tight">
          <ShopClient products={products} categories={categories} />
        </div>
      </section>
    </>
  );
}
