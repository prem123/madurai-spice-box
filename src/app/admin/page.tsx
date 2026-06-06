import Link from "next/link";
import { Plus, Package, CheckCircle2, XCircle, Star } from "lucide-react";
import { getAllProducts } from "@/lib/store";
import { AdminHeader } from "@/components/admin/admin-header";
import { InventoryTable } from "@/components/admin/inventory-table";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const products = await getAllProducts();
  const inStock = products.filter((p) => p.inStock).length;
  const outStock = products.length - inStock;
  const bestsellers = products.filter((p) => p.bestseller).length;

  const stats = [
    { label: "Total Products", value: products.length, icon: Package, color: "text-brand-600" },
    { label: "In Stock", value: inStock, icon: CheckCircle2, color: "text-whatsapp-dark" },
    { label: "Out of Stock", value: outStock, icon: XCircle, color: "text-chilli" },
    { label: "Bestsellers", value: bestsellers, icon: Star, color: "text-spice" },
  ];

  return (
    <>
      <AdminHeader />
      <div className="mx-auto w-full max-w-6xl px-5 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-brand-800">
              Inventory
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage products, prices and stock. Changes go live instantly.
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4" /> Add Product
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"
            >
              <Icon className={`h-6 w-6 ${color}`} />
              <p className="mt-3 text-3xl font-bold text-brand-800">{value}</p>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <InventoryTable products={products} />
        </div>
      </div>
    </>
  );
}
