import { type CSSProperties, type ReactNode } from "react";

type Position = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
};

type Link = { label: string; route?: string };

type Props = {
  open: boolean;
  onToggle: () => void;
  onSelect?: (route: string) => void;
  /** Position + size of the invisible click zone over a logo bar. */
  hitArea: CSSProperties;
  /** Position of the panel relative to the logo container. */
  panelPosition: Position;
  heading: string;
  links: Link[];
  ariaLabel: string;
  /** "left" (default) flows text rightward; "right" flows text leftward (right-aligned). */
  textAlign?: "left" | "right";
};

export function RevealMenu({
  open,
  onToggle,
  onSelect,
  hitArea,
  panelPosition,
  heading,
  links,
  ariaLabel,
  textAlign = "left",
}: Props) {
  const isRight = textAlign === "right";

  return (
    <>
      <button
        onClick={onToggle}
        aria-label={ariaLabel}
        aria-expanded={open}
        className="absolute bg-transparent"
        style={{
          ...hitArea,
          cursor: "pointer",
          border: "none",
          outline: "none",
          boxShadow: "none",
          WebkitTapHighlightColor: "transparent",
        }}
      />

      <div
        className="absolute flex flex-col transition-opacity duration-200"
        style={{
          ...panelPosition,
          paddingLeft: isRight ? 0 : "clamp(4px, 0.7vh, 10px)",
          paddingRight: isRight ? "clamp(4px, 0.7vh, 10px)" : 0,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          whiteSpace: "nowrap",
          textAlign: isRight ? "right" : "left",
        }}
      >
        <span
          className="uppercase block font-silka-mono"
          style={{
            fontSize: "clamp(8px, 1.4vh, 13px)",
            letterSpacing: "0.18em",
            color: "#000",
            marginBottom: "clamp(2px, 0.4vh, 5px)",
          }}
        >
          {heading}
        </span>
        {links.map(({ label, route }) => (
          <LinkRow
            key={label}
            label={label}
            textAlign={textAlign}
            onClick={
              route && onSelect
                ? () => {
                    onToggle();
                    onSelect(route);
                  }
                : undefined
            }
          />
        ))}
      </div>
    </>
  );
}

function LinkRow({
  label,
  onClick,
  textAlign = "left",
}: {
  label: string;
  onClick?: () => void;
  textAlign?: "left" | "right";
}) {
  const style: CSSProperties = {
    fontSize: "clamp(8px, 1.4vh, 13px)",
    lineHeight: "1.9",
    border: "none",
    outline: "none",
    padding: 0,
    color: "#000",
    textAlign,
  };
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="hover:opacity-50 transition-opacity bg-transparent font-silka-mono"
        style={style}
      >
        {label}
      </button>
    );
  }
  return <span style={style}>{label}</span>;
}

export type { Link as RevealLink };