import { useState } from "react";
import { useShopData } from "../../shopify/ShopDataContext";

type Props = {
  productId: string;
  onAdd: (id: string, size: string, qty: number) => void;
  onBack: () => void;
};

export function ProductDetail({ productId, onAdd, onBack }: Props) {
  const { products, loading } = useShopData();
  const product = products.find((p) => p.id === productId);
  const [main, setMain] = useState(0);
  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [qty, setQty] = useState(1);

  if (!product) {
    if (loading) {
      return <div className="h-full bg-white" />;
    }
    return (
      <div className="h-full flex items-center justify-center">
        <button
          onClick={onBack}
          className="uppercase tracking-widest"
          style={{ fontSize: 11 }}
        >
          ← Back
        </button>
      </div>
    );
  }

  const collectionLabel = product.collection
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <section
      className="h-full min-h-0 flex flex-col md:flex-row md:items-start"
      style={{
        paddingTop: "clamp(68px,9vh,110px)",
        paddingBottom: "clamp(16px,2vh,24px)",
      }}
    >
      {/* ── Image area ── */}
      <div className="flex flex-col gap-1 px-4 md:flex-row md:flex-shrink-0 md:gap-2 md:px-[clamp(12px,2vw,28px)] md:w-[38%] md:h-[min(68vh,520px)]">
        {/* Main image */}
        <div className="w-full bg-neutral-100 overflow-hidden order-1 md:order-2 md:flex-1 md:min-w-0 aspect-[2/3] md:aspect-auto">
          {product.images.length > 0 && (
            <img
              src={product.images[main]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Thumbnails */}
        {product.images.length > 1 && (
          <div className="flex flex-row gap-1 h-16 order-2 md:flex-col md:flex-shrink-0 md:order-1 md:w-[85px] md:h-auto md:justify-start">
            {product.images.map((src, slot) => (
              <button
                key={slot}
                onClick={() => setMain(slot)}
                className={`flex-1 overflow-hidden bg-neutral-100 border-none p-0 transition-opacity md:flex-none md:h-[100px] ${slot === main ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Product info — outer is the positioning anchor for ×, stays fixed.
           Inner is the actual scroll container, so a long description scrolls
           without dragging the close button out of view with it. ── */}
      <div className="relative flex flex-col px-4 pt-6 pb-4 md:flex-shrink-0 md:px-0 md:pt-1 md:pb-0 md:w-[40%] md:ml-[6%] md:pr-[clamp(12px,2vw,32px)] md:h-full md:min-h-0">
        <button
          onClick={onBack}
          className="absolute top-4 right-4 md:top-0 md:right-0 hover:opacity-40 transition-opacity z-10"
          aria-label="Close"
          style={{
            fontSize: 22,
            lineHeight: 1,
            paddingRight: "clamp(12px,2vw,32px)",
          }}
        >
          ×
        </button>

        <div
          className="flex flex-col md:h-full md:overflow-y-auto md:min-h-0 hide-scrollbar"
          style={{ paddingRight: "clamp(20px,3vw,48px)" }}
        >
          {/* Name */}
          <h1
            className="mt-2 font-silka-mono"
            style={{ fontSize: 25, fontWeight: 700, marginBottom: 8}}
          >
            {product.name}
          </h1>

          {/* Price */}
          <div
            className="font-silka-mono"
            style={{ fontSize: 20, fontWeight: 400, letterSpacing: "0.02em" }}
          >
            R{product.price.toLocaleString()}.00
          </div>

          {/* Static formatted description — hardcoded to match the client's layout for
    now. TODO: replace with product.descriptionHtml once Shopify rich-text is
    confirmed coming through. */}
{product.id === "long-season-x-manyaku-mashilo-home-is-made" ? (
  <div className="mt-5 fs font-silka-mono" style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.85 }}>
    <p style={{ fontWeight: 700, opacity: 1, marginBottom: "1.1em" }}>
      Long Season x Manyaku Mashilo present: HOME IS MADE — Capsule Preview and Pre-order
    </p>
    <p style={{ marginBottom: "1.1em" }}>
      A gathering to celebrate Long Season's latest collaboration with friend and muse{" "}
      <strong style={{ fontWeight: 700, opacity: 1 }}>Manyaku Mashilo</strong>. This special event will
      feature an early access preview of the capsule and the opportunity to pre-order your garments
      before the collection goes public.
    </p>
    <p style={{ marginBottom: "1.1em" }}>
      The ticket includes a{" "}
      <strong style={{ fontWeight: 700, opacity: 1 }}>Harvest Table Dinner Experience</strong> prepared
      by some of our favourite chefs from Cape Town and Johannesburg as well as a 15% discount off your
      first purchase from the collection.
    </p>
    <p style={{ marginBottom: "1.1em" }}>
      <strong style={{ fontWeight: 700, opacity: 1 }}>Available for purchase on the day:</strong>
      <br />
      Shoes by Kkerelé from Lagos and jewellery by Studio SYX from Cape Town.
    </p>

    <p style={{ fontWeight: 700, fontSize: 20, opacity: 1, margin: "1.6em 0 0.5em" }}>Dates:</p>
    <p style={{ marginBottom: "0.4em" }}>Cape Town — 18 July — Private Venue</p>
    <p style={{ marginBottom: "1.1em" }}>Johannesburg — 25 July — Private Venue</p>

    <p style={{ fontWeight: 700, fontSize: 20, opacity: 1, margin: "1.6em 0 0.5em" }}>Collaborators:</p>
    <p style={{ marginBottom: "0.3em" }}>Bella Kim — Hair Salon. Kinshasa, DRC.</p>
    <p style={{ marginBottom: "0.3em" }}>Kkerelé — Shoes. Lagos, Nigeria.</p>
    <p style={{ marginBottom: "0.3em" }}>Kgomotso Kiggy — 2nd Camera + Creative Director. Johannesburg, South Africa.</p>
    <p style={{ marginBottom: "0.3em" }}>Manyaku Mashilo — Muse & Creative Director. Limpopo, South Africa.</p>
    <p style={{ marginBottom: "0.3em" }}>Rogers Ouma — Photography. Kisumu, Kenya.</p>
    <p style={{ marginBottom: "1.1em" }}>Studio SYX — Jewellery. Cape Town, South Africa. Beads from eSwatini, Nairobi + South Africa.</p>

    <p style={{ fontWeight: 700, fontSize: 20, opacity: 1, margin: "1.6em 0 0.5em" }}>Harvest Tables by:</p>
    <p style={{ marginBottom: "0.3em" }}>Breaking Bread — Cape Town, South Africa.</p>
    <p style={{ marginBottom: "1.1em" }}>Chef Jess — Johannesburg, South Africa.</p>

    <p style={{ opacity: 0.7 }}>Please note: this dinner experience is not Halaal or Kosher</p>
  </div>
) : (
  <p className="mt-5 font-silka-mono" style={{ fontSize: 14, lineHeight: 1.75, opacity: 0.8 }}>
    {product.description}
  </p>
)}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-4">
              <p
                className="uppercase mb-2"
                style={{ fontSize: 10, letterSpacing: "0.14em" }}
              >
                Size
              </p>
              <div className="relative">
                <select
                  value={size}
                  onChange={(e) => {
                    setSize(e.target.value);
                    setSizeError(false);
                  }}
                  className={`w-full bg-white px-3 py-2 appearance-none pr-7 border font-silka-mono ${sizeError ? "border-red-500" : "border-black/20"}`}
                  style={{ fontSize: 14 }}
                >
                  <option value="" disabled>
                    Choose an option
                  </option>
                  {product.sizes.map((s) => {
                    const variant = product.variants?.find((v) => v.size === s);
                    const soldOut = variant ? !variant.available : false;
                    return (
                      <option key={s} value={s} disabled={soldOut}>
                        {s}
                        {soldOut ? " (Sold out)" : ""}
                      </option>
                    );
                  })}
                </select>
                <span
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 opacity-40 font-silka-mono"
                  style={{ fontSize: 10 }}
                >
                  ▾
                </span>
              </div>
              {sizeError && (
                <p
                  className="mt-1 font-silka-mono text-red-500"
                  style={{ fontSize: 11 }}
                >
                  Please select a size
                </p>
              )}
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="mt-5 flex gap-2">
            <input
              type="number"
              value={qty}
              min={1}
              onChange={(e) =>
                setQty(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="border border-black/20 bg-white text-center font-silka-mono"
              style={{ width: 50, fontSize: 14, padding: "7px 0" }}
            />
            <button
              onClick={() => {
                const hasSizes = product.sizes && product.sizes.length > 0;
                if (hasSizes && !size) {
                  setSizeError(true);
                  return;
                }
                onAdd(product.id, hasSizes ? size : "OS", qty);
              }}
              className="flex-1 bg-black text-white uppercase tracking-widest hover:opacity-70 transition-opacity"
              style={{ fontSize: 11, padding: "8px 14px" }}
            >
              Add to cart
            </button>
          </div>

          {/* Metadata */}
          <div
            className="mt-7 space-y-1"
            style={{ fontSize: 13, opacity: 0.55, lineHeight: 2 }}
          >
            <p className="font-silka-mono">SKU: N/A</p>
            <p className="font-silka-mono">
              Categories: Collections, {collectionLabel}
            </p>
            <p className="font-silka-mono">
              Tags: {product.name}, {product.sizes.slice(0, 3).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}