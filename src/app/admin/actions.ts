"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE,
  sessionToken,
  verifyPassword,
} from "@/lib/auth";
import {
  upsertProduct,
  deleteProduct as storeDelete,
  setStock as storeSetStock,
  slugExists,
} from "@/lib/store";
import { saveImage } from "@/lib/upload";
import { MAX_IMAGE_BYTES } from "@/lib/image-compress";
import { slugify, type Product, type Category } from "@/lib/products";

/* ----------------------------- Auth ----------------------------- */

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    return { error: "Incorrect password. Please try again." };
  }
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, await sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  const from = String(formData.get("from") ?? "/admin");
  redirect(from.startsWith("/admin") ? from : "/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

/* --------------------------- Products --------------------------- */

const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  category: z.enum(["spice-powders", "healthy-choice"]),
  weight: z.string().min(1, "Weight is required"),
  price: z.coerce.number().int().positive("Price must be greater than 0"),
  shortDesc: z.string().min(5, "Short description is required"),
  description: z.string().min(10, "Description is required"),
  ingredients: z.string().min(2, "Ingredients are required"),
  benefits: z.string().min(2, "Add at least one benefit"),
  usage: z.string().min(2, "Usage is required"),
  storage: z.string().min(2, "Storage info is required"),
  badge: z.string().optional(),
});

export type ProductFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function saveProduct(
  _prev: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const originalSlug = String(formData.get("originalSlug") ?? "").trim();
  const isEdit = Boolean(originalSlug);

  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    weight: formData.get("weight"),
    price: formData.get("price"),
    shortDesc: formData.get("shortDesc"),
    description: formData.get("description"),
    ingredients: formData.get("ingredients"),
    benefits: formData.get("benefits"),
    usage: formData.get("usage"),
    storage: formData.get("storage"),
    badge: formData.get("badge"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as string] = issue.message;
    }
    return { error: "Please fix the highlighted fields.", fieldErrors };
  }

  const data = parsed.data;
  const slug = isEdit ? originalSlug : slugify(data.name);

  if (!isEdit && (await slugExists(slug))) {
    return {
      error: "A product with this name already exists. Use a different name.",
    };
  }

  // Image handling
  const existingImage = String(formData.get("existingImage") ?? "");
  const file = formData.get("image");
  let image = existingImage;

  if (file instanceof File && file.size > 0) {
    if (!file.type.startsWith("image/")) {
      return {
        error: "Please fix the highlighted fields.",
        fieldErrors: { image: "That file is not an image." },
      };
    }
    if (file.size > MAX_IMAGE_BYTES) {
      return {
        error: "Please fix the highlighted fields.",
        fieldErrors: { image: "Image is too large. Use a photo under 4 MB." },
      };
    }
    try {
      image = await saveImage(file, slug);
    } catch (err) {
      // Surface upload failures in the form rather than throwing, which would
      // render the opaque "server-side exception" page over the admin panel.
      // This panel is password-protected, so showing the underlying reason is
      // safe and saves a trip to the deployment logs.
      console.error("Product image upload failed:", err);
      const reason = err instanceof Error ? err.message : String(err);
      return {
        error: `The image could not be uploaded. ${reason}`,
        fieldErrors: { image: "Upload failed" },
      };
    }
  }

  if (!image) {
    return {
      error: "Please upload a product image.",
      fieldErrors: { image: "Image is required" },
    };
  }

  const categoryLabel =
    data.category === "spice-powders" ? "Spice Powders" : "Healthy Choice";

  const product: Product = {
    slug,
    name: data.name.trim(),
    category: data.category as Category,
    categoryLabel,
    weight: data.weight.trim(),
    price: data.price,
    image,
    shortDesc: data.shortDesc.trim(),
    description: data.description.trim(),
    ingredients: data.ingredients.trim(),
    benefits: data.benefits
      .split("\n")
      .map((b) => b.trim())
      .filter(Boolean),
    usage: data.usage.trim(),
    storage: data.storage.trim(),
    badge: data.badge?.trim() || undefined,
    bestseller: formData.get("bestseller") === "on",
    inStock: formData.get("inStock") === "on",
  };

  await upsertProduct(product);
  revalidateStorefront(slug);
  redirect("/admin");
}

export async function toggleStock(slug: string, inStock: boolean) {
  await storeSetStock(slug, inStock);
  revalidateStorefront(slug);
}

export async function deleteProduct(slug: string) {
  await storeDelete(slug);
  revalidateStorefront(slug);
}

function revalidateStorefront(slug: string) {
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/healthy-choice");
  revalidatePath(`/product/${slug}`);
  revalidatePath("/admin");
}
