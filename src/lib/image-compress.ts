/**
 * Browser-side image downscaling for admin product uploads.
 *
 * Product photos come straight off a phone (3–8 MB, 4000px wide) but the
 * storefront never renders them above ~800px. Shrinking before submit keeps
 * uploads well inside the Server Action body limit and matches the size
 * profile of the seed images (~150–200 KB webp).
 */

/**
 * Largest image we accept after compression. Stays under both the Server
 * Action body limit in next.config.mjs and Vercel's ~4.5 MB request cap.
 */
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

/** Longest edge of a stored product image, in pixels. */
const MAX_EDGE = 1600;
/** Encoder quality for the re-encoded image. */
const QUALITY = 0.85;

/** Formats that must not be re-encoded (vector, or animation we'd flatten). */
const PASS_THROUGH = ["image/svg+xml", "image/gif"];

function loadBitmap(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not decode image"));
    };
    img.src = url;
  });
}

function toBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

function renameTo(filename: string, ext: string): string {
  const stem = filename.replace(/\.[^./\\]+$/, "") || "image";
  return `${stem}.${ext}`;
}

/**
 * Returns a downscaled webp copy of `file`, or the original file when it
 * cannot be improved (vector/animated source, undecodable format such as
 * HEIC on non-Safari, or an image that is already small enough).
 *
 * Never throws — a failure here should fall back to the original file and let
 * the size check in the form surface a readable message.
 */
export async function compressImage(file: File): Promise<File> {
  if (PASS_THROUGH.includes(file.type)) return file;

  try {
    const img = await loadBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);

    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const blob = await toBlob(canvas, "image/webp", QUALITY);
    // toBlob returns null if the encoder is unavailable; it also silently
    // falls back to image/png, which can be larger than the source.
    if (!blob || blob.size >= file.size) return file;

    return new File([blob], renameTo(file.name, "webp"), {
      type: "image/webp",
      lastModified: Date.now(),
    });
  } catch (err) {
    console.warn("Image compression failed, using the original file:", err);
    return file;
  }
}
