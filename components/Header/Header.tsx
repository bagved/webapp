"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import Container from "../ui/Container";

const BRAND = "BAGVED";

// ── Farve-variabler ───────────────────────────────────────────────────
const COLOR_VARS: { key: string; label: string; cssVar: string }[] = [
  { key: "bg",        label: "Baggrund",  cssVar: "--color-bg"        },
  { key: "text",      label: "Tekst",     cssVar: "--color-text"      },
  { key: "primary",   label: "Primær",    cssVar: "--color-primary"   },
  { key: "secondary", label: "Sekundær",  cssVar: "--color-secondary" },
  { key: "accent",    label: "Accent",    cssVar: "--color-accent"    },
];

// ── Google Fonts der kan vælges ───────────────────────────────────────
const FONT_OPTIONS: { label: string; value: string; import: string }[] = [
  {
    label: "Josefin Sans",
    value: "'Josefin Sans', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,300;0,400;0,600;0,700;1,100;1,300;1,400;1,700&display=swap",
  },
  {
    label: "Raleway",
    value: "'Raleway', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,300;0,400;0,600;0,700;0,800;1,400;1,700&display=swap",
  },
  {
    label: "Lexend",
    value: "'Lexend', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=Lexend:wght@100;300;400;500;600;700;800&display=swap",
  },
  {
    label: "Rubik",
    value: "'Rubik', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,700;0,800;1,400&display=swap",
  },
  {
    label: "Alexandria",
    value: "'Alexandria', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=Alexandria:wght@100;300;400;600;700;800&display=swap",
  },
  {
    label: "Unbounded",
    value: "'Unbounded', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=Unbounded:wght@200;300;400;600;700;800&display=swap",
  },
  {
    label: "Krona One",
    value: "'Krona One', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=Krona+One&display=swap",
  },
  {
    label: "Atkinson Hyperlegible",
    value: "'Atkinson Hyperlegible', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap",
  },
  {
    label: "Encode Sans Expanded",
    value: "'Encode Sans Expanded', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=Encode+Sans+Expanded:wght@100;300;400;600;700;800&display=swap",
  },
  {
    label: "Genos",
    value: "'Genos', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=Genos:ital,wght@0,100;0,300;0,400;0,700;0,900;1,400&display=swap",
  },
  {
    label: "Gayathri",
    value: "'Gayathri', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=Gayathri:wght@100;400;700&display=swap",
  },
  {
    label: "Averia Serif",
    value: "'Averia Serif Libre', serif",
    import: "https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap",
  },
  {
    label: "Martian Mono",
    value: "'Martian Mono', monospace",
    import: "https://fonts.googleapis.com/css2?family=Martian+Mono:wght@100;300;400;600;700;800&display=swap",
  },
];

function readCurrentColors(): Record<string, string> {
  if (typeof window === "undefined")
    return { bg: "#FFF6E8", text: "#1a1520", primary: "#5b4bb7", secondary: "#e9d696", accent: "#fa3b51" };
  const s = getComputedStyle(document.documentElement);
  return {
    bg:        s.getPropertyValue("--color-bg").trim()        || "#FFF6E8",
    text:      s.getPropertyValue("--color-text").trim()      || "#1a1520",
    primary:   s.getPropertyValue("--color-primary").trim()   || "#5b4bb7",
    secondary: s.getPropertyValue("--color-secondary").trim() || "#e9d696",
    accent:    s.getPropertyValue("--color-accent").trim()    || "#fa3b51",
  };
}

// ── Theme-panel (farver + font) ───────────────────────────────────────
function ThemePanel({ onClose }: { onClose: () => void }) {
  const [colors, setColors]     = useState(readCurrentColors);
  const [hexInputs, setHexInputs] = useState(readCurrentColors);
  const [activeFont, setActiveFont]         = useState(FONT_OPTIONS[0].value);
  const [activeBodyFont, setActiveBodyFont] = useState(FONT_OPTIONS[0].value);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = readCurrentColors();
    setColors(c);
    setHexInputs(c);
    const s = getComputedStyle(document.documentElement);
    const h = s.getPropertyValue("--font-heading").trim();
    const b = s.getPropertyValue("--font-text").trim();
    const mh = FONT_OPTIONS.find(f => f.value === h);
    const mb = FONT_OPTIONS.find(f => f.value === b);
    if (mh) setActiveFont(mh.value);
    if (mb) setActiveBodyFont(mb.value);
  }, []);

  // Luk ved klik udenfor
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  const applyColor = (key: string, value: string) => {
    const cssVar = COLOR_VARS.find(t => t.key === key)?.cssVar;
    if (!cssVar) return;
    document.documentElement.style.setProperty(cssVar, value);
    setColors(p => ({ ...p, [key]: value }));
    setHexInputs(p => ({ ...p, [key]: value }));
  };

  const handleHex = (key: string, raw: string) => {
    setHexInputs(p => ({ ...p, [key]: raw }));
    if (/^#[0-9a-fA-F]{6}$/.test(raw.trim())) applyColor(key, raw.trim());
  };

  const loadFont = (opt: typeof FONT_OPTIONS[0]) => {
    const id = `gf-${opt.label.replace(/\s/g, "-")}`;
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id  = id;
      link.rel = "stylesheet";
      link.href = opt.import;
      document.head.appendChild(link);
    }
  };

  const applyFont = (opt: typeof FONT_OPTIONS[0]) => {
    loadFont(opt);
    document.documentElement.style.setProperty("--font-heading", opt.value);
    document.documentElement.style.setProperty("--font-body",    opt.value);
    setActiveFont(opt.value);
  };

  const applyBodyFont = (opt: typeof FONT_OPTIONS[0]) => {
    loadFont(opt);
    document.documentElement.style.setProperty("--font-text", opt.value);
    setActiveBodyFont(opt.value);
  };

  return (
    <div ref={panelRef} className={styles.pickerPanel} role="dialog" aria-label="Tema-indstillinger">
      <div className={styles.pickerHeader}>
        <span className={styles.pickerTitle}>Tema</span>
        <button className={styles.pickerClose} onClick={onClose} aria-label="Luk">✕</button>
      </div>

      {/* Farver */}
      <div className={styles.pickerSection}>
        <span className={styles.pickerSectionLabel}>Farver</span>
        {COLOR_VARS.map(({ key, label }) => (
          <div key={key} className={styles.pickerRow}>
            <label className={styles.pickerLabel}>{label}</label>
            <div className={styles.pickerInputs}>
              <input
                type="color"
                className={styles.pickerSwatch}
                value={colors[key] || "#000000"}
                onChange={e => applyColor(key, e.target.value)}
                aria-label={`${label} farve`}
              />
              <input
                type="text"
                className={styles.pickerHex}
                value={hexInputs[key] || ""}
                onChange={e => handleHex(key, e.target.value)}
                spellCheck={false}
                maxLength={7}
                aria-label={`${label} hex`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Overskrift-font */}
      <div className={styles.pickerSection}>
        <span className={styles.pickerSectionLabel}>Overskrift-font</span>
        <div className={styles.fontGrid}>
          {FONT_OPTIONS.map(opt => (
            <button
              key={opt.label}
              className={`${styles.fontBtn} ${activeFont === opt.value ? styles.fontBtnActive : ""}`}
              onClick={() => applyFont(opt)}
              type="button"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brødtekst-font */}
      <div className={styles.pickerSection}>
        <span className={styles.pickerSectionLabel}>Brødtekst-font</span>
        <div className={styles.fontGrid}>
          {FONT_OPTIONS.map(opt => (
            <button
              key={opt.label}
              className={`${styles.fontBtn} ${activeBodyFont === opt.value ? styles.fontBtnActive : ""}`}
              onClick={() => applyBodyFont(opt)}
              type="button"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <p className={styles.pickerHint}>
        Gem farver og font permanent i styles/theme.css
      </p>
    </div>
  );
}

// ── Hoved-header ──────────────────────────────────────────────────────
export default function Header() {
  const [navOpen,    setNavOpen]    = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    const h = () => { if (window.innerWidth > 820) setNavOpen(false); };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setNavOpen(false); setPickerOpen(false); }
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, []);

  const closeAll = () => { setNavOpen(false); setPickerOpen(false); };

  return (
    <header className={styles.wrap}>
      <Container>
        <div className={styles.bar}>

          {/* Logo */}
          <div className={styles.left}>
            <Link href="/" className={styles.logo} aria-label={BRAND} onClick={closeAll}>
              <span className={styles.logoWordmark}>Bagved</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className={styles.nav} aria-label="Primary">
            <Link href="/"        onClick={closeAll}>FORSIDE</Link>
            <Link href="/services" onClick={closeAll}>YDELSER</Link>
            <Link href="/cases"   onClick={closeAll}>EKSEMPLER</Link>
            <Link href="/mission" onClick={closeAll}>MISSION</Link>
            <Link href="/contact" onClick={closeAll}>KONTAKT</Link>
          </nav>

          {/* Højre: tema-knap + sprog */}
          <div className={styles.right}>
            <div className={styles.pickerWrap}>
              <button
                type="button"
                className={styles.pickerToggle}
                onClick={() => setPickerOpen(v => !v)}
                aria-label="Åbn tema-indstillinger"
                aria-expanded={pickerOpen}
                title="Skift tema"
              >
                <span className={styles.swatchBar}>
                  <span className={styles.swatchDot} style={{ background: "var(--color-bg)",        outline: "1.5px solid var(--color-text)", outlineOffset: "1px" }} />
                  <span className={styles.swatchDot} style={{ background: "var(--color-text)"      }} />
                  <span className={styles.swatchDot} style={{ background: "var(--color-primary)"   }} />
                  <span className={styles.swatchDot} style={{ background: "var(--color-secondary)" }} />
                  <span className={styles.swatchDot} style={{ background: "var(--color-accent)"    }} />
                </span>
              </button>
              {pickerOpen && <ThemePanel onClose={() => setPickerOpen(false)} />}
            </div>

            <span className={styles.langStatic} aria-label="Language">DA</span>
          </div>

          {/* Mobil hamburger */}
          <button
            type="button"
            className={styles.menuButton}
            aria-label={navOpen ? "Luk menu" : "Åbn menu"}
            aria-expanded={navOpen}
            aria-controls="mobile-nav"
            onClick={() => setNavOpen(v => !v)}
          >
            <span className={styles.menuIcon} aria-hidden>
              <span className={`${styles.line} ${navOpen ? styles.lineTopOpen : ""}`} />
              <span className={`${styles.line} ${navOpen ? styles.lineMidOpen : ""}`} />
              <span className={`${styles.line} ${navOpen ? styles.lineBotOpen : ""}`} />
            </span>
          </button>

        </div>

        {/* Mobil dropdown */}
        <div
          id="mobile-nav"
          className={`${styles.mobileNav} ${navOpen ? styles.mobileNavOpen : ""}`}
          aria-hidden={!navOpen}
        >
          <div className={styles.mobileNavInner}>
            <Link href="/"        onClick={closeAll}>FORSIDE</Link>
            <Link href="/services" onClick={closeAll}>YDELSER</Link>
            <Link href="/cases"   onClick={closeAll}>EKSEMPLER</Link>
            <Link href="/mission" onClick={closeAll}>MISSION</Link>
            <Link href="/contact" onClick={closeAll}>KONTAKT</Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
