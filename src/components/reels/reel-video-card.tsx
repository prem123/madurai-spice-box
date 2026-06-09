"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { type Product } from "@/lib/products";
import { type Reel } from "@/lib/reels";
import { ReelOverlay } from "@/components/reels/reel-overlay";

export function ReelVideoCard({
  reel,
  product,
  active,
  onShopNow,
}: {
  reel: Reel;
  product: Product;
  active: boolean;
  onShopNow?: (product: Product) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false); // only fetch the video once needed
  const [muted, setMuted] = useState(true);

  // React doesn't reliably set the `muted` DOM *property* from the attribute,
  // which makes browsers block muted-autoplay. Set it imperatively.
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  // Start loading the video only when it first becomes active.
  useEffect(() => {
    if (active) setLoaded(true);
  }, [active]);

  // Play exactly when active; pause otherwise. Only one card is ever active.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active && loaded) {
      v.muted = muted; // guarantee muted before autoplay
      const p = v.play();
      if (p) p.catch(() => {});
    } else {
      v.pause();
    }
  }, [active, loaded, muted]);

  return (
    <div className="group relative aspect-[9/16] w-full overflow-hidden rounded-3xl bg-brand-900 shadow-card">
      <video
        ref={videoRef}
        src={loaded ? reel.videoUrl : undefined}
        poster={reel.posterUrl}
        muted={muted}
        loop
        playsInline
        preload="none"
        aria-label={`Video for ${product.name}`}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Mute toggle */}
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>

      <ReelOverlay product={product} onShopNow={onShopNow} />
    </div>
  );
}
