"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Container from "../ui/Container";

const BRAND = "BAGVED";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  // close dropdown on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 820) setNavOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setNavOpen(false);

  return (
    <header className={styles.wrap}>
      <Container>
        <div className={styles.bar}>
          {/* Left: logo */}
          <div className={styles.left}>
            <Link href="/" className={styles.logo} aria-label={BRAND} onClick={close}>
              <span className={styles.logoMark} aria-hidden />
              <span className={styles.logoText}>{BRAND}</span>
            </Link>
          </div>

          {/* Center: desktop menu */}
          <nav className={styles.nav} aria-label="Primary">
            <Link href="/" onClick={close}>FORSIDE</Link>
            <Link href="/services" onClick={close}>YDELSER</Link>
            <Link href="/cases" onClick={close}>EKSEMPLER</Link>
            <Link href="/mission" onClick={close}>MISSION</Link>
            <Link href="/contact" onClick={close}>KONTAKT</Link>
          </nav>

          {/* Right: DA only + mobile menu button */}
          <div className={styles.right}>
            <span className={styles.langStatic} aria-label="Language">
              DA
            </span>

            <button
              type="button"
              className={styles.menuButton}
              aria-label={navOpen ? "Close menu" : "Open menu"}
              aria-expanded={navOpen}
              aria-controls="mobile-nav"
              onClick={() => setNavOpen((v) => !v)}
            >
              <span className={styles.icon} aria-hidden>
                <span className={`${styles.line} ${navOpen ? styles.lineTopOpen : ""}`} />
                <span className={`${styles.line} ${navOpen ? styles.lineMidOpen : ""}`} />
                <span className={`${styles.line} ${navOpen ? styles.lineBotOpen : ""}`} />
              </span>
              Menu
            </button>
          </div>
        </div>

        {/* Mobile dropdown nav */}
        <div
          id="mobile-nav"
          className={`${styles.mobileNav} ${navOpen ? styles.mobileNavOpen : ""}`}
          aria-hidden={!navOpen}
        >
          <div className={styles.mobileNavInner}>
            <Link href="/" onClick={close}>FORSIDE</Link>
            <Link href="/services" onClick={close}>YDELSER</Link>
            <Link href="/cases" onClick={close}>EKSEMPLER</Link>
            <Link href="/mission" onClick={close}>MISSION</Link>
            <Link href="/contact" onClick={close}>KONTAKT</Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
