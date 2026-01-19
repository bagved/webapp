"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Card = {
  key: string;
  title: string;
  sub: string;
  body: string;
  vimeoSrc: string;
};

export default function VideoSection() {
  const cards: Card[] = useMemo(
    () => [
      {
        key: "livestream",
        title: "Livestream",
        sub: "Broadcast-grade. Diskret opsætning.",
        body:
          "Multi-cam, storskærm og lyd der sidder. Afvikling med ro — og et udtryk der føles dyrt.",
        vimeoSrc:
          "https://player.vimeo.com/video/1150126676?h=2b9851b0d2&badge=0&autopause=0&player_id=0&app_id=58479",
      },
      {
        key: "video",
        title: "Video Production",
        sub: "Cinematisk. Clean. Brand-fit.",
        body:
          "Hero, reklame og cases med lys, lyd og pacing der holder — også i små formater.",
        vimeoSrc:
          "https://player.vimeo.com/video/1150126676?h=2b9851b0d2&badge=0&autopause=0&player_id=0&app_id=58479",
      },
      {
        key: "plan",
        title: "Planlægning",
        sub: "Flow og timing — uden friktion.",
        body:
          "Run of show, logistik og beslutninger på plads. Det giver overskud på dagen og et bedre resultat.",
        vimeoSrc:
          "https://player.vimeo.com/video/1150126676?h=2b9851b0d2&badge=0&autopause=0&player_id=0&app_id=58479",
      },
      {
        key: "soundlight",
        title: "Lyd & Lys",
        sub: "Atmosfære — kontrolleret.",
        body:
          "Klar tale, tight musik og lys der løfter rummet. Gennemført uden at larme visuelt.",
        vimeoSrc:
          "https://player.vimeo.com/video/1150126676?h=2b9851b0d2&badge=0&autopause=0&player_id=0&app_id=58479",
      },
      {
        key: "content",
        title: "Content",
        sub: "Én produktion. Flere leverancer.",
        body:
          "Vi bygger output som et system: én produktion, mange assets. Mere konsekvens og mindre friktion.",
        vimeoSrc:
          "https://player.vimeo.com/video/1150126676?h=2b9851b0d2&badge=0&autopause=0&player_id=0&app_id=58479",
      },
    ],
    []
  );

  const [active, setActive] = useState<number | null>(null);

  const railRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const x = el.scrollLeft;
      setCanLeft(x > 6);
      setCanRight(x < max - 6);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update as any);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByCards = (dir: -1 | 1) => {
    const el = railRef.current;
    if (!el) return;

    const first = el.querySelector<HTMLElement>("[data-card='true']");
    const gap = 20;
    const step = first ? first.offsetWidth + gap : 420;

    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="video" className="apSection">
      <style>{css}</style>

      <div className="apFullBleed">
        <div className="railWrap">
          {/* ultra subtle arrows (no background overlay) */}
          <button
            type="button"
            className={`navArrow left ${canLeft ? "on" : ""}`}
            onClick={() => scrollByCards(-1)}
            aria-label="Scroll left"
          >
            ‹
          </button>

          <button
            type="button"
            className={`navArrow right ${canRight ? "on" : ""}`}
            onClick={() => scrollByCards(1)}
            aria-label="Scroll right"
          >
            ›
          </button>

          <div
            ref={railRef}
            className={`rail ${canLeft ? "canLeft" : ""} ${canRight ? "canRight" : ""}`}
            role="list"
            aria-label="Collection"
            onMouseLeave={() => setActive(null)}
          >
            {cards.map((c, i) => {
              const isActive = active === i;

              return (
                <button
                  key={c.key}
                  type="button"
                  data-card="true"
                  className={`card ${isActive ? "isActive" : ""}`}
                  role="listitem"
                  aria-expanded={isActive}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive((prev) => (prev === i ? null : i))}
                >
                  {/* Square media with c5 border */}
                  <div className="mediaFrame">
                    <iframe
                      src={c.vimeoSrc}
                      title={c.title}
                      frameBorder={0}
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="media"
                    />
                    <div className="sheen" aria-hidden />
                  </div>

                  {/* Text under */}
                  <div className="copy">
                    <div className="title">{c.title}</div>
                    <div className="sub">{c.sub}</div>

                    <div className="more">
                      <div className="body">{c.body}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ✅ Adjust how far up this section starts:
 * More negative = starts higher (more overlap with previous section).
 * Less negative / positive = starts lower.
 */
const css = `
.apSection{
  /* 👇 adjust this */
  --startOffset: -40px;

  /* ✅ headroom for hover lift (prevents top border clipping) */
  --liftPad: 26px;

  position: relative;
  z-index: 4;
  margin-top: var(--startOffset);
  padding: 0 0 clamp(90px, 8vw, 120px);

  /* IMPORTANT: do not set a background here */
  background: transparent;
  overflow: visible;
}

.apFullBleed{
  width: 100vw;
  margin-left: calc(50% - 50vw);
  background: transparent;
}

.railWrap{
  position: relative;
  padding: 0 clamp(14px, 2.4vw, 36px);
  background: transparent;
}

/* Horizontal rail */
.rail{
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(260px, 1fr);
  gap: clamp(16px, 1.8vw, 24px);

  overflow-x: auto;
  overflow-y: visible;

  /* ✅ top padding = no clipping when lifting */
  padding: var(--liftPad) 0 16px;

  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
  background: transparent;
}
.rail::-webkit-scrollbar{ display: none; }

/* ✅ NO overlay fades (which change background).
   Instead we fade the CONTENT using mask-image.
   And we toggle based on whether you can scroll left/right. */
.rail{
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent 0%,
    #000 8%,
    #000 92%,
    transparent 100%
  );
  mask-image: linear-gradient(
    90deg,
    transparent 0%,
    #000 8%,
    #000 92%,
    transparent 100%
  );
}
.rail.canLeft.canRight{
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%);
  mask-image: linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%);
}
.rail.canLeft:not(.canRight){
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 10%, #000 100%);
  mask-image: linear-gradient(90deg, transparent 0%, #000 10%, #000 100%);
}
.rail.canRight:not(.canLeft){
  -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 90%, transparent 100%);
  mask-image: linear-gradient(90deg, #000 0%, #000 90%, transparent 100%);
}

/* Arrows: subtle + glassy c5 (no bg mismatch) */
.navArrow{
  position: absolute;
  top: calc(var(--liftPad) + 50%);
  transform: translateY(-50%);
  z-index: 5;

  width: 40px;
  height: 40px;
  border-radius: 999px;

  border: 1px solid color-mix(in srgb, var(--c5) 34%, rgba(11,11,12,0.12));
  background: color-mix(in srgb, var(--c5) 14%, transparent);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  display: grid;
  place-items: center;

  font-size: 22px;
  line-height: 1;
  color: var(--c1);

  opacity: 0;
  pointer-events: none;
  transition: opacity 220ms ease, transform 220ms ease;
}
.navArrow.on{
  opacity: 1;
  pointer-events: auto;
}
.navArrow.left{ left: calc(clamp(14px, 2.4vw, 36px) + 8px); }
.navArrow.right{ right: calc(clamp(14px, 2.4vw, 36px) + 8px); }
.navArrow:hover{ transform: translateY(-50%) scale(1.03); }

/* Card */
.card{
  scroll-snap-align: start;

  appearance: none;
  text-align: left;
  cursor: pointer;
  color: inherit;

  border: 1px solid color-mix(in srgb, var(--c5) 34%, rgba(11,11,12,0.10));
  border-radius: 0px;

  /* ✅ c5 dominates (still transparent/glassy) */
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--c5) 20%, transparent),
    color-mix(in srgb, var(--c5) 12%, transparent) 62%,
    transparent 100%
  );

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  padding: 14px;
  display: grid;
  gap: 14px;

  transition:
    transform 420ms cubic-bezier(.18,1,.22,1),
    box-shadow 420ms cubic-bezier(.18,1,.22,1),
    border-color 220ms ease,
    opacity 220ms ease;
}

.card.isActive{
  /* ✅ smaller lift (more AP, and safer) */
  transform: translateY(-10px) scale(1.02);
  border-color: color-mix(in srgb, var(--c5) 52%, rgba(11,11,12,0.10));
  box-shadow:
    0 28px 90px rgba(0,0,0,0.14),
    0 10px 28px rgba(0,0,0,0.08);
}

/* Square media */
.mediaFrame{
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 0px;

  border: 1px solid color-mix(in srgb, var(--c5) 58%, rgba(11,11,12,0.14));
  background: color-mix(in srgb, var(--c5) 10%, transparent);
}

/* Vimeo is 16:9, we cover a square */
.media{
  position: absolute;
  inset: 0;
  width: 180%;
  height: 100%;
  left: -40%;
  top: 0;
  border: 0;
  pointer-events: none;
  filter: saturate(1.02) contrast(1.02);
}
.card.isActive .media{
  width: 170%;
  left: -35%;
}

.sheen{
  position: absolute;
  inset: 0;
  background: linear-gradient(
    112deg,
    rgba(255,255,255,0.00) 0%,
    rgba(255,255,255,0.10) 26%,
    rgba(255,255,255,0.03) 56%,
    rgba(255,255,255,0.00) 80%
  );
  opacity: 0.45;
  pointer-events: none;
  transform: translateY(-10px);
}

/* Copy */
.copy{
  display: grid;
  gap: 8px;
  padding: 2px 2px 0;
}

.title{
  font-family: var(--font-heading);
  font-weight: 950;
  letter-spacing: -0.03em;
  line-height: 1.05;
  font-size: 18px;
  color: var(--c3);
}

.sub{
  font-weight: 850;
  letter-spacing: 0.01em;
  font-size: 13.5px;
  color: color-mix(in srgb, var(--text) 78%, transparent);
  line-height: 1.35;
}

.more{
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(6px);
  transition:
    max-height 420ms cubic-bezier(.18,1,.22,1),
    opacity 260ms ease,
    transform 260ms ease;
}

.card.isActive .more{
  max-height: 130px;
  opacity: 1;
  transform: translateY(0);
}

.body{
  font-size: 14px;
  line-height: 1.75;
  color: color-mix(in srgb, var(--text) 88%, transparent);
  text-wrap: balance;
}

/* Desktop: 4 in view, 5th requires scroll */
@media (min-width: 1100px){
  .rail{
    grid-auto-columns: calc((100vw - (2 * clamp(14px, 2.4vw, 36px)) - (3 * clamp(16px, 1.8vw, 24px))) / 4);
  }
}

/* Mobile */
@media (max-width: 720px){
  .rail{
    grid-auto-columns: minmax(78vw, 1fr);
  }
  .navArrow{ display: none; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce){
  .card, .more, .navArrow{ transition: none; }
}
`;
