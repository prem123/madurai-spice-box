import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/store";
import { AdminHeader } from "@/components/admin/admin-header";
import { ProductForm } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <AdminHeader />
      <div className="mx-auto w-full max-w-6xl px-5 py-8">
        <h1 className="font-serif text-3xl font-semibold text-brand-800">
          Edit Product
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update details for <span className="font-medium">{product.name}</span>.
        </p>
        <div className="mt-6">
          <ProductForm product={product} />
        </div>
      </div>
    </>
  );
}
