"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionStyle } from "motion/react";
import styles from "./ScrollBackground.module.css";

export default function ScrollBackground({ children, page }: { children: ReactNode; page: string }) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const tint = useTransform(scrollYProgress, [0, 0.14, 0.4, 0.6, 0.86, 1], ["0%", "0%", "48%", "48%", "0%", "0%"]);
  return <motion.div className={styles.surface} data-scroll-background={page}
    data-home-experience={page === "home" ? true : undefined}
    style={{ "--scroll-tint": reduceMotion ? "0%" : tint } as MotionStyle}>
    {children}
  </motion.div>;
}
