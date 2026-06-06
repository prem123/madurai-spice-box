import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBestSellers } from "@/lib/store";
import { SectionHeading } from "@/components/section-heading";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";

export async function BestSellers() {
  const items = await getBestSellers();
  return (
    <section className="section">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Loved by 2,000+ kitchens"
          title="Our Best Sellers"
          subtitle="The masalas families come back for, again and again — freshly ground and packed to order."
        />
        <div className="mt-10">
          <ProductGrid products={items} />
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/shop">
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
