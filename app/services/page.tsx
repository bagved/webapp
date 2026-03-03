// app/services/page.tsx
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
          "Professionelle liveproduktioner til sport, koncerter, events og webinarer. Vi håndterer flerkamera, streamingflow og teknisk afvikling, så udsendelsen kører stabilt og ser skarp ud.",
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
          "Dækning og teknisk afvikling til events, talks, fester og arrangementer. Vi leverer både eventvideo og den nødvendige lyd, lys og teknik, så det hele fungerer samlet.",
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
            Ydelser
          </h1>

          <div
            style={{
              marginTop: 18,
              fontSize: "var(--t14)",
              lineHeight: 1.7,
              color: "color-mix(in srgb, var(--c1) 72%, transparent)",
              maxWidth: "70ch",
            }}
          >
            <p className="srvHint">
              Her er et overblik over vores ydelser — samlet i de områder, virksomheder oftest efterspørger.
            </p>
          </div>
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
  padding: clamp(52px, 6vw, 78px) 0 10px;
}
.srvHint{
  margin: 0;
  font-family: var(--font-body);
  font-size: var(--t16);
  line-height: 1.7;
  color: color-mix(in srgb, var(--c1) 78%, transparent);
}

.srvGridWrap{
  padding: clamp(22px, 3.4vw, 34px) 0 clamp(86px, 9vw, 122px);
}
.srvGrid{
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(26px, 4vw, 58px);
}

.srvCard{
  border: 0;
  background: transparent;
  padding: 0;
  border-radius: 0;
  min-height: 220px;
  transition: opacity 200ms ease, transform 260ms cubic-bezier(.18,1,.22,1);
}

.srvCard.idle{
  opacity: 1;
  transform: scale(1);
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
  color: color-mix(in srgb, var(--c1) 92%, transparent);
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
  color: color-mix(in srgb, var(--c1) 74%, transparent);
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
  color: var(--c1);
  opacity: 0.84;
  border-bottom: 1px solid color-mix(in srgb, var(--c1) 18%, transparent);
  padding-bottom: 8px;
  transition: color 160ms ease, border-color 160ms ease, transform 160ms ease, opacity 160ms ease;
}
.srvBtn:hover{
  color: var(--c3);
  border-bottom-color: color-mix(in srgb, var(--c3) 22%, transparent);
  transform: translateY(-1px);
  opacity: 1;
}

.srvCard.isHot{
  opacity: 1;
  transform: scale(1.03);
  z-index: 2;
}
.srvCard.isHot .srvTitle{
  color: color-mix(in srgb, var(--c3) 56%, var(--c1));
}
.srvCard.isHot .srvIcon{
  opacity: 1;
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