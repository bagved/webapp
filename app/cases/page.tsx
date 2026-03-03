"use client";

import { useEffect, useMemo, useState } from "react";

type CategoryId =
  | "live-broadcast"
  | "virksomhedsfilm-reklame"
  | "sociale-medier"
  | "eventvideo-eventteknik"
  | "foto-drone";

type CaseItem = {
  id: string;
  category: CategoryId;
  title: string;
  body: string;
  image: string;
};

const categories: { id: CategoryId; label: string }[] = [
  { id: "live-broadcast", label: "Live & broadcast" },
  { id: "virksomhedsfilm-reklame", label: "Virksomhedsfilm & reklame" },
  { id: "sociale-medier", label: "Sociale medier" },
  { id: "eventvideo-eventteknik", label: "Eventvideo & eventteknik" },
  { id: "foto-drone", label: "Foto & drone" },
];

function labelFor(cat: CategoryId) {
  return categories.find((c) => c.id === cat)?.label ?? cat;
}

export default function CasesPage() {
  const allCases: CaseItem[] = useMemo(
    () => [
      {
        id: "livestream",
        category: "live-broadcast",
        title: "Livestream",
        body:
          "Stabil livestream med professionel afvikling til events, oplæg og digitale produktioner. Vi sikrer et roligt setup, god lyd og en udsendelse, der fungerer fra start til slut.",
        image: "/cases/livestream-1.jpg",
      },
      {
        id: "sportsbroadcast",
        category: "live-broadcast",
        title: "Sportsbroadcast",
        body:
          "Flerkameraproduktion til sport med fokus på flow, timing og et klart broadcast-udtryk. En løsning, der gør det let at følge begivenheden – både på location og online.",
        image: "/cases/livestream-2.jpg",
      },
      {
        id: "webinar-studieproduktion",
        category: "live-broadcast",
        title: "Webinar & studieproduktion",
        body:
          "Webinarer og studieopsætninger i kontrollerede rammer, hvor teknik, framing og lyd går op i en højere enhed. Velegnet til præsentationer, undervisning og intern kommunikation.",
        image: "/cases/livestream-3.jpg",
      },
      {
        id: "reklamefilm",
        category: "virksomhedsfilm-reklame",
        title: "Reklamefilm",
        body:
          "Reklamefilm med et skarpt visuelt udtryk og et klart budskab. Produceret til kampagner, lanceringer og branding, hvor kvalitet og genkendelighed er afgørende.",
        image: "/cases/reklamefilm-1.jpg",
      },
      {
        id: "virksomhedsvideo",
        category: "virksomhedsfilm-reklame",
        title: "Virksomhedsvideo",
        body:
          "Video, der præsenterer virksomheden professionelt og troværdigt. Ideel til hjemmeside, employer branding, salgsarbejde og præsentation af kultur, ydelser eller værdier.",
        image: "/cases/reklamefilm-2.jpg",
      },
      {
        id: "produktvideo",
        category: "virksomhedsfilm-reklame",
        title: "Produktvideo",
        body:
          "Produktvideoer, der gør komplekse produkter lettere at forstå og mere attraktive at se på. Velegnet til lanceringer, annoncer, webshop og præsentationer.",
        image: "/cases/reklamefilm-3.jpg",
      },
      {
        id: "sociale-medier",
        category: "sociale-medier",
        title: "Video til sociale medier",
        body:
          "Korte, målrettede videoer til LinkedIn, Instagram, Facebook og andre platforme. Formateret og produceret til hurtigt at fange opmærksomheden og være nemme at bruge i kampagner.",
        image: "/cases/markedsfoering-1.jpg",
      },
      {
        id: "eventvideo",
        category: "eventvideo-eventteknik",
        title: "Eventvideo",
        body:
          "Visuelle highlights og stemningsvideoer fra events, konferencer og arrangementer. En effektiv måde at forlænge værdien af et event og skabe indhold efterfølgende.",
        image: "/cases/events-1.jpg",
      },
      {
        id: "eventteknik",
        category: "eventvideo-eventteknik",
        title: "Lyd, lys & eventteknik",
        body:
          "Teknisk afvikling med fokus på driftssikker lyd, lys og AV til events, talks og fester. Vi leverer det nødvendige setup, så arrangementet fungerer professionelt.",
        image: "/cases/events-2.jpg",
      },
      {
        id: "drone",
        category: "foto-drone",
        title: "Dronevideo & dronebilleder",
        body:
          "Luftoptagelser og dronebilleder, der skaber overblik, dybde og stærke vinkler. Perfekt til events, lokationer, ejendomme og visuelle præsentationer.",
        image: "/cases/drone-1.jpg",
      },
      {
        id: "stillfoto",
        category: "foto-drone",
        title: "Stillfoto & billedredigering",
        body:
          "Stillbilleder og efterbehandling til virksomheder, events og kampagner. Et stærkt supplement til video, når du også skal bruge skarpt visuelt materiale i høj kvalitet.",
        image: "/cases/photo-1.jpg",
      },
    ],
    []
  );

  const [activeCat, setActiveCat] = useState<CategoryId>("live-broadcast");

  const centerCaseById = (id: string, behavior: ScrollBehavior = "smooth") => {
    const el = document.getElementById(`case-${id}`);
    if (!el) return false;

    const rect = el.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    const targetTop = Math.max(
      0,
      absoluteTop - (window.innerHeight / 2 - rect.height / 2)
    );

    window.scrollTo({
      top: targetTop,
      behavior,
    });

    return true;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const cat = params.get("cat") as CategoryId | null;
    const caseId = params.get("case");

    if (cat && categories.some((c) => c.id === cat)) {
      setActiveCat(cat);
    }

    if (!caseId) return;

    let raf1 = 0;
    let raf2 = 0;
    let timeout = 0;

    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        timeout = window.setTimeout(() => {
          centerCaseById(caseId, "smooth");
        }, 80);
      });
    });

    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      window.clearTimeout(timeout);
    };
  }, []);

  const titlesForActive = useMemo(
    () => allCases.filter((c) => c.category === activeCat),
    [allCases, activeCat]
  );

  const scrollToCase = (id: string, category: CategoryId) => {
    setActiveCat(category);

    const nextUrl = `/cases?cat=${category}&case=${id}`;
    window.history.replaceState(null, "", nextUrl);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        centerCaseById(id, "smooth");
      });
    });
  };

  return (
    <main className="casesPage" aria-label="Eksempler">
      <style>{css}</style>

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
            Udforsk vores produktioner
          </h1>

          <div className="exploreGrid">
            <aside className="cats" aria-label="Kategorier">
              <nav className="catNav">
                {categories.map((c) => {
                  const isActive = c.id === activeCat;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={`catLink ${isActive ? "isActive" : ""}`}
                      onClick={() => {
                        setActiveCat(c.id);
                        window.history.replaceState(null, "", `/cases?cat=${c.id}`);
                      }}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </nav>
            </aside>

            <div className="divider" aria-hidden />

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
                    onClick={() => scrollToCase(it.id, it.category)}
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

.explore{
  padding: clamp(64px, 7.2vw, 96px) 0 clamp(40px, 5vw, 58px);
}

.exploreGrid{
  margin-top: clamp(32px, 4.6vw, 56px);
  display: grid;
  grid-template-columns: 260px 1px 1fr;
  gap: clamp(26px, 4vw, 56px);
  align-items: start;
}

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

.divider{
  width: 1px;
  background: color-mix(in srgb, var(--c1) 14%, transparent);
  height: 100%;
  min-height: 240px;
  margin-top: 8px;
}

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

.examples{
  padding: clamp(34px, 4.8vw, 56px) 0 0;
}

.examplesGrid{
  display: grid;
  gap: 0;
}

.exRow{
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: clamp(22px, 4vw, 54px);
  align-items: stretch;
  padding: clamp(22px, 4vw, 40px);
  border-radius: 0;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

.exRow:nth-child(odd){
  grid-template-columns: 1.35fr 1fr;
  background: transparent;
}

.exRow:nth-child(even){
  grid-template-columns: 1fr 1.35fr;
  background: #1A0A40;
}
.exRow:nth-child(even) .exMedia{ order: 2; }
.exRow:nth-child(even) .exCopy{ order: 1; }

.exMedia{
  position: relative;
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--c1) 14%, transparent);
  overflow: hidden;
  background: transparent;
  min-height: clamp(260px, 32vw, 430px);
}

.exRow:nth-child(even) .exMedia{
  border-color: color-mix(in srgb, #FFFFFF 18%, transparent);
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

.exRow:nth-child(even) .exKicker{
  color: color-mix(in srgb, #FFFFFF 48%, transparent);
}
.exRow:nth-child(even) .exTitle{
  color: #FFFFFF;
}
.exRow:nth-child(even) .exBody{
  color: color-mix(in srgb, #FFFFFF 78%, transparent);
}

@media (max-width: 980px){
  .exploreGrid{
    grid-template-columns: 1fr;
    gap: 18px;
  }
  .divider{
    display: none;
  }
  .catNav{
    grid-auto-flow: row;
    grid-template-columns: 1fr;
    gap: 14px;
    padding-top: 0;
  }
  .catLink{
    padding-bottom: 6px;
  }

  .exRow,
  .exRow:nth-child(even),
  .exRow:nth-child(odd){
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 20px 16px;
  }

  .exRow .exMedia{ order: 1 !important; }
  .exRow .exCopy{ order: 2 !important; }

  .exRow:nth-child(odd){
    background: transparent;
  }
  .exRow:nth-child(odd) .exMedia{
    border-color: color-mix(in srgb, var(--c1) 14%, transparent);
    min-height: 220px;
  }
  .exRow:nth-child(odd) .exKicker{
    color: color-mix(in srgb, var(--c1) 58%, transparent);
  }
  .exRow:nth-child(odd) .exTitle{
    color: color-mix(in srgb, var(--c1) 92%, transparent);
    font-size: clamp(22px, 7vw, 30px);
  }
  .exRow:nth-child(odd) .exBody{
    color: color-mix(in srgb, var(--c1) 72%, transparent);
    line-height: 1.65;
  }

  .exRow:nth-child(even){
    background: #1A0A40;
  }
  .exRow:nth-child(even) .exMedia{
    border-color: color-mix(in srgb, #FFFFFF 18%, transparent);
    min-height: 220px;
  }
  .exRow:nth-child(even) .exKicker{
    color: color-mix(in srgb, #FFFFFF 48%, transparent);
  }
  .exRow:nth-child(even) .exTitle{
    color: #FFFFFF;
    font-size: clamp(22px, 7vw, 30px);
  }
  .exRow:nth-child(even) .exBody{
    color: color-mix(in srgb, #FFFFFF 78%, transparent);
    line-height: 1.65;
  }
}
`;