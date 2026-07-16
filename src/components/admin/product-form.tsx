"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import { ArrowLeft, Loader2, Save, Upload } from "lucide-react";
import { type Product } from "@/lib/products";
import { compressImage, MAX_IMAGE_BYTES } from "@/lib/image-compress";
import { saveProduct, type ProductFormState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-chilli">{msg}</p>;
}

export function ProductForm({ product }: { product?: Product }) {
  const isEdit = Boolean(product);
  const [state, formAction, pending] = useActionState<
    ProductFormState,
    FormData
  >(saveProduct, {});
  const [preview, setPreview] = useState<string | null>(product?.image ?? null);
  const [imageBusy, setImageBusy] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  // Camera photos are far too large to submit as-is: the server action rejects
  // any body over the configured limit before it runs. Downscale on selection
  // and put the smaller file back into the input, so the plain form submit
  // carries the compressed version.
  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    setImageBusy(true);
    setImageError(null);
    try {
      const compressed = await compressImage(file);

      if (compressed.size > MAX_IMAGE_BYTES) {
        setImageError(
          "This image is too large to upload. Please use a photo under 4 MB."
        );
        setPreview(null);
        input.value = "";
        return;
      }

      const dt = new DataTransfer();
      dt.items.add(compressed);
      input.files = dt.files;
      setPreview(URL.createObjectURL(compressed));
    } finally {
      setImageBusy(false);
    }
  }

  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="originalSlug" value={product?.slug ?? ""} />
      <input
        type="hidden"
        name="existingImage"
        value={product?.image ?? ""}
      />

      {state.error && (
        <p className="rounded-xl bg-chilli/10 px-4 py-3 text-sm font-medium text-chilli">
          {state.error}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main fields */}
        <div className="space-y-5 rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={product?.name}
                placeholder="e.g. Coriander Powder"
                className="mt-1.5"
              />
              <FieldError msg={fe.name} />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                defaultValue={product?.category ?? "spice-powders"}
                className="mt-1.5 h-11 w-full rounded-xl border border-input bg-white px-3 text-sm text-brand-700 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="spice-powders">Spice Powders</option>
                <option value="healthy-choice">Healthy Choice</option>
              </select>
              <FieldError msg={fe.category} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  name="weight"
                  defaultValue={product?.weight}
                  placeholder="250 g"
                  className="mt-1.5"
                />
                <FieldError msg={fe.weight} />
              </div>
              <div>
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min={1}
                  defaultValue={product?.price}
                  placeholder="150"
                  className="mt-1.5"
                />
                <FieldError msg={fe.price} />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="shortDesc">Short Description</Label>
            <Input
              id="shortDesc"
              name="shortDesc"
              defaultValue={product?.shortDesc}
              placeholder="One-line summary shown on product cards"
              className="mt-1.5"
            />
            <FieldError msg={fe.shortDesc} />
          </div>

          <div>
            <Label htmlFor="description">Full Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={product?.description}
              placeholder="Detailed product description…"
              className="mt-1.5 min-h-[110px]"
            />
            <FieldError msg={fe.description} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="ingredients">Ingredients</Label>
              <Textarea
                id="ingredients"
                name="ingredients"
                defaultValue={product?.ingredients}
                placeholder="List of ingredients"
                className="mt-1.5"
              />
              <FieldError msg={fe.ingredients} />
            </div>
            <div>
              <Label htmlFor="benefits">Benefits (one per line)</Label>
              <Textarea
                id="benefits"
                name="benefits"
                defaultValue={product?.benefits.join("\n")}
                placeholder={"Aids digestion\nNo preservatives\nFreshly ground"}
                className="mt-1.5"
              />
              <FieldError msg={fe.benefits} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="usage">How to Use</Label>
              <Textarea
                id="usage"
                name="usage"
                defaultValue={product?.usage}
                className="mt-1.5"
              />
              <FieldError msg={fe.usage} />
            </div>
            <div>
              <Label htmlFor="storage">Storage Instructions</Label>
              <Textarea
                id="storage"
                name="storage"
                defaultValue={product?.storage}
                className="mt-1.5"
              />
              <FieldError msg={fe.storage} />
            </div>
          </div>
        </div>

        {/* Sidebar: image + flags */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
            <Label>Product Image</Label>
            <div className="mt-2 overflow-hidden rounded-xl border border-dashed border-brand-200 bg-beige/30">
              {preview ? (
                <div className="relative aspect-square">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    sizes="320px"
                    className="object-cover"
                    unoptimized={preview.startsWith("blob:")}
                  />
                </div>
              ) : (
                <div className="flex aspect-square flex-col items-center justify-center gap-2 text-muted-foreground">
                  <Upload className="h-7 w-7" />
                  <span className="text-xs">No image selected</span>
                </div>
              )}
            </div>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-3 block w-full text-xs text-muted-foreground file:mr-3 file:rounded-full file:border-0 file:bg-brand-600 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-cream hover:file:bg-brand-700"
            />
            <FieldError msg={imageError ?? fe.image} />
            {imageBusy && (
              <p className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" /> Optimising image…
              </p>
            )}
            <p className="mt-2 text-[11px] text-muted-foreground">
              {isEdit
                ? "Leave empty to keep the current image."
                : "Upload a square product photo (JPG/PNG/WebP)."}
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
            <div>
              <Label htmlFor="badge">Badge (optional)</Label>
              <Input
                id="badge"
                name="badge"
                defaultValue={product?.badge}
                placeholder="e.g. Signature Blend"
                className="mt-1.5"
              />
            </div>
            <label className="flex items-center justify-between gap-3 text-sm font-medium text-brand-800">
              In stock
              <input
                type="checkbox"
                name="inStock"
                defaultChecked={product?.inStock ?? true}
                className="h-5 w-5 accent-[#25D366]"
              />
            </label>
            <label className="flex items-center justify-between gap-3 text-sm font-medium text-brand-800">
              Mark as bestseller
              <input
                type="checkbox"
                name="bestseller"
                defaultChecked={product?.bestseller ?? false}
                className="h-5 w-5 accent-[#C97B36]"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button type="submit" size="lg" disabled={pending || imageBusy}>
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving…
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> {isEdit ? "Save Changes" : "Create Product"}
            </>
          )}
        </Button>
        <Button asChild variant="ghost" size="lg">
          <Link href="/admin">
            <ArrowLeft className="h-4 w-4" /> Cancel
          </Link>
        </Button>
      </div>
    </form>
  );
}
