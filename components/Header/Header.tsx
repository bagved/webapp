"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import Container from "../ui/Container";
import { useEffect, useMemo, useRef, useState } from "react";

type Lang = "DA" | "EN" | "DE";

export default function Header() {
  // ---- Fade out on scroll (faster) ----
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY || 0));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Fade quickly (smaller number = faster disappear)
  const fadeDistance = 250; // try 110 for even faster
  const opacity = Math.max(0, Math.min(1, 1 - scrollY / fadeDistance));
  const translateY = Math.min(12, (scrollY / fadeDistance) * 12);
  const pointerEvents = opacity < 0.06 ? ("none" as const) : ("auto" as const);

  // ---- Language dropdown (custom, no white select) ----
  const [lang, setLang] = useState<Lang>("DA");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const otherLangs = useMemo(() => {
    const all: Lang[] = ["DA", "EN", "DE"];
    return all.filter((x) => x !== lang);
  }, [lang]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      className={styles.wrap}
      style={{
        opacity,
        transform: `translateY(-${translateY}px)`,
        pointerEvents,
      }}
    >
      <Container>
        <div className={styles.bar}>
          <nav className={styles.nav} aria-label="Primary">
            <Link href="/">Forside</Link>
            <Link href="/services">Ydelser</Link>
            <Link href="/cases">Cases</Link>
            <Link href="/about">Mission</Link>
            <Link href="/contact">Kontakt</Link>
          </nav>

          <div className={styles.langWrap} ref={wrapRef}>
            <button
              type="button"
              className={styles.langButton}
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {lang} <span className={styles.chev}>▾</span>
            </button>

            {open && (
              <div className={styles.langMenu} role="menu" aria-label="Language menu">
                {otherLangs.map((l) => (
                  <button
                    key={l}
                    type="button"
                    role="menuitem"
                    className={styles.langItem}
                    onClick={() => {
                      setLang(l);
                      setOpen(false);
                      // Later: route change to /da /en /de can happen here
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
