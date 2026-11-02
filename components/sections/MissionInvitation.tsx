"use client";

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
  useEffect(() => {
    if (!arena.current) return;
    const observer = new ResizeObserver(() => setOffset({ x: 0, y: 0 }));
    observer.observe(arena.current);
    return () => observer.disconnect();
  }, []);
  const dodge = (event: PointerEvent<HTMLSpanElement>) => {
    if (reduceMotion || !arena.current || !no.current || !yes.current) return;
    const bounds = arena.current.getBoundingClientRect();
    const yesBounds = yes.current.getBoundingClientRect();
    const width = no.current.offsetWidth, height = no.current.offsetHeight;
    const right = Math.max(8, bounds.width - width - 8), bottom = Math.max(8, bounds.height - height - 8);
    const pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    const candidates = [ { x: 8, y: 8 }, { x: right, y: 8 }, { x: 8, y: bottom }, { x: right, y: bottom }, { x: (bounds.width - width) / 2, y: 8 }, { x: (bounds.width - width) / 2, y: bottom } ];
    const available = candidates.filter(p => !(p.x < yesBounds.right - bounds.left + 12 && p.x + width > yesBounds.left - bounds.left - 12 && p.y < yesBounds.bottom - bounds.top + 12 && p.y + height > yesBounds.top - bounds.top - 12));
    const target = available.sort((a,b) => Math.hypot(b.x + width/2 - pointer.x,b.y + height/2 - pointer.y) - Math.hypot(a.x + width/2 - pointer.x,a.y + height/2 - pointer.y))[0];
    if (target) setOffset({ x: target.x - (bounds.width / 2 + 14), y: target.y - 80 });
  };
  return <section data-background-tint="0" className={`container ${styles.section}`} aria-labelledby="mission-invitation-title">
    <div className={styles.box}>
      <h2 id="mission-invitation-title">Er du interesseret i at lave en video eller en livestream?</h2>
      <div ref={arena} className={styles.arena}>
        <Link ref={yes} className={`${styles.button} ${styles.yes}`} href="/contact#kontaktformular">Ja</Link>
        <motion.span ref={no} className={`${styles.button} ${styles.no}`} data-joke-no aria-hidden="true"
          initial={false} animate={reduceMotion ? { x: 0, y: 0 } : offset}
          transition={{ duration: reduceMotion ? 0 : 0.16, ease: "easeOut" }}
          onPointerEnter={dodge} onPointerMove={dodge} onPointerDown={event => { event.preventDefault(); dodge(event); }}>
          Nej
        </motion.span>
      </div>
    </div>
  </section>;
}
