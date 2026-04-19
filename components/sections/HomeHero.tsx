"use client";

// components/sections/HomeHero.tsx — HERO-SEKTION (forsiden øverst)
//
// HVAD DU KAN ÆNDRE:
//   Tekst          → find <h1> herunder og rediger de to sætninger
//   "oplevelse"    → det kursiverede ord i accent-farven; skift det efter <em>
//   Knap-tekster   → find "Se eksempler", "Vores ydelser", "Kontakt" og rediger
//   Knap-links     → skift href="/cases", href="/services", href="/contact"
//   Hero-højde     → CSS .homeHero { height: calc(82svh - 56px) }
//                    Skru procenttallet op for en højere hero (mere plads til tekst)
//   Max skriftstørrelse → `hi = 90` i useEffect herunder — skru ned for mindre tekst
//
// TEKNISK NOTE om tekst-størrelseslogikken:
//   JavaScript måler heroens tilgængelige højde og finder automatisk den
//   størst mulige skriftstørrelse der stadig passer uden at overlappe videoen.
//   Det fungerer ved "binary search" — prøv middelværdien, juster op/ned.

import Link from "next/link";
import VideoPeek from "./VideoPeek";
import { useEffect, useRef } from "react";

export default function HomeHero() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const fit = () => {
      const parent = el.parentElement;
      if (!parent) return;

      // Beregn tilgængelig højde: forælder minus padding og søskende-elementer
      const style = getComputedStyle(parent);
      const padV = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      const siblings = Array.from(parent.children).filter(c => c !== el) as HTMLElement[];
      const siblingsH = siblings.reduce((sum, s) => sum + s.offsetHeight, 0);
      const maxH = parent.clientHeight - padV - siblingsH - 24; // 24px sikkerhedsmargen
      const maxW = parent.clientWidth;

      // Binary search: find den største skriftstørrelse der passer i boksen
      // hi = 90 er maksimum — sæt lavere for et mere dæmpet udtryk
      let lo = 12, hi = 70;
      while (hi - lo > 0.5) {
        const mid = (lo + hi) / 2;
        el.style.fontSize = `${mid}px`;
        if (el.scrollHeight <= maxH && el.scrollWidth <= maxW) lo = mid;
        else hi = mid;
      }
      el.style.fontSize = `${Math.floor(lo)}px`;
    };

    const ro = new ResizeObserver(fit); // kør fit() igen ved resize
    ro.observe(el.parentElement!);
    fit();
    return () => ro.disconnect();
  }, []);

  return (
    <section className="homeHero" aria-label="Home hero">
      <style>{css}</style>

      <div className="container heroInner">

        {/* Mobil-video — kun synlig på skærme <= 720px (se CSS .heroMobileVideo) */}
        <div className="heroMobileVideo" aria-hidden="true">
          <VideoPeek />
        </div>

        {/* Stor overskrift — teksten herunder kan frit redigeres */}
        {/* <em className="heroAccent"> giver accent-farve + overskrift-font */}
        <h1 ref={headingRef} className="heroBig">
          Bagved den gode{" "}
          <em className="heroAccent">oplevelse</em>.{" "}
          Bag enhver god produktion og event. Vi skaber tryghed igennem hele processen. 
        </h1>

        <div className="heroBottom">
          {/* Kort undertekst — rediger frit */}
          <p className="heroSub">
            Video- og eventproduktion der skaber følelser. Reklamefilm,
            livestream, events og fester til virksomheden eller foreningen, der ønsker at sige noget.
          </p>

          {/* CTA-knapper — btnPrimary=fyldt, btnOutline=ramme, btnGhost=usynlig ramme */}
          <div className="heroCtas">
            <Link href="/cases"    className="btnPrimary">Se eksempler</Link>
            <Link href="/services" className="btnOutline"> Vores ydelser</Link>
            <Link href="/contact"  className="btnGhost">Kontakt</Link>
          </div>
        </div>


      </div>
    </section>
  );
}

const css = `
/* ─── Hero-sektionen ───────────────────────────────────────────────── */
/* height: 82svh = hero fylder 82% af skærmhøjden (minus 56px header)  */
/* Skru 82 op mod 100 for en højere hero; ned mod 60 for en lavere.     */
/* Videoen starter under hero — jo højere hero, jo længere nede videoen */
.homeHero{
  height: calc(82svh - 56px);   /* 82% af synlig skærmhøjde */
  min-height: 420px;             /* minimum — forhindrer for lille hero */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.heroInner{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding-top: clamp(40px, 5.5vh, 80px);
  padding-bottom: clamp(28px, 3.5vh, 48px);
  gap: 0;
}

.heroBig{
  margin: 0;
  font-family: var(--font-body);
  font-style: normal;
  font-weight: 700;
  font-size: clamp(28px, 8vw, 140px); /* fallback — JS overrides */
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--color-text);
}

/* "oplevelse" — accent-ord: kursiv, overskrift-font og accent-farve */
/* Skift color til var(--color-primary) for mørkerødt i stedet */
.heroAccent{
  font-family: var(--font-body);
  font-style: normal;
  color: var(--color-accent);
}

.heroBottom{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(20px, 3vh, 32px);
}

.heroSub{
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(14px, 1.25vw, 17px);
  font-weight: 400;
  line-height: 1.75;
  color: color-mix(in srgb, var(--color-text) 72%, transparent);
  max-width: 46ch;
  text-align: center;
}

.heroCtas{
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  flex-shrink: 0;
}

.btnPrimary,
.btnOutline,
.btnGhost{
  display: inline-flex;
  align-items: center;
  padding: 11px 22px;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  transition: background 150ms ease, color 150ms ease,
              border-color 150ms ease, transform 120ms ease;
}

.btnPrimary{
  background: var(--color-primary);
  color: var(--color-bg);
  border: 1.5px solid var(--color-primary);
}
.btnPrimary:hover{
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-bg);
  transform: translateY(-2px);
}

.btnOutline{
  background: transparent;
  color: var(--color-primary);
  border: 1.5px solid color-mix(in srgb, var(--color-primary) 28%, transparent);
}
.btnOutline:hover{
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.btnGhost{
  background: transparent;
  color: color-mix(in srgb, var(--color-text) 55%, transparent);
  border: 1.5px solid transparent;
  padding-inline: 8px;
}
.btnGhost:hover{
  color: var(--color-accent);
  transform: translateY(-2px);
}

/* Desktop: mobil-videobeholderen er usynlig (videoen er i app/page.tsx i stedet) */
.heroMobileVideo{
  display: none;
}

/* ─── MOBIL (maks. 720px bredde) ──────────────────────────────────── */
@media (max-width: 720px){
  /* Hero vokser frit i højden på mobil i stedet for fixed 82svh */
  .homeHero{
    height: auto;
    min-height: unset;
    overflow: visible;
  }

  .heroInner{
    justify-content: flex-start;
    gap: 0;
  }

  /* Mobil-video: vises som en blok med fuld bredde */
  /* margin: 24px 0 — lodret afstand over/under videoen på mobil */
  .heroMobileVideo{
    display: block;
    width: 100%;
    align-self: stretch;
    margin: 24px 0;
  }

  /* Fjern padding og CTA-knap fra videopecket på mobil */
  .heroMobileVideo .videoPeek{ padding: 0; }
  .heroMobileVideo .videoOuter{ padding: 0; }
  .heroMobileVideo .videoFrame{ background: transparent; }
  .heroMobileVideo .vpCtaRow{ display: none; }  /* "Se alle ydelser"-knappen gemmes */

  .heroBottom{
    gap: 16px;
  }
}
`;
