import { ShoppingBag } from "lucide-react";
import { Logo } from "./Logo";

type Props = {
  isHero?: boolean;
  isStatic?: boolean;
  isDark?: boolean; // NEW — true on black-background pages, flips logo + text to white
  onCart: () => void;
  onLogo: () => void;
  onMenu: () => void;
  cartCount: number;
};

export function Header({ isHero = false, isStatic = false, isDark = false, onCart, onLogo, onMenu, cartCount }: Props) {
  const logoColor = isDark ? "#fff" : "#000";
  const textColor = isDark ? "text-white" : "text-black";

  return (
    <header className={`${isStatic ? "relative" : "absolute top-0 left-0 right-0"} z-30 flex items-center justify-between px-6 md:px-10 py-5`}>
      <button onClick={onLogo} className="hover:opacity-60 transition-opacity" aria-label="Home">
        <Logo color={logoColor} className="h-8 md:h-10 w-auto" />
      </button>
      <div className="flex items-center gap-5">
        {!isHero && (
          <button
            onClick={onCart}
            className={`hover:opacity-60 transition-opacity flex items-center gap-1.5 tracking-wider-xl uppercase ${textColor}`}
            style={{ fontSize: 11 }}
            aria-label="Cart"
          >
            <ShoppingBag size={15} strokeWidth={1.2} />
            {cartCount > 0 && <span className="hidden md:inline">({cartCount})</span>}
          </button>
        )}
      </div>
    </header>
  );
}