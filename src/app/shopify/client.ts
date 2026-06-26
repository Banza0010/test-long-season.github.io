import { shopifyConfig, storefrontEndpoint } from "./config";

/**
 * Thrown for any Storefront API failure (HTTP error or GraphQL `errors`).
 * Callers can catch this to fall back to static data.
 */
export class ShopifyError extends Error {
  details?: unknown;
  constructor(message: string, details?: unknown) {
    super(message);
    this.name = "ShopifyError";
    this.details = details;
  }
}

/**
 * The Shopify auth component.
 *
 * Single authenticated entry point to the Storefront API: every catalog query
 * goes through here. Sends a GraphQL POST with the public Storefront access
 * token in the `X-Shopify-Storefront-Access-Token` header. The Storefront API
 * is CORS-enabled, so this works from any origin (S3+CloudFront, EC2, or local).
 */
export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(storefrontEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": shopifyConfig.token,
      },
      body: JSON.stringify({ query, variables }),
    });
  } catch (networkErr) {
    throw new ShopifyError("Network request to Storefront API failed", networkErr);
  }

  if (!res.ok) {
    throw new ShopifyError(
      `Storefront API responded ${res.status}`,
      await safeText(res),
    );
  }

  const json = (await res.json()) as {
    data?: T;
    errors?: unknown[];
  };

  if (json.errors && json.errors.length > 0) {
    throw new ShopifyError("Storefront API returned GraphQL errors", json.errors);
  }
  if (!json.data) {
    throw new ShopifyError("Storefront API returned no data");
  }
  return json.data;
}

async function safeText(res: Response): Promise<string | undefined> {
  try {
    return await res.text();
  } catch {
    return undefined;
  }
}
