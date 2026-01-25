"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Container from "../ui/Container";

const BRAND = "BAGVED";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 820) setNavOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const closeAll = () => setNavOpen(false);

  return (
    <header className={styles.wrap}>
      <Container>
        <div className={styles.bar}>
          {/* Left: logo */}
          <div className={styles.left}>
            <Link href="/" className={styles.logo} aria-label={BRAND} onClick={closeAll}>
              <span className={styles.logoMark} aria-hidden />
              <span className={styles.logoText}>{BRAND}</span>
            </Link>
          </div>

          {/* Center: desktop nav */}
          <nav className={styles.nav} aria-label="Primary">
            <Link href="/" onClick={closeAll}>FORSIDE</Link>
            <Link href="/services" onClick={closeAll}>YDELSER</Link>
            <Link href="/cases" onClick={closeAll}>EKSEMPLER</Link>
            <Link href="/mission" onClick={closeAll}>MISSION</Link>
            <Link href="/contact" onClick={closeAll}>KONTAKT</Link>
          </nav>

          {/* Center: mobile hamburger */}
          <button
            type="button"
            className={styles.menuButton}
            aria-label={navOpen ? "Luk menu" : "Åbn menu"}
            aria-expanded={navOpen}
            aria-controls="mobile-nav"
            onClick={() => setNavOpen((v) => !v)}
          >
            <span className={styles.menuIcon} aria-hidden>
              <span className={`${styles.line} ${navOpen ? styles.lineTopOpen : ""}`} />
              <span className={`${styles.line} ${navOpen ? styles.lineMidOpen : ""}`} />
              <span className={`${styles.line} ${navOpen ? styles.lineBotOpen : ""}`} />
            </span>
          </button>

          {/* Right: language (static for now) */}
          <div className={styles.right}>
            <span className={styles.langStatic} aria-label="Language">
              DA
            </span>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          id="mobile-nav"
          className={`${styles.mobileNav} ${navOpen ? styles.mobileNavOpen : ""}`}
          aria-hidden={!navOpen}
        >
          <div className={styles.mobileNavInner}>
            <Link href="/" onClick={closeAll}>FORSIDE</Link>
            <Link href="/services" onClick={closeAll}>YDELSER</Link>
            <Link href="/cases" onClick={closeAll}>EKSEMPLER</Link>
            <Link href="/mission" onClick={closeAll}>MISSION</Link>
            <Link href="/contact" onClick={closeAll}>KONTAKT</Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
