# Madurai Spice Box 🌶️

A premium, conversion-focused ecommerce website for a South Indian food brand.
Customers browse products, add to cart, and **place orders directly on WhatsApp** —
no payment is collected on the site (paid manually via UPI / QR / bank transfer / link).

Built with **Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn-style UI ·
Framer Motion · Lucide · React Hook Form · Zod · Zustand**.

---

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## ⚙️ IMPORTANT — set your WhatsApp number

Open **`src/lib/site.ts`** and replace these placeholders with your real details:

```ts
whatsappNumber: "919876543210", // country code + number, NO "+" or spaces
phoneDisplay:   "+91 98765 43210",
email:          "orders@maduraispicebox.com",
instagram / facebook / address / url
```

Everything else (shipping fee ₹100, free-shipping threshold ₹1,599) is also configured here.

## 🧾 How ordering works

1. Customer adds products to the cart.
2. On the **Cart** page they fill name / phone / address (validated with Zod).
3. **"Place Order on WhatsApp"** auto-generates a formatted order summary and opens
   `wa.me/<number>?text=...` — see `src/lib/whatsapp.ts`.
4. You confirm and collect payment inside WhatsApp, then ship.

## 📁 Structure

```
src/
  app/                 # 13 routes: home, shop, product/[slug], healthy-choice,
                       #   about, contact, faq, cart, + 5 legal pages, sitemap, robots
  components/
    home/              # hero, trust bar, best sellers, comparison, story,
                       #   testimonials, faq, big WhatsApp CTA
    product/           # ProductCard, QuickView, ProductDetail, ProductGrid
    cart/              # CartDrawer + full CartPage with checkout form
    conversion/        # floating WhatsApp, sticky mobile bar, social proof,
                       #   exit-intent popup
    layout/            # header + footer
    legal/             # reusable legal page layout w/ section nav
    ui/                # button, badge, input, dialog, sheet, accordion, etc.
  lib/                 # site config, products data, cart store (zustand),
                       #   whatsapp message builder, faq, utils
public/
  products/            # 11 optimized product photos (webp)
  brand/               # logo + OG image
```

## 🔐 Admin panel — inventory management

The owner can manage the catalogue at **`/admin`** (full CRUD + stock toggle).

**Login:** go to `/admin` → you'll be redirected to `/admin/login`.
The password comes from the `ADMIN_PASSWORD` env var.

- Local dev default (set in `.env.local`): **`madurai123`** — change it!
- Set `ADMIN_PASSWORD` and `ADMIN_SECRET` in production (see `.env.example`).

**What you can do:**
- Toggle each product **In / Out of stock** (one click, goes live instantly)
- **Add** new products (name, category, weight, price, descriptions, benefits,
  badge, bestseller flag) with **image upload**
- **Edit** any product
- **Delete** products (with confirmation)

**Where data is stored (auto-detected):**
| Environment | Product data | Images |
|---|---|---|
| Vercel (env vars set) | Vercel KV (Redis) | Vercel Blob |
| Local / own server | `.data/products.json` | `public/products/` |

Storefront pages read through a tagged cache and are revalidated on every admin
change, so edits appear immediately without a redeploy.

### Deploying to Vercel
1. Push the repo and import it into Vercel.
2. In **Storage**, add a **Redis (KV)** store and a **Blob** store — Vercel injects
   `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `BLOB_READ_WRITE_TOKEN` automatically.
3. In **Settings → Environment Variables**, add `ADMIN_PASSWORD` and `ADMIN_SECRET`.
4. Deploy. The catalogue seeds itself from `src/lib/products.ts` on first load.

## 🛍️ Products

Data lives in **`src/lib/products.ts`** — edit prices, weights, ingredients,
benefits, stock status there. Images are in `public/products/`.

- **Spice Powders:** Coriander, Garam Masala, Chicken Masala, Turmeric, Sambar,
  Idly Podi, Red Chilli, Kuzhambu
- **Healthy Choice:** Uzhundhu Kali Mix, Vendaya Kali Mix, Health Mix (31 ingredients)

## ✅ Included

- Mobile-first, responsive, accessible (semantic HTML, focus states, reduced-motion)
- SEO: per-page metadata, Open Graph + Twitter cards, JSON-LD (Store, Product, FAQ),
  `sitemap.xml`, `robots.txt`
- Conversion: sticky mobile order bar, exit-intent offer, social-proof toasts,
  trust badges, free-shipping progress, WhatsApp everywhere
- Premium subtle Framer Motion animations + micro-interactions
- Fast: static/SSG pages, optimized images, ~105 KB shared JS

> The brand assets (PDFs / screenshot) used to extract product photos and prices
> are the original `*.pdf` files in the project root — safe to delete.
