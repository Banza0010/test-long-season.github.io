import { useId } from "react";
import logoSrc from "../../imports/LONG_SEASON_LOGO-1.png";

/**
 * Renders the PNG logo with its white background made genuinely transparent
 * via an SVG feColorMatrix filter.
 *
 * Formula:  A' = 1 − (R + G + B) / 3
 *   • pure white  (1,1,1) → A' = 0   (fully transparent) ✓
 *   • pure black  (0,0,0) → A' = 1   (fully opaque)      ✓
 *   • anti-alias greys   → proportionally transparent     ✓
 *
 * Using a CSS filter (not mix-blend-mode) means it works regardless of
 * CSS stacking contexts created by z-index or position.
 */
type Props = {
  className?: string;
  /** "#fff" / "white" → inverts to a white mark (for dark surfaces) */
  color?: string;
};

export function Logo({ className = "", color = "#000" }: Props) {
  const uid = useId();
  const filterId = `ls-wt-${uid.replace(/:/g, "")}`;
  const isDark = color === "#fff" || color === "white";

  return (
    <>
      {/* Inline SVG filter definition — hidden, zero-size */}
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        style={{ position: "absolute", overflow: "hidden" }}
      >
        <defs>
          <filter
            id={filterId}
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      -0.333 -0.333 -0.333 1 0"
            />
          </filter>
        </defs>
      </svg>

      <img
        src={logoSrc}
        alt="LONG SEASON"
        draggable={false}
        className={`block ${className}`}
        style={{
          filter: isDark
            ? `url(#${filterId}) invert(1)`
            : `url(#${filterId})`,
        }}
      />
    </>
  );
}