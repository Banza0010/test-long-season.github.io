import type { CartItem } from "../components/CartDrawer";
import { shopifyFetch, ShopifyError } from "./client";
import { CART_CREATE_MUTATION } from "./queries";

type CartCreateResponse = {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null;
    userErrors: { field: string[]; message: string }[];
  };
};

/**
 * Build a Shopify cart from the current cart items and return the
 * Shopify-hosted checkout URL to redirect the browser to.
 *
 * Requires every line's product to carry real Shopify variant data (i.e. the
 * catalog was loaded from the Storefront API, not the static fallback) —
 * throws `ShopifyError` otherwise so the caller can fall back to the
 * in-house checkout page.
 */
export async function createShopifyCheckout(items: CartItem[]): Promise<string> {
  if (items.length === 0) {
    throw new ShopifyError("Cart is empty");
  }

  const lines = items.map((item) => {
    const variant = item.product.variants?.find((v) => v.size === item.size);
    if (!variant) {
      throw new ShopifyError(
        `No Shopify variant for "${item.product.name}" (size ${item.size}) — is the catalog loaded from Shopify?`,
      );
    }
    return { merchandiseId: variant.id, quantity: item.qty };
  });

  const data = await shopifyFetch<CartCreateResponse>(CART_CREATE_MUTATION, {
    lines,
  });

  
  if (!data?.cartCreate) {
  throw new ShopifyError("Invalid response from Shopify API");
  }
  const { cart, userErrors } = data.cartCreate;
  if (userErrors.length > 0) {
    throw new ShopifyError("Shopify rejected the cart", userErrors);
  }
  if (!cart) {
    throw new ShopifyError("Shopify did not return a cart");
  }
  return cart.checkoutUrl;
}


