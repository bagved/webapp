"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

type ServiceId =
  | "live-broadcast"
  | "virksomhedsfilm-reklame"
  | "sociale-medier"
  | "eventvideo-eventteknik"
  | "foto-drone"
  | "konceptudvikling-eventkoordinering";

type Service = {
  id: ServiceId;
  title: string;
  body: string;
  icon: React.ReactNode;
  examplesHref: string;
};

export default function ServicesPage() {
  const services: Service[] = useMemo(
    () => [
      {
        id: "live-broadcast",
        title: "Live & broadcast",
        body:
          "Professionelle liveproduktioner til sport, koncerter, events og webinarer. Vi planlægger produktionen grundigt og håndterer flerkamera, streamingflow og teknisk afvikling, så I kan fokusere på indholdet og føle jer trygge hele vejen igennem.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="2.5" />
            <path d="M8.5 8.5a5 5 0 0 0 0 7" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M5.5 5.5a9.5 9.5 0 0 0 0 13" />
            <path d="M18.5 5.5a9.5 9.5 0 0 1 0 13" />
          </svg>
        ),
        examplesHref: "/cases?cat=live-broadcast",
      },
      {
        id: "virksomhedsfilm-reklame",
        title: "Virksomhedsfilm & reklame",
        body:
          "Video, der styrker dit brand og gør dit budskab klart. Fra reklamefilm og virksomhedsvideoer til produktvideoer, der præsenterer dine ydelser professionelt.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="15" height="12" rx="1.5" />
            <path d="M17 10l4-2v8l-4-2V10z" />
            <line x1="2" y1="11" x2="17" y2="11" />
            <line x1="7" y1="7" x2="7" y2="4" />
            <line x1="12" y1="7" x2="12" y2="4" />
            <line x1="2" y1="4" x2="17" y2="4" />
          </svg>
        ),
        examplesHref: "/cases?cat=virksomhedsfilm-reklame",
      },
      {
        id: "sociale-medier",
        title: "Sociale medier",
        body:
          "Korte, skarpe videoer til LinkedIn, Instagram, Facebook og andre platforme. Vi producerer indhold, der er tilpasset formatet og nemt at bruge i kampagner og løbende kommunikation.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="2.5" />
            <circle cx="6" cy="12" r="2.5" />
            <circle cx="18" cy="19" r="2.5" />
            <line x1="8.4" y1="10.9" x2="15.6" y2="6.1" />
            <line x1="8.4" y1="13.1" x2="15.6" y2="17.9" />
          </svg>
        ),
        examplesHref: "/cases?cat=sociale-medier",
      },
      {
        id: "eventvideo-eventteknik",
        title: "Eventvideo & eventteknik",
        body:
          "Vi planlægger og afvikler events fra idé til slut — både video og den nødvendige lyd, lys og teknik. Vores tilgang er at tage ansvar for den tekniske del, så I kan fokusere på arrangementet og have tryghed i, at det kører professionelt.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        ),
        examplesHref: "/cases?cat=eventvideo-eventteknik",
      },
      {
        id: "foto-drone",
        title: "Foto & drone",
        body:
          "Stillfoto, billedredigering og droneoptagelser til virksomheder, events og lokationer. Et stærkt supplement til video, når du også vil have skarpe billeder og visuelt overblik.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="13" r="2.5" />
            <path d="M5 8h2l1-2h8l1 2h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
            <line x1="3" y1="5" x2="6" y2="5" />
            <line x1="18" y1="5" x2="21" y2="5" />
          </svg>
        ),
        examplesHref: "/cases?cat=foto-drone",
      },
      {
        id: "konceptudvikling-eventkoordinering",
        title: "Konceptudvikling & eventkoordinering",
        body:
          "Fra idé til gennemført event. Vi hjælper med at udvikle konceptet, planlægge forløbet og koordinere alle detaljer — så I kan stå trygt bag et arrangement, der hænger sammen fra start til slut.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6" />
            <path d="M10 21h4" />
            <path d="M12 2a7 7 0 0 1 4 12.9V17H8v-2.1A7 7 0 0 1 12 2z" />
          </svg>
        ),
        examplesHref: "/cases",
      },
    ],
    []
  );

  const [hot, setHot] = useState<ServiceId | null>(null);
  const [hover, setHover] = useState<ServiceId | null>(null);

  const active = hover ?? hot;

  useEffect(() => {
    const hash = (typeof window !== "undefined" ? window.location.hash : "")
      .replace("#", "")
      .trim() as ServiceId;

    if (!hash) return;

    const hit = services.find((s) => s.id === hash);
    if (!hit) return;

    setHot(hit.id);

    window.setTimeout(() => {
      const el = document.getElementById(hit.id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  }, [services]);

  return (
    <main className="srvPage" aria-label="Ydelser">
      <style>{css}</style>

      <section className="srvTop" aria-label="Intro" style={{ padding: 0 }}>
        <div className="container" style={{ padding: "96px 0 48px" }}>
          <h1 className="srvPageTitle">Ydelser vi tilbyder</h1>
          <p className="srvHint">
            Med specialister i eventplanlægning, video afvikling og kreativt indhold, tilbyder vi en bred vifte af ydelser, der kan tilpasses dine behov. Uanset om du har brug for en enkelt reklamefilm, løbende indhold til sociale medier eller en komplet eventproduktion, har vi ekspertisen og erfaringen til at levere resultater, der skaber værdi for din virksomhed.
          </p>
        </div>
      </section>

      <section className="srvGridWrap" aria-label="Ydelser liste">
        <div className="container">
          <div className="srvGrid">
            {services.map((s) => {
              const isActive = active === s.id;
              const isIdle = !!active && !isActive;

              return (
                <Link
                  key={s.id}
                  id={s.id}
                  href={s.examplesHref}
                  className={`srvCard ${isActive ? "isHot" : ""} ${
                    isIdle ? "idle" : ""
                  }`}
                  onMouseEnter={() => setHover(s.id)}
                  onMouseLeave={() => setHover(null)}
                >
                  <div className="srvHead">
                    <span className="srvIcon" aria-hidden>{s.icon}</span>
                    <span className="srvTitle">{s.title}</span>
                  </div>

                  <div className="srvBody">
                    <p className="srvText">{s.body}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="srvBottomSpace" aria-hidden />
        </div>
      </section>
    </main>
  );
}

const css = `
.srvPage{
  background: transparent;
}

.srvTop{
  padding: 0;
}

.srvPageTitle{
  margin: 0 0 20px;
  font-family: var(--font-body);
  font-weight: 800;
  font-size: clamp(44px, 6.5vw, 88px);
  letter-spacing: -0.03em;
  line-height: 0.96;
  color: var(--color-primary);
}

.srvHint{
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(14px, 1.2vw, 17px);
  line-height: 1.7;
  color: color-mix(in srgb, var(--color-text) 68%, transparent);
  max-width: 56ch;
}

.srvGridWrap{
  padding: clamp(22px, 3.4vw, 34px) 0 clamp(86px, 9vw, 122px);
  background: transparent;
}
.srvGrid{
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(26px, 4vw, 58px);
}

.srvCard{
  display: block;
  text-decoration: none;
  border: 0;
  background: transparent;
  padding: clamp(18px, 2.4vw, 28px);
  border-left: 2px solid color-mix(in srgb, var(--color-secondary) 60%, transparent);
  min-height: 220px;
  cursor: pointer;
  transition: opacity 200ms ease, transform 260ms cubic-bezier(.18,1,.22,1), border-color 200ms ease;
}

.srvCard.idle{
  transform: scale(1);
  border-left-color: color-mix(in srgb, var(--color-secondary) 30%, transparent);
}

.srvCard.isHot{
  opacity: 1;
  transform: scale(1.03);
  z-index: 2;
  border-left-color: var(--color-accent);
}

.srvHead{
  width: 100%;
  display: grid;
  grid-template-columns: 74px 1fr;
  align-items: center;
  gap: 18px;
}

.srvIcon{
  width: 48px;
  height: 48px;
  justify-self: start;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  opacity: 0.7;
  transition: opacity 200ms ease, color 200ms ease;
}
.srvIcon svg{
  width: 100%;
  height: 100%;
}

.srvTitle{
  font-family: var(--font-body);
  font-weight: 700;
  letter-spacing: 0.16em;
  line-height: 1.3;
  font-size: 10px;
  text-transform: uppercase;
  color: var(--color-primary);
  outline: none;
  transition: color 200ms ease;
}

.srvBody{
  margin-top: 18px;
  padding-left: calc(74px + 18px);
}

.srvText{
  margin: 0;
  font-family: var(--font-body);
  font-size: var(--t16);
  line-height: 1.9;
  color: color-mix(in srgb, var(--color-text) 80%, transparent);
  max-width: 62ch;
}


.srvCard.isHot .srvTitle{
  color: var(--color-accent);
}
.srvCard.isHot .srvIcon{
  opacity: 1;
  color: var(--color-accent);
}

.srvBottomSpace{
  height: 12px;
}

@media (max-width: 980px){
  .srvGrid{
    grid-template-columns: 1fr;
  }
  .srvBody{
    padding-left: 0;
  }
  .srvHead{
    grid-template-columns: 52px 1fr;
    gap: 16px;
  }
  .srvIcon{
    width: 40px;
    height: 40px;
  }
}
`;