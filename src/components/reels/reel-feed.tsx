"use client";

import { useEffect, useRef, useState } from "react";
import { type Product } from "@/lib/products";
import { type ResolvedReel } from "@/lib/reels";
import { ReelVideoCard } from "@/components/reels/reel-video-card";
import { ReelYouTubeCard } from "@/components/reels/reel-youtube-card";
import { ReelQuickBuy } from "@/components/reels/reel-quick-buy";

export function ReelFeed({ items }: { items: ResolvedReel[] }) {
  const [activeIds, setActiveIds] = useState<Set<string>>(() => new Set());
  const cardEls = useRef<Map<string, HTMLElement>>(new Map());
  const ratios = useRef<Map<string, number>>(new Map());

  // Each card plays while it's sufficiently in view and pauses when scrolled
  // away. In this horizontal row several cards can be visible at once; since
  // every reel is muted there's no audio clash, so all in-view reels play.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).dataset.reelId;
          if (id) ratios.current.set(id, e.isIntersecting ? e.intersectionRatio : 0);
        }
        const next = new Set<string>();
        ratios.current.forEach((r, id) => {
          if (r >= 0.5) next.add(id); // ≥50% visible → play
        });
        setActiveIds(next);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    cardEls.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items.length]);

  const [selected, setSelected] = useState<Product | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const handleShopNow = (product: Product) => {
    setSelected(product);
    setPopupOpen(true);
  };

  return (
    <>
      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 lg:mx-0 lg:px-0">
      {items.map(({ reel, product }) => (
        <div
          key={reel.id}
          data-reel-id={reel.id}
          ref={(el) => {
            if (el) cardEls.current.set(reel.id, el);
            else cardEls.current.delete(reel.id);
          }}
          className="w-[72vw] max-w-[300px] shrink-0 snap-center sm:w-[260px]"
        >
          {reel.youtubeId ? (
            <ReelYouTubeCard
              reel={reel}
              product={product}
              active={activeIds.has(reel.id)}
              onShopNow={handleShopNow}
            />
          ) : (
            <ReelVideoCard
              reel={reel}
              product={product}
              active={activeIds.has(reel.id)}
              onShopNow={handleShopNow}
            />
          )}
        </div>
      ))}
      </div>

      <ReelQuickBuy
        product={selected}
        open={popupOpen}
        onOpenChange={setPopupOpen}
      />
    </>
  );
}
