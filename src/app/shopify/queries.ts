/**
 * Storefront GraphQL queries.
 *
 * Sizes are derived from each variant's `selectedOptions` (the "Size" option)
 * rather than the product-level `options` field — this is version-agnostic and
 * avoids schema churn around `values` / `optionValues` across API versions.
 */

export const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($cursor: String) {
    products(first: 100, after: $cursor) {
      edges {
        node {
          id
          handle
          title
          description
          productType
          tags
          images(first: 10) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 100) {
            edges {
              node {
                id
                title
                availableForSale
                quantityAvailable
                price {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          collections(first: 20) {
            edges {
              node {
                handle
                title
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const CART_CREATE_MUTATION = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const COLLECTIONS_QUERY = /* GraphQL */ `
  query Collections($cursor: String, $ns: String!, $key: String!) {
    collections(first: 100, after: $cursor) {
      edges {
        node {
          id
          handle
          title
          description
          image {
            url
            altText
          }
          metafield(namespace: $ns, key: $key) {
            value
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
