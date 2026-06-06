import Link from "next/link";
import { Home, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="bg-hero-gradient spice-texture">
      <div className="container-tight flex min-h-[70vh] flex-col items-center justify-center text-center">
        <span className="font-serif text-7xl font-semibold text-spice">404</span>
        <h1 className="mt-4 font-serif text-3xl font-semibold text-brand-800">
          This page has gone missing
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          Like a spice that&apos;s run out, this page isn&apos;t here. Let&apos;s
          get you back to the good stuff.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="h-4 w-4" /> Back Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/shop">
              <ShoppingBag className="h-4 w-4" /> Browse Shop
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
