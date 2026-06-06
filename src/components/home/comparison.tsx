import { Check, X } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";

const rows = [
  { label: "Production", others: "Mass produced", us: "Small batch" },
  { label: "Freshness", others: "Stored for months", us: "Freshly ground" },
  { label: "Preservatives", others: "Often added", us: "None, ever" },
  { label: "Ingredients", others: "Unknown sources", us: "Carefully selected" },
  { label: "Colour", others: "Artificial dyes", us: "100% natural" },
];

export function Comparison() {
  return (
    <section className="section">
      <div className="container-tight">
        <SectionHeading
          eyebrow="The Difference"
          title="Why Choose Madurai Spice Box"
          subtitle="Not all masalas are made equal. Here's how we compare to mass-market brands."
        />

        <Reveal className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-card">
          <div className="grid grid-cols-3 bg-brand-800 text-cream">
            <div className="px-4 py-4 text-sm font-semibold sm:px-6">&nbsp;</div>
            <div className="px-4 py-4 text-center text-sm font-semibold sm:px-6">
              Others
            </div>
            <div className="bg-spice px-4 py-4 text-center text-sm font-semibold sm:px-6">
              Madurai Spice Box
            </div>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 items-center ${
                i % 2 ? "bg-beige/30" : "bg-white"
              }`}
            >
              <div className="px-4 py-4 text-sm font-semibold text-brand-800 sm:px-6">
                {row.label}
              </div>
              <div className="flex items-center justify-center gap-1.5 px-2 py-4 text-center text-xs text-muted-foreground sm:px-6 sm:text-sm">
                <X className="h-4 w-4 shrink-0 text-chilli/70" />
                <span>{row.others}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 bg-spice/5 px-2 py-4 text-center text-xs font-medium text-brand-800 sm:px-6 sm:text-sm">
                <Check className="h-4 w-4 shrink-0 text-whatsapp-dark" />
                <span>{row.us}</span>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
