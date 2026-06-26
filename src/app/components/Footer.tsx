import yocoLogo from "../../imports/idvii5TN-S_1779208429937.png";
import visaLogo from "../../imports/idZmAFev-y_logos.png";
import mastercardSymbol from "../../imports/Symbol.png";
import mastercardWordmark from "../../imports/Logo-1.png";

type FooterLink = {
  label: string;
  route?: string;
  href?: string;
  /** Optional two-line staggered rendering: [first line, second line].
      Second line is indented by the first line's character length (in `ch`
      units) so it visually continues where the first line left off. */
  lines?: [string, string];
};

type Variant =
  | "default" | "about" | "shop" | "collection" | "collections"
  | "accessories" | "accessories-item" | "plain" | "contact" | "stockists";

type Props = {
  onNav: (route: string) => void;
  /** Current route name (e.g. "shop", "stockists") — used to underline the
      active page wherever it appears in the footer's link list. */
  currentRoute?: string;
  variant?: Variant;
};

/* ── Per-page link sets. Each list now includes its own self-link (appended
   at the end) so the current page actually shows up to be underlined —
   previously every list omitted itself entirely, which is why "underline
   the current page" had nothing to underline. ── */

const badgeLinks: FooterLink[] = [
  { label: "Shop",                route: "shop",      lines: ["SHO", "P"] },
  { label: "About",               route: "about",     lines: ["ABOU", "T"] },
  { label: "Contact Us",          route: "contact",   lines: ["CONTACT", "US"] },
  { label: "Stockists",           route: "stockists", lines: ["STOCKIS", "TS"] },
  { label: "Instagram",           href: "https://www.instagram.com/longseasonofficial/", lines: ["INSTAGR", "AM"] },
  { label: "Return and Exchange", route: "returns",   lines: ["RETURN AND", "EXCHANGE"] },
];

const aboutNavLinks: FooterLink[] = [
  { label: "Shop", route: "shop", lines: ["SHO", "P"] },
  { label: "Contact Us", route: "contact", lines: ["CONTACT", "US"] },
  { label: "Instagram", href: "https://www.instagram.com/longseasonofficial/", lines: ["INSTAGR", "AM"] },
  { label: "Stockists", route: "stockists", lines: ["STOCKIS", "TS"] },
  { label: "About", route: "about", lines: ["ABOU", "T"] },
];

const shopNavLinks: FooterLink[] = [
  { label: "About", route: "about", lines: ["ABOU", "T"] },
  { label: "Collections", route: "collections", lines: ["COLLECTIONS", ""] },
  { label: "Accessories", route: "accessories", lines: ["ACCESSORIES", ""] },
  { label: "Shop", route: "shop", lines: ["SHO", "P"] },
];

const collectionsNavLinks: FooterLink[] = [
  { label: "About", route: "about" },
  { label: "Shop", route: "shop" },
  { label: "Accessories", route: "accessories" },
  { label: "Collections", route: "collections" },
];

const accessoriesNavLinks: FooterLink[] = [
  { label: "About", route: "about" },
  { label: "Shop", route: "shop" },
  { label: "Collections", route: "collections" },
  { label: "Accessories", route: "accessories" },
];

/* ── A single link, with underline applied when it matches the current route ── */

function FooterLinkItem({
  link,
  active,
  className,
  style,
  onNav,
}: {
  link: FooterLink;
  active: boolean;
  className: string;
  style: React.CSSProperties;
  onNav: (route: string) => void;
}) {
  const cls = active ? `${className} underline underline-offset-4` : className;

  const content = link.lines ? (
  <span className="flex flex-col items-center" style={{ lineHeight: 1.05 }}>
    <span>{link.lines[0]}</span>
    <span>{link.lines[1]}</span>
  </span>
) : (
  link.label
);

  if (link.href) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer" className={cls} style={style}>
        {content}
      </a>
    );
  }
  return (
    <button onClick={() => link.route && onNav(link.route)} className={cls} style={style}>
      {content}
    </button>
  );
}

/* ── Compact shell: Shop / About / Collections / Accessories / Collection /
   Accessories-item. Always light (white bg, black text), copyright centered
   on its own row below the links on desktop. ── */

function CompactFooterShell({
  links,
  currentRoute,
  onNav,
}: {
  links: FooterLink[];
  currentRoute?: string;
  onNav: (route: string) => void;
}) {
  const linkClass = "uppercase hover:opacity-50 transition-opacity font-silka-mono";
  const linkStyle: React.CSSProperties = { fontSize: 10, letterSpacing: "0.2em" };

  const renderLinks = () =>
    links.map((l) => (
      <FooterLinkItem
        key={l.label}
        link={l}
        active={l.route === currentRoute}
        className={linkClass}
        style={linkStyle}
        onNav={onNav}
      />
    ));

  return (
    <footer className="bg-white text-black border-t border-black/15">
      <div className="md:hidden px-6 pt-3 pb-4 flex flex-col items-center gap-2">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">{renderLinks()}</div>
        <span className="uppercase opacity-40 font-silka-mono" style={{ fontSize: 9, letterSpacing: "0.22em" }}>
          © Long Season 2026
        </span>
      </div>
      <div className="hidden md:block px-10 pt-4 pb-5">
        <div className="flex items-center gap-12">{renderLinks()}</div>
        <div className="flex justify-center mt-3">
          <span className="uppercase opacity-40 font-silka-mono" style={{ fontSize: 9, letterSpacing: "0.22em" }}>
            © Long Season 2026
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ── Tall shell: Default (Home) / Plain (Returns) / Contact / Stockists.
   Theme switches bg/text/border; payment logos are opt-in (default only). ── */

function TallFooterShell({
  links,
  currentRoute,
  onNav,
  theme,
  showPaymentLogos = false,
}: {
  links: FooterLink[];
  currentRoute?: string;
  onNav: (route: string) => void;
  theme: "dark" | "light";
  showPaymentLogos?: boolean;
}) {
  const isDark = theme === "dark";
  const wrapperClass = isDark
    ? "bg-black text-white border-t border-white/10"
    : "bg-white text-black border-t border-black/10";
  const linkClass = `uppercase transition-opacity whitespace-nowrap font-silka-mono ${
    isDark ? "text-white hover:opacity-60" : "text-black hover:opacity-50"
  }`;
  const linkStyle: React.CSSProperties = { fontSize: 8.5, letterSpacing: "0.18em" };
  const copyrightClass = `uppercase whitespace-nowrap font-silka-mono ${isDark ? "opacity-50" : "opacity-40"}`;

  const renderLinks = () =>
    links.map((l) => (
      <FooterLinkItem
        key={l.label}
        link={l}
        active={l.route === currentRoute}
        className={linkClass}
        style={linkStyle}
        onNav={onNav}
      />
    ));

  return (
    <footer className={wrapperClass}>
      {/* Mobile */}
      <div className="md:hidden px-6 pt-4 pb-12 flex flex-col items-center gap-5">
        <div className="flex flex-wrap justify-center gap-4">{renderLinks()}</div>
        {showPaymentLogos && (
          <div className="flex items-center gap-8">
            <PaymentLogos />
          </div>
        )}
        <div className={copyrightClass} style={{ fontSize: 9, letterSpacing: "0.22em" }}>
          © Long Season 2026
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex px-10 pt-5 pb-14 items-center justify-between gap-x-6">
        <div className="flex flex-wrap items-center gap-6">{renderLinks()}</div>
        {showPaymentLogos && (
          <div className="flex items-center gap-8 -translate-x-20">
            <PaymentLogos />
          </div>
        )}
        <div className={copyrightClass} style={{ fontSize: 10, letterSpacing: "0.22em" }}>
          © Long Season 2026
        </div>
      </div>
    </footer>
  );
}

export function Footer({ onNav, currentRoute, variant = "default" }: Props) {
  if (variant === "collections") {
    return <CompactFooterShell links={collectionsNavLinks} currentRoute={currentRoute} onNav={onNav} />;
  }

  if (variant === "accessories") {
    return <CompactFooterShell links={accessoriesNavLinks} currentRoute={currentRoute} onNav={onNav} />;
  }

  if (variant === "collection") {
    const collectionLinks = shopNavLinks.filter((l) => l.label !== "Collections");
    return <CompactFooterShell links={collectionLinks} currentRoute={currentRoute} onNav={onNav} />;
  }

  if (variant === "accessories-item") {
    const links = shopNavLinks.filter((l) => l.label !== "Accessories");
    return <CompactFooterShell links={links} currentRoute={currentRoute} onNav={onNav} />;
  }

  if (variant === "shop") {
    return <CompactFooterShell links={shopNavLinks} currentRoute={currentRoute} onNav={onNav} />;
  }

  if (variant === "about") {
    return <CompactFooterShell links={aboutNavLinks} currentRoute={currentRoute} onNav={onNav} />;
  }

  /* ── Stockists — same black/white theme as Home/default, per request.
     Distinct from Plain/Contact, which stay white. ── */
  if (variant === "stockists") {
    const stockistsLinks: FooterLink[] = [
      { label: "Shop", route: "shop" },
      { label: "About", route: "about" },
      { label: "Contact Us", route: "contact" },
      { label: "Instagram", href: "https://www.instagram.com/longseasonofficial/" },
      { label: "Return and Exchange", route: "returns" },
      { label: "Stockists", route: "stockists" },
    ];
    return <TallFooterShell links={stockistsLinks} currentRoute={currentRoute} onNav={onNav} theme="dark" />;
  }

  /* ── Plain (Returns) / Contact — white, as before ── */
  if (variant === "plain" || variant === "contact") {
    const plainLinks: FooterLink[] =
      variant === "contact"
        ? [
            { label: "Return and Exchange", route: "returns" },
            { label: "Stockists", route: "stockists" },
            { label: "Instagram", href: "https://www.instagram.com/longseasonofficial/" },
            { label: "Contact Us", route: "contact" },
          ]
        : [
            { label: "Contact Us", route: "contact" },
            { label: "Stockists", route: "stockists" },
            { label: "Instagram", href: "https://www.instagram.com/longseasonofficial/" },
            { label: "Return and Exchange", route: "returns" },
          ];
    return <TallFooterShell links={plainLinks} currentRoute={currentRoute} onNav={onNav} theme="light" />;
  }

  /* ── Default (Home + fallback) — black/white, with payment logos ── */
  return (
    <TallFooterShell links={badgeLinks} currentRoute={currentRoute} onNav={onNav} theme="dark" showPaymentLogos />
  );
}

function PaymentLogos() {
  return (
    <>
      <img
        src={yocoLogo}
        alt="YOCO"
        style={{ height: 22, objectFit: "contain", filter: "invert(1) sepia(1) saturate(0) brightness(2) invert(1)" }}
      />
      <div className="flex flex-col items-center" style={{ gap: 2 }}>
        <img src={mastercardSymbol} alt="" style={{ height: 22, objectFit: "contain", filter: "grayscale(1) invert(1)" }} />
        <img src={mastercardWordmark} alt="Mastercard" style={{ height: 8, objectFit: "contain" }} />
      </div>
      <img src={visaLogo} alt="Visa" style={{ height: 22, objectFit: "contain" }} />
    </>
  );
}