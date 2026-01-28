// app/services/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type ServiceId =
  | "livestream"
  | "reklamefilm"
  | "lydlys"
  | "planlaegning"
  | "content";

type Service = {
  id: ServiceId;
  title: string;
  body: string;
  iconPng: string; // small png
  examplesHref: string; // points to cases filtered
};

export default function ServicesPage() {
  const services: Service[] = useMemo(
    () => [
      {
        id: "livestream",
        title: "Livestream",
        body:
          "Broadcast, afvikling og teknik der føles rolig — både for talere, publikum og dem der ser med. Vi sikrer flow, redundans og et clean udtryk.",
        iconPng: "/services/livestream.png",
        examplesHref: "/cases?cat=livestream",
      },
      {
        id: "reklamefilm",
        title: "Reklamefilm",
        body:
          "Cinematisk produktion med et premium finish. Fra idé og plan til optagelse, post og leverancer i formater der passer til kampagner og SoMe.",
        iconPng: "/services/reklamefilm.png",
        examplesHref: "/cases?cat=reklamefilm",
      },
      {
        id: "lydlys",
        title: "Lyd og lys",
        body:
          "Det der får det hele til at føles rigtigt i rummet. Vi skaber en stemning der understøtter budskabet — uden at det larmer visuelt.",
        iconPng: "/services/lydlys.png",
        examplesHref: "/cases?cat=events", // hvis du vil samle lyd/lys under Events-eksempler
      },
      {
        id: "planlaegning",
        title: "Planlægning",
        body:
          "Run of show, cues, timing og overblik. Vi bygger strukturen BAGVED, så afviklingen føles let og professionel — fra start til slut.",
        iconPng: "/services/planlaegning.png",
        examplesHref: "/cases?cat=events",
      },
      {
        id: "content",
        title: "Content",
        body:
          "Én produktion → flere assets. Vi tænker udnyttelse, format og tempo ind fra starten, så du får mere output uden at miste kvalitet.",
        iconPng: "/services/content.png",
        examplesHref: "/cases?cat=markedsfoering",
      },
    ],
    []
  );

  const [focus, setFocus] = useState<ServiceId | null>(null);

  // ✅ Support landing from homepage rail: /services#livestream etc.
  useEffect(() => {
    const hash = (typeof window !== "undefined" ? window.location.hash : "")
      .replace("#", "")
      .trim();

    if (!hash) return;

    const hit = services.find((s) => s.id === hash);
    if (!hit) return;

    setFocus(hit.id);

    // Let the browser position settle, then softly ensure visibility
    window.setTimeout(() => {
      const el = document.getElementById(hit.id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  }, [services]);

  return (
    <main className="srvPage" aria-label="Ydelser">
      <style>{css}</style>

      <section className="srvTop" aria-label="Intro">
        <div className="container">
          <p className="srvHint">
            Klik på overskrifterne for at læse mere om den enkelte ydelse
          </p>
        </div>
      </section>

      <section className="srvGridWrap" aria-label="Ydelser liste">
        <div className="container">
          <div className="srvGrid">
            {services.map((s) => {
              const isHot = focus === s.id;

              return (
                <article
                  key={s.id}
                  id={s.id}
                  className={`srvCard ${isHot ? "isHot" : ""}`}
                >
                  <button
                    type="button"
                    className="srvHead"
                    onClick={() => setFocus((v) => (v === s.id ? null : s.id))}
                    aria-expanded={isHot}
                  >
                    <span
                      className="srvIcon"
                      aria-hidden
                      style={{ backgroundImage: `url(${s.iconPng})` }}
                    />
                    <span className="srvTitle">{s.title}</span>
                  </button>

                  <div className="srvBody">
                    <p className="srvText">{s.body}</p>

                    <div className="srvActions">
                      <Link className="srvBtn" href={s.examplesHref}>
                        Se eksempler
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

/* top hint like reference */
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

/* 2 per row, infinite down */
.srvGridWrap{
  padding: clamp(22px, 3.4vw, 34px) 0 clamp(86px, 9vw, 122px);
}

.srvGrid{
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(26px, 4vw, 58px);
}

/* card */
.srvCard{
  border: 0;
  background: transparent;
  padding: 0;
  border-radius: 0;
  min-height: 220px;
}

/* clickable header line */
.srvHead{
  width: 100%;
  display: grid;
  grid-template-columns: 74px 1fr;
  align-items: center;
  gap: 18px;

  appearance: none;
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;
}

/* little png */
.srvIcon{
  width: 54px;
  height: 54px;
  justify-self: start;

  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

  filter: saturate(0.98) contrast(1.04);
  opacity: 0.92;
}

/* title */
.srvTitle{
  font-family: var(--font-heading);
  font-weight: 350;
  letter-spacing: -0.02em;
  line-height: 1.12;
  font-size: clamp(22px, 2.2vw, 34px);
  color: color-mix(in srgb, var(--c1) 92%, transparent);
}

/* body */
.srvBody{
  margin-top: 18px;
  padding-left: calc(74px + 18px); /* align with title column */
}

.srvText{
  margin: 0;
  font-family: var(--font-body);
  font-size: var(--t16);
  line-height: 1.9;
  color: color-mix(in srgb, var(--c1) 74%, transparent);
  max-width: 62ch;
}

/* action */
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

/* subtle "selected" state when arriving from homepage rail */
.srvCard.isHot .srvTitle{
  color: color-mix(in srgb, var(--c3) 56%, var(--c1));
}
.srvCard.isHot .srvIcon{
  opacity: 1;
}

/* tiny rhythm */
.srvBottomSpace{
  height: 12px;
}

/* responsive */
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
