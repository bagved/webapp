"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type ServiceId =
  | "live-broadcast"
  | "virksomhedsfilm-reklame"
  | "sociale-medier"
  | "eventvideo-eventteknik"
  | "foto-drone";

type Service = {
  id: ServiceId;
  title: string;
  body: string;
  iconPng: string;
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
        iconPng: "/services/livestream.png",
        examplesHref: "/cases?cat=live-broadcast",
      },
      {
        id: "virksomhedsfilm-reklame",
        title: "Virksomhedsfilm & reklame",
        body:
          "Video, der styrker dit brand og gør dit budskab klart. Fra reklamefilm og virksomhedsvideoer til produktvideoer, der præsenterer dine ydelser professionelt.",
        iconPng: "/services/reklamefilm.png",
        examplesHref: "/cases?cat=virksomhedsfilm-reklame",
      },
      {
        id: "sociale-medier",
        title: "Sociale medier",
        body:
          "Korte, skarpe videoer til LinkedIn, Instagram, Facebook og andre platforme. Vi producerer indhold, der er tilpasset formatet og nemt at bruge i kampagner og løbende kommunikation.",
        iconPng: "/services/content.png",
        examplesHref: "/cases?cat=sociale-medier",
      },
      {
        id: "eventvideo-eventteknik",
        title: "Eventvideo & eventteknik",
        body:
          "Vi planlægger og afvikler events fra idé til slut — både video og den nødvendige lyd, lys og teknik. Vores tilgang er at tage ansvar for den tekniske del, så I kan fokusere på arrangementet og have tryghed i, at det kører professionelt.",
        iconPng: "/services/planlaegning.png",
        examplesHref: "/cases?cat=eventvideo-eventteknik",
      },
      {
        id: "foto-drone",
        title: "Foto & drone",
        body:
          "Stillfoto, billedredigering og droneoptagelser til virksomheder, events og lokationer. Et stærkt supplement til video, når du også vil have skarpe billeder og visuelt overblik.",
        iconPng: "/services/droneoptagelser-og-billeder.png",
        examplesHref: "/cases?cat=foto-drone",
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
                <article
                  key={s.id}
                  id={s.id}
                  className={`srvCard ${isActive ? "isHot" : ""} ${
                    isIdle ? "idle" : ""
                  }`}
                  onMouseEnter={() => setHover(s.id)}
                  onMouseLeave={() => setHover(null)}
                >
                  <div className="srvHead">
                    <span
                      className="srvIcon"
                      aria-hidden
                      style={{ backgroundImage: `url(${s.iconPng})` }}
                    />
                    <span
                      className="srvTitle"
                      tabIndex={0}
                      onFocus={() => setHover(s.id)}
                      onBlur={() => setHover(null)}
                    >
                      {s.title}
                    </span>
                  </div>

                  <div className="srvBody">
                    <p className="srvText">{s.body}</p>

                    <div className="srvActions">
                      <Link className="srvBtn" href={s.examplesHref}>
                        Se eksempler →
                      </Link>
                    </div>
                  </div>
                </article>
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
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: clamp(44px, 6.5vw, 88px);
  letter-spacing: -0.04em;
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
  border: 0;
  background: transparent;
  padding: clamp(18px, 2.4vw, 28px);
  border-left: 2px solid color-mix(in srgb, var(--color-secondary) 60%, transparent);
  min-height: 220px;
  transition: opacity 200ms ease, transform 260ms cubic-bezier(.18,1,.22,1), border-color 200ms ease;
}

.srvCard.idle{
  opacity: 0.52;
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
  width: 54px;
  height: 54px;
  justify-self: start;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  filter: saturate(0.98) contrast(1.04);
  opacity: 0.92;
  transition: opacity 200ms ease;
}

.srvTitle{
  font-family: var(--font-heading);
  font-weight: 350;
  letter-spacing: -0.02em;
  line-height: 1.12;
  font-size: clamp(22px, 2.2vw, 34px);
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

.srvActions{
  margin-top: 18px;
}

.srvBtn{
  display: inline-block;
  font-size: var(--t11);
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text) 60%, transparent);
  opacity: 1;
  border-bottom: 1px solid color-mix(in srgb, var(--color-text) 14%, transparent);
  padding-bottom: 8px;
  transition: color 160ms ease, border-color 160ms ease, transform 160ms ease, opacity 160ms ease;
}
.srvBtn:hover{
  color: var(--c3);
  border-bottom-color: color-mix(in srgb, var(--c3) 22%, transparent);
  transform: translateY(-1px);
  opacity: 1;
}

.srvCard.isHot .srvTitle{
  color: var(--color-accent);
}
.srvCard.isHot .srvIcon{
  opacity: 1;
}
.srvCard.isHot .srvBtn{
  color: var(--color-accent);
  border-bottom-color: color-mix(in srgb, var(--color-accent) 28%, transparent);
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
    grid-template-columns: 64px 1fr;
    gap: 16px;
  }
  .srvIcon{
    width: 46px;
    height: 46px;
  }
}
`;