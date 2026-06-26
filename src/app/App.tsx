import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MenuDrawer } from "./components/MenuDrawer";
import { CartDrawer, type CartItem } from "./components/CartDrawer";
import { useShopData } from "./shopify/ShopDataContext";
import { Home } from "./components/pages/Home";
import { Shop } from "./components/pages/Shop";
import { Collections } from "./components/pages/Collections";
import { ProductDetail } from "./components/pages/ProductDetail";
import { Checkout } from "./components/pages/Checkout";
import { About } from "./components/pages/About";
import { Contact } from "./components/pages/Contact";
import { Stockists } from "./components/pages/Stockists";
import { ReturnExchange } from "./components/pages/ReturnExchange";
import { OurShoots } from "./components/pages/OurShoots";

type Route =
  | { name: "home" }
  | { name: "shop" }
  | { name: "accessories" }
  | { name: "collections" }
  | { name: "ourshoots" }
  | { name: "collection"; slug: string }
  | { name: "product"; id: string; from: string; fromSlug?: string }
  | { name: "checkout" }
  | { name: "about" }
  | { name: "contact" }
  | { name: "stockists" }
  | { name: "returns" };

function hashToRoute(hash: string): Route {
  const path = hash.replace(/^#\/?/, "");
  const [seg, param] = path.split("/");
  switch (seg) {
    case "shop":        return { name: "shop" };
    case "accessories": return { name: "accessories" };
    case "collections": return { name: "collections" };
    case "collection":  return param ? { name: "collection", slug: param } : { name: "collections" };
    case "ourshoots":   return { name: "ourshoots" };
    case "product": {
      if (!param) return { name: "shop" };
      const [id, from, fromSlug] = [param, path.split("/")[2] ?? "shop", path.split("/")[3]];
      return { name: "product", id, from, ...(fromSlug ? { fromSlug } : {}) };
    }
    case "checkout":    return { name: "checkout" };
    case "about":       return { name: "about" };
    case "contact":     return { name: "contact" };
    case "stockists":   return { name: "stockists" };
    case "returns":     return { name: "returns" };
    default:            return { name: "home" };
  }
}

function routeToHash(r: Route): string {
  switch (r.name) {
    case "home":        return "#/";
    case "shop":        return "#/shop";
    case "accessories": return "#/accessories";
    case "collections": return "#/collections";
    case "collection":  return `#/collection/${r.slug}`;
    case "product": {
      const base = `#/product/${r.id}/${r.from}`;
      return r.fromSlug ? `${base}/${r.fromSlug}` : base;
    }
    case "checkout":    return "#/checkout";
    case "about":       return "#/about";
    case "contact":     return "#/contact";
    case "stockists":   return "#/stockists";
    case "returns":     return "#/returns";
    case "ourshoots":   return "#/ourshoots";
  }
}

export default function App() {
  const { products, collections } = useShopData();
  const [route, setRoute] = useState<Route>(() => hashToRoute(window.location.hash));
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const onHashChange = () => setRoute(hashToRoute(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const hash = routeToHash(route);
    if (window.location.hash !== hash) window.location.hash = hash;
    window.scrollTo({ top: 0 });
  }, [route]);

  const nav = (r: string, extra?: string) => {
    switch (r) {
      case "home":        setRoute({ name: "home" }); break;
      case "shop":        setRoute({ name: "shop" }); break;
      case "accessories": setRoute({ name: "accessories" }); break;
      case "collections": setRoute({ name: "collections" }); break;
      case "collection":  setRoute({ name: "collection", slug: extra! }); break;
      case "ourshoots":   setRoute({ name: "ourshoots" }); break;
      case "product":     setRoute({ name: "product", id: extra!, from: "shop" }); break;
      case "checkout":    setRoute({ name: "checkout" }); setCartOpen(false); break;
      case "about":       setRoute({ name: "about" }); break;
      case "contact":     setRoute({ name: "contact" }); break;
      case "stockists":   setRoute({ name: "stockists" }); break;
      case "returns":     setRoute({ name: "returns" }); break;
    }
  };

  const addToCart = (id: string, size: string, qty: number) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.product.id === id && i.size === size);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { product, size, qty }];
    });
    setCartOpen(true);
  };

  const updateQty = (i: number, qty: number) => {
    if (qty < 1) return setCart((c) => c.filter((_, idx) => idx !== i));
    setCart((c) => c.map((it, idx) => (idx === i ? { ...it, qty } : it)));
  };
  const removeItem = (i: number) => setCart((c) => c.filter((_, idx) => idx !== i));

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const isHero        = route.name === "home";
  const isAbout       = route.name === "about";
  const isShop        = route.name === "shop";
  const isProduct     = route.name === "product";
  const isCollection = route.name === "shop" || route.name === "collection" || route.name === "collections" || route.name === "accessories";
  const isReturns     = route.name === "returns";
  const isContact     = route.name === "contact";
  const isStockists   = route.name === "stockists";
  const isCheckout    = route.name === "checkout";
  const isFullScreen  = isHero || isAbout || isShop || isProduct || isCollection || isReturns || isContact || isStockists || isCheckout || route.name === "ourshoots";

  return (
    <div className={`text-black ${isHero ? "h-screen flex flex-col overflow-hidden bg-black" : isFullScreen ? "h-screen flex flex-col bg-white overflow-hidden" : "min-h-screen bg-white"}`}>
      <Header
        isHero={isHero}
        isStatic={isCollection}
        isDark={isStockists}
        onCart={() => setCartOpen(true)}
        onLogo={() => nav("home")}
        onMenu={() => setMenuOpen(true)}
        cartCount={cartCount}
      />

      <main className={isHero ? "flex-1 overflow-hidden min-h-0" : isFullScreen ? "flex-1 overflow-y-auto md:overflow-hidden md:min-h-0" : "min-h-screen"}>
        {route.name === "home" && <Home onNav={nav} />}
        {route.name === "shop" && (
          <Shop title="Shop — All" onProduct={(id) => setRoute({ name: "product", id, from: "shop" })} />
        )}
        {route.name === "accessories" && (
          <Shop
            title="Accessories"
            onProduct={(id) => setRoute({ name: "product", id, from: "accessories" })}
            filter={(p) => p.category === "accessories"}
          />
        )}
        {route.name === "collections" && (
          <Collections onCollection={(slug) => nav("collection", slug)} />
        )}
        {route.name === "collection" && (
          <Shop
            title={collections.find((c) => c.slug === route.slug)?.name ?? "Collection"}
            onProduct={(id) => setRoute({ name: "product", id, from: "collection", fromSlug: route.slug })}
            filter={(p) => p.collection === route.slug}
            onClose={() => nav("collections")}
          />
        )}
        {route.name === "product" && (
          <ProductDetail
            productId={route.id}
            onAdd={addToCart}
            onBack={() => {
              if (route.from === "accessories") nav("accessories");
              else if (route.from === "collection") nav("collection", route.fromSlug);
              else nav("shop");
            }}
          />
        )}
        {route.name === "checkout" && <Checkout items={cart} />}
        {route.name === "about"     && <About />}
        {route.name === "contact"   && <Contact />}
        {route.name === "stockists" && <Stockists />}
        {route.name === "returns"   && <ReturnExchange />}
        {route.name === "ourshoots"   && <OurShoots />}
      </main>

      <Footer
        onNav={nav}
        currentRoute={route.name}
        variant={
          route.name === "about" ? "about"
          : isReturns ? "plain"
          : isContact ? "contact"
          : isStockists ? "stockists"
          : route.name === "collections" ? "collections"
          : route.name === "collection" ? "collection"
          : route.name === "accessories" ? "accessories"
          : (route.name === "product" && route.from === "accessories") ? "accessories-item"
          : isShop || isProduct || isCollection || isCheckout ? "shop"
          : "default"
        }
      />

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} onNav={nav} />
      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onUpdate={updateQty}
        onRemove={removeItem}
      />
    </div>
  );
}