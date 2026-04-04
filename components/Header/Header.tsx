"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import Container from "../ui/Container";

const BRAND = "BAGVED";

// ── Farve-variabler ───────────────────────────────────────────────────
const COLOR_VARS: { key: string; label: string; cssVar: string }[] = [
  { key: "bg",        label: "Baggrund",  cssVar: "--color-bg"        },
  { key: "primary",   label: "Primær",    cssVar: "--color-primary"   },
  { key: "secondary", label: "Sekundær",  cssVar: "--color-secondary" },
  { key: "accent",    label: "Accent",    cssVar: "--color-accent"    },
];

// ── Google Fonts der kan vælges ───────────────────────────────────────
const FONT_OPTIONS: { label: string; value: string; import: string }[] = [
  {
    label: "Plus Jakarta Sans",
    value: "'Plus Jakarta Sans', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap",
  },
  {
    label: "Inter",
    value: "'Inter', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
  },
  {
    label: "DM Sans",
    value: "'DM Sans', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400;1,700&display=swap",
  },
  {
    label: "Geist",
    value: "'Geist', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&display=swap",
  },
  {
    label: "Syne",
    value: "'Syne', sans-serif",
    import: "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap",
  },
  {
    label: "Cormorant",
    value: "'Cormorant Garamond', serif",
    import: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap",
  },
];

function readCurrentColors(): Record<string, string> {
  if (typeof window === "undefined")
    return { bg: "#FFF6E8", primary: "#5b4bb7", secondary: "#e9d696", accent: "#fa3b51" };
  const s = getComputedStyle(document.documentElement);
  return {
    bg:        s.getPropertyValue("--color-bg").trim()        || "#FFF6E8",
    primary:   s.getPropertyValue("--color-primary").trim()   || "#5b4bb7",
    secondary: s.getPropertyValue("--color-secondary").trim() || "#e9d696",
    accent:    s.getPropertyValue("--color-accent").trim()    || "#fa3b51",
  };
}

// ── Theme-panel (farver + font) ───────────────────────────────────────
function ThemePanel({ onClose }: { onClose: () => void }) {
  const [colors, setColors]     = useState(readCurrentColors);
  const [hexInputs, setHexInputs] = useState(readCurrentColors);
  const [activeFont, setActiveFont] = useState(FONT_OPTIONS[0].value);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = readCurrentColors();
    setColors(c);
    setHexInputs(c);
    const current = getComputedStyle(document.documentElement)
      .getPropertyValue("--font-body").trim();
    const match = FONT_OPTIONS.find(f => f.value === current);
    if (match) setActiveFont(match.value);
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

  const applyFont = (opt: typeof FONT_OPTIONS[0]) => {
    // Indsæt Google Fonts link dynamisk hvis ikke allerede der
    const id = `gf-${opt.label.replace(/\s/g, "-")}`;
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id   = id;
      link.rel  = "stylesheet";
      link.href = opt.import;
      document.head.appendChild(link);
    }
    document.documentElement.style.setProperty("--font-heading", opt.value);
    document.documentElement.style.setProperty("--font-body",    opt.value);
    setActiveFont(opt.value);
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

      {/* Font */}
      <div className={styles.pickerSection}>
        <span className={styles.pickerSectionLabel}>Font</span>
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
              <img src="/logo.png" alt={BRAND} className={styles.logoImg} />
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
                  <span className={styles.swatchDot} style={{ background: "var(--color-bg)",        outline: "1.5px solid var(--color-primary)", outlineOffset: "1px" }} />
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
