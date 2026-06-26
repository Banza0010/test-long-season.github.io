import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onNav: (route: string) => void;
};

const items: [string, string][] = [
  ["SHOP — ALL", "shop"],
  ["COLLECTIONS", "collections"],
  ["ACCESSORIES", "accessories"],
  ["ABOUT", "about"],
  ["STOCKISTS", "stockists"],
  ["CONTACT US", "contact"],
  ["RETURN AND EXCHANGE", "returns"],
];

export function MenuDrawer({ open, onClose, onNav }: Props) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className={`absolute right-0 top-0 h-full w-full md:w-[420px] bg-white text-black flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-5">
          <button onClick={onClose} className="hover:opacity-70" aria-label="Close menu">
            <X size={26} strokeWidth={1.25} />
          </button>
        </div>
        <nav className="px-8 md:px-10 py-6 flex flex-col gap-6">
          {items.map(([label, route]) => (
            <button
              key={route}
              onClick={() => {
                onNav(route);
                onClose();
              }}
              className="text-left tracking-wider-xl uppercase hover:opacity-70 transition-opacity"
              style={{ fontSize: 18 }}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
