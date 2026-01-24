"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import Container from "../ui/Container";
import { useEffect, useMemo, useRef, useState } from "react";

type Lang = "DA" | "EN" | "DE";

export default function Header() {
  // ---- Fade out on scroll ----
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

  const fadeDistance = 250;
  const opacity = Math.max(0, Math.min(1, 1 - scrollY / fadeDistance));
  const translateY = Math.min(10, (scrollY / fadeDistance) * 10);
  const pointerEvents = opacity < 0.06 ? ("none" as const) : ("auto" as const);

  // ---- Mobile menu ----
  const [navOpen, setNavOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 820) setNavOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setNavOpen(false);
        setLangOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // ---- Language dropdown (minimal, inline list) ----
  const [lang, setLang] = useState<Lang>("DA");
  const [langOpen, setLangOpen] = useState(false);
  const langWrapRef = useRef<HTMLDivElement | null>(null);

  const otherLangs = useMemo(() => {
    const all: Lang[] = ["DA", "EN", "DE"];
    return all.filter((x) => x !== lang);
  }, [lang]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!langWrapRef.current) return;
      if (!langWrapRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const closeAll = () => {
    setNavOpen(false);
    setLangOpen(false);
  };

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
          {/* Left: mobile hamburger (desktop spacer keeps nav centered) */}
          <div className={styles.left}>
            <button
              type="button"
              className={styles.menuButton}
              aria-label={navOpen ? "Close menu" : "Open menu"}
              aria-expanded={navOpen}
              aria-controls="mobile-nav"
              onClick={() => setNavOpen((v) => !v)}
            >
              <span className={styles.menuIcon} aria-hidden>
                <span className={`${styles.line} ${navOpen ? styles.lineTopOpen : ""}`} />
                <span className={`${styles.line} ${navOpen ? styles.lineMidOpen : ""}`} />
                <span className={`${styles.line} ${navOpen ? styles.lineBotOpen : ""}`} />
              </span>
              <span className={styles.menuLabel}>Menu</span>
            </button>

            {/* Desktop-only spacer to balance right-side language */}
            <div className={styles.spacer} aria-hidden />
          </div>

          {/* Center: desktop nav */}
          <nav className={styles.nav} aria-label="Primary">
            <Link href="/" onClick={closeAll}>
              Forside
            </Link>
            <Link href="/services" onClick={closeAll}>
              Ydelser
            </Link>
            <Link href="/cases" onClick={closeAll}>
              Cases
            </Link>
            <Link href="/about" onClick={closeAll}>
              Mission
            </Link>
            <Link href="/contact" onClick={closeAll}>
              Kontakt
            </Link>
          </nav>

          {/* Right: language */}
          <div className={styles.langWrap} ref={langWrapRef}>
            <button
              type="button"
              className={styles.langButton}
              aria-haspopup="menu"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((v) => !v)}
            >
              {lang} <span className={styles.chev}>▾</span>
            </button>

            <div
              className={`${styles.langMenu} ${langOpen ? styles.langMenuOpen : ""}`}
              role="menu"
              aria-label="Language menu"
            >
              {otherLangs.map((l) => (
                <button
                  key={l}
                  type="button"
                  role="menuitem"
                  className={styles.langItem}
                  tabIndex={langOpen ? 0 : -1}
                  onClick={() => {
                    setLang(l);
                    setLangOpen(false);
                    // Later: route change to /da /en /de can happen here
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile dropdown nav */}
        <div
          id="mobile-nav"
          className={`${styles.mobileNav} ${navOpen ? styles.mobileNavOpen : ""}`}
          aria-hidden={!navOpen}
        >
          <div className={styles.mobileNavInner}>
            <Link href="/" onClick={closeAll}>
              Forside
            </Link>
            <Link href="/services" onClick={closeAll}>
              Ydelser
            </Link>
            <Link href="/cases" onClick={closeAll}>
              Cases
            </Link>
            <Link href="/about" onClick={closeAll}>
              Mission
            </Link>
            <Link href="/contact" onClick={closeAll}>
              Kontakt
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
