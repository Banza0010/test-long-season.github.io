export { default as heroImage } from "./LongSeason_Homebg.webp"
export const editorialImages = [];

export type ShopLook = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  collection: string;
  productIds: string[];
};

export const shopLooks: ShopLook[] = [];

const u = (id: string, w = 1080) =>
  `https://images.unsplash.com/photo-${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=${w}`;

/** A single purchasable variant — present only when sourced from Shopify. */
export type ProductVariant = {
  id: string; // Shopify variant GID — used for cart / checkout later
  size: string; // maps to the "Size" option value
  available: boolean;
  quantityAvailable: number | null;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  collection: string;
  category: "apparel" | "accessories";
  images: string[];
  description: string;
  descriptionHtml?: string;   // ← new — present only when sourced from Shopify
  sizes: string[];
  variants?: ProductVariant[];
};

export const products: Product[] = [];

export type Collection = {
  slug: string;
  name: string;
  image: string;
  description: string;
  archived?: boolean; // from the custom.archived metafield; undefined for static data
  isTicket?: boolean; // from the custom.is_ticket metafield; undefined for static data
};

export const collections: Collection[] = [];

export const stockists = [
  { city: "Amsterdam", name: "Showroom", address: "Pretorisstraat 64D, Amsterdam" },
  { city: "Cape Town", name: "AKJP Studio", address: "73 Kloof Street, Gardens, Cape Town" },
];