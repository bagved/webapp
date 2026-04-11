"use client";

import Link from "next/link";
import VideoPeek from "./VideoPeek";

export default function HomeHero() {
  return (
    <section className="homeHero" aria-label="Home hero">
      <style>{css}</style>

      <div className="container heroInner">

        <h1 className="heroBig">
          <span className="heroLine1">Bagved den</span>
          <span className="heroLine2">
            <em className="heroAccent">gode oplevelse.</em>
          </span>
        </h1>

        <div className="heroMobileVideo" aria-hidden="true">
          <VideoPeek />
        </div>

        <div className="heroBottom">
          <p className="heroSub">
            Video- og eventproduktion der skaber følelser. Reklamefilm,
            livestream, events og fester til virksomheden eller foreningen, der ønsker at sige noget.
          </p>

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
.homeHero{
  min-height: calc(100svh - 56px - 88px);
  display: flex;
  flex-direction: column;
}

.heroInner{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: clamp(40px, 5.5vh, 80px);
  padding-bottom: clamp(28px, 3.5vh, 48px);
  gap: 0;
}

.heroBig{
  margin: 0;
  font-family: var(--font-heading);
  font-style: normal;
  line-height: 0.93;
  letter-spacing: -0.04em;
  display: flex;
  flex-direction: column;
}

.heroLine1{
  font-size: clamp(52px, 10vw, 138px);
  font-weight: 800;
  color: var(--color-primary);
  display: block;
}

.heroLine2{
  display: block;
  font-size: clamp(52px, 10vw, 138px);
}

.heroAccent{
  font-style: italic;
  font-weight: 700;
  color: var(--color-accent);
}

.heroBottom{
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: clamp(24px, 5vw, 80px);
}

.heroSub{
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(14px, 1.25vw, 17px);
  font-weight: 400;
  line-height: 1.75;
  color: color-mix(in srgb, var(--color-text) 72%, transparent);
  max-width: 46ch;
}

.heroCtas{
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
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

.heroMobileVideo{
  display: none;
}

@media (max-width: 720px){
  .homeHero{
    min-height: unset;
  }

  .heroInner{
    justify-content: flex-start;
    gap: 0;
  }

  .heroMobileVideo{
    display: block;
    margin: 24px 0;
  }

  /* Hide the section margin/padding from VideoPeek when embedded */
  .heroMobileVideo .videoPeek{
    padding: 0;
  }

  .heroBottom{
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .heroCtas{
    justify-content: flex-start;
  }
}
`;
