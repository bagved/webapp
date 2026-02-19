"use client";

import React, { useEffect, useRef, useState } from "react";

export default function ContactPage() {
  const startMarkerRef = useRef<HTMLDivElement | null>(null);
  const endMarkerRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);

  const [splitPct, setSplitPct] = useState(100);

  // Dark layer clipping in viewport px
  const [darkTopPx, setDarkTopPx] = useState(0);
  const [darkBottomPx, setDarkBottomPx] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;
    let ro: ResizeObserver | null = null;

    const vh = () => window.visualViewport?.height ?? window.innerHeight ?? 800;

    const update = () => {
      const startEl = startMarkerRef.current;
      const endEl = endMarkerRef.current;
      const logoEl = logoRef.current;
      if (!startEl || !endEl || !logoEl) return;

      const startRect = startEl.getBoundingClientRect();
      const endRect = endEl.getBoundingClientRect();
      const logoRect = logoEl.getBoundingClientRect();

      const viewportH = vh();

      // Dark layer should appear from startY -> endY
      const startY = startRect.top;
      const endY = endRect.top;

      // Clamp into viewport so clip-path stays valid
      const top = Math.max(0, Math.min(viewportH, startY));
      const bottom = Math.max(0, Math.min(viewportH, viewportH - endY));

      setDarkTopPx(top);
      setDarkBottomPx(bottom);

      // Logo split: boundary is startY (exact color start line)
      const cutPx = startY - logoRect.top;
      const pct = (cutPx / Math.max(1, logoRect.height)) * 100;
      setSplitPct(Math.min(100, Math.max(0, pct)));
    };

    const schedule = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        update();
      });
    };

    schedule();
    // @ts-ignore
    if (document?.fonts?.ready) {
      // @ts-ignore
      document.fonts.ready.then(() => schedule());
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("resize", schedule);

    ro = new ResizeObserver(() => schedule());
    ro.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
      if (rafId) cancelAnimationFrame(rafId);
      if (ro) ro.disconnect();
    };
  }, []);

  const logoAClipBottom = 100 - splitPct;
  const logoBClipTop = splitPct;

  return (
    <div className="contactPage">
      <style>{css}</style>

      {/* FIXED dark layer - clipped between start and end of the dark section */}
      <div
        className="darkLayer"
        aria-hidden
        style={{
          clipPath: `inset(${darkTopPx}px 0 ${darkBottomPx}px 0)`,
          WebkitClipPath: `inset(${darkTopPx}px 0 ${darkBottomPx}px 0)`,
        }}
      />

      {/* FIXED logos above dark layer */}
      <div
        id="bgLogoA"
        ref={logoRef}
        aria-hidden
        className="bgLogo"
        style={{
          clipPath: `inset(0 0 ${logoAClipBottom}% 0)`,
          WebkitClipPath: `inset(0 0 ${logoAClipBottom}% 0)`,
        }}
      />
      <div
        id="bgLogoB"
        aria-hidden
        className="bgLogo alt"
        style={{
          clipPath: `inset(${logoBClipTop}% 0 0 0)`,
          WebkitClipPath: `inset(${logoBClipTop}% 0 0 0)`,
        }}
      />

      {/* TOP */}
      <section className="contactTop">
        <div className="contactContainer contentLayer">
          <div className="topInner">
            <h1 className="contactTitle">Kontakt</h1>
            <p className="contactLead">
              Skriv til os hvis du har et event, en konkret forespørgsel eller bare vil vende et format.
              Vi er også åbne for samarbejder — og du er velkommen, hvis du er freelancer og vil connecte,
              søger job hos os, eller har brug for at leje udstyr.
            </p>

            <div className="contactInfo">
              <div className="infoItem">
                <div className="infoLabel">Telefon</div>
                <a className="infoValue" href="tel:+4561746416">
                  +45 61 74 64 16
                </a>
              </div>

              <div className="infoItem">
                <div className="infoLabel">Email</div>
                <a className="infoValue" href="mailto:info@bagved.dk">
                  info@bagved.dk
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
        </div>
      </section>

      {/* DARK SECTION */}
      <section className="contactFormWrap">
        {/* start marker = exact start of dark color */}
        <div ref={startMarkerRef} className="boundaryMarker" aria-hidden />

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

        {/* end marker = exact end of dark color (placed after section content) */}
        <div ref={endMarkerRef} className="endMarker" aria-hidden />
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

/* Dark layer now clipped between start/end markers */
.darkLayer{
  position: fixed;
  inset: 0;
  background: #1A0A40;
  z-index: 5;
  pointer-events: none;
}

/* Logos above dark layer */
.bgLogo{
  position: fixed;
  top: 66%;
  left: 76%;
  transform: translate(-50%, -50%);
  width: clamp(200px, 26vw, 460px);
  height: clamp(200px, 26vw, 460px);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 10;
  pointer-events: none;
  opacity: 1;
  transition: clip-path 70ms linear;
}

.bgLogo#bgLogoA{ background-image: url('/Transparent Logo.png'); }
.bgLogo#bgLogoB{ background-image: url('/transparent-logo-2.png'); }

/* Content above everything */
.contentLayer{
  position: relative;
  z-index: 20;
}

/* TOP */
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
  margin: 0 0 12px 0;
  font-family: var(--font-heading);
  font-weight: 350;
  letter-spacing: -0.02em;
  font-size: clamp(28px, 3.2vw, 48px);
  color: #3C3C3B;
}

.contactLead{
  margin: 0 0 22px 0;
  max-width: 76ch;
  font-size: clamp(13px, 1.05vw, 15px);
  line-height: 1.7;
  color: color-mix(in srgb, #3C3C3B 82%, transparent);
}

.contactInfo{
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  max-width: 520px;
}

.infoItem{ display: grid; gap: 6px; }

.infoLabel{
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(26,10,64,0.52);
}

.infoValue{
  font-size: 13px;
  line-height: 1.45;
  color: #1A0A40;
  text-decoration: none;
  font-weight: 520;
}
a.infoValue:hover{ text-decoration: underline; }

/* DARK SECTION */
.contactFormWrap{
  position: relative;
  padding: clamp(72px, 9vw, 140px) 0;
  background: transparent;
}

/* Markers are 0-height lines */
.boundaryMarker,
.endMarker{
  position: absolute;
  left: 0;
  right: 0;
  height: 0;
  pointer-events: none;
}

.boundaryMarker{ top: 0; }
.endMarker{ bottom: 0; }

/* Layout inside dark area */
.darkGrid{
  display: grid;
  grid-template-columns: minmax(420px, 560px) 1fr;
  gap: clamp(26px, 5vw, 70px);
  align-items: start;
}
.darkSpacer{ min-height: 1px; }

.ctPanel{
  background: color-mix(in srgb, #FFFFFF 94%, #1A0A40 6%);
  border: 1px solid color-mix(in srgb, var(--c1) 14%, transparent);
  border-radius: 0;
  padding: clamp(22px, 3.6vw, 40px);
}

.ctForm{ display: grid; gap: 18px; }
.row{ display: grid; gap: 18px; }
.row.two{ grid-template-columns: 1fr 1fr; gap: 26px; }

.field{ display: grid; gap: 10px; position: relative; }

.lab{
  font-size: var(--t11);
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--c1) 66%, transparent);
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
  color: var(--text);
}

.ta{ resize: vertical; min-height: 140px; }

.line{
  height: 1px;
  width: 100%;
  background: color-mix(in srgb, var(--c1) 26%, transparent);
  transition: background 180ms ease;
}

.field:focus-within .line{
  background: color-mix(in srgb, var(--c3) 28%, var(--c1));
}

.ctaRow{
  display: flex;
  justify-content: flex-end;
  padding-top: 12px;
}

.send{
  border: 1px solid color-mix(in srgb, var(--c1) 22%, transparent);
  background: transparent;
  border-radius: 0;
  padding: 12px 18px;

  font-size: var(--t11);
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;

  color: color-mix(in srgb, var(--c1) 88%, transparent);
  cursor: pointer;

  transition: border-color 160ms ease, color 160ms ease, transform 160ms ease, background 160ms ease;
}

.send:hover{
  border-color: #F3217C;
  color: #F3217C;
  background: transparent;
  transform: translateY(-1px);
}

@media (max-width: 980px){
  .darkGrid{ grid-template-columns: 1fr; }
  .row.two{ grid-template-columns: 1fr; gap: 18px; }

  .bgLogo{
    top: 72%;
    left: 70%;
    width: clamp(180px, 54vw, 320px);
    height: clamp(180px, 54vw, 320px);
    opacity: 0.45;
  }
}
`;
