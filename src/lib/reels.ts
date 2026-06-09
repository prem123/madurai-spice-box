import { type Product, findProduct } from "@/lib/products";

/**
 * A reel is just a link between a video and a product.
 * Title/price are NOT stored here — they are pulled live from the product
 * source (see `resolveReels`). `videoUrl` can be an MP4 (works everywhere) or,
 * in production, a streaming URL from a video CDN (e.g. Mux / Cloudflare Stream
 * / Cloudinary). HLS (.m3u8) would need a small helper lib — not added yet.
 */
export interface Reel {
  id: string;
  productSlug: string;
  /** MP4/HLS source (for the native <video> player). */
  videoUrl?: string;
  /** YouTube Short / video id (for the YouTube IFrame player). */
  youtubeId?: string;
  /** Optional poster; YouTube reels fall back to the YouTube thumbnail. */
  posterUrl?: string;
}

/** A reel paired with its live product (built on the server). */
export interface ResolvedReel {
  reel: Reel;
  product: Product;
}

/**
 * Mock reels so the feature runs locally. Videos stream from a public CDN
 * (Google sample bucket) — nothing large is committed to the repo. Posters
 * reuse the optimised product images already in /public.
 */
export const MOCK_REELS: Reel[] = [
  {
    id: "reel-chicken",
    productSlug: "chicken-masala",
    youtubeId: "AsrcClv2vp0", // YouTube Short (9:16)
  },
  {
    id: "reel-garam",
    productSlug: "garam-masala",
    youtubeId: "79jrsqX3zfk", // YouTube Short (9:16)
  },
  {
    id: "reel-health",
    productSlug: "health-mix",
    youtubeId: "kyShBVHvmrw", // YouTube Short (9:16)
  },
  {
    id: "reel-sambar",
    productSlug: "sambar-powder",
    youtubeId: "weq0Hdn41Pw", // YouTube Short (9:16)
  },
];

/**
 * Pairs each reel with its live product. Drops reels whose product is missing
 * or out of stock. Price/title always come from the product, never the reel.
 */
export function resolveReels(reels: Reel[], products: Product[]): ResolvedReel[] {
  return reels.flatMap((reel) => {
    const product = findProduct(products, reel.productSlug);
    if (!product || !product.inStock) return [];
    return [{ reel, product }];
  });
}
