// app/cases/page.tsx
"use client";

import { useMemo, useState } from "react";

type CategoryId = "livestream" | "events" | "reklamefilm" | "markedsfoering";

type CaseItem = {
  id: string;
  category: CategoryId;
  title: string;
  body: string;
  image: string;
};

const categories: { id: CategoryId; label: string }[] = [
  { id: "livestream", label: "Livestream" },
  { id: "events", label: "Events" },
  { id: "reklamefilm", label: "Reklamefilm" },
  { id: "markedsfoering", label: "Markedsføring" },
];

function labelFor(cat: CategoryId) {
  return categories.find((c) => c.id === cat)?.label ?? cat;
}

export default function CasesPage() {
  const allCases: CaseItem[] = useMemo(
    () => [
      {
        id: "livestream-personalemoede",
        category: "livestream",
        title: "Livestream af personalemøde",
        body:
          "Multi-cam, stabil afvikling og et udtryk der føles roligt og professionelt — uden at tage fokus fra indholdet.",
        image: "/cases/livestream-1.jpg",
      },
      {
        id: "livestream-konference",
        category: "livestream",
        title: "Hybrid konference med publikumsflow",
        body:
          "Scene, storskærm og stream bindes sammen til én samlet produktion — så formatet føles enkelt og sikkert.",
        image: "/cases/livestream-2.jpg",
      },
      {
        id: "events-awards",
        category: "events",
        title: "Awards / sceneshow med timing",
        body:
          "Lys, lyd og cues styres stramt. Setup der ser clean ud og performer stabilt hele vejen.",
        image: "/cases/events-1.jpg",
      },
      {
        id: "events-townhall",
        category: "events",
        title: "Townhall med storskærm og talkback",
        body:
          "Tryg afvikling for talere og teknik. Struktur, redundans og ro — fra start til slut.",
        image: "/cases/events-2.jpg",
      },
      {
        id: "reklamefilm-hero",
        category: "reklamefilm",
        title: "Reklamefilm med hero-look",
        body:
          "Cinematisk lys, tight pacing og lyd der føles premium. Leveret i formater til kampagne og SoMe.",
        image: "/cases/reklamefilm-1.jpg",
      },
      {
        id: "reklamefilm-case",
        category: "reklamefilm",
        title: "Casefilm med fokus på detaljen",
        body:
          "Enkelt, elegant og let at forstå. Historien bygges så den fungerer både langt og i klip.",
        image: "/cases/reklamefilm-2.jpg",
      },
      {
        id: "markedsfoering-contentsystem",
        category: "markedsfoering",
        title: "Content-system til løbende output",
        body:
          "Én produktion → mange assets. Konsekvent stil og mindre friktion på tværs af kanaler.",
        image: "/cases/markedsfoering-1.jpg",
      },
      {
        id: "markedsfoering-kampagne",
        category: "markedsfoering",
        title: "Kampagnepakke med flere leverancer",
        body:
          "Plan, produktion og leverancer i én pipeline — så du får både kvalitet og tempo uden kompromis.",
        image: "/cases/markedsfoering-2.jpg",
      },
    ],
    []
  );

  const [activeCat, setActiveCat] = useState<CategoryId>("livestream");

  const titlesForActive = useMemo(
    () => allCases.filter((c) => c.category === activeCat),
    [allCases, activeCat]
  );

  const scrollToCase = (id: string) => {
    const el = document.getElementById(`case-${id}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="casesPage" aria-label="Eksempler">
      <style>{css}</style>

      {/* Top explorer (FAQ-like) */}
      <section className="explore" aria-label="Udforsk" style={{ padding: 0 }}>
        <div className="container" style={{ padding: "96px 0" }}>
          <h1
            style={{
              margin: "14px 0 0",
              fontFamily: "var(--font-heading)",
              fontWeight: 350,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
              fontSize: "clamp(28px, 3.2vw, 44px)",
              color: "color-mix(in srgb, var(--c1) 92%, transparent)",
            }}
          >
            Udforsk vores udvalg af produktioner her
          </h1>

          <div className="exploreGrid">
            {/* Left categories */}
            <aside className="cats" aria-label="Kategorier">
              <nav className="catNav">
                {categories.map((c) => {
                  const isActive = c.id === activeCat;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={`catLink ${isActive ? "isActive" : ""}`}
                      onClick={() => setActiveCat(c.id)}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Divider like the reference */}
            <div className="divider" aria-hidden />

            {/* Right “FAQ lines” (only active category) */}
            <section className="list" aria-label="Produktioner">
              <div className="listHeader">
                <div className="listKicker">{labelFor(activeCat)}</div>
              </div>

              <div className="rows" role="list">
                {titlesForActive.map((it) => (
                  <button
                    key={it.id}
                    type="button"
                    role="listitem"
                    className="row"
                    onClick={() => scrollToCase(it.id)}
                  >
                    <div className="rowText">{it.title}</div>
                    <div className="rowIcon" aria-hidden>
                      +
                    </div>
                    <div className="rowLine" aria-hidden />
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* All cases (still show everything on scroll) */}
      <section className="examples" aria-label="Eksempler">
        <div className="container">
          <div className="examplesGrid">
            {allCases.map((it) => (
              <article key={it.id} id={`case-${it.id}`} className="exRow">
                <div className="exMedia" aria-hidden>
                  <div
                    className="exImg"
                    style={{ backgroundImage: `url(${it.image})` }}
                  />
                </div>

                <div className="exCopy">
                  <div className="exKicker">{labelFor(it.category)}</div>
                  <h2 className="exTitle">{it.title}</h2>
                  <p className="exBody">{it.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const css = `
.casesPage{
  background: transparent;
}

/* --------- TOP (match the reference) --------- */
.explore{
  padding: clamp(64px, 7.2vw, 96px) 0 clamp(40px, 5vw, 58px);
}

.exploreTitle{
  margin: 0;
  font-family: var(--font-heading);
  font-weight: 350;
  letter-spacing: -0.02em;
  line-height: 1.18;
  font-size: clamp(22px, 2.7vw, 38px);
  color: color-mix(in srgb, var(--c1) 92%, transparent);
}

.exploreGrid{
  margin-top: clamp(32px, 4.6vw, 56px);
  display: grid;
  grid-template-columns: 260px 1px 1fr;
  gap: clamp(26px, 4vw, 56px);
  align-items: start;
}

/* Left categories (like the image) */
.catNav{
  display: grid;
  gap: 18px;
  padding-top: 8px;
}

.catLink{
  appearance: none;
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;

  font-family: var(--font-body);
  font-size: var(--t14);
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.35;

  color: color-mix(in srgb, var(--c1) 70%, transparent);
  width: fit-content;

  border-bottom: 1px solid transparent;
  padding-bottom: 8px;
  transition: color 160ms ease, border-color 160ms ease, transform 160ms ease, opacity 160ms ease;
  opacity: 0.92;
}

.catLink:hover{
  color: var(--c3);
  border-bottom-color: color-mix(in srgb, var(--c3) 26%, transparent);
  transform: translateY(-1px);
  opacity: 1;
}

.catLink.isActive{
  color: var(--c3);
  border-bottom-color: color-mix(in srgb, var(--c3) 34%, transparent);
  opacity: 1;
}

/* Vertical divider */
.divider{
  width: 1px;
  background: color-mix(in srgb, var(--c1) 14%, transparent);
  height: 100%;
  min-height: 240px;
  margin-top: 8px;
}

/* Right list (FAQ feel) */
.listHeader{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 4px;
}

.listKicker{
  font-size: var(--t11);
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--c1) 55%, transparent);
}

.rows{
  margin-top: 8px;
  display: grid;
}

.row{
  position: relative;
  width: 100%;
  appearance: none;
  border: 0;
  background: transparent;
  padding: 22px 0 22px;
  cursor: pointer;

  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 14px;

  text-align: left;
}

.rowText{
  font-family: var(--font-body);
  font-size: var(--t16);
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.45;
  color: color-mix(in srgb, var(--c1) 86%, transparent);
}

.rowIcon{
  font-size: 18px;
  font-weight: 500;
  color: color-mix(in srgb, var(--c1) 62%, transparent);
  transform: translateY(-1px);
}

.rowLine{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: color-mix(in srgb, var(--c1) 16%, transparent);
}

.row:hover .rowText{
  color: color-mix(in srgb, var(--c3) 52%, var(--c1));
}

.row:hover .rowIcon{
  color: var(--c3);
}

/* --------- CASES (alternate like the reference) --------- */
.examples{
  padding: clamp(34px, 4.8vw, 56px) 0 clamp(86px, 9vw, 122px);
}

.examplesGrid{
  display: grid;
  gap: clamp(26px, 4.4vw, 52px);
}

.exRow{
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: clamp(22px, 4vw, 54px);
  align-items: stretch;
}

.exRow:nth-child(even){
  grid-template-columns: 1fr 1.35fr;
}
.exRow:nth-child(even) .exMedia{ order: 2; }
.exRow:nth-child(even) .exCopy{ order: 1; }

/* Media (sharp, clean, no rounding) */
.exMedia{
  position: relative;
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--c1) 14%, transparent);
  overflow: hidden;
  background: transparent;
  min-height: clamp(260px, 32vw, 430px);
}

.exImg{
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: saturate(1.02) contrast(1.02);
}

.exCopy{
  padding: clamp(10px, 2vw, 22px) 0;
  display: grid;
  align-content: start;
}

.exKicker{
  font-size: var(--t11);
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--c1) 58%, transparent);
}

.exTitle{
  margin: 12px 0 0;
  font-family: var(--font-heading);
  font-weight: 350;
  letter-spacing: -0.02em;
  line-height: 1.12;
  font-size: clamp(24px, 3.2vw, 44px);
  color: color-mix(in srgb, var(--c1) 92%, transparent);
}

.exBody{
  margin: 14px 0 0;
  font-size: var(--t16);
  line-height: 1.8;
  color: color-mix(in srgb, var(--c1) 72%, transparent);
  max-width: 64ch;
}

/* --------- Responsive --------- */
@media (max-width: 980px){
  .exploreGrid{
    grid-template-columns: 1fr;
    gap: 18px;
  }
  .divider{
    display: none;
  }
  .catNav{
    grid-auto-flow: column;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px 18px;
    padding-top: 0;
  }
  .catLink{
    padding-bottom: 6px;
  }

  .exRow,
  .exRow:nth-child(even){
    grid-template-columns: 1fr;
  }
  .exRow:nth-child(even) .exMedia,
  .exRow:nth-child(even) .exCopy{
    order: initial;
  }
}
`;
