"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Header.module.css";
import Container from "../ui/Container";

type Lang = "DA" | "EN" | "DE";

/** ✅ Global logo value (change it here, it updates everywhere) */
const BRAND = "BAGVED";

export default function Header() {
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

  return (
    <header className={styles.wrap}>
      <Container>
        <div className={styles.bar}>
          {/* Left: logo */}
          <div className={styles.left}>
            <Link href="/" className={styles.logo} aria-label={BRAND}>
              <span className={styles.logoMark} aria-hidden />
              <span className={styles.logoText}>{BRAND}</span>
            </Link>
          </div>

          {/* Center: menu (CAPS via CSS) */}
          <nav className={styles.nav} aria-label="Primary">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/cases">Cases</Link>
            <Link href="/mission">Mission</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          {/* Right: language (no boxes) */}
          <div className={styles.right} ref={langWrapRef}>
            <button
              type="button"
              className={styles.langButton}
              aria-haspopup="menu"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((v) => !v)}
            >
              {lang} ▾
            </button>

            <div
              className={`${styles.langMenu} ${langOpen ? styles.langMenuOpen : ""}`}
              role="menu"
              aria-label="Language"
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
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
