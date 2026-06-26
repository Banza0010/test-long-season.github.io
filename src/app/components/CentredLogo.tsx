import { Logo } from "./Logo";

/**
 * Plain centered logo mark on white background, for empty-state screens.
 * Non-interactive — purely visual.
 */
export function CenteredLogo() {
  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center select-none">
      <Logo color="#000" className="h-[38vh] md:h-[44vh] w-auto" />
      <p
        className="uppercase font-silka-mono text-black/60 mt-8"
        style={{ fontSize: 12, letterSpacing: "0.18em" }}
      >
        Coming soon
      </p>
    </div>
  );
}