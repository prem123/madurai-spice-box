import { faqs } from "@/lib/faq";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection({ items = faqs }: { items?: typeof faqs }) {
  return (
    <section className="section">
      <div className="container-tight max-w-3xl">
        <SectionHeading
          eyebrow="Questions?"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about ordering, payment and delivery."
        />
        <Reveal className="mt-10">
          <Accordion type="single" collapsible defaultValue="item-0">
            {items.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
