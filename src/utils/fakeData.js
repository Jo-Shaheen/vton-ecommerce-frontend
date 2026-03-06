/* ─────────────────────────────────────────────
   AINAI – Fake Data
   Mock data for development before API integration
───────────────────────────────────────────── */

export const PRODUCTS = [
  {
    id: 1,
    name: "Kaftan Al-Noor",
    brand: "Dar Zain",
    price: 420,
    currency: "AED",
    tag: "VTON Ready",
    color: "#c9b08a",
    category: "Kaftan",
    description: "Elegant hand-embroidered kaftan with golden thread detailing.",
    sizes: ["S", "M", "L", "XL"],
    image: null,
  },
  {
    id: 2,
    name: "Embroidered Abaya",
    brand: "Lulwa Studio",
    price: 680,
    currency: "AED",
    tag: "Bestseller",
    color: "#8B4852",
    category: "Abaya",
    description: "Premium abaya with intricate floral embroidery on sleeves and hem.",
    sizes: ["S", "M", "L"],
    image: null,
  },
  {
    id: 3,
    name: "Silk Jalabiya",
    brand: "Ghaya Collection",
    price: 390,
    currency: "AED",
    tag: "New",
    color: "#A8B5A0",
    category: "Jalabiya",
    description: "Lightweight silk jalabiya perfect for warm evenings.",
    sizes: ["M", "L", "XL"],
    image: null,
  },
  {
    id: 4,
    name: "Modern Thobe",
    brand: "Oud & Silk",
    price: 510,
    currency: "AED",
    tag: "VTON Ready",
    color: "#6d3640",
    category: "Thobe",
    description: "Contemporary thobe with a minimalist cut and hidden buttons.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: null,
  },
  {
    id: 5,
    name: "Lace Trim Abaya",
    brand: "Al Waha",
    price: 550,
    currency: "AED",
    tag: "VTON Ready",
    color: "#3A302B",
    category: "Abaya",
    description: "Black abaya with delicate French lace trim along the cuffs.",
    sizes: ["S", "M", "L"],
    image: null,
  },
  {
    id: 6,
    name: "Velvet Kaftan",
    brand: "Zomoroda",
    price: 720,
    currency: "AED",
    tag: "New",
    color: "#6d3640",
    category: "Kaftan",
    description: "Luxurious velvet kaftan with gold button accents.",
    sizes: ["M", "L", "XL"],
    image: null,
  },
  {
    id: 7,
    name: "Everyday Abaya",
    brand: "Dar Zain",
    price: 280,
    currency: "AED",
    tag: "Bestseller",
    color: "#5c4f48",
    category: "Abaya",
    description: "Comfortable daily-wear abaya in breathable crepe fabric.",
    sizes: ["S", "M", "L", "XL"],
    image: null,
  },
  {
    id: 8,
    name: "Pearl Jalabiya",
    brand: "Lulwa Studio",
    price: 460,
    currency: "AED",
    tag: "VTON Ready",
    color: "#D4AF7A",
    category: "Jalabiya",
    description: "Elegant jalabiya adorned with hand-sewn pearl detailing.",
    sizes: ["S", "M", "L"],
    image: null,
  },
];

export const BRANDS = [
  "Dar Zain",
  "Lulwa Studio",
  "Ghaya Collection",
  "Oud & Silk",
  "Al Waha",
  "Zomoroda",
];

export const CATEGORIES = ["Abaya", "Kaftan", "Jalabiya", "Thobe"];

export const STEPS = [
  { num: "01", title: "Browse", desc: "Discover modest fashion from top MENA designers." },
  { num: "02", title: "Upload", desc: "Upload your photo — it stays private & auto-deletes in 7 days." },
  { num: "03", title: "Generate", desc: "Our Flux AI renders the garment on your body in seconds." },
  { num: "04", title: "Buy with Confidence", desc: "See the fit before checkout. Fewer returns, more smiles." },
];

export function formatPrice(price, currency = "AED") {
  return `${currency} ${price}`;
}

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

export function filterProducts({ search = "", category = "", brand = "" } = {}) {
  return PRODUCTS.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || p.category === category;
    const matchesBrand = !brand || p.brand === brand;
    return matchesSearch && matchesCategory && matchesBrand;
  });
}
