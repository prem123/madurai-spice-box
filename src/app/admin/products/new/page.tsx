import { AdminHeader } from "@/components/admin/admin-header";
import { ProductForm } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  return (
    <>
      <AdminHeader />
      <div className="mx-auto w-full max-w-6xl px-5 py-8">
        <h1 className="font-serif text-3xl font-semibold text-brand-800">
          Add Product
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create a new product for your store.
        </p>
        <div className="mt-6">
          <ProductForm />
        </div>
      </div>
    </>
  );
}
