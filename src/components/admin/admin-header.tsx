import Image from "next/image";
import Link from "next/link";
import { ExternalLink, LogOut, Package } from "lucide-react";
import { logout } from "@/app/admin/actions";
import { STORAGE_MODE } from "@/lib/store";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-brand-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/admin" className="flex items-center gap-2.5">
          <Image
            src="/brand/logo.webp"
            alt="Madurai Spice Box"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <div className="leading-none">
            <p className="font-serif text-base font-semibold text-brand-800">
              Admin Panel
            </p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-spice">
              {STORAGE_MODE === "vercel-kv" ? "Vercel KV" : "Local storage"}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/admin">
              <Package className="h-4 w-4" /> Inventory
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" /> View Site
            </a>
          </Button>
          <form action={logout}>
            <Button type="submit" variant="ghost" size="sm">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
