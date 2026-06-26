import type { Product } from "./data";

type Props = { product: Product; onClick: () => void };

export function ProductCard({ product, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="text-left block w-full"
    >
      <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
        {product.images.length > 0 && (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div className="tracking-wider-xl uppercase font-silka-mono" style={{ fontSize: 12 }}>
          {product.name}
        </div>
        <div className="tracking-wider-xl font-silka-mono" style={{ fontSize: 12 }}>
          R{product.price.toLocaleString()}
        </div>
      </div>
    </button>
  );
}
