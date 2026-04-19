"use client";

// components/Header/Header.tsx — HEADER
//
// HVAD DU KAN ÆNDRE:
//   BRAND           → tekststrengen der bruges som aria-label på logoet
//   Navigationspunkter → find navLink("/", "FORSIDE") osv. og skift tekst eller href
//   Logo-fil        → CSS .logoImg i Header.module.css — skift background-image URL
//   Logo-farve      → Logo farves via background-blend-mode: screen, så farven
//                     følger --color-primary automatisk
//
//   FONT_OPTIONS    → listen af fonte i tema-panelets font-vælger
//                     Tilføj et nyt { label, value, import } for en ny font
//   COLOR_VARS      → listen af farver i tema-panelet
//                     Normalt ikke nødvendigt at ændre
//
// TEKNISK NOTE:
//   ThemePanel og mobileNavOverlay er placeret UDEN FOR <header>-elementet.
//   Det er med vilje: backdrop-filter på headeren ville ellers forhindre
//   fixed-positionerede elementer i at dække hele skærmen.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Container from "../ui/Container";

const BRAND = "BAGVED";

// ── Hoved-header ──────────────────────────────────────────────────────
export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const h = () => { if (window.innerWidth > 820) setNavOpen(false); };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, []);

  const pathname = usePathname();
  const closeAll = () => setNavOpen(false);

  const navLink = (href: string, label: string) => {
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return (
      <Link
        href={href}
        onClick={closeAll}
        className={isActive ? styles.navActive : undefined}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      <header className={styles.wrap}>
        <Container>
          <div className={styles.bar}>

            {/* Logo */}
            <div className={styles.left}>
              <Link href="/" className={styles.logo} aria-label={BRAND} onClick={closeAll}>
                <img src="/Logo.png" className={styles.logoImg} alt={BRAND} />
              </Link>
            </div>

            {/* Desktop nav */}
            <nav className={styles.nav} aria-label="Primary">
              {navLink("/", "FORSIDE")}
              {navLink("/services", "YDELSER")}
              {navLink("/cases", "EKSEMPLER")}
              {navLink("/mission", "MISSION")}
              {navLink("/contact", "KONTAKT")}
            </nav>

            <div className={styles.right}>
              <span className={styles.langStatic} aria-label="Language">DA</span>
            </div>

            {/* Mobil hamburger */}
            <button
              type="button"
              className={styles.menuButton}
              aria-label="Åbn menu"
              aria-expanded={navOpen}
              onClick={() => setNavOpen(true)}
            >
              <span className={styles.menuIcon} aria-hidden>
                <span className={styles.line} />
                <span className={styles.line} />
                <span className={styles.line} />
              </span>
            </button>

          </div>
        </Container>
      </header>

      {/* Fullscreen mobil nav */}
      <div
        className={`${styles.mobileNavOverlay} ${navOpen ? styles.mobileNavOverlayOpen : ""}`}
        aria-hidden={!navOpen}
        id="mobile-nav"
      >
        <div className={styles.mobileNavTop}>
          <button
            type="button"
            className={styles.mobileNavClose}
            onClick={() => setNavOpen(false)}
            aria-label="Luk menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>
        </div>

        <nav className={styles.mobileNavLinks} aria-label="Mobile navigation">
          {navLink("/", "Forside")}
          {navLink("/services", "Ydelser")}
          {navLink("/cases", "Eksempler")}
          {navLink("/mission", "Mission")}
          {navLink("/contact", "Kontakt")}
        </nav>

        <div className={styles.mobileNavFooter}>
          <Link href="/privacy"  onClick={closeAll}>Privacy Policy</Link>
          <Link href="/cookies"  onClick={closeAll}>Cookie Policy</Link>
          <Link href="/terms"    onClick={closeAll}>Terms and Conditions</Link>
        </div>
      </div>
    </>
  );
}
