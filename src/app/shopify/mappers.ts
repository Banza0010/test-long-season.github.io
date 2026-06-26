import type { Product, Collection } from "../components/data";
import { shopifyConfig } from "./config";
import type { SfProduct, SfCollection } from "./types";

const SIZE_OPTION = "size";

/**
 * Map a Shopify product onto the app's existing `Product` shape so that every
 * downstream component (ProductCard, ProductDetail, Cart, Checkout) keeps
 * working without changes.
 *
 *   id          ← handle            (human-readable, matches existing ids/URLs)
 *   name        ← title
 *   price       ← min variant price (parsed to a number)
 *   images      ← image urls
 *   description ← description (plain text)
 *   sizes       ← distinct "Size" option values across variants
 *   collection  ← primary non-accessories collection handle
 *   category    ← "accessories" if in the accessories collection / type / tag
 *   variants    ← per-size variant ids + availability (for future checkout)
 */
export function mapProduct(node: SfProduct): Product {
  const collectionHandles = node.collections.edges.map((e) => e.node.handle);

  const isAccessory =
    collectionHandles.includes(shopifyConfig.accessoriesHandle) ||
    node.productType?.toLowerCase() === "accessories" ||
    node.tags?.some((t) => t.toLowerCase() === "accessories");

  const collection =
    collectionHandles.find((h) => h !== shopifyConfig.accessoriesHandle) ??
    collectionHandles[0] ??
    "";

  const variants = node.variants.edges.map((e) => {
    const v = e.node;
    
    // 1. Switch to a loose inclusion check to catch "Size", "Sizes", "Size (US)", etc.
    const sizeOpt = v.selectedOptions.find(
      (o) => o.name.toLowerCase().includes("sizes") || o.name.toLowerCase().includes("size"),
    );

    
    
    return {
      id: v.id,
      size: sizeOpt?.value ?? v.title,
      available: v.availableForSale,
      quantityAvailable: v.quantityAvailable,
      price: parseFloat(v.price.amount),
    };
  });

  // Deduplicate sizes
  let sizes: string[] = [];
  for (const variant of variants) {
    if (!sizes.includes(variant.size)) sizes.push(variant.size);
  }

  // 2. Clean up single-variant or un-sized items so they don't show "Default Title"
  sizes = sizes.filter(
    (s) => s.toLowerCase() !== "default title" && s.toLowerCase() !== "title"
  );

  return {
    id: node.handle,
    name: node.title,
    price: parseFloat(node.priceRange.minVariantPrice.amount),
    collection,
    category: isAccessory ? "accessories" : "apparel",
    images: node.images.edges.map((e) => e.node.url),
    description: node.description ?? "",
    descriptionHtml: node.descriptionHtml ?? "",
    // If it's a one-size item and sizes array is now empty, return an empty array
    sizes: sizes, 
    variants,
  };
}

/** "true"/"false" metafield string → boolean; anything else → undefined. */
function parseArchived(value: string | null | undefined): boolean | undefined {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

/**
 * Map a Shopify collection onto the app's `Collection` shape.
 *   slug     ← handle
 *   archived ← custom.archived metafield (drives the Collections/archive page)
 */
export function mapCollection(node: SfCollection): Collection {
  return {
    slug: node.handle,
    name: node.title,
    image: node.image?.url ?? "",
    description: node.description ?? "",
    archived: parseArchived(node.metafield?.value),
  };
}
