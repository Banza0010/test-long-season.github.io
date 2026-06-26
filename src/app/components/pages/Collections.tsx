import { useShopData } from "../../shopify/ShopDataContext";
import { CenteredLogo } from "../CentredLogo";
type Props = { onCollection: (slug: string) => void };

// Fallback image kept from the original export; used only if a collection has
// no image set in Shopify.


export function Collections({ onCollection }: Props) {
  const { collections } = useShopData();
  // The Collections page is the archive: show collections unless they're
  // explicitly marked active (archived === false). Unset (static data) shows.
  const visible = collections.filter((c) => c.archived !== false);

  return (
    <section className="h-full flex flex-col min-h-0" style={{ padding: "clamp(16px,2vh,24px) clamp(14px,2.5vw,40px) 0" }}>
      <h1
        className="uppercase flex-shrink-0 font-silka-mono"
        style={{ fontSize: 12, fontWeight: 400, letterSpacing: "0.18em", marginBottom: "clamp(10px,1.5vh,18px)" }}
      >
        Collections
      </h1>

      <div className="flex-1 flex gap-4 overflow-x-auto overflow-y-hidden min-h-0 pb-4 shop-scroll-x">
        {visible.length === 0 ? (
          <CenteredLogo />
        ) : (
          visible.map((c) => (
            <button
              key={c.slug}
              onClick={() => onCollection(c.slug)}
              className="flex-shrink-0 flex flex-col text-left group min-h-0"
              style={{ width: "clamp(180px, 24vw, 320px)" }}
            >
              <div className="flex-1 overflow-hidden min-h-0 bg-neutral-100">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover group-hover:opacity-70 transition-opacity duration-500"
                />
              </div>
              <div
                className="flex-shrink-0 uppercase pt-3 pb-1 font-silka-mono"
                style={{ fontSize: 11, letterSpacing: "0.15em" }}
              >
                {c.name}
              </div>
              <p className="flex-shrink-0 opacity-60 italic pb-2 font-silka-mono" style={{ fontSize: 12 }}>
                {c.description}
              </p>
            </button>
          ))
        )}
      </div>
    </section>
  );
}
