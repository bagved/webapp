// components/sections/LogoWall.tsx — DEKORATIVE BAGGRUNDSLOGOER
//
// HVAD DU KAN ÆNDRE:
//   Placering  → top/left/right på hvert logo i `logos`-arrayet
//   Størrelse  → size (bredde i px) — højden regnes automatisk ud fra LOGO_RATIO
//   Synlighed  → opacity (0.12 = svagt synligt, 1 = fuldt synligt)
//   Hældning   → rotate (grader, negativ = mod uret)
//
// TEKNISK NOTE: logo-PNG'erne er 2655×1257px, men vises i 155–220px bredde.
// next/image nedskalerer dem serverside til den viste størrelse og leverer
// AVIF/WebP — derfor LOGO_RATIO herunder, så højden altid passer til bredden.

import Image from "next/image";

const LOGO_W = 2655;   // PNG'ernes faktiske bredde i pixels
const LOGO_H = 1257;   // PNG'ernes faktiske højde i pixels

type Logo = { src: string; top: string; left?: string; right?: string; size: number; opacity: number; rotate: number };

const logos: Logo[] = [
  { src: "/png/bagved_logo_brun_trans@300x.png", top: "5%",  left: "-5%",  size: 220, opacity: 0.12, rotate: -12 },
  { src: "/png/bagved_logo_roed@300x.png",        top: "30%", right: "-4%", size: 180, opacity: 0.09, rotate: 8  },
  { src: "/png/bagved_logo_sort_trans@300x.png",  top: "60%", left: "2%",   size: 155, opacity: 0.07, rotate: -7 },
  { src: "/png/bagved_logo_graa_trans@300x.png",  top: "80%", right: "1%",  size: 190, opacity: 0.08, rotate: 13 },
];

export default function LogoWall() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }} aria-hidden>
      {logos.map((l, i) => (
        <Image
          key={i}
          src={l.src}
          alt=""
          width={l.size}
          height={Math.round((l.size * LOGO_H) / LOGO_W)}
          sizes={`${l.size}px`}
          style={{
            position: "absolute",
            top:     l.top,
            left:    l.left,
            right:   l.right,
            width:   l.size,
            height:  "auto",
            opacity: l.opacity,
            transform: `rotate(${l.rotate}deg)`,
            userSelect: "none",
          }}
        />
      ))}
    </div>
  );
}
