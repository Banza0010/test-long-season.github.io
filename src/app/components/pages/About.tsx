export function About() {
  return (
    <section className="bg-white flex flex-col justify-start md:justify-center px-6 md:px-10 md:pr-[18%] pt-24 pb-10 md:py-10 relative md:h-full">

      {/* Archival number — absolutely positioned top area, 60% from left (desktop only) */}
      <div
        className="hidden md:block absolute text-black/70 select-none font-good-sans"
        style={{
          top: "3.2rem",
          left: "62%",
          fontSize: "clamp(1.2rem, 2.8vw, 2.4rem)",
          letterSpacing: "0.03em",
          fontWeight: 400,
        }}
      >
        120904040701
      </div>

      <div>

        {/* Heading */}
        <h1
          // className="uppercase mb-6 md:mb-8 font-good-sans"
          className="uppercase flex-shrink-0 mb-8 font-silka-mono"
          // uppercase flex-shrink-0 mb-8 font-silka-mono"
          // style={{fontSize: "clamp(2rem, 5vw, 4rem)",letterSpacing: "0.05em",fontWeight: 100,lineHeight: 1,}}
          style={{ fontSize: 35, fontWeight: 700, letterSpacing: "0.01em", lineHeight: 1.4, maxWidth: 1100 }}
        >
          About
        </h1>

        {/* Body — flush on mobile, indented on desktop */}
        <div className="md:ml-[12%]">
          <p className="font-good-sans"
            style={{
              fontSize: "clamp(13px, 1.55vw, 15.5px)",
              lineHeight: 1.85,
              letterSpacing: "0.01em",
            }}
          >
            Long Season is a South African brand dedicated to storytelling and
            archiving through fashion. We offer ready-to-wear high streetwear,
            and use simple shapes and carefully considered proportions to create
            our style of multi-functional, transformable pieces. We care about
            the feel and function of our clothes, and aim to have them be a
            valuable addition for the expression of the wearer. We believe that
            our approach to minimal but impactful design encapsulates the stories
            we're passionate about and celebrates retrospective wearable
            inventions, reimagining them into our lives now.
          </p>
        </div>

      </div>
    </section>
  );
}
