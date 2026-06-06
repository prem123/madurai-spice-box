"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { type Product, type Category } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CategoryChip {
  id: Category;
  label: string;
  count: number;
}

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "name", label: "Name: A–Z" },
];

export function ShopClient({
  products,
  categories,
  initialCategory = "all",
}: {
  products: Product[];
  categories: CategoryChip[];
  initialCategory?: Category | "all";
}) {
  const [category, setCategory] = useState<Category | "all">(initialCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      category === "all" ? true : p.category === category
    );
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "name":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list = [...list].sort(
          (a, b) => Number(b.bestseller ?? 0) - Number(a.bestseller ?? 0)
        );
    }
    return list;
  }, [products, category, query, sort]);

  const chips = [
    { id: "all" as const, label: "All", count: products.length },
    ...categories,
  ];

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Category chips */}
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {chips.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                category === c.id
                  ? "border-brand-600 bg-brand-600 text-cream"
                  : "border-brand-100 bg-white text-brand-700 hover:border-brand-300"
              )}
            >
              {c.label}{" "}
              <span className="opacity-60">({c.count})</span>
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          {/* Search */}
          <div className="relative flex-1 lg:w-64">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search masalas..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {/* Sort */}
          <div className="relative">
            <SlidersHorizontal className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort products"
              className="h-11 appearance-none rounded-xl border border-input bg-white pl-10 pr-8 text-sm font-medium text-brand-700 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {sortOptions.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <p className="mt-6 text-sm text-muted-foreground">
        Showing <span className="font-semibold text-brand-800">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "product" : "products"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-5 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="font-serif text-2xl font-semibold text-brand-800">
            No products found
          </p>
          <p className="mt-2 text-muted-foreground">
            Try a different search or category.
          </p>
        </div>
      )}
    </div>
  );
}
