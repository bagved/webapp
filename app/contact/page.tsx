"use client";

// app/contact/page.tsx — KONTAKTSIDEN
//
// HVAD DU KAN ÆNDRE:
//   Overskrift       → <h1 className="contactTitle">Kontakt</h1>
//   Indledningstekst → <p className="contactLead"> herunder
//   Kontaktinfo      → telefon, email og adresse i .contactInfo
//   Formularfelter   → tilføj/fjern <LinedInput>, <LinedSelect> eller <LinedTextarea>
//   Dropdown-valg    → `options`-arrayet i <LinedSelect>
//   Mørk-sektion     → CSS .darkLayer { background: var(--color-primary) }
//                       Den mørke sektion bag formularen bruger --color-primary
//
// TEKNISK NOTE om den mørke sektion:
//   .darkLayer er et fastgjort overlay der klippes til det synlige vinduesudsnit
//   via clipPath. Det giver effekten af at scrolle ind i en mørk sektion.

import React, { useEffect, useRef, useState } from "react";

export default function ContactPage() {
  const startMarkerRef = useRef<HTMLDivElement | null>(null);
  const endMarkerRef = useRef<HTMLDivElement | null>(null);
  const darkLayerRef = useRef<HTMLDivElement | null>(null);
  const [preselectedSubject, setPreselectedSubject] = useState<string>("General");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sub = params.get("subject");
    if (sub) setPreselectedSubject(sub);

    if (window.location.hash === "#kontaktformular") {
      setTimeout(() => {
        document.getElementById("kontaktformular")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, []);

  useEffect(() => {
    let raf = 0;

    const vh = () => window.visualViewport?.height ?? window.innerHeight ?? 800;

    const snapPx = (v: number) => {
      const dpr = window.devicePixelRatio || 1;
      return Math.round(v * dpr) / dpr;
    };

    const tick = () => {
      const startEl = startMarkerRef.current;
      const endEl = endMarkerRef.current;
      const darkEl = darkLayerRef.current;

      if (!startEl || !endEl || !darkEl) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const startRect = startEl.getBoundingClientRect();
      const endRect = endEl.getBoundingClientRect();

      const viewportH = vh();

      const startY = snapPx(startRect.top);
      const endY = snapPx(endRect.top);

      const top = snapPx(Math.max(0, Math.min(viewportH, startY)));
      const bottom = snapPx(Math.max(0, Math.min(viewportH, viewportH - endY)));

      const darkClip = `inset(${top}px 0 ${bottom}px 0)`;
      darkEl.style.clipPath = darkClip;
      // @ts-ignore
      darkEl.style.WebkitClipPath = darkClip;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="contactPage">
      <style>{css}</style>

      <div className="darkLayer" ref={darkLayerRef} aria-hidden />


      <section className="contactTop" style={{ padding: 0 }}>
        <div className="container contentLayer" style={{ padding: "96px 0 64px" }}>
          <div className="topInner">
            <h1 className="contactTitle">Kontakt</h1>
            <p className="contactLead">
              Skriv til os hvis du har et event, en konkret forespørgsel eller bare vil vende et format.
              Vi er altid åbne for nye samarbejder og hører gerne fra dig.
            </p>
          </div>

          {/* Kontaktinfo-grid — tilføj et nyt <div className="infoItem"> for flere felter */}
          <div className="contactInfo">
              <div className="infoItem">
                <div className="infoLabel">Telefon</div>
                <a className="infoValue" href="tel:+4561746416">
                  +45 61 74 64 16   {/* skift nummeret her og i href="tel:..." */}
                </a>
              </div>

              <div className="infoItem">
                <div className="infoLabel">Email</div>
                <a className="infoValue" href="mailto:info@bagved.com">
                  info@bagved.com   {/* skift email her og i href="mailto:..." */}
                </a>
              </div>

              <div className="infoItem">
                <div className="infoLabel">Adresse</div>
                <div className="infoValue">
                  Frederiksvej 32, st. th., 2000 Frederiksberg
                </div>
              </div>
            </div>
        </div>
      </section>

      <section className="contactFormWrap" id="kontaktformular">
        <div ref={startMarkerRef} className="marker markerStart" aria-hidden />

        <div className="contactContainer contentLayer">
          <div className="darkGrid">
            <div className="darkSide" aria-hidden="false">
              <p className="darkEyebrow">Lad os snakke</p>
              <h2 className="darkHeading">Et godt samarbejde starter med en samtale.</h2>
              <p className="darkBody">
                Uanset om du har et konkret projekt, en løs idé eller bare vil høre mere om hvad vi laver — så skriv til os. Vi svarer hurtigt og uden forpligtelser.
              </p>
              <div className="darkMeta">
                <a href="tel:+4561746416" className="darkMetaLine">+45 61 74 64 16</a>
                <a href="mailto:info@bagved.com" className="darkMetaLine">info@bagved.com</a>
              </div>
            </div>

            <div className="ctPanel" aria-label="Kontaktformular">
              {/* Formular — tilføj/fjern felter efter behov */}
              {/* LinedInput = tekstfelt, LinedSelect = dropdown, LinedTextarea = stor tekstboks */}
              <form className="ctForm" onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                  <LinedInput label="Navn" name="name" autoComplete="name" />
                </div>

                <div className="row">
                  <LinedInput label="Virksomhedsnavn" name="company" autoComplete="organization" />
                </div>

                {/* "row two" = to felter side om side */}
                <div className="row two">
                  <LinedInput label="Email" name="email" type="email" autoComplete="email" />
                  <LinedInput label="Telefonnummer" name="phone" type="tel" autoComplete="tel" />
                </div>

                <div className="row">
                  {/* Dropdown — tilføj/fjern emner i `options`-arrayet */}
                  <LinedSelect
                    label="Emne"
                    name="subject"
                    value={preselectedSubject}
                    options={[
                      "General",
                      "Livestream",
                      "Sportsbroadcast",
                      "Virksomhedsvideo",
                      "Eventvideo",
                      "Eventteknik",
                      "Samarbejde",
                      "Tilbud",
                      "Job",
                    ]}
                  />
                </div>

                <div className="row">
                  {/* rows={6} = højden på tekstboksen — skru op for en højere boks */}
                  <LinedTextarea label="Besked" name="message" rows={6} />
                </div>

                <div className="ctaRow">
                  <button className="send" type="submit">
                    Send besked
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>

        <div ref={endMarkerRef} className="marker markerEnd" aria-hidden />
      </section>
    </div>
  );
}

function LinedInput({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="field">
      <span className="lab">{label}</span>
      <input className="inp" name={name} type={type} autoComplete={autoComplete} />
      <span className="line" aria-hidden />
    </label>
  );
}

function LinedSelect({
  label,
  name,
  options,
  value,
}: {
  label: string;
  name: string;
  options: string[];
  value?: string;
}) {
  const [val, setVal] = React.useState(value ?? options[0] ?? "");
  React.useEffect(() => { if (value) setVal(value); }, [value]);
  return (
    <label className="field">
      <span className="lab">{label}</span>
      <select className="inp sel" name={name} value={val} onChange={e => setVal(e.target.value)}>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <span className="line" aria-hidden />
    </label>
  );
}

function LinedTextarea({
  label,
  name,
  rows = 6,
}: {
  label: string;
  name: string;
  rows?: number;
}) {
  return (
    <label className="field">
      <span className="lab">{label}</span>
      <textarea className="inp ta" name={name} rows={rows} />
      <span className="line" aria-hidden />
    </label>
  );
}

const css = `
.contactContainer{
  width: min(1100px, calc(100% - 48px)); /* max-bredde på indhold */
  margin: 0 auto;
}

.contactPage{
  position: relative;
  min-height: 100vh;
  background: transparent;
}

/* Det mørke overlay der dækker skærmen når man scroller ned til formularen */
/* background: var(--color-primary) — farven fra theme.css styrer den mørke sektion */
.darkLayer{
  position: fixed;
  inset: 0;
  background: var(--color-primary);  /* skift til en anden CSS-variabel eller farve */
  z-index: 5;
  pointer-events: none;
  will-change: clip-path;
  transform: translateZ(0);
}


.contentLayer{
  position: relative;
  z-index: 20;
}

.contactTop{
  position: relative;
  padding: clamp(64px, 8vw, 120px) 0;
  background: transparent;
}

.topInner{
  max-width: 920px;
  margin: 0;
}

.contactTitle{
  margin: 0 0 20px;
  font-family: var(--font-body);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.96;
  font-size: clamp(44px, 6.5vw, 88px);
  color: var(--color-primary);
}

.contactLead{
  margin: 0 0 36px;
  max-width: 58ch;
  font-family: var(--font-body);
  font-size: clamp(14px, 1.2vw, 17px);
  line-height: 1.72;
  color: color-mix(in srgb, var(--color-text) 70%, transparent);
}

.contactInfo{
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: start;
  gap: 0 clamp(32px, 5vw, 64px);
  max-width: 680px;
}

.infoItem{ display: grid; gap: 6px; }

.infoLabel{
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text) 42%, transparent);
}

.infoValue{
  font-family: var(--font-body);
  font-size: clamp(13px, 1.15vw, 15px);
  line-height: 1.45;
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 140ms ease;
}
a.infoValue:hover{
  color: inherit;
}

.contactFormWrap{
  position: relative;
  padding: clamp(72px, 9vw, 140px) 0 clamp(200px, 18vw, 300px);
  background: transparent;
}

.marker{
  position: absolute;
  left: 0;
  right: 0;
  height: 0;
  pointer-events: none;
}
.markerStart{ top: 0; }
.markerEnd{ bottom: 0; }

.darkGrid{
  display: grid;
  grid-template-columns: 1fr minmax(0, 640px);
  gap: clamp(40px, 6vw, 80px);
  align-items: start;
}

.darkSide{
  padding-top: clamp(8px, 2vw, 24px);
  display: flex;
  flex-direction: column;
  gap: clamp(18px, 2.5vw, 28px);
}

.darkEyebrow{
  margin: 0;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
}

.darkHeading{
  margin: 0;
  font-family: var(--font-body);
  font-weight: 400;
  font-size: clamp(28px, 3.4vw, 48px);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: white;
}

.darkBody{
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(14px, 1.15vw, 16px);
  line-height: 1.8;
  color: rgba(255,255,255,0.62);
  max-width: 42ch;
}

.darkMeta{
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: auto;
}

.darkMetaLine{
  font-family: var(--font-body);
  font-size: clamp(13px, 1.1vw, 15px);
  font-weight: 400;
  color: rgba(255,255,255,0.55);
  text-decoration: none;
  transition: color 140ms ease;
}
.darkMetaLine:hover{ color: white; }

.ctPanel{
  background: color-mix(in srgb, var(--color-primary) 6%, var(--color-bg));
  border: 1px solid color-mix(in srgb, var(--color-text) 7%, transparent);
  border-radius: 12px;
  padding: clamp(22px, 3.6vw, 40px);
}

.ctForm{ display: grid; gap: 18px; }
.row{ display: grid; gap: 18px; }
.row.two{ grid-template-columns: 1fr 1fr; gap: 26px; }

.field{ display: grid; gap: 10px; position: relative; }

.lab{
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text) 42%, transparent);
  transition: color 140ms ease;
}
.field:focus-within .lab{
  color: var(--color-text);
}

.inp{
  appearance: none;
  border: 0;
  outline: none;
  background: transparent;
  padding: 6px 0 10px;
  font-family: var(--font-body);
  font-size: var(--t14);
  line-height: 1.4;
  color: var(--color-text);
}

.ta{ resize: vertical; min-height: 140px; }

.sel{
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%235b4bb7' fill-opacity='0.45'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 2px center;
  padding-right: 18px;
}

.line{
  height: 1px;
  width: 100%;
  background: color-mix(in srgb, var(--color-primary) 18%, transparent);
  transition: background 180ms ease;
}
.field:focus-within .line{
  background: var(--color-accent);
}

.ctaRow{
  display: flex;
  justify-content: flex-end;
  padding-top: 12px;
}

.send{
  display: inline-flex;
  align-items: center;
  padding: 11px 24px;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: var(--color-primary);
  color: var(--color-bg);
  border: 1.5px solid var(--color-primary);
  cursor: pointer;
  transition: background 150ms ease, border-color 150ms ease,
              color 150ms ease, transform 120ms ease;
}
.send:hover{
  background: var(--color-accent);
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

@media (max-width: 980px){
  .darkGrid{ grid-template-columns: 1fr; }
  .darkSide{ padding-top: 0; }
  .row.two{ grid-template-columns: 1fr; gap: 18px; }
}
`;
