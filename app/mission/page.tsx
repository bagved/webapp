"use client";

import { useEffect, useState } from "react";

const PHOTOS = ["/photos/Mission1.jpg", "/photos/mission2.jpg"];

export default function MissionPage() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % PHOTOS.length), 3800);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="mp" aria-label="Mission">
      <style>{css}</style>

      {/* ── Top ── */}
      <section className="mpTop container">
        <div className="mpTopLeft">
          <h1 className="mpTitle">Vi elsker<br />vores arbejde.</h1>
          <p className="mpSubtitle">
            Om hvem vi er, hvad vi tror på<br />og hvordan vi arbejder.
          </p>
        </div>

        {/* Small alternating photos */}
        <div className="mpPhotoWrap" aria-hidden>
          {PHOTOS.map((src, i) => (
            <div
              key={src}
              className={`mpPhoto ${i === slide ? "mpPhotoActive" : "mpPhotoIdle"}`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>
      </section>

      <div className="mpDivider container" aria-hidden />

      {/* ── Blocks ── */}
      <section className="mpBlocks container">

        <article className="mpBlock">
          <span className="mpBlockNum">01</span>
          <div className="mpBlockText">
            <h2 className="mpBlockTitle">Det vi tror på</h2>
            <p className="mpBlockBody">
              God video handler ikke om udstyr. Det handler om at forstå
              hvad du vil sige og hvem du siger det til. Vi kombinerer
              strategisk tænkning med kreativt håndværk og et ægte øje
              for fortællingen.
            </p>
          </div>
          <div className="mpBlockAccent" style={{ background: "var(--color-accent)" }} aria-hidden />
        </article>

        <article className="mpBlock">
          <span className="mpBlockNum">02</span>
          <div className="mpBlockText">
            <h2 className="mpBlockTitle">Sådan arbejder vi</h2>
            <p className="mpBlockBody">
              Hvert projekt tilpasses dine mål, din målgruppe og dit budget.
              Vi prioriterer samarbejde og ærlighed i alle faser og leverer
              aldrig noget vi ikke selv er stolte af.
            </p>
          </div>
          <div className="mpBlockAccent" style={{ background: "var(--color-secondary)" }} aria-hidden />
        </article>

        <article className="mpBlock">
          <span className="mpBlockNum">03</span>
          <div className="mpBlockText">
            <h2 className="mpBlockTitle">Hvem vi er</h2>
            <p className="mpBlockBody">
              Bagved er et netværk af specialister inden for video, lyd,
              lys og produktion. Vi bringer de rette folk til hvert
              projekt frem for at skalere unødvendigt.
            </p>
          </div>
          <div className="mpBlockAccent" style={{ background: "var(--color-primary)" }} aria-hidden />
        </article>

      </section>

      {/* ── Quote ── */}
      <section className="mpQuote container">
        <blockquote className="mpQuoteText">
          "Bag enhver god produktion er et team der lytter — og leverer."
        </blockquote>
      </section>

    </main>
  );
}

const css = `
.mp{
  padding-bottom: clamp(80px, 10vw, 140px);
}

/* ── Top ── */
.mpTop{
  display: grid;
  grid-template-columns: 1fr auto;
  gap: clamp(32px, 5vw, 80px);
  align-items: center;
  padding-top: clamp(72px, 9vw, 120px);
  padding-bottom: clamp(52px, 7vw, 96px);
}

.mpTopLeft{
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.mpEyebrow{
  margin: 0;
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text) 38%, transparent);
}

.mpTitle{
  margin: 0;
  font-family: var(--font-body);
  font-weight: 800;
  font-size: clamp(48px, 7.5vw, 100px);
  letter-spacing: -0.04em;
  line-height: 0.94;
  color: var(--color-primary);
}

.mpSubtitle{
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(14px, 1.2vw, 17px);
  line-height: 1.7;
  color: color-mix(in srgb, var(--color-text) 52%, transparent);
}

/* Photos */
.mpPhotoWrap{
  position: relative;
  width: clamp(140px, 16vw, 220px);
  aspect-ratio: 3 / 4;
  flex-shrink: 0;
}

.mpPhoto{
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: opacity 1.2s cubic-bezier(.4,0,.2,1);
}

.mpPhotoActive{
  opacity: 0.62;
}

.mpPhotoIdle{
  opacity: 0;
}

/* Divider */
.mpDivider{
  height: 1px;
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
  margin-bottom: clamp(52px, 7vw, 96px);
}

/* ── Blocks ── */
.mpBlocks{
  display: grid;
  gap: 0;
}

.mpBlock{
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: clamp(24px, 3vw, 48px);
  align-items: start;
  padding: clamp(28px, 3.5vw, 48px) 0;
  border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 8%, transparent);
  overflow: hidden;
}
.mpBlock:first-child{
  border-top: 1px solid color-mix(in srgb, var(--color-primary) 8%, transparent);
}

.mpBlockNum{
  font-family: var(--font-body);
  font-size: clamp(11px, 1vw, 13px);
  font-weight: 300;
  letter-spacing: 0.12em;
  color: color-mix(in srgb, var(--color-primary) 30%, transparent);
  padding-top: 4px;
  white-space: nowrap;
}

.mpBlockText{
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 64ch;
}

.mpBlockTitle{
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(20px, 2.2vw, 30px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-primary);
}

.mpBlockBody{
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(14px, 1.15vw, 16px);
  line-height: 1.78;
  color: color-mix(in srgb, var(--color-text) 65%, transparent);
}

.mpBlockAccent{
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  opacity: 0.5;
}

/* ── Quote ── */
.mpQuote{
  padding-top: clamp(52px, 7vw, 96px);
}

.mpQuoteText{
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(18px, 2.4vw, 32px);
  font-weight: 300;
  font-style: italic;
  letter-spacing: -0.01em;
  line-height: 1.5;
  color: color-mix(in srgb, var(--color-primary) 45%, transparent);
  max-width: 62ch;
  border-left: 2px solid var(--color-accent);
  padding-left: clamp(18px, 2.5vw, 32px);
}

@media (max-width: 720px){
  .mpTop{
    grid-template-columns: 1fr;
  }
  .mpPhotoWrap{
    width: 100%;
    aspect-ratio: 16 / 9;
    max-width: 320px;
  }
  .mpBlock{
    grid-template-columns: auto 1fr;
    gap: 16px;
  }
}
`;
