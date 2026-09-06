"use client";

// components/motion/InView.tsx — "GLID IND NÅR MAN SCROLLER HERTIL"
//
// HVAD DET ER: En indpakning. Alt du lægger indenfor <InView> ... </InView>
// er usynligt indtil man scroller ned til det, og glider så blidt ind.
//
// BRUG:
//   <InView>            ...indhold...  </InView>   ← standard: glider op
//   <InView delay={0.1}>...indhold...  </InView>   ← venter 100ms ekstra
//   <InView as="section" className="min-klasse"> … </InView>
//
// HVAD DU KAN ÆNDRE:
//   Hastighed/afstand → components/motion/reveal.ts (gælder hele siden)
//   MARGIN herunder   → hvor tidligt animationen starter.
//                       "-12%" = starter når elementet er 12% inde i skærmen.
//                       Sæt "0%" for at starte i det øjeblik kanten rammes.
//
// TILGÆNGELIGHED: Brugere med "reducér bevægelse" slået til i deres
// styresystem får indholdet vist med det samme. Det håndteres i
// app/globals.css via [data-reveal] — se @media (prefers-reduced-motion).
//
// Bygget på motion-primitives' `in-view`-komponent (motion-primitives.com),
// tilpasset til projektets CSS-variabler og data-reveal-sikkerhedsnettet.

import { useRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { motion, useInView, type Transition, type Variants } from "motion/react";
import { revealTransition, revealUp } from "./reveal";

const MARGIN = "0px 0px -12% 0px";

// Alle almindelige HTML-attributter (className, id, aria-label, role, style …)
// sendes videre til elementet, så <InView> kan erstatte en <div> 1:1.
export type InViewProps = {
  children: ReactNode;
  /** HTML-elementet der bruges — "div" som standard. */
  as?: ElementType;
  /** Ekstra ventetid i sekunder før animationen starter (0.1 = 100ms). */
  delay?: number;
  variants?: Variants;
  transition?: Transition;
} & Omit<HTMLAttributes<HTMLElement>, "children">;

export function InView({
  children,
  as = "div",
  delay = 0,
  variants = revealUp,
  transition,
  ...rest
}: InViewProps) {
  const ref = useRef<HTMLElement>(null);

  // once: true → animationen kører kun første gang, ikke hver gang man
  // scroller forbi. amount: hvor stor en del af elementet der skal være synlig.
  const inView = useInView(ref, { once: true, margin: MARGIN, amount: 0.15 });

  const MotionTag = motion[as as keyof typeof motion] as ElementType;

  return (
    <MotionTag
      ref={ref}
      data-reveal
      {...rest}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ ...revealTransition, delay, ...transition }}
    >
      {children}
    </MotionTag>
  );
}

export default InView;
