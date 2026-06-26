import IMG_2219 from "../../../imports/IMG_2219.webp";
import look2_037 from "../../../imports/LongSeason_ECommerce_Look2_037.webp";
import look1_049 from "../../../imports/LongSeason_ECommerce_Look1_049.webp";
import look5_07 from "../../../imports/LongSeason_ECommerce_Look5_079.webp";
import family1 from "../../../imports/2.webp";
import family2 from "../../../imports/1.webp";
import family3 from "../../../imports/5.webp";
import family4 from "../../../imports/4.webp";
import family5 from "../../../imports/7.webp";
import family6 from "../../../imports/6.webp";

const intro = `A narration of what lies behind us, how we remember it, and the way it has inspired us.`;

const paragraphsPartOne = [
  `In 2022 the story began with our debut capsule, "There's No Running Away in South Africa". A dedication to one of LONG SEASON's foundational inspirations and matriarch of the Ndaba family, Tokozile Jane Ndaba, the capsule comprised elements referenced from her clothing, allowing the opportunity to both mourn and celebrate the life of our muse.`,
  `As years pass, our designs are refined, and redesigned to reflect the growth of Long Season through the various phases of grief and healing. These phases are non-linear, ever-changing and modular, so how could our garments not reflect this as well?`,
  `The exploration of our last 2 capsules ('There's No Running Away In South Africa' & 'Takeaway') is closely related, with the intention to mirror the evolution of processing loss and learning to feel better in the body. Over 2 years, our clothes have morphed and become refined through the information we've gained from our environments, patrons, and ethos of our brand.`,
  `TAKEAWAY is the final part of this dedication. Each piece in this capsule has reached its final form, and we feel we have immersed ourselves in understanding Long Season's design language through unpacking these capsules over the years. Because of this, we wanted to photograph this final part of the collection in the place that Long Season comes from first: the Ndaba family home.`,
  `The first part of this shoot feature's Nkuley, who is another of our muses, in front of a foggy backdrop 5 looks of Takeaway. Behind her and the fog, a very common scene in many of our childhood homes: family and friends, music if you could hear it through the pictures and food. That is the place we drew all our inspiration from since the inception of Long Season.`,
];

// TODO: real photography of Nkuley's solo shoot. 4-up row, ProductCard look.
const nkuleyImages = [
  { src: IMG_2219,  alt: "Nkuley — Takeaway capsule, foggy backdrop, look 1" },
  { src: look2_037, alt: "Nkuley — Takeaway capsule, foggy backdrop, look 2" },
  { src: look1_049, alt: "Nkuley — Takeaway capsule, foggy backdrop, look 1 (alt)" },
  { src: look5_07,  alt: "Nkuley — Takeaway capsule, foggy backdrop, look 5" },
];

const paragraphsPartTwo = [
  `The second part is more about this idea of family, and finding ways to keep putting love back into home, even after loss. Nkuley stands with twin brothers, and 2 of the uncles of the Ndaba family, Musa and Dumsani Ndaba. The brothers, who still live in this home, make up part of this unit that keeps the space as we've always known it: warm, clean, kind and alive. A reminder of the reason Long Season exists, and how family and love are at the centre of our purpose.`,
  `We've spent time exploring these ideas with many of you, who wear Long Season and have shared your experiences in this theme with us. In this way, you've made the clothes with us. We're eager to keep doing this; truly, who can say what this next season will be about.`,
];

// TODO: real photography of the family/Musa & Dumsani moment. Now the same
// wide-row treatment as the Nkuley set — 6 images on a 4-col grid, so the
// last row is 2 of 4 (not a full row). Fine as-is, or trim to 4/8 if a
// perfectly even grid matters more once real photos are in.
const familyImages = [
  { src: family1, alt: "The Ndaba family home, 1" },
  { src: family2, alt: "The Ndaba family home, 2" },
  { src: family3, alt: "Nkuley with Musa and Dumsani Ndaba, 1" },
  { src: family4, alt: "Nkuley with Musa and Dumsani Ndaba, 2" },
  { src: family5, alt: "The Ndaba family home, 3" },
  { src: family6, alt: "Nkuley with Musa and Dumsani Ndaba, 3" },
];

/** Wide row, same look as ProductCard's image block — used for both shoot sets. */
function ImageRow({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {images.map((img, i) => (
        <div key={i} className="bg-neutral-100 aspect-[4/5] overflow-hidden">
          {img.src && (
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function OurShoots() {
  return (
    <section
      className="h-full min-h-0 overflow-y-auto hide-scrollbar flex flex-col font-good-sans"
      style={{ padding: "clamp(52px,8vh,100px) clamp(20px,5vw,80px) clamp(12px,2vh,28px)" }}
    >

      <p
        // className="uppercase flex-shrink-0 mb-8"
        className="uppercase flex-shrink-0 mb-8 font-silka-mono"
        style={{ fontSize: 35, fontWeight: 700, letterSpacing: "0.01em", lineHeight: 1.4, maxWidth: 1100 }}
      >
        {intro}
      </p>

      <div className="flex flex-col gap-5" style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 1100 }}>
        {paragraphsPartOne.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="my-8">
        <ImageRow images={nkuleyImages} />
      </div>

      <div className="flex flex-col gap-5" style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 1100 }}>
        {paragraphsPartTwo.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="my-8">
        <ImageRow images={familyImages} />
      </div>
    </section>
  );
}