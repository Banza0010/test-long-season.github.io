import { stockists } from "../data";

export function Stockists() {
  return (
    <section
      className="h-full min-h-0 bg-[#1c1c1c] text-white flex flex-col items-center text-center font-silka-mono"
      style={{
        padding:
          "clamp(52px,8vh,100px) clamp(20px,5vw,80px) clamp(12px,2vh,28px)",
      }}
    >
      <h1
        className="uppercase flex-shrink-0"
        style={{
          fontSize: "clamp(22px,3.2vw,30px)",
          fontWeight: 400,
          letterSpacing: "0.06em",
          marginBottom: "clamp(40px,8vh,72px)",
        }}
      >
        Stockists
      </h1>

      <div
        className="flex flex-col items-center"
        style={{ gap: "clamp(36px,6.5vh,56px)" }}
      >
        {stockists.map((s) => (
          <div
            key={s.name}
            className="flex flex-col items-center"
            style={{ gap: "clamp(4px,0.6vh,8px)" }}
          >
            <span style={{ fontSize: 16 }}>{s.name}</span>
            <span style={{ fontSize: 15 }} className="opacity-90">
              Address: {s.address}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}