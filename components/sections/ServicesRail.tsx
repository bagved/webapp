"use client";
import { useI18n } from "@/components/i18n/LanguageProvider";


import Link from "@/components/i18n/LocalizedLink";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { examples } from "@/lib/examples";
import styles from "./ServicesRail.module.css";

export default function ServicesRail() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [width, setWidth] = useState(1100);
  const stage = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const swiped = useRef(false);
  const wheelGesture = useRef({ amount: 0, lastEvent: 0, lastStep: 0 });
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const select = (index: number) => setActive(Math.max(0, Math.min(examples.length - 1, index)));
  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return; // Preserve browser pinch zoom.
      // Ordinary vertical/diagonal scrolling always belongs to the page.
      // A mouse can request horizontal navigation with Shift + wheel.
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.4;
      const raw = horizontal ? event.deltaX : event.shiftKey ? event.deltaY : 0;
      if (!raw) return;
      const delta = raw * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientWidth : 1);
      const gesture = wheelGesture.current;
      const now = performance.now();
      if (now - gesture.lastEvent > 180 || Math.sign(delta) !== Math.sign(gesture.amount)) gesture.amount = 0;
      gesture.lastEvent = now;
      const direction = Math.sign(delta);
      // Let vertical scrolling continue at the ends; never trap the page.
      if ((active === 0 && direction < 0) || (active === examples.length - 1 && direction > 0)) return;
      event.preventDefault();
      gesture.amount += delta;
      if (Math.abs(gesture.amount) >= 45 && now - gesture.lastStep > 280) {
        setActive(index => Math.max(0, Math.min(examples.length - 1, index + direction)));
        gesture.amount = 0;
        gesture.lastStep = now;
      }
    };
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, [active]);
  const cardWidth = Math.min(width * (width < 700 ? 0.82 : 0.64), 760);
  const current = examples[active];
  return <section data-background-tint="48" className={styles.section} id="services" aria-label={t("Produktioner")}>
    <div className="container">
      <h2 className={styles.heading}>{t("Flere måder at gøre indtryk på.")}</h2>
    </div>
    <div ref={stage} className={styles.stage} role="region" aria-roledescription={t("karrusel")} aria-label={t("Produktionsformater")}
      style={{ height: cardWidth * 9 / 16 + 76 }}
      onKeyDown={event => {
        if (event.key === "ArrowRight") { event.preventDefault(); select(active + 1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); select(active - 1); }
      }}
      onDragStart={event => event.preventDefault()}
      onPointerDown={event => {
        if (event.button !== 0) return;
        touchStart.current = event.clientX; swiped.current = false;
      }}
      onPointerMove={event => {
        if (touchStart.current === null || event.pointerType === "touch") return;
        if (Math.abs(event.clientX - touchStart.current) > 8) {
          swiped.current = true;
          if (!event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.setPointerCapture(event.pointerId);
        }
      }}
      onPointerUp={event => {
        if (touchStart.current === null) return;
        const delta = event.clientX - touchStart.current;
        if (Math.abs(delta) > 40) { swiped.current = true; select(active + (delta < 0 ? 1 : -1)); }
        touchStart.current = null;
      }}
      onLostPointerCapture={() => { touchStart.current = null; }}
      onPointerCancel={() => { touchStart.current = null; }}
      onClickCapture={event => { if (swiped.current) { event.preventDefault(); event.stopPropagation(); swiped.current = false; } }}>
      {examples.map((item, index) => {
        const distance = index - active;
        const hidden = Math.abs(distance) > 2;
        return <motion.div key={item.id} className={styles.card} data-cover-card data-active={index === active} role="group"
          aria-roledescription={t("dias")} aria-label={t("{index} af {total}", { index: index + 1, total: examples.length })} aria-hidden={hidden}
          style={{ width: cardWidth, zIndex: 10 - Math.abs(distance), pointerEvents: hidden ? "none" : "auto" }}
          initial={false}
          animate={{ x: distance * cardWidth * 0.57 - cardWidth / 2, z: reduceMotion ? 0 : -Math.abs(distance) * 320, rotateY: reduceMotion ? 0 : distance === 0 ? 0 : distance < 0 ? 42 : -42, scale: distance === 0 ? 1 : 0.78, opacity: hidden ? 0 : distance === 0 ? 1 : Math.abs(distance) === 2 ? 0.45 : 0.78 }}
          transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 190, damping: 29 }}>
          <Link href={`/cases/${item.id}`} className={styles.imageLink} aria-label={t(item.headline)} tabIndex={hidden ? -1 : 0}
            onPointerEnter={event => { if (event.pointerType !== "touch") setHovered(index); }} onPointerLeave={() => setHovered(null)}
            onFocus={() => setHovered(index)} onBlur={() => setHovered(null)}
            onClick={event => { if (distance !== 0) { event.preventDefault(); select(index); } }}>
            <div className={styles.image} data-cover-image>
              <Image src={item.image} alt={t(item.title)} fill sizes="(max-width: 700px) 82vw, (max-width: 1200px) 64vw, 760px" />
            </div>
          </Link>
        </motion.div>;
      })}
    </div>
    <div className={`container ${styles.bottom}`}>
      <div className={styles.caption} aria-live="polite" aria-atomic="true">
        <h3><Link href={`/cases/${current.id}`}>{t(current.headline)}</Link></h3>
      </div>
      <div className={styles.dots} role="group" aria-label={t("Vælg produktion")}>
        {examples.map((item, index) => <button type="button" key={item.id} className={styles.dot}
          aria-label={t("Vis {title}", { title: t(item.title) })} aria-pressed={active === index} data-highlighted={(hovered ?? active) === index}
          onPointerEnter={event => { if (event.pointerType !== "touch") setHovered(index); }} onPointerLeave={() => setHovered(null)}
          onFocus={() => setHovered(index)} onBlur={() => setHovered(null)} onClick={() => select(index)} />)}
      </div>
      <Link className={styles.all} href="/cases">{t("Udforsk eksemplerne")}</Link>
    </div>
  </section>;
}
