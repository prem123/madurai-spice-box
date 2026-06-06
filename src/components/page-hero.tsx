import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "border-b border-brand-100 bg-hero-gradient spice-texture",
        className
      )}
    >
      <div className="container-tight py-12 text-center sm:py-16">
        {eyebrow && <span className="eyebrow animate-fade-up">{eyebrow}</span>}
        <h1 className="heading-xl mx-auto mt-4 max-w-3xl text-4xl sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brand-700/80 sm:text-lg">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
