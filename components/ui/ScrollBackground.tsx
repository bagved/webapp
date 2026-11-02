"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform, type MotionStyle } from "motion/react";
import { sectionTint } from "@/lib/sectionBackground";
import styles from "./ScrollBackground.module.css";

export default function ScrollBackground({ children, page }: { children: ReactNode; page: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const tint = useMotionValue(0);
  const percentage = useTransform(tint, value => `${value}%`);
  const fixed = page === "cases" || page.startsWith("cases/");
  useEffect(() => {
    const element = root.current;
    if (!element || fixed || reduceMotion) { tint.set(0); return; }
    let frame = 0;
    let markers: HTMLElement[] = [];
    const update = () => tint.set(sectionTint(markers.filter(marker => marker.getClientRects().length > 0).map(marker => ({
      top: marker.getBoundingClientRect().top,
      tint: Number(marker.dataset.backgroundTint),
    })), window.visualViewport?.height || window.innerHeight, Math.max(0, window.scrollY)));
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(schedule);
    const refresh = () => {
      markers = Array.from(element.querySelectorAll<HTMLElement>("[data-background-tint]"));
      resize.disconnect(); resize.observe(element);
      markers.forEach(marker => resize.observe(marker));
      schedule();
    };
    const changes = new MutationObserver(refresh);
    changes.observe(element, { childList: true, subtree: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("resize", schedule);
    refresh();
    return () => {
      cancelAnimationFrame(frame); resize.disconnect(); changes.disconnect();
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
    };
  }, [fixed, reduceMotion, tint]);
  return <motion.div ref={root} className={styles.surface} data-scroll-background={page}
    data-home-experience={page === "home" ? true : undefined}
    style={{ "--scroll-tint": percentage } as MotionStyle}>
    {children}
  </motion.div>;
}
