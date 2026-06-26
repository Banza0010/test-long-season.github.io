import { ProductCard } from "../ProductCard";
import { useShopData } from "../../shopify/ShopDataContext";
import { CenteredLogo } from "../CentredLogo";
import type { Product } from "../data";

type Props = {
  onProduct: (id: string) => void;
  filter?: (p: Product) => boolean;
  title: string;
  onClose?: () => void;
};

export function Shop({ onProduct, filter, title, onClose }: Props) {
  const { products } = useShopData();
  const items = filter ? products.filter(filter) : products;

  return (
    <section className="h-full flex flex-col min-h-0" style={{ padding: "clamp(16px,2vh,24px) clamp(14px,2.5vw,40px) 0" }}>
      <div className="flex items-center justify-between flex-shrink-0" style={{ marginBottom: "clamp(10px,1.5vh,18px)" }}>
        <h1
          className="uppercase font-silka-mono"
          style={{ fontSize: 12, fontWeight: 400, letterSpacing: "0.18em" }}
        >
          {filter ? title : "SHOP"}
        </h1>
        {onClose && (
          <button onClick={onClose} className="hover:opacity-40 transition-opacity" style={{ fontSize: 22, lineHeight: 1 }}>
            ×
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto min-h-0 pb-4">
        {items.length === 0 ? (
          <CenteredLogo />
        ) : (
          /* Now both filtered and unfiltered options dynamically display live Shopify items */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} onClick={() => onProduct(p.id)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
