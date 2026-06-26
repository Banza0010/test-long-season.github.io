import { useState } from "react";
import type { CartItem } from "../CartDrawer";
import { createShopifyCheckout } from "../../shopify/checkout";

type Props = { items: CartItem[] };

export function Checkout({ items }: Props) {
  const [country, setCountry] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlaceOrder = async () => {
    if (items.length === 0 || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const checkoutUrl = await createShopifyCheckout(items);
      window.location.href = checkoutUrl; // hand off to Shopify's hosted checkout to pay
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("[shopify] checkout handoff failed", e);
      setError("Couldn't start checkout. Please try again, or contact us if this keeps happening.");
      setSubmitting(false);
    }
  };

  const trimmed = country.trim();
  const isSA = trimmed.toLowerCase() === "south africa";
  const shipping = trimmed === "" ? 0 : isSA ? 150 : 2000;
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const total = subtotal + shipping;

  return (
    <section
      className="flex flex-col font-silka-mono"
      style={{ padding: "clamp(52px,8vh,100px) clamp(20px,5vw,80px) clamp(12px,2vh,28px)" }}
    >
      <h1
        className="uppercase flex-shrink-0 mb-6"
        style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.2em" }}
      >
        Checkout
      </h1>

      <div
        className="flex flex-col md:grid md:flex-1 md:min-h-0 md:grid-cols-[1fr_360px]"
        style={{ gap: "clamp(32px,5vw,80px)" }}
      >
        {/* Left — contact + shipping */}
        <form
          className="flex flex-col gap-4 md:overflow-y-auto md:min-h-0 pr-1"
          style={{ scrollbarWidth: "none" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <Group title="Contact">
            <BoxInput label="Email" type="email" />
            <BoxInput label="Phone" type="tel" />
          </Group>
          <Group title="Shipping">
            <BoxInput label="Full name" />
            <BoxInput label="Street address" />
            <div className="grid grid-cols-2 gap-2">
              <BoxInput label="City" />
              <BoxInput label="Postal code" />
            </div>
            <label className="block">
              <input
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-black/[0.04] px-3 py-2.5 outline-none focus:bg-black/[0.07] transition-colors placeholder:opacity-40"
                style={{ fontSize: 12, letterSpacing: "0.02em" }}
              />
            </label>
          </Group>
        </form>

        {/* Right — order summary + payment */}
        <div className="flex flex-col gap-6 md:overflow-y-auto md:min-h-0" style={{ scrollbarWidth: "none" }}>

          {/* Order summary table */}
          <div>
            <div className="grid border-b border-black/15 pb-2 mb-1" style={{ gridTemplateColumns: "1fr auto", fontSize: 10, letterSpacing: "0.18em" }}>
              <span className="uppercase opacity-50">Product</span>
              <span className="uppercase opacity-50">Subtotal</span>
            </div>
            {items.length === 0 && (
              <div className="opacity-30 py-2" style={{ fontSize: 12 }}>No items in cart</div>
            )}
            {items.map((i, idx) => (
              <div key={idx} className="grid py-3 border-b border-black/8" style={{ gridTemplateColumns: "1fr auto", fontSize: 12 }}>
                <span className="opacity-80">{i.product.name} <span className="opacity-50">× {i.qty}</span></span>
                <span>R{(i.product.price * i.qty).toLocaleString()}</span>
              </div>
            ))}
            {shipping > 0 && (
              <div className="grid py-2 border-b border-black/8" style={{ gridTemplateColumns: "1fr auto", fontSize: 12 }}>
                <span className="opacity-60">Shipping {isSA ? "(South Africa)" : "(International)"}</span>
                <span>R{shipping.toLocaleString()}</span>
              </div>
            )}
            <div className="grid pt-4 mt-1" style={{ gridTemplateColumns: "1fr auto", fontSize: 12, letterSpacing: "0.1em" }}>
              <span className="uppercase">Total</span>
              <span>R{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment */}
          <div className="flex flex-col gap-3" style={{ marginTop: "clamp(16px,4vh,40px)" }}>
            <div className="uppercase opacity-50" style={{ fontSize: 10, letterSpacing: "0.2em" }}>Payment</div>
            <div className="border border-black/12 p-4 flex flex-col gap-3">
              <BoxInput label="Card number" type="password" inputMode="numeric" />
              <div className="grid grid-cols-2 gap-2">
                <BoxInput label="Expiry (MM/YY)" />
                <BoxInput label="CVC" type="password" inputMode="numeric" />
              </div>
            </div>
          </div>

          {/* Place order — this is the only point that talks to Shopify;
              clicking it builds a real Shopify cart and redirects to
              Shopify's hosted checkout to pay. */}
          {error && (
            <p className="text-red-600" style={{ fontSize: 12 }}>{error}</p>
          )}
          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={items.length === 0 || submitting}
            className="w-full bg-black text-white uppercase hover:opacity-70 transition-opacity mt-auto flex-shrink-0 disabled:opacity-30"
            style={{ fontSize: 10, letterSpacing: "0.2em", padding: "14px 0" }}
          >
            {submitting ? "Redirecting…" : `Place Order — R${total.toLocaleString()}`}
          </button>

        </div>
      </div>
    </section>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="uppercase opacity-50" style={{ fontSize: 10, letterSpacing: "0.2em" }}>{title}</div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function BoxInput({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <input
        placeholder={label}
        {...rest}
        className="w-full bg-black/[0.04] px-3 py-2.5 outline-none focus:bg-black/[0.07] transition-colors placeholder:opacity-40"
        style={{ fontSize: 12, letterSpacing: "0.02em" }}
      />
    </label>
  );
}
