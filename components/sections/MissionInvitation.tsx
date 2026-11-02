"use client";

import { escapeTarget, type Point } from "@/lib/escapeTarget";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import styles from "./MissionInvitation.module.css";

export default function MissionInvitation() {
  const arena = useRef<HTMLDivElement>(null);
  const yes = useRef<HTMLAnchorElement>(null);
  const no = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();
  const lastMove = useRef(0);
  const previous = useRef<Point | null>(null);
  useEffect(() => {
    if (!arena.current) return;
    const observer = new ResizeObserver(() => { setOffset({ x: 0, y: 0 }); previous.current = null; });
    observer.observe(arena.current);
    return () => observer.disconnect();
  }, []);
  const dodge = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || !arena.current || !no.current || !yes.current) return;
    const now = performance.now();
    if (now - lastMove.current < 65 && event.type !== "pointerdown") return;
    const bounds = arena.current.getBoundingClientRect();
    const label = no.current.getBoundingClientRect();
    const yesBounds = yes.current.getBoundingClientRect();
    const target = escapeTarget({
      width: bounds.width, height: bounds.height,
      button: { x: label.left - bounds.left, y: label.top - bounds.top, width: label.width, height: label.height },
      pointer: { x: event.clientX - bounds.left, y: event.clientY - bounds.top },
      obstacle: { x: yesBounds.left - bounds.left, y: yesBounds.top - bounds.top, width: yesBounds.width, height: yesBounds.height },
      previous: previous.current,
    });
    if (!target) return;
    lastMove.current = now;
    previous.current = { x: label.left - bounds.left, y: label.top - bounds.top };
    setOffset({ x: target.x - (bounds.width / 2 + 14), y: target.y - 80 });
  };
  return <section data-background-tint="0" className={`container ${styles.section}`} aria-labelledby="mission-invitation-title">
    <div className={styles.box}>
      <h2 id="mission-invitation-title">Er du interesseret i at lave en video eller en livestream?</h2>
      <div ref={arena} className={styles.arena} onPointerEnter={dodge} onPointerMove={dodge}>
        <Link ref={yes} className={`${styles.button} ${styles.yes}`} href="/contact#kontaktformular">Ja</Link>
        <motion.span ref={no} className={`${styles.button} ${styles.no}`} data-joke-no aria-hidden="true"
          initial={false} animate={reduceMotion ? { x: 0, y: 0 } : offset}
          transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 450, damping: 34, mass: 0.55 }}
          onPointerDown={event => { event.preventDefault(); dodge(event); }}>
          Nej
        </motion.span>
      </div>
    </div>
  </section>;
}
