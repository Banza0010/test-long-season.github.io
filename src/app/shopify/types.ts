/** Raw shapes returned by the Storefront API (only the fields we query). */

type Edges<T> = { edges: { node: T }[] };
type PageInfo = { hasNextPage: boolean; endCursor: string | null };

export type SfMoney = { amount: string; currencyCode: string };

export type SfImage = { url: string; altText: string | null };

export type SfVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: SfMoney;
  selectedOptions: { name: string; value: string }[];
};

export type SfProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  images: Edges<SfImage>;
  priceRange: { minVariantPrice: SfMoney };
  variants: Edges<SfVariant>;
  collections: Edges<{ handle: string; title: string }>;
};

export type SfCollection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: SfImage | null;
  metafield: { value: string } | null;
};

export type ProductsResponse = {
  products: Edges<SfProduct> & { pageInfo: PageInfo };
};

export type CollectionsResponse = {
  collections: Edges<SfCollection> & { pageInfo: PageInfo };
};
