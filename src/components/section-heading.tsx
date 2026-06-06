import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="heading-lg max-w-2xl">{title}</h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-xl text-base leading-relaxed text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
