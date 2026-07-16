import "server-only";
import { promises as fs } from "fs";
import path from "path";

// @vercel/blob accepts two credential shapes: a static BLOB_READ_WRITE_TOKEN,
// or OIDC — the runtime VERCEL_OIDC_TOKEN paired with BLOB_STORE_ID. Stores
// created through the current dashboard flow only inject the OIDC pair, so
// gating on the token alone would skip Blob entirely on a working project.
const useBlob = Boolean(
  process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID
);
// Vercel's filesystem is read-only, so the /public fallback below cannot work
// there — it fails with EROFS. Self-hosted deployments keep the fallback.
const isVercel = Boolean(process.env.VERCEL);

function extFor(file: File): string {
  const fromName = file.name.includes(".")
    ? file.name.split(".").pop()!.toLowerCase()
    : "";
  if (fromName) return fromName;
  const fromType = file.type.split("/").pop();
  return fromType || "jpg";
}

/**
 * Saves an uploaded image and returns a public URL/path.
 * Uses Vercel Blob when a Blob store is configured, otherwise writes to
 * /public/products for local development and self-hosted deployments.
 */
export async function saveImage(file: File, slug: string): Promise<string> {
  const ext = extFor(file);
  const filename = `${slug}-${Date.now()}.${ext}`;

  if (useBlob) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`products/${filename}`, file, {
      access: "public",
      addRandomSuffix: false,
    });
    return blob.url;
  }

  if (isVercel) {
    throw new Error(
      "No Blob store is configured (neither BLOB_STORE_ID nor " +
        "BLOB_READ_WRITE_TOKEN is set). Connect a Blob store to the Vercel " +
        "project (Storage → Blob) and redeploy — image uploads cannot use the " +
        "filesystem there."
    );
  }

  // Local / self-hosted fallback
  const dir = path.join(process.cwd(), "public", "products");
  await fs.mkdir(dir, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dir, filename), bytes);
  return `/products/${filename}`;
}
