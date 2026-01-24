"use client";

import React, { useMemo } from "react";

type Point = {
  title: string;
  sentence: string;
  imgSrc: string;
  fallback: string;
};

export default function BrandSection() {
  const points: Point[] = useMemo(
    () => [
      {
        title: "Livestream",
        sentence:
          "Skarpt signal og rolig afvikling — fra setup til storskærm, uden stress.",
        imgSrc: "/1.png",
        fallback: "✦",
      },
      {
        title: "Reklamefilm",
        sentence:
          "Cinematisk content med stramt look, pacing og lyd der føles dyrt.",
        imgSrc: "/2.png",
        fallback: "◆",
      },
      {
        title: "Lyd og Lys",
        sentence:
          "Vi bygger stemning og flow med lyd, lys og timing — helt uden micromanage.",
        imgSrc: "/3.png",
        fallback: "⬟",
      },
    ],
    []
  );

  return (
    <section id="brand" className="brandSection">
      <style>{css}</style>

      <div className="container brandContainer">
        <div className="brandLayout">
          {/* LEFT 1/3: Graphic BAGVED in a framed box */}
          <div className="brandLeft">
            <div className="brandLeftFrame" aria-hidden>
              <div className="brandLeftWord">BAGVED</div>
            </div>
          </div>

          {/* RIGHT 2/3: Only 3 points, each with one sentence */}
          <div className="brandRight" role="list" aria-label="Services">
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
    <div className="brandItem" role="listitem">
      <IconMark imgSrc={point.imgSrc} fallback={point.fallback} />
      <div className="brandItemText">
        <div className="brandItemTitle">{point.title}</div>
        <div className="brandItemSentence">
          <span className="brandSentenceBg" aria-hidden />
          <span className="brandSentenceText">{point.sentence}</span>
        </div>
      </div>
    </div>
  );
}

function IconMark({ imgSrc, fallback }: { imgSrc: string; fallback: string }) {
  const [failed, setFailed] = React.useState(false);

  return (
    <div className="brandIcon" aria-hidden>
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

const css = `
/* SECTION */
.brandSection{
  position: relative;
  padding: clamp(84px, 9vw, 130px) 0 clamp(44px, 6vw, 70px);
  background: transparent;
}

/* Container */
.brandContainer{
  position: relative;
}

/* Layout: left 1/3 graphic, right 2/3 content */
.brandLayout{
  display: grid;
  grid-template-columns: minmax(260px, 33.5%) 1fr;
  gap: clamp(18px, 4vw, 42px);
  align-items: start;
}

/* LEFT */
.brandLeft{
  position: relative;
}

/* The framed box around the left third */
.brandLeftFrame{
  position: sticky;
  top: clamp(84px, 8vw, 120px);

  height: clamp(420px, 62vh, 640px);
  border: 1px solid color-mix(in srgb, var(--c3) 22%, transparent);
  border-radius: 0;
  overflow: hidden;

  /* super subtle tint only (no “card shadow”) */
  background:
    linear-gradient(180deg,
      color-mix(in srgb, var(--c1) 0.9%, transparent),
      transparent 72%),
    linear-gradient(90deg,
      color-mix(in srgb, #ff3b3b 3.5%, transparent),
      transparent 55%);
}

/* The BAGVED word as a graphic element covering this third */
.brandLeftWord{
  position: absolute;
  inset: -10% -18% -10% -18%;
  display: grid;
  place-items: center;

  /* Make it a graphic: huge, thin, outline */
  font-family: var(--font-heading);
  font-weight: 200;
  letter-spacing: 0.06em;
  line-height: 0.88;
  font-size: clamp(120px, 11vw, 220px);

  color: transparent;
  -webkit-text-stroke: 1px color-mix(in srgb, var(--c3) 34%, transparent);
  text-stroke: 1px color-mix(in srgb, var(--c3) 34%, transparent);

  /* tiny “red whisper” only inside strokes */
  background: linear-gradient(
    90deg,
    color-mix(in srgb, #ff3b3b 7%, transparent),
    transparent 60%
  );
  -webkit-background-clip: text;
  background-clip: text;

  transform: rotate(-8deg);
  mix-blend-mode: multiply;
  opacity: 0.95;
  user-select: none;
}

/* RIGHT */
.brandRight{
  display: grid;
  gap: clamp(14px, 2.2vw, 18px);
  padding-top: 2px;
}

/* Item row */
.brandItem{
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  gap: 14px;
  align-items: start;

  padding: 10px 0;
  border-top: 1px solid color-mix(in srgb, var(--c3) 10%, transparent);
}
.brandItem:first-child{
  border-top: none;
  padding-top: 0;
}

/* Icon: sharp, no shadow */
.brandIcon{
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;

  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--c3) 18%, transparent);
  background: color-mix(in srgb, #ff3b3b 2.8%, transparent);
}
.brandIconImg{
  width: 44px;
  height: 44px;
  object-fit: contain;
}
.brandIconFallback{
  font-size: 26px;
  font-weight: 900;
  color: var(--c1);
}

/* Text: ONLY title + one sentence */
.brandItemText{
  display: grid;
  gap: 10px;
}

.brandItemTitle{
  font-family: var(--font-heading);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.1;
  font-size: clamp(18px, 1.35vw, 22px);
  color: color-mix(in srgb, var(--c1) 92%, transparent);
}

/* Sentence with a single background strip behind it */
.brandItemSentence{
  position: relative;
  display: inline-block;
  padding: 2px 0;
}

.brandSentenceBg{
  position: absolute;
  left: -10px;
  right: -10px;
  top: 55%;
  height: 12px;
  transform: translateY(-50%);
  pointer-events: none;

  /* “one strip behind the sentence” */
  background: linear-gradient(
    90deg,
    color-mix(in srgb, #ff3b3b 12%, transparent),
    color-mix(in srgb, var(--c1) 1.3%, transparent) 55%,
    transparent
  );
  opacity: 0.9;
}

.brandSentenceText{
  position: relative;
  font-size: 15px;
  line-height: 1.7;
  color: color-mix(in srgb, var(--text) 92%, transparent);
}

/* Hover: minimal, not UI-toy */
@media (hover:hover){
  .brandItem:hover .brandSentenceBg{
    opacity: 1;
  }
  .brandItem:hover .brandIcon{
    transform: translateY(-1px);
    transition: transform 160ms ease;
  }
}

/* Mobile */
@media (max-width: 900px){
  .brandLayout{
    grid-template-columns: 1fr;
  }

  .brandLeftFrame{
    position: relative;
    top: auto;
    height: clamp(240px, 32vh, 320px);
  }

  .brandLeftWord{
    font-size: clamp(92px, 14vw, 160px);
    transform: rotate(-6deg);
  }

  .brandRight{
    padding-top: 6px;
  }
}
`;
