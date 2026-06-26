import { useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import type { Product } from "./data";
import { createShopifyCheckout } from "../shopify/checkout"; // Adjust path as needed

export type CartItem = { product: Product; size: string; qty: number };

type Props = {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdate: (i: number, qty: number) => void;
  onRemove: (i: number) => void;
};

export function CartDrawer({ open, items, onClose, onUpdate, onRemove }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  const handleCheckout = async () => {
    if (items.length === 0 || submitting) return;
    
    setSubmitting(true);
    setError(null);
    
    try {
      const checkoutUrl = await createShopifyCheckout(items);
      window.location.href = checkoutUrl; // Hand off to Shopify
    } catch (e) {
      console.error("[shopify] checkout handoff failed", e);
      setError("Couldn't start checkout. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <aside
        className={`absolute right-0 top-0 h-full w-full md:w-[440px] bg-white text-black flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-black/10">
          <div className="tracking-wider-xl uppercase font-[GTF_Good_Sans_TRIAL]" style={{ fontSize: 13 }}>
            Cart ({items.length})
          </div>
          <button onClick={onClose} aria-label="Close cart" className="hover:opacity-70">
            <X size={22} strokeWidth={1.25} />
          </button>
        </div>

        <div className="flex-1 overflow-auto px-5 py-6">
          {items.length === 0 ? (
            <p className="opacity-60 tracking-wider-xl uppercase font-[GTF_Good_Sans_TRIAL]" style={{ fontSize: 12 }}>
              Your cart is empty.
            </p>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-24 h-32 bg-neutral-100 flex-shrink-0">
                    {item.product.images.length > 0 && (
                      <img
                        src={item.product.images[0]}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="tracking-wider-xl uppercase font-[GTF_Good_Sans_TRIAL]" style={{ fontSize: 12 }}>
                      {item.product.name}
                    </div>
                    <div className="opacity-60 font-[Silka_Mono]" style={{ fontSize: 13 }}>
                      Size {item.size}
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-3 border border-black/20 px-2 py-1">
                        <button onClick={() => onUpdate(i, item.qty - 1)} className="hover:opacity-70">
                          <Minus size={14} strokeWidth={1.25} />
                        </button>
                        <span className="font-[Silka_Mono]" style={{ fontSize: 13 }}>{item.qty}</span>
                        <button onClick={() => onUpdate(i, item.qty + 1)} className="hover:opacity-70">
                          <Plus size={14} strokeWidth={1.25} />
                        </button>
                      </div>
                      <div className="font-[Silka_Mono]" style={{ fontSize: 13 }}>R{(item.product.price * item.qty).toLocaleString()}</div>
                    </div>
                    <button
                      onClick={() => onRemove(i)}
                      className="mt-2 text-left tracking-wider-xl uppercase opacity-60 hover:opacity-100 font-[GTF_Good_Sans_TRIAL]"
                      style={{ fontSize: 11 }}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-black/10 p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between tracking-wider-xl uppercase" style={{ fontSize: 13 }}>
            <span className="font-[GTF_Good_Sans_TRIAL]">Subtotal</span>
            <span className="font-[Silka_Mono]">R{total.toLocaleString()}</span>
          </div>
          
          <p className="opacity-50 font-[Silka_Mono]" style={{ fontSize: 11 }}>
            Shipping & taxes calculated at checkout.
          </p>

          {error && (
            <p className="text-red-600 font-[Silka_Mono]" style={{ fontSize: 12 }}>
              {error}
            </p>
          )}

          <button
            disabled={items.length === 0 || submitting}
            onClick={handleCheckout}
            className="w-full bg-black text-white py-4 mt-2 tracking-wider-xl uppercase hover:opacity-70 transition-opacity disabled:opacity-30 font-[GTF_Good_Sans_TRIAL] flex justify-center items-center"
            style={{ fontSize: 13 }}
          >
            {submitting ? "Redirecting..." : "Checkout"}
          </button>
        </div>
      </aside>
    </div>
  );
}