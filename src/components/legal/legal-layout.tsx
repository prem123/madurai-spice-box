import Link from "next/link";
import { type ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { LEGAL_LINKS, siteConfig } from "@/lib/site";
import { enquiryLink } from "@/lib/whatsapp";

export interface LegalSection {
  id: string;
  heading: string;
  body: ReactNode;
}

export function LegalLayout({
  eyebrow = "Legal",
  title,
  subtitle,
  updated = "June 2026",
  sections,
  currentHref,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  updated?: string;
  sections: LegalSection[];
  currentHref: string;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle}>
        <p className="text-xs font-medium uppercase tracking-wider text-spice">
          Last updated: {updated}
        </p>
      </PageHero>

      <section className="section">
        <div className="container-tight grid gap-10 lg:grid-cols-[240px_1fr]">
          {/* Section nav */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-wider text-spice">
                On this page
              </p>
              <nav className="mt-3 flex flex-col gap-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-lg px-3 py-2 text-sm text-brand-700 transition-colors hover:bg-brand-50"
                  >
                    {s.heading}
                  </a>
                ))}
              </nav>
            </div>

            <div className="mt-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-wider text-spice">
                More Policies
              </p>
              <nav className="mt-3 flex flex-col gap-1">
                {LEGAL_LINKS.filter((l) => l.href !== currentHref).map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="rounded-lg px-3 py-2 text-sm text-brand-700 transition-colors hover:bg-brand-50"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div>
            <div className="space-y-10">
              {sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  <h2 className="font-serif text-2xl font-semibold text-brand-800">
                    {s.heading}
                  </h2>
                  <div className="prose-legal mt-3 space-y-3 text-[15px] leading-relaxed text-muted-foreground [&_a]:text-spice [&_a]:underline-offset-2 [&_li]:ml-1 [&_strong]:text-brand-800 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
                    {s.body}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-3xl bg-warm-gradient p-7 text-cream shadow-card sm:p-9">
              <h3 className="font-serif text-2xl font-semibold">
                Have a question about this policy?
              </h3>
              <p className="mt-2 text-cream/85">
                We&apos;re happy to help. Message us on WhatsApp and we&apos;ll
                get back to you quickly.
              </p>
              <Button
                asChild
                variant="whatsapp"
                size="lg"
                className="mt-5 bg-whatsapp hover:bg-whatsapp-dark"
              >
                <a href={enquiryLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" /> Chat with Us
                </a>
              </Button>
              <p className="mt-4 text-xs text-cream/70">
                {siteConfig.email} · {siteConfig.phoneDisplay}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
