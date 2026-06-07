"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, MessageCircle } from "lucide-react";
import { NAV_LINKS, siteConfig } from "@/lib/site";
import { enquiryLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CartButton } from "@/components/layout/cart-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-brand-100 bg-cream/85 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      )}
    >
      <div className="container-tight flex h-16 items-center justify-between gap-4 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/brand/logo.webp"
            alt="Madurai Spice Box"
            width={44}
            height={44}
            className="rounded-full"
            priority
          />
          <div className="hidden flex-col leading-none sm:flex">
            <span className="font-serif text-lg font-semibold text-brand-800">
              Madurai Spice Box
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-spice">
              Homemade Masalas
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-50 text-brand-800"
                    : "text-brand-700 hover:bg-brand-50/60"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            asChild
            variant="whatsapp"
            size="sm"
            className="hidden md:inline-flex"
          >
            <a href={enquiryLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" /> Order Now
            </a>
          </Button>
          <CartButton />

          {/* Mobile menu */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="flex h-11 w-11 items-center justify-center rounded-full text-brand-700 transition-colors hover:bg-brand-50 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                        pathname === link.href
                          ? "bg-brand-50 text-brand-800"
                          : "text-brand-700 hover:bg-brand-50/60"
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-4 px-4">
                <Button asChild variant="whatsapp" className="w-full">
                  <a
                    href={enquiryLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" /> Order on WhatsApp
                  </a>
                </Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  {siteConfig.phoneDisplay}
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
