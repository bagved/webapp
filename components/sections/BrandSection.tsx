"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Point = {
  title: string;
  subtitle: string;
  body: string;
  imgSrc: string;
  fallback: string;
};

export default function BrandSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [brandWordOpacity, setBrandWordOpacity] = useState(0.92);

  const points: Point[] = useMemo(
    () => [
      {
        title: "Livestream",
        subtitle: "Broadcast & storskærm — uden stress.",
        body:
          "Skarpt signal, roligt setup og et crew der får det til at køre. Perfekt til konferencer, talks, produktlanceringer og events, hvor det bare skal spille.",
        imgSrc: "/1.png",
        fallback: "✦",
      },
      {
        title: "Reklamefilm",
        subtitle: "Content & kampagner med blikfang.",
        body:
          "Cinematisk, stramt og brand-aligned. Vi laver hero-film og klip til SoMe med pacing, lys og lyd der føles dyrt — uden at larme visuelt.",
        imgSrc: "/2.png",
        fallback: "◆",
      },
      {
        title: "Lyd og Lys",
        subtitle: "Eventplanlægning — fra idé til afvikling.",
        body:
          "Vi bygger stemning og flow: lyd, lys og timing. Resultatet er en oplevelse der føles gennemført, og en dag hvor du ikke skal micromanage noget.",
        imgSrc: "/3.png",
        fallback: "⬟",
      },
    ],
    []
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = 1 - clamp(r.bottom / vh, 0, 1);
      const opacity = 0.92 - progress * 0.92;
      setBrandWordOpacity(clamp(opacity, 0, 0.92));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="brand" ref={sectionRef as any} className="brandSection">
      <style>{css}</style>

      {/* More visible plate, still fading with BAGVED */}
      <TintPlate opacity={brandWordOpacity} />

      {/* BAGVED (your placement + tilt) */}
      <BrandWord word="BAGVED" opacity={brandWordOpacity} />

      {/* Clickable note */}
      <CornerNote targetId="contact" />

      <div className="container brandContainer">
        {/* Right rail: title + points (only ~1/3 width on desktop) */}
        <div className="brandRail">
          <div className="brandHeader">
            <h2 className="brandTitle">
              Tre ting vi kan
              <br />
              gøre virkelig lækkert.
            </h2>
          </div>

          <div className="brandList" role="list">
            {points.map((p) => (
              <PointRow key={p.title} point={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PointRow({ point }: { point: Point }) {
  return (
    <div className="brandItem point-row" role="listitem">
      <IconMark imgSrc={point.imgSrc} fallback={point.fallback} />
      <div className="brandText">
        <div className="brandItemTitleRow">
          <div className="brandItemTitle">{point.title}</div>
          <div className="brandItemSubtitle">{point.subtitle}</div>
        </div>
        <div className="brandItemBody">{point.body}</div>
      </div>
    </div>
  );
}

function IconMark({ imgSrc, fallback }: { imgSrc: string; fallback: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="brandIcon">
      {!failed ? (
        <img
          src={imgSrc}
          alt=""
          width={44}
          height={44}
          loading="lazy"
          onError={() => setFailed(true)}
          className="brandIconImg"
        />
      ) : (
        <span className="brandIconFallback">{fallback}</span>
      )}
    </div>
  );
}

function BrandWord({ word, opacity }: { word: string; opacity: number }) {
  return (
    <div className="brandWordWrap" aria-hidden>
      <div className="brandWord" style={{ opacity }}>
        {word}
      </div>
    </div>
  );
}

/** More visible plate in #D5C7BC, fixed and fading with BAGVED */
function TintPlate({ opacity }: { opacity: number }) {
  // make it clearly visible, but still elegant
  const plateOpacity = clamp(opacity * 0.78, 0, 0.78);

  return (
    <div className="tintPlateWrap" aria-hidden style={{ opacity: plateOpacity }}>
      <div className="tintPlate" />
    </div>
  );
}

function CornerNote({ targetId }: { targetId: string }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY || 0));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const fadeDistance = 250;
  const opacity = Math.max(0, Math.min(1, 1 - scrollY / fadeDistance));
  const translateY = Math.min(12, (scrollY / fadeDistance) * 12);
  const pointerEvents = opacity < 0.06 ? ("none" as const) : ("auto" as const);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${targetId}`);
    }
  };

  return (
    <a
      href={`#${targetId}`}
      className="cornerNote"
      style={{
        opacity,
        transform: `translateY(-${translateY}px)`,
        pointerEvents,
      }}
      onClick={onClick}
      aria-label="Scroll to contact section"
    >
      <span className="cornerNoteText">Tag kontakt til os i dag</span>
      <span className="cornerNoteUnderline" aria-hidden />
    </a>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

const css = `
/* SECTION */
.brandSection{
  --peek: 84px;
  position: relative;
  min-height: calc(100vh - var(--peek));
  padding: clamp(96px, 10vw, 140px) 0 clamp(48px, 6vw, 70px);
  background: transparent;
  overflow: visible;
}

/* =========================
   PLATE (more visible)
   ========================= */
.tintPlateWrap{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;
  transition: opacity 280ms ease;

  /* tiny shift so it feels “placed” */
  transform: translateX(clamp(0px, 1.4vw, 18px));
}

/* Big rectangular slab that extends under BAGVED and into the right side */
.tintPlate{
  width: clamp(720px, 64vw, 1180px);
  height: calc(100vh + 280px);
  border-radius: 0px;

  /* More “solid” and visible than before */
  background:
    linear-gradient(
      135deg,
      rgba(213,199,188,0.86) 0%,
      rgba(213,199,188,0.62) 58%,
      rgba(213,199,188,0.36) 100%
    );

  /* Premium edge + depth */
  border: 1px solid rgba(213,199,188,0.85);
  box-shadow:
    0 58px 170px rgba(0,0,0,0.14),
    0 22px 70px rgba(0,0,0,0.10),
    inset 0 0 0 1px rgba(255,255,255,0.22);

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* Container (we push the whole content rail right) */
.brandContainer{
  position: relative;
  z-index: 2;

  /* move "all text" to the right significantly */
  padding-left: clamp(120px, 14vw, 260px);
  padding-right: clamp(18px, 3vw, 44px);
}

/* ✅ Right rail that only uses ~1/3 of page on desktop */
.brandRail{
  margin-left: auto; /* push to right */
  width: min(520px, 34vw); /* ~1/3 width */
  max-width: 560px;
}

/* Header */
.brandHeader{
  display: grid;
  gap: 10px;
  padding-top: 6px;
}

.brandTitle{
  margin: 0;
  font-family: var(--font-heading);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1.02;
  color: var(--c1);
  font-size: clamp(42px, 3.9vw, 62px); /* a little tighter for 1/3 column */
  text-wrap: balance;
}

/* List */
.brandList{
  display: grid;
  gap: clamp(18px, 2.6vw, 26px);
  margin-top: 18px;
}

.brandItem{
  position: relative;
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  gap: 16px;
  align-items: start;
  padding: 10px 0;
  outline: none;
}

.brandItemTitle,
.brandItemSubtitle,
.brandItemBody,
.brandIcon{
  transition: color 180ms ease, opacity 180ms ease, transform 180ms ease, filter 180ms ease;
}

.brandItemTitle{ color: color-mix(in srgb, var(--c1) 90%, transparent); }
.brandItemSubtitle{ color: color-mix(in srgb, var(--text) 74%, transparent); }
.brandItemBody{ color: color-mix(in srgb, var(--text) 88%, transparent); }

.brandItem:hover .brandItemTitle{ color: var(--c1); }
.brandItem:hover .brandItemSubtitle{ color: color-mix(in srgb, var(--text) 88%, transparent); }
.brandItem:hover .brandItemBody{ color: color-mix(in srgb, var(--text) 96%, transparent); }

.brandText{ display: grid; gap: 10px; }

.brandItemTitleRow{
  display: grid;
  gap: 6px;
}

.brandItemTitle{
  font-family: var(--font-heading);
  font-weight: 950;
  letter-spacing: -0.02em;
  font-size: clamp(20px, 1.55vw, 26px);
  line-height: 1.12;
}

.brandItemSubtitle{
  font-weight: 750;
  font-size: 14px;
  letter-spacing: 0.02em;
}

.brandItemBody{
  font-size: 15px;
  line-height: 1.75;
}

/* Icon */
.brandIcon{
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(11,11,12,0.10);
  background: color-mix(in srgb, var(--c1) 2.5%, transparent);
  box-shadow: 0 18px 55px rgba(0,0,0,0.06);
}
.brandIconImg{
  width: 44px;
  height: 44px;
  object-fit: contain;
  filter: drop-shadow(0px 14px 26px rgba(0,0,0,0.10));
}
.brandIconFallback{
  font-size: 26px;
  font-weight: 900;
  color: var(--c1);
}

/* BAGVED (your placement + tilt) */
.brandWordWrap{
  position: fixed;
  left: clamp(10px, 0.8vw, 10px);
  top: clamp(120px, 12vw, 170px);
  z-index: 1;
  pointer-events: none;
  transform: rotate(-25deg);
  transform-origin: left top;
}
.brandWord{
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: var(--font-heading);
  font-weight: 250;
  letter-spacing: 0.08em;
  line-height: 0.88;
  font-size: clamp(90px, 22vh, 220px);
  color: var(--c3);
  transition: opacity 280ms ease;
  filter: drop-shadow(0px 18px 40px rgba(0,0,0,0.10));
  user-select: none;
  mix-blend-mode: multiply;
}

/* Clickable note */
.cornerNote{
  position: fixed;
  right: clamp(14px, 2.2vw, 22px);
  top: clamp(78px, 6.6vw, 108px);
  z-index: 7;

  display: inline-grid;
  gap: 6px;

  text-decoration: none;
  color: var(--c3);
  transform: rotate(-2deg);

  padding: 6px 2px 10px;
  line-height: 1.2;
}
.cornerNoteText{
  display: inline-block;
  padding-bottom: 2px;
  line-height: 1.25;

  font-family: "Caveat", "Patrick Hand", "Bradley Hand", "Comic Sans MS", cursive;
  font-weight: 600;
  letter-spacing: 0.01em;
  font-size: clamp(18px, 1.6vw, 22px);

  clip-path: inset(0 100% 0 0);
  animation: noteReveal 820ms ease forwards;
}
.cornerNoteUnderline{
  width: clamp(180px, 18vw, 260px);
  height: 10px;
  justify-self: start;

  background: currentColor;
  border-radius: 999px;
  opacity: 0.95;

  transform-origin: left center;
  transform: skewX(-14deg) scaleX(0);
  animation: underlineDraw 900ms ease forwards;
  animation-delay: 180ms;

  filter: drop-shadow(0px 10px 18px rgba(0,0,0,0.10));
}
.cornerNote:hover .cornerNoteUnderline{
  opacity: 1;
  transform: skewX(-14deg) scaleX(1.03);
}
.cornerNote:hover .cornerNoteText{
  filter: drop-shadow(0px 10px 18px rgba(0,0,0,0.10));
}
@keyframes noteReveal{
  0% { clip-path: inset(0 100% 0 0); filter: blur(0.2px); }
  100% { clip-path: inset(0 0% 0 0); filter: blur(0); }
}
@keyframes underlineDraw{
  to { transform: skewX(-14deg) scaleX(1); }
}

/* Mobile: allow full-width reading */
@media (max-width: 820px){
  .brandSection{ --peek: 64px; }

  .tintPlate{
    width: 92vw;
    height: calc(100vh + 160px);
  }

  .brandContainer{
    padding-left: clamp(18px, 6vw, 46px);
    padding-right: 18px;
  }

  .brandRail{
    width: 100%;
    max-width: 680px;
    margin-left: 0;
  }

  .brandTitle{
    font-size: clamp(40px, 9vw, 54px);
  }

  .brandWord{
    font-size: clamp(84px, 18vh, 160px);
  }

  .cornerNote{
    top: 86px;
    right: 12px;
    transform: rotate(-2deg) scale(0.95);
  }
  .cornerNoteUnderline{
    width: 200px;
  }
}
`;
