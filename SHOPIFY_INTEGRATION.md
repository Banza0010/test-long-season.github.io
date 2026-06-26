# Shopify Storefront integration

Live product and collection data now comes from the Shopify Storefront API. The
UI, layout, routing, and flow are unchanged — only the *source* of `products`
and `collections` moved from static arrays to the API.

## Setup

1. Copy `.env.example` to `.env` and fill in:
   - `VITE_SHOPIFY_DOMAIN` — e.g. `longseason.myshopify.com`
   - `VITE_SHOPIFY_STOREFRONT_TOKEN` — public Storefront API token
     (Shopify Admin → Settings → Apps and sales channels → Develop apps →
     your app → API credentials → Storefront API access token).
2. `npm i && npm run dev`.

With the env vars **empty**, the site runs on the built-in static demo catalog —
identical to before — so it works in dev with no Shopify account. With them set,
it fetches live data. If a live fetch fails, it falls back to the static catalog
and logs the error rather than rendering an empty store.

## How the pieces fit

```
src/app/shopify/
  config.ts            env vars + endpoint + isShopifyConfigured
  client.ts            shopifyFetch() — the auth component (token + GraphQL POST)
  queries.ts           PRODUCTS_QUERY, COLLECTIONS_QUERY
  types.ts             raw Storefront response shapes
  mappers.ts           Shopify node → existing Product / Collection
  catalog.ts           paginated fetchAllProducts / fetchAllCollections
  ShopDataContext.tsx  provider + useShopData() hook (fetch once, fallback)
```

`main.tsx` wraps `<App>` in `<ShopDataProvider>`. The four data consumers
(`App`, `Shop`, `ProductDetail`, `Collections`) read from `useShopData()` instead
of importing the static arrays. Everything downstream — `ProductCard` ("item"
component), the cart, checkout — is untouched because Shopify data is mapped onto
the *existing* `Product` / `Collection` types.

## Data model mapping

| App field            | Shopify source                                            |
|----------------------|-----------------------------------------------------------|
| `Product.id`         | product `handle`                                          |
| `Product.name`       | `title`                                                   |
| `Product.price`      | `priceRange.minVariantPrice.amount`                       |
| `Product.images`     | `images[].url`                                            |
| `Product.description`| `description` (plain text)                                |
| `Product.sizes`      | distinct "Size" option values across variants             |
| `Product.collection` | first non-accessories collection handle                   |
| `Product.category`   | `accessories` if in the accessories collection/type/tag   |
| `Product.variants`   | per-size variant id + availability (new, for checkout)    |
| `Collection.slug`    | `handle`                                                  |
| `Collection.archived`| `custom.archived` metafield (`"true"` / `"false"`)        |

### The three loops (unchanged behaviour)

- **Shop** — still the editorial `shopLooks` wall (static, separate layer).
  Its tiles link to product handles, so the `productIds` in `data.ts` must match
  real Shopify handles.
- **Accessories** — `ProductCard` grid of products where `category === "accessories"`.
- **Collection page** — `ProductCard` grid filtered by collection handle.
- **Collections (archive)** — lists collections where `archived !== false`.


## Cart → Shopify checkout handoff

**Flow:** "Checkout" in the cart drawer → navigates to the in-house Checkout
page (items, contact/shipping fields, order summary — unchanged design) →
only when the user clicks **Place Order** on that page does it talk to
Shopify: builds a real cart and redirects to Shopify's hosted checkout to pay.
The cart drawer itself never contacts Shopify.

```
src/app/shopify/checkout.ts        createShopifyCheckout(items) → checkoutUrl
src/app/components/pages/Checkout.tsx   handlePlaceOrder() — the one call site
```



## Notes

- Pre-existing, untouched by this integration: the project ships no `tsconfig.json`
  and no `@types/react-dom`, so a bare `tsc` reports noise on `react-dom/client`.
  The Vite build is unaffected. (One genuine pre-existing dead-code type error in
  `nav()`'s unreachable `"product"` case was corrected — behaviour-neutral.)
- EC2 vs S3+CloudFront makes no difference here: a Vite build is static either way,
  and the Storefront token is public by design. To proxy the API through a backend
  later, point `VITE_SHOPIFY_DOMAIN` at that origin — the GraphQL contract is identical.
- Hero images in `imports/` are ~24 MB each; worth compressing before deploy
  regardless of host. Pre-existing, not changed here.
```
