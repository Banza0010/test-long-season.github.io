import { useState } from "react";
import { heroImage } from "../data";
import { Logo } from "../Logo";
import { RevealMenu } from "../RevealMenu";

type Props = {
  onNav: (r: string) => void;
};

const shopLinks = [
  { label: "— All",         route: "shop" },
  { label: "— Collections", route: "collections" },
  { label: "— Accessories", route: "accessories" },
];

const galleryLinks = [
  { label: "— All",                   route: "gallery-shoots" },
  { label: "— Our Shoots",            route: "ourshoots" },
  { label: "— Visual Collaborations", route: "gallery-collabs" },
];

const filmingLinks: { label: string; route?: string }[] = [];

export function Home({ onNav }: Props) {
  const [shopOpen,    setShopOpen]    = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [filmingOpen, setFilmingOpen] = useState(false);

  const closeAll = () => {
    setShopOpen(false);
    setGalleryOpen(false);
    setFilmingOpen(false);
  };

  return (
    /* 🏷️ Added font-silka-mono here so everything inherits it */
    <section className="relative w-full h-full min-h-0 overflow-hidden bg-black font-silka-mono">
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 85%" }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative select-none">
          <Logo color="#000" className="h-[38vh] md:h-[44vh] w-auto" />

          {/* OUR GALLERY — left bar, top-left quadrant (was wrongly "WE'RE FILMING") */}
          <RevealMenu
            open={galleryOpen}
            onToggle={() => { closeAll(); setGalleryOpen((v) => !v); }}
            onSelect={onNav}
            ariaLabel="Toggle gallery navigation"
            hitArea={{ top: 0, left: 0, width: "36%", height: "62%" }}
            panelPosition={{ top: "14%", right: "82%" }}
            heading="OUR GALLERY"
            links={galleryLinks}
            textAlign="left"
          />

          {/* SHOP — right bar, top-right quadrant (unchanged, already correct) */}
          <RevealMenu
            open={shopOpen}
            onToggle={() => { closeAll(); setShopOpen((v) => !v); }}
            onSelect={onNav}
            ariaLabel="Toggle shop navigation"
            hitArea={{ top: 0, right: 0, width: "38%", height: "50%" }}
            panelPosition={{ top: "15%", left: "80%" }}
            heading="SHOP"
            links={shopLinks}
          />

          {/* WE'RE FILMING — lower bar, offset right of center (was wrongly "OUR GALLERY") */}
          <RevealMenu
            open={filmingOpen}
            onToggle={() => { closeAll(); setFilmingOpen((v) => !v); }}
            onSelect={onNav}
            ariaLabel="Toggle filming menu"
            hitArea={{ left: "42%", width: "18%", top: "50%", height: "50%" }}
            panelPosition={{ top: "68%", left: "69%" }}
            heading="WE'RE FILMING"
            links={filmingLinks}
          />

        </div>
      </div>
    </section>
  );
}