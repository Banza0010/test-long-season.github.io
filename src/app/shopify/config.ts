/**
 * Shopify Storefront configuration.
 *
 * Every value here is read from Vite env vars (VITE_* are baked into the build
 * and are public). The Storefront access token is *designed* to be exposed
 * client-side, so this is safe for a static SPA whether it's served from
 * S3+CloudFront or from EC2.
 *
 * EC2 note: a Vite build is static files either way, so the host doesn't change
 * anything here. If you later put a backend proxy in front of the Storefront API
 * (e.g. a small service on EC2 to add caching or hide an Admin token), point
 * VITE_SHOPIFY_DOMAIN at that origin — the GraphQL contract stays identical.
 */

const env = import.meta.env;

export const shopifyConfig = {
  /** e.g. "longseason.myshopify.com" */
  domain: (env.VITE_SHOPIFY_DOMAIN ?? "").trim(),
  /** public Storefront API access token */
  token: (env.VITE_SHOPIFY_STOREFRONT_TOKEN ?? "").trim(),
  /** Storefront API version, e.g. "2026-04" */
  apiVersion: (env.VITE_SHOPIFY_API_VERSION ?? "2026-04").trim(),
  /** handle of the collection that marks a product as an accessory */
  accessoriesHandle: (env.VITE_SHOPIFY_ACCESSORIES_HANDLE ?? "accessories")
    .trim()
    .toLowerCase(),
  /** metafield identifying archived collections (drives the Collections page) */
  archivedNamespace: (env.VITE_SHOPIFY_ARCHIVED_NAMESPACE ?? "custom").trim(),
  archivedKey: (env.VITE_SHOPIFY_ARCHIVED_KEY ?? "archived").trim(),
};

/** True only when both a domain and a token are present. */
export const isShopifyConfigured = Boolean(
  shopifyConfig.domain && shopifyConfig.token,
);

export const storefrontEndpoint = () =>
  `https://${shopifyConfig.domain}/api/${shopifyConfig.apiVersion}/graphql.json`;
