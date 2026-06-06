import "server-only";
import { promises as fs } from "fs";
import path from "path";

const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

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
 * Uses Vercel Blob in production (when BLOB_READ_WRITE_TOKEN is set),
 * otherwise writes to /public/products for local development.
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

  // Local fallback
  const dir = path.join(process.cwd(), "public", "products");
  await fs.mkdir(dir, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dir, filename), bytes);
  return `/products/${filename}`;
}
