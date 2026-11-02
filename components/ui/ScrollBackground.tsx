"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionStyle } from "motion/react";
import styles from "./ScrollBackground.module.css";

export default function ScrollBackground({ children, page }: { children: ReactNode; page: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end end"] });
  const tint = useTransform(scrollYProgress, [0, 0.18, 0.76, 1], ["0%", "0%", "48%", "48%"]);
  return <motion.div ref={root} className={styles.surface} data-scroll-background={page}
    data-home-experience={page === "home" ? true : undefined}
    style={{ "--scroll-tint": reduceMotion ? "0%" : tint } as MotionStyle}>
    {children}
  </motion.div>;
}
