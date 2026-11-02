"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export default function HomeExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end end"] });
  const background = useTransform(scrollYProgress, [0, 0.18, 0.48, 0.76, 1], ["#FAF7F3", "#FAF7F3", "#E7DFCE", "#D8CBAE", "#D8CBAE"]);
  return <motion.div ref={root} data-home-experience style={{ backgroundColor: reduceMotion ? "#FAF7F3" : background }}>{children}</motion.div>;
}
