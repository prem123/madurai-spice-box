export type Category = "spice-powders" | "healthy-choice";

export interface Product {
  slug: string;
  name: string;
  category: Category;
  categoryLabel: string;
  weight: string;
  price: number;
  image: string;
  shortDesc: string;
  description: string;
  ingredients: string;
  benefits: string[];
  usage: string;
  storage: string;
  badge?: string;
  bestseller?: boolean;
  inStock: boolean;
}

const STORAGE =
  "Store in a cool, dry place away from direct sunlight. Keep the pack tightly sealed after each use to preserve freshness and aroma.";

export const SEED_PRODUCTS: Product[] = [
  {
    slug: "coriander-powder",
    name: "Coriander Powder",
    category: "spice-powders",
    categoryLabel: "Spice Powders",
    weight: "250 g",
    price: 150,
    image: "/products/coriander-powder.webp",
    shortDesc: "Freshly ground coriander seeds with a warm, citrusy aroma.",
    description:
      "Sun-dried coriander seeds, slow-roasted and stone-ground in small batches to lock in the natural oils. A daily essential that adds body, colour and a gentle citrus warmth to every South Indian gravy.",
    ingredients: "100% pure roasted coriander seeds (Dhania).",
    benefits: [
      "Aids digestion and gut comfort",
      "No added colour or preservatives",
      "Rich, aromatic flavour base",
      "Freshly ground in small batches",
    ],
    usage:
      "Use 1–2 tsp in sambar, kuzhambu, kurma and vegetable gravies. Add early in cooking to develop flavour.",
    storage: STORAGE,
    badge: "Everyday Essential",
    bestseller: true,
    inStock: true,
  },
  {
    slug: "garam-masala",
    name: "Garam Masala",
    category: "spice-powders",
    categoryLabel: "Spice Powders",
    weight: "100 g",
    price: 170,
    image: "/products/garam-masala.webp",
    shortDesc: "A fragrant blend of hand-picked whole spices.",
    description:
      "Cinnamon, cardamom, cloves, star anise and bay leaf, roasted and ground together in our signature Madurai proportion. A finishing spice that brings instant depth and warmth to biryanis and rich curries.",
    ingredients:
      "Coriander, cumin, cinnamon, cardamom, cloves, black pepper, star anise, bay leaf, nutmeg.",
    benefits: [
      "Bold, layered aroma",
      "Small-batch roasted for freshness",
      "No fillers or artificial flavour",
      "A little goes a long way",
    ],
    usage:
      "Sprinkle ½–1 tsp towards the end of cooking biryani, paneer, chicken and vegetable curries.",
    storage: STORAGE,
    badge: "Signature Blend",
    bestseller: true,
    inStock: true,
  },
  {
    slug: "chicken-masala",
    name: "Chicken Masala",
    category: "spice-powders",
    categoryLabel: "Spice Powders",
    weight: "250 g",
    price: 190,
    image: "/products/chicken-masala.webp",
    shortDesc: "A robust Chettinad-style masala for non-veg gravies.",
    description:
      "A fiery, aromatic blend crafted for chicken and mutton gravies in true Madurai style. Balanced heat, deep colour and a roasted finish that tastes like a Sunday kitchen.",
    ingredients:
      "Red chilli, coriander, cumin, fennel, pepper, cinnamon, cloves, cardamom, curry leaf.",
    benefits: [
      "Authentic Chettinad-style heat",
      "Deep colour, no artificial dye",
      "Freshly ground whole spices",
      "Restaurant flavour at home",
    ],
    usage:
      "Use 2–3 tbsp per ½ kg chicken. Marinate or add while sautéing onion-tomato base.",
    storage: STORAGE,
    bestseller: true,
    inStock: true,
  },
  {
    slug: "turmeric-powder",
    name: "Turmeric Powder",
    category: "spice-powders",
    categoryLabel: "Spice Powders",
    weight: "250 g",
    price: 180,
    image: "/products/turmeric-powder.webp",
    shortDesc: "High-curcumin turmeric with a vivid golden colour.",
    description:
      "Premium turmeric roots, cleaned and finely ground to a vibrant gold. Pure, earthy and naturally rich in curcumin — an everyday spice with traditional wellness value.",
    ingredients: "100% pure turmeric (Manjal).",
    benefits: [
      "Naturally rich in curcumin",
      "Vivid colour without additives",
      "Supports everyday wellness",
      "No starch or fillers",
    ],
    usage:
      "Add ¼–½ tsp to gravies, rasam, dals and marinades. Also used in traditional skincare.",
    storage: STORAGE,
    inStock: true,
  },
  {
    slug: "sambar-powder",
    name: "Sambar Powder",
    category: "spice-powders",
    categoryLabel: "Spice Powders",
    weight: "250 g",
    price: 170,
    image: "/products/sambar-powder.webp",
    shortDesc: "The soul of South Indian sambar, ground fresh.",
    description:
      "A time-honoured blend of dals, red chillies and coriander roasted to a fragrant brown. One spoon transforms plain dal and vegetables into authentic, hearty sambar.",
    ingredients:
      "Red chilli, coriander, toor dal, channa dal, fenugreek, curry leaf, asafoetida, turmeric.",
    benefits: [
      "Authentic homestyle taste",
      "Balanced heat and tang",
      "No preservatives or colour",
      "Freshly roasted dals",
    ],
    usage:
      "Add 1–2 tbsp to sambar, vathakuzhambu and vegetable gravies while boiling.",
    storage: STORAGE,
    bestseller: true,
    inStock: true,
  },
  {
    slug: "idly-podi",
    name: "Idly Podi",
    category: "spice-powders",
    categoryLabel: "Spice Powders",
    weight: "250 g",
    price: 180,
    image: "/products/idly-podi.webp",
    shortDesc: "Classic gunpowder for idli & dosa, mixed with ghee.",
    description:
      "Roasted lentils, sesame and red chilli ground into the perfect idli companion. Nutty, spicy and irresistible — just mix with a spoon of gingelly oil or ghee.",
    ingredients:
      "Urad dal, channa dal, sesame seeds, red chilli, curry leaf, asafoetida, salt.",
    benefits: [
      "Protein-rich roasted lentils",
      "Perfect with idli & dosa",
      "No preservatives",
      "Authentic nutty flavour",
    ],
    usage: "Mix 1–2 tsp with gingelly oil or ghee. Serve with idli, dosa or rice.",
    storage: STORAGE,
    inStock: true,
  },
  {
    slug: "red-chilli-powder",
    name: "Red Chilli Powder",
    category: "spice-powders",
    categoryLabel: "Spice Powders",
    weight: "250 g",
    price: 150,
    image: "/products/red-chilli-powder.webp",
    shortDesc: "Pure ground red chillies — bright colour, clean heat.",
    description:
      "Sun-dried red chillies ground to a fine, fiery powder. Naturally bright in colour with clean, honest heat and absolutely no artificial dye.",
    ingredients: "100% pure red chilli (Milagai).",
    benefits: [
      "Natural colour, no dye",
      "Clean, even heat",
      "Freshly ground",
      "No preservatives",
    ],
    usage: "Add to taste in gravies, marinades and chutneys.",
    storage: STORAGE,
    inStock: true,
  },
  {
    slug: "kuzhambu-powder",
    name: "Kuzhambu Powder",
    category: "spice-powders",
    categoryLabel: "Spice Powders",
    weight: "250 g",
    price: 170,
    image: "/products/kuzhambu-powder.webp",
    shortDesc: "A tangy-spicy base for traditional Tamil kuzhambu.",
    description:
      "A robust, roasted blend made for vatha kuzhambu, puli kuzhambu and kara kuzhambu. Deep, tangy and warming — the taste of a traditional Madurai kitchen.",
    ingredients:
      "Red chilli, coriander, toor dal, channa dal, fenugreek, pepper, curry leaf, asafoetida.",
    benefits: [
      "Authentic kuzhambu flavour",
      "Balanced spice and tang",
      "Freshly roasted",
      "No artificial additives",
    ],
    usage: "Add 1–2 tbsp to tamarind-based kuzhambu while simmering.",
    storage: STORAGE,
    inStock: true,
  },
  // ---- Healthy Choice ----
  {
    slug: "uzhundhu-kali-mix",
    name: "Uzhundhu Kali Mix",
    category: "healthy-choice",
    categoryLabel: "Healthy Choice",
    weight: "500 g",
    price: 150,
    image: "/products/uzhundhu-kali-mix.webp",
    shortDesc: "Traditional black urad strength mix for bone & joint health.",
    description:
      "A traditional Tamil preparation made from black urad dal (uzhundhu), known for building strength and supporting bone and joint health. A nourishing recipe passed down through generations.",
    ingredients: "Roasted black urad dal, rice, traditional grains.",
    benefits: [
      "Supports bone & joint strength",
      "Traditional postnatal nutrition",
      "Rich in natural protein",
      "No preservatives",
    ],
    usage:
      "Cook with jaggery and water to a soft halwa-like consistency. Best had warm.",
    storage: STORAGE,
    badge: "Strength Mix",
    inStock: true,
  },
  {
    slug: "vendaya-kali-mix",
    name: "Vendaya Kali Mix",
    category: "healthy-choice",
    categoryLabel: "Healthy Choice",
    weight: "500 g",
    price: 150,
    image: "/products/vendaya-kali-mix.webp",
    shortDesc: "Fenugreek-based cooling mix for digestion & wellness.",
    description:
      "A wholesome fenugreek (vendaya) based traditional mix valued for its cooling properties and digestive support. A gentle, nourishing recipe rooted in Tamil home wisdom.",
    ingredients: "Roasted fenugreek, rice, traditional grains.",
    benefits: [
      "Supports digestion",
      "Naturally cooling for the body",
      "Traditional wellness recipe",
      "No preservatives",
    ],
    usage: "Cook with jaggery and water to a smooth kali. Serve warm.",
    storage: STORAGE,
    badge: "Wellness Mix",
    inStock: true,
  },
  {
    slug: "health-mix",
    name: "Health Mix",
    category: "healthy-choice",
    categoryLabel: "Healthy Choice",
    weight: "250 g",
    price: 200,
    image: "/products/health-mix.webp",
    shortDesc: "A wholesome drink made from 31 natural ingredients.",
    description:
      "A complete, nourishing health drink crafted from 31 carefully selected natural ingredients — millets, grains, pulses, nuts and spices. A balanced, energising start to the day for the whole family.",
    ingredients:
      "31 natural ingredients including wheat, maize, barley, pearl millet, foxtail millet, kodo millet, ragi, sorghum, green gram, horse gram, soya, almond, cashew, cardamom, dry ginger and more.",
    benefits: [
      "Made with 31 natural ingredients",
      "Rich in protein & fibre",
      "Boosts energy & immunity",
      "No preservatives, made with care",
    ],
    usage:
      "Mix 2–3 tbsp in hot milk or water. Add jaggery or sugar to taste. Enjoy as a porridge or drink.",
    storage: STORAGE,
    badge: "31 Ingredients",
    bestseller: true,
    inStock: true,
  },
];

/** Category metadata (labels). Counts are computed dynamically from live data. */
export const CATEGORY_META: { id: Category; label: string }[] = [
  { id: "spice-powders", label: "Spice Powders" },
  { id: "healthy-choice", label: "Healthy Choice" },
];

// ---- Pure helpers (operate on a provided list) ----
export const findProduct = (list: Product[], slug: string) =>
  list.find((p) => p.slug === slug);

export const filterCategory = (list: Product[], category: Category) =>
  list.filter((p) => p.category === category);

export const pickBestSellers = (list: Product[]) =>
  list.filter((p) => p.bestseller);

export const computeCategories = (list: Product[]) =>
  CATEGORY_META.map((c) => ({
    ...c,
    count: list.filter((p) => p.category === c.id).length,
  }));

/** Build a URL-safe slug from a product name. */
export const slugify = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
