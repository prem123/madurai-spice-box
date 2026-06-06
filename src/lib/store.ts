import "server-only";
import { unstable_cache, revalidateTag } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import {
  type Product,
  type Category,
  SEED_PRODUCTS,
  filterCategory,
  pickBestSellers,
  computeCategories,
} from "@/lib/products";

const KV_KEY = "msb:products";
const PRODUCTS_TAG = "products";
const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "products.json");

// Accept either Vercel KV or Upstash Redis env-var naming.
const KV_URL =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const useKV = Boolean(KV_URL && KV_TOKEN);

async function getKv() {
  const { createClient } = await import("@vercel/kv");
  return createClient({ url: KV_URL!, token: KV_TOKEN! });
}

/* ------------------------------------------------------------------ */
/* Low-level backends                                                  */
/* ------------------------------------------------------------------ */

async function kvRead(): Promise<Product[] | null> {
  const kv = await getKv();
  const data = await kv.get<Product[]>(KV_KEY);
  return data ?? null;
}

async function kvWrite(products: Product[]): Promise<void> {
  const kv = await getKv();
  await kv.set(KV_KEY, products);
}

async function fileRead(): Promise<Product[] | null> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as Product[];
  } catch {
    return null;
  }
}

async function fileWrite(products: Product[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), "utf8");
}

/* ------------------------------------------------------------------ */
/* Read / write with auto-seeding                                      */
/* ------------------------------------------------------------------ */

async function readRaw(): Promise<Product[]> {
  const existing = useKV ? await kvRead() : await fileRead();
  if (existing && existing.length) return existing;
  // Seed on first run
  await writeRaw(SEED_PRODUCTS);
  return SEED_PRODUCTS;
}

async function writeRaw(products: Product[]): Promise<void> {
  if (useKV) await kvWrite(products);
  else await fileWrite(products);
}

/* ------------------------------------------------------------------ */
/* Cached public reads (tagged for revalidation)                       */
/* ------------------------------------------------------------------ */

export const getAllProducts = unstable_cache(
  async (): Promise<Product[]> => readRaw(),
  ["all-products"],
  { tags: [PRODUCTS_TAG], revalidate: 3600 }
);

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const all = await getAllProducts();
  return all.find((p) => p.slug === slug);
}

export async function getProductsByCategory(
  category: Category
): Promise<Product[]> {
  return filterCategory(await getAllProducts(), category);
}

export async function getBestSellers(): Promise<Product[]> {
  return pickBestSellers(await getAllProducts());
}

export async function getCategoriesWithCounts() {
  return computeCategories(await getAllProducts());
}

/* ------------------------------------------------------------------ */
/* Mutations (admin) — each revalidates the storefront cache           */
/* ------------------------------------------------------------------ */

function bump() {
  revalidateTag(PRODUCTS_TAG);
}

export async function upsertProduct(product: Product): Promise<void> {
  const all = await readRaw();
  const idx = all.findIndex((p) => p.slug === product.slug);
  if (idx >= 0) all[idx] = product;
  else all.push(product);
  await writeRaw(all);
  bump();
}

export async function deleteProduct(slug: string): Promise<void> {
  const all = await readRaw();
  await writeRaw(all.filter((p) => p.slug !== slug));
  bump();
}

export async function setStock(slug: string, inStock: boolean): Promise<void> {
  const all = await readRaw();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx >= 0) {
    all[idx] = { ...all[idx], inStock };
    await writeRaw(all);
    bump();
  }
}

export async function slugExists(
  slug: string,
  exceptSlug?: string
): Promise<boolean> {
  const all = await readRaw();
  return all.some((p) => p.slug === slug && p.slug !== exceptSlug);
}

export const STORAGE_MODE = useKV ? "vercel-kv" : "local-file";
