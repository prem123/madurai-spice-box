import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { NAV_LINKS, LEGAL_LINKS, siteConfig } from "@/lib/site";
import { enquiryLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-brand-100 bg-brand-800 text-cream/90">
      <div className="container-tight grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <Image
              src="/brand/logo.webp"
              alt="Madurai Spice Box"
              width={44}
              height={44}
              className="rounded-xl"
            />
            <span className="font-serif text-xl font-semibold text-cream">
              Madurai Spice Box
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            Pure, freshly ground masalas and traditional health mixes — made the
            Madurai way, with no preservatives and homemade love.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href={enquiryLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp transition-colors hover:bg-whatsapp-dark"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-serif text-base font-semibold text-cream">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-cream/70 transition-colors hover:text-cream"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/cart"
                className="text-cream/70 transition-colors hover:text-cream"
              >
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="font-serif text-base font-semibold text-cream">
            Customer Support
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-cream/70 transition-colors hover:text-cream"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-serif text-base font-semibold text-cream">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/70">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-spice" />
              {siteConfig.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-spice" />
              <a href={`tel:+${siteConfig.whatsappNumber}`} className="hover:text-cream">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-spice" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-cream">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-tight flex flex-col items-center justify-between gap-2 py-5 text-center text-xs text-cream/60 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} Madurai Spice Box. All rights reserved.
          </p>
          <p>Handcrafted in Madurai · Orders via WhatsApp</p>
        </div>
      </div>
    </footer>
  );
}
