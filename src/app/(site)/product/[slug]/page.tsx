import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { filterCategory } from "@/lib/products";
import { getAllProducts, getProductBySlug } from "@/lib/store";
import { siteConfig } from "@/lib/site";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionHeading } from "@/components/section-heading";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: `${product.name} (${product.weight})`,
    description: product.shortDesc,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: `${product.name} — ${siteConfig.name}`,
      description: product.shortDesc,
      images: [{ url: product.image, width: 1000, height: 1250 }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const all = await getAllProducts();
  const related = filterCategory(all, product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const orgId = `${siteConfig.url}/#organization`;
  const productUrl = `${siteConfig.url}/product/${product.slug}`;
  const categoryHref =
    product.category === "healthy-choice" ? "/healthy-choice" : "/shop";

  // Price is valid for ~12 months from build; avoids "missing priceValidUntil"
  // warnings in Search Console product rich results.
  const validUntil = new Date();
  validUntil.setFullYear(validUntil.getFullYear() + 1);
  const priceValidUntil = validUntil.toISOString().split("T")[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${productUrl}#product`,
        name: product.name,
        image: `${siteConfig.url}${product.image}`,
        description: product.description,
        sku: `MSB-${product.slug}`,
        brand: { "@type": "Brand", name: siteConfig.name },
        category: product.categoryLabel,
        weight: product.weight,
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: product.price,
          priceValidUntil,
          itemCondition: "https://schema.org/NewCondition",
          availability: product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          url: productUrl,
          seller: { "@id": orgId },
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "IN",
            // Food products are non-returnable for hygiene; replacements only.
            returnPolicyCategory:
              "https://schema.org/MerchantReturnNotPermitted",
          },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: product.price >= siteConfig.freeShippingThreshold ? 0 : siteConfig.shippingFee,
              currency: "INR",
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "IN",
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              transitTime: {
                "@type": "QuantitativeValue",
                minValue: 2,
                maxValue: 8,
                unitCode: "DAY",
              },
            },
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: product.categoryLabel,
            item: `${siteConfig.url}${categoryHref}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: productUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pb-20 md:pb-0">
        <ProductDetail product={product} />

        {related.length > 0 && (
          <section className="section border-t border-brand-100 bg-beige/30">
            <div className="container-tight">
              <SectionHeading
                eyebrow="You may also like"
                title={`More ${product.categoryLabel}`}
              />
              <div className="mt-10">
                <ProductGrid products={related} />
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
