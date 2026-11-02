"use client";


import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { productions } from "@/lib/productions";
import styles from "./ServicesRail.module.css";

export default function ServicesRail() {
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(1100);
  const stage = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const swiped = useRef(false);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const select = (index: number) => setActive(Math.max(0, Math.min(productions.length - 1, index)));
  const cardWidth = Math.min(width * (width < 700 ? 0.82 : 0.64), 760);
  const current = productions[active];
  return <section className={styles.section} id="services" aria-label="Produktioner">
    <div className="container">
      <h2 className={styles.heading}>Flere måder at gøre indtryk på.</h2>
    </div>
    <div ref={stage} className={styles.stage} role="region" aria-roledescription="karrusel" aria-label="Produktionsformater"
      style={{ height: cardWidth * 9 / 16 + 76 }}
      onKeyDown={event => {
        if (event.key === "ArrowRight") { event.preventDefault(); select(active + 1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); select(active - 1); }
      }}
      onPointerDown={event => { if (event.pointerType === "touch") { touchStart.current = event.clientX; swiped.current = false; } }}
      onPointerUp={event => {
        if (touchStart.current === null) return;
        const delta = event.clientX - touchStart.current;
        if (Math.abs(delta) > 40) { swiped.current = true; select(active + (delta < 0 ? 1 : -1)); }
        touchStart.current = null;
      }}
      onPointerCancel={() => { touchStart.current = null; }}
      onClickCapture={event => { if (swiped.current) { event.preventDefault(); event.stopPropagation(); swiped.current = false; } }}>
      {productions.map((item, index) => {
        const distance = index - active;
        const hidden = Math.abs(distance) > 2;
        return <motion.div key={item.id} className={styles.card} data-cover-card data-active={index === active} role="group"
          aria-roledescription="dias" aria-label={`${index + 1} af ${productions.length}`} aria-hidden={hidden}
          style={{ width: cardWidth, zIndex: 10 - Math.abs(distance), pointerEvents: hidden ? "none" : "auto" }}
          initial={false}
          animate={{ x: distance * cardWidth * 0.57 - cardWidth / 2, z: reduceMotion ? 0 : -Math.abs(distance) * 320, rotateY: reduceMotion ? 0 : distance === 0 ? 0 : distance < 0 ? 42 : -42, scale: distance === 0 ? 1 : 0.78, opacity: hidden ? 0 : Math.abs(distance) === 2 ? 0.45 : 0.78 }}
          transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 190, damping: 29 }}>
          <Link href={`/cases/${item.id}`} className={styles.imageLink} aria-label={item.headline} tabIndex={hidden ? -1 : 0}
            onClick={event => { if (distance !== 0) { event.preventDefault(); select(index); } }}>
            <div className={styles.image} data-cover-image>
              <Image src={item.image} alt={item.title} fill sizes="(max-width: 700px) 82vw, (max-width: 1200px) 64vw, 760px" />
            </div>
          </Link>
        </motion.div>;
      })}
    </div>
    <div className={`container ${styles.bottom}`}>
      <div className={styles.caption} aria-live="polite" aria-atomic="true">
        <h3><Link href={`/cases/${current.id}`}>{current.headline}</Link></h3>
      </div>
      <div className={styles.controls}>
        <button type="button" onClick={() => select(active - 1)} disabled={active === 0} aria-label="Forrige produktion">Forrige</button>
        <button type="button" onClick={() => select(active + 1)} disabled={active === productions.length - 1} aria-label="Næste produktion">Næste</button>
      </div>
      <Link className={styles.all} href="/cases">Udforsk eksemplerne</Link>
    </div>
  </section>;
}
