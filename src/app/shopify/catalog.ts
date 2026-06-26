import type { Product, Collection } from "../components/data";
import { shopifyConfig } from "./config";
import { shopifyFetch } from "./client";
import { PRODUCTS_QUERY, COLLECTIONS_QUERY } from "./queries";
import { mapProduct, mapCollection } from "./mappers";
import type { ProductsResponse, CollectionsResponse } from "./types";

/** Fetch every product, following cursor pagination, mapped to `Product[]`. */
export async function fetchAllProducts(): Promise<Product[]> {
  const out: Product[] = [];
  let cursor: string | null = null;

  do {
    const data: ProductsResponse = await shopifyFetch<ProductsResponse>(
      PRODUCTS_QUERY,
      { cursor },
    );
    for (const edge of data.products.edges) {
      out.push(mapProduct(edge.node));
    }
    cursor = data.products.pageInfo.hasNextPage
      ? data.products.pageInfo.endCursor
      : null;
  } while (cursor);

  return out;
}

/** Fetch every collection, following cursor pagination, mapped to `Collection[]`. */
export async function fetchAllCollections(): Promise<Collection[]> {
  const out: Collection[] = [];
  let cursor: string | null = null;

  do {
    const data: CollectionsResponse = await shopifyFetch<CollectionsResponse>(
      COLLECTIONS_QUERY,
      {
        cursor,
        ns: shopifyConfig.archivedNamespace,
        key: shopifyConfig.archivedKey,
      },
    );
    for (const edge of data.collections.edges) {
      out.push(mapCollection(edge.node));
    }
    cursor = data.collections.pageInfo.hasNextPage
      ? data.collections.pageInfo.endCursor
      : null;
  } while (cursor);

  return out;
}
