"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { type Product } from "@/lib/products";
import { type Reel } from "@/lib/reels";
import { loadYouTubeAPI, youtubePoster } from "@/lib/youtube";
import { ReelOverlay } from "@/components/reels/reel-overlay";

export function ReelYouTubeCard({
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
  const holderRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [activated, setActivated] = useState(false); // mount player on first activation
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);

  // Only spin up the iframe/player once the card first becomes active.
  useEffect(() => {
    if (active) setActivated(true);
  }, [active]);

  useEffect(() => {
    if (!activated || playerRef.current || !reel.youtubeId) return;
    let cancelled = false;

    loadYouTubeAPI().then((YT) => {
      if (cancelled || !holderRef.current) return;
      playerRef.current = new YT.Player(holderRef.current, {
        width: "100%",
        height: "100%",
        videoId: reel.youtubeId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          loop: 1,
          playlist: reel.youtubeId, // required for loop on a single video
          playsinline: 1,
          modestbranding: 1,
          rel: 0,
          fs: 0,
          disablekb: 1,
          iv_load_policy: 3,
        },
        events: {
          onReady: (e: any) => {
            setReady(true);
            e.target.mute();
            if (active) e.target.playVideo();
          },
        },
      });
    });

    return () => {
      cancelled = true;
    };
  }, [activated, reel.youtubeId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Play/pause follows the active card.
  useEffect(() => {
    const p = playerRef.current;
    if (!p || !ready) return;
    if (active) p.playVideo?.();
    else p.pauseVideo?.();
  }, [active, ready]);

  // Mute toggle drives the player API.
  useEffect(() => {
    const p = playerRef.current;
    if (!p || !ready) return;
    if (muted) {
      p.mute?.();
    } else {
      p.unMute?.();
      p.setVolume?.(100);
    }
  }, [muted, ready]);

  useEffect(
    () => () => {
      try {
        playerRef.current?.destroy?.();
      } catch {}
    },
    []
  );

  return (
    <div className="group relative aspect-[9/16] w-full overflow-hidden rounded-3xl bg-brand-900 shadow-card">
      {/* Thumbnail poster until the player is ready */}
      {!ready && reel.youtubeId && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={reel.posterUrl ?? youtubePoster(reel.youtubeId)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* YouTube player, "cover"-cropped to fill the 9:16 card (16:9 iframe
          scaled wide so the Short's 9:16 content fills the width). */}
      {activated && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/2 top-0 h-full -translate-x-1/2"
            style={{ width: "316.05%" }}
          >
            <div ref={holderRef} className="h-full w-full" />
          </div>
        </div>
      )}

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
