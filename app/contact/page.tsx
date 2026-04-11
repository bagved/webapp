"use client";

import React, { useEffect, useRef } from "react";

export default function ContactPage() {
  const startMarkerRef = useRef<HTMLDivElement | null>(null);
  const endMarkerRef = useRef<HTMLDivElement | null>(null);

  const darkLayerRef = useRef<HTMLDivElement | null>(null);

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

          <div className="contactInfo">
              <div className="infoItem">
                <div className="infoLabel">Telefon</div>
                <a className="infoValue" href="tel:+4561746416">
                  +45 61 74 64 16
                </a>
              </div>

              <div className="infoItem">
                <div className="infoLabel">Email</div>
                <a className="infoValue" href="mailto:info@bagved.com">
                  info@bagved.com
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

      <section className="contactFormWrap">
        <div ref={startMarkerRef} className="marker markerStart" aria-hidden />

        <div className="contactContainer contentLayer">
          <div className="darkGrid">
            <div className="ctPanel" aria-label="Kontaktformular">
              <form className="ctForm" onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                  <LinedInput label="Navn" name="name" autoComplete="name" />
                </div>

                <div className="row two">
                  <LinedInput label="Email" name="email" type="email" autoComplete="email" />
                  <LinedInput label="Telefonnummer" name="phone" type="tel" autoComplete="tel" />
                </div>

                <div className="row">
                  <LinedSelect
                    label="Emne"
                    name="subject"
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
                  <LinedTextarea label="Besked" name="message" rows={6} />
                </div>

                <div className="ctaRow">
                  <button className="send" type="submit">
                    Send besked
                  </button>
                </div>
              </form>
            </div>

            <div className="darkSpacer" aria-hidden />
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
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="field">
      <span className="lab">{label}</span>
      <select className="inp sel" name={name}>
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
  width: min(1100px, calc(100% - 48px));
  margin: 0 auto;
}

.contactPage{
  position: relative;
  min-height: 100vh;
  background: transparent;
}

.darkLayer{
  position: fixed;
  inset: 0;
  background: var(--color-secondary);
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
  grid-template-columns: minmax(420px, 560px) 1fr;
  gap: clamp(26px, 5vw, 70px);
  align-items: start;
}
.darkSpacer{ min-height: 1px; }

.ctPanel{
  background: var(--color-bg);
  border: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
  border-radius: 0;
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
  .row.two{ grid-template-columns: 1fr; gap: 18px; }
}
`;
