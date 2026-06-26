import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  products as fallbackProducts,
  collections as fallbackCollections,
  type Product,
  type Collection,
} from "../components/data";
import { isShopifyConfigured } from "./config";
import { fetchAllProducts, fetchAllCollections } from "./catalog";

type Source = "shopify" | "fallback" | "loading";

type ShopData = {
  products: Product[];
  collections: Collection[];
  loading: boolean;
  error: string | null;
  /** where the current data came from — handy for debugging in dev */
  source: Source;
};

const ShopDataCtx = createContext<ShopData | null>(null);

/**
 * Loads the catalog once on mount.
 *
 * - Shopify not configured  → serve the static demo catalog immediately
 *   (so the site renders in dev with zero credentials, exactly as before).
 * - Shopify configured       → fetch live products + collections.
 * - Fetch fails              → fall back to the static catalog and surface the
 *   error, rather than rendering an empty store.
 */
export function ShopDataProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(
    isShopifyConfigured ? [] : fallbackProducts,
  );
  const [collections, setCollections] = useState<Collection[]>(
    isShopifyConfigured ? [] : fallbackCollections,
  );
  const [loading, setLoading] = useState<boolean>(isShopifyConfigured);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<Source>(
    isShopifyConfigured ? "loading" : "fallback",
  );

  useEffect(() => {
    if (!isShopifyConfigured) return;

    let cancelled = false;

    (async () => {
      try {
        const [p, c] = await Promise.all([
          fetchAllProducts(),
          fetchAllCollections(),
        ]);
        if (cancelled) return;
        setProducts(p);
        setCollections(c);
        setSource("shopify");
      } catch (e) {
        if (cancelled) return;
        // eslint-disable-next-line no-console
        console.error("[shopify] catalog load failed — using fallback", e);
        setProducts(fallbackProducts);
        setCollections(fallbackCollections);
        setError(e instanceof Error ? e.message : "Unknown Shopify error");
        setSource("fallback");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ShopDataCtx.Provider value={{ products, collections, loading, error, source }}>
      {children}
    </ShopDataCtx.Provider>
  );
}

export function useShopData(): ShopData {
  const value = useContext(ShopDataCtx);
  if (!value) {
    throw new Error("useShopData must be used within a <ShopDataProvider>");
  }
  return value;
}
