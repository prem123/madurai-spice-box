import { Leaf, Ban, Hammer, Package, Award } from "lucide-react";

const items = [
  { icon: Leaf, label: "100% Natural" },
  { icon: Ban, label: "No Artificial Colors" },
  { icon: Hammer, label: "Freshly Ground" },
  { icon: Package, label: "Small Batches" },
  { icon: Award, label: "Premium Ingredients" },
];

export function TrustBar() {
  return (
    <section className="border-y border-brand-100 bg-beige/40">
      <div className="container-tight py-5">
        {/* Marquee on mobile, grid on desktop */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {items.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-2.5 text-center"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-spice shadow-soft">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-brand-700">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
