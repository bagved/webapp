// components/motion/reveal.ts — FÆLLES ANIMATIONS-INDSTILLINGER
//
// HVAD DET ER: Ét sted hvor al bevægelse på siden er defineret, så alle
// sektioner glider ind på præcis samme måde. Ændrer du et tal her, ændrer
// det sig overalt.
//
// HVAD DU KAN ÆNDRE:
//   DURATION      → hvor længe en indglidning tager (0.6 = 600 millisekunder)
//   RISE_DISTANCE → hvor mange pixels indholdet glider opad (18px)
//   STAGGER       → forsinkelse mellem hvert element i en gruppe (0.08 = 80ms)
//                   Skru op for en mere markant "én ad gangen"-effekt
//
// EASE er den samme kurve som flisernes hover-effekt i ServicesRail
// (cubic-bezier(0.16, 1, 0.3, 1)) — hurtig start, blød landing.

import type { Transition, Variants } from "motion/react";

const DURATION = 0.6;
const RISE_DISTANCE = 18;
const STAGGER = 0.08;
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const revealTransition: Transition = { duration: DURATION, ease: EASE };

/** Glider op og toner ind — standard for sektioner. */
export const revealUp: Variants = {
  hidden:  { opacity: 0, y: RISE_DISTANCE },
  visible: { opacity: 1, y: 0 },
};

/** Kun ind-toning, ingen bevægelse — til elementer hvor et hop i layoutet
 *  ville være forstyrrende (fx video-afspilleren og anker-links). */
export const revealFade: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
};

/** Sættes på en beholder hvis børn skal komme ind én ad gangen.
 *  Børnene skal have `variants={revealUp}` for at arve rækkefølgen. */
export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: STAGGER, delayChildren: 0.04 } },
};
