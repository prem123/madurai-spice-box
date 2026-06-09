import { getAllProducts } from "@/lib/store";
import { MOCK_REELS, resolveReels } from "@/lib/reels";
import { SectionHeading } from "@/components/section-heading";
import { ReelFeed } from "@/components/reels/reel-feed";

export async function ReelsSection() {
  const products = await getAllProducts();
  const items = resolveReels(MOCK_REELS, products);
  if (items.length === 0) return null;

  return (
    <section className="pt-16 sm:pt-20 lg:pt-28">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Watch & Shop"
          title="Shop the Reels"
          subtitle="See our masalas in action — tap a reel to shop it in seconds."
        />
        <div className="mt-8">
          <ReelFeed items={items} />
        </div>
      </div>
    </section>
  );
}
