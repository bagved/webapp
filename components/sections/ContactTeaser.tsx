"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ContactTeaserSection() {
  return (
    <section className="ct" id="contact-teaser" aria-label="Kontakt">
      <style>{css}</style>


      <div className="container ctInner">
        <div className="ctGrid">

          {/* LEFT */}
          <div className="ctLeft">
            <h2 className="ctTitle">
              <span className="ctTitleStatic">Skriv til os</span>
              <TypeLine phrases={[
                "her, eller ring på +45 61 74 64 16",
                "på info@bagved.com",
                "hvor end du foretrækker det!",
              ]} />
            </h2>

            <div className="ctMeta">
              <a href="tel:+4561746416"      className="ctMetaLine">+45 61 74 64 16</a>
              <a href="mailto:info@bagved.com" className="ctMetaLine">info@bagved.com</a>
            </div>
          </div>

          {/* RIGHT: formular-panel */}
          <div className="ctPanel" aria-label="Kontaktformular">
            <form className="ctForm" onSubmit={e => e.preventDefault()}>

              <LinedInput label="Navn" name="name" autoComplete="name" />

              <div className="ctFormTwo">
                <LinedInput label="Email"    name="email" type="email" autoComplete="email" />
                <LinedInput label="Telefon"  name="phone" type="tel"   autoComplete="tel" />
              </div>

              <LinedTextarea label="Besked" name="message" rows={5} />

              <div className="ctSubmitRow">
                <button className="ctSubmit" type="submit">Send besked</button>
              </div>

            </form>
          </div>

        </div>

        <div className="ctFooterRow">
          <Link className="cta" href="/contact">UDDYB DIN EFTERSPØRGSEL HER</Link>
        </div>
      </div>
    </section>
  );
}

function TypeLine({ phrases }: { phrases: string[] }) {
  const [i, setI]         = useState(0);
  const [txt, setTxt]     = useState("");
  const [phase, setPhase] = useState<"typing"|"hold"|"deleting">("typing");
  const phrase = phrases[i] ?? "";

  useEffect(() => {
    let t = 0;
    if (phase === "typing") {
      if (txt.length < phrase.length)
        t = window.setTimeout(() => setTxt(phrase.slice(0, txt.length + 1)), 44);
      else
        t = window.setTimeout(() => setPhase("hold"), 2600);
    }
    if (phase === "hold")
      t = window.setTimeout(() => setPhase("deleting"), 900);
    if (phase === "deleting") {
      if (txt.length > 0)
        t = window.setTimeout(() => setTxt(txt.slice(0, -1)), 18);
      else
        t = window.setTimeout(() => { setI(v => (v+1) % phrases.length); setPhase("typing"); }, 520);
    }
    return () => window.clearTimeout(t);
  }, [txt, phrase, phase, phrases.length]);

  // Highlight telefonnummer og email i accent-farven
  const HIGHLIGHTS = ["+45 61 74 64 16", "info@bagved.com"];
  function renderTxt(t: string) {
    for (const h of HIGHLIGHTS) {
      const idx = t.indexOf(h);
      if (idx !== -1) {
        return (
          <>
            {t.slice(0, idx)}
            <span className="twHighlight">{t.slice(idx, idx + h.length)}</span>
            {t.slice(idx + h.length)}
          </>
        );
      }
    }
    return t;
  }

  return (
    <span className="tw" aria-label={phrase}>
      <span className="twText"> {renderTxt(txt)}<span className="twCursor" aria-hidden /></span>
    </span>
  );
}

function LinedInput({ label, name, type = "text", autoComplete }: {
  label: string; name: string; type?: string; autoComplete?: string;
}) {
  return (
    <label className="field">
      <span className="fieldLab">{label}</span>
      <input className="fieldInp" name={name} type={type} autoComplete={autoComplete} />
      <span className="fieldLine" aria-hidden />
    </label>
  );
}

function LinedTextarea({ label, name, rows = 5 }: {
  label: string; name: string; rows?: number;
}) {
  return (
    <label className="field">
      <span className="fieldLab">{label}</span>
      <textarea className="fieldInp fieldTa" name={name} rows={rows} />
      <span className="fieldLine" aria-hidden />
    </label>
  );
}

const css = `
.ct{
  position: relative;
  padding: clamp(86px, 9vw, 132px) 0;
  overflow: hidden;
}


.ctInner{
  position: relative;
  z-index: 1;
}

.ctGrid{
  display: grid;
  grid-template-columns: 1fr minmax(460px, 1fr);
  gap: clamp(28px, 5vw, 70px);
  align-items: start;
}

.ctLeft{
  padding-top: 4px;
  display: flex;
  flex-direction: column;
  gap: clamp(24px, 3vw, 36px);
}

.ctTitle{
  margin: 0;
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.08;
  font-size: clamp(28px, 3.2vw, 46px);
  color: var(--color-primary);
  min-height: 5em;
}

.ctTitleStatic{
  display: inline;
}

.tw{ display: inline; }
.twText{
  display: inline;
  color: var(--color-primary);
  white-space: normal;
  overflow-wrap: anywhere;
}
.twHighlight{
  color: var(--color-accent);
}

.twCursor{
  display: inline-block;
  width: 1px;
  height: 0.9em;
  margin-left: 3px;
  background: var(--color-accent);
  transform: translateY(0.1em);
  animation: twBlink 880ms steps(1) infinite;
}
@keyframes twBlink{
  0%,49%{ opacity:1; } 50%,100%{ opacity:0; }
}

.ctMeta{
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ctMetaLine{
  font-family: var(--font-body);
  font-size: clamp(14px, 1.3vw, 17px);
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  transition: color 140ms ease;
  width: fit-content;
}
.ctMetaLine:hover{ color: var(--color-accent); }

.ctPanel{
  background: var(--color-bg);
  border: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
  padding: clamp(22px, 3.6vw, 40px);
}

.ctForm{
  display: grid;
  gap: clamp(14px, 2vw, 22px);
}

.ctFormTwo{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(14px, 2vw, 26px);
}

.field{
  display: grid;
  gap: 8px;
  position: relative;
}

.fieldLab{
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text) 42%, transparent);
  transition: color 140ms ease;
}
.field:focus-within .fieldLab{
  color: var(--color-text);
}

.fieldInp{
  appearance: none;
  border: 0;
  outline: none;
  background: transparent;
  padding: 4px 0 10px;
  font-family: var(--font-body);
  font-size: var(--t14);
  font-weight: 400;
  line-height: 1.45;
  color: var(--color-text);
  width: 100%;
}

.fieldTa{
  resize: vertical;
  min-height: 120px;
}

.fieldLine{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: color-mix(in srgb, var(--color-primary) 18%, transparent);
  transition: background 160ms ease;
}
.field:focus-within .fieldLine{
  background: var(--color-accent);
}

.ctSubmitRow{
  display: flex;
  justify-content: flex-end;
  padding-top: 6px;
}

.ctSubmit{
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
.ctSubmit:hover{
  background: var(--color-accent);
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.ctFooterRow{
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
}

.ctFooterRow .cta{
  display: inline-flex;
  align-items: center;
  padding: 11px 8px;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  background: transparent;
  color: color-mix(in srgb, var(--color-text) 55%, transparent);
  border: 1.5px solid transparent;
  transition: color 150ms ease, transform 120ms ease;
}
.ctFooterRow .cta:hover{
  color: var(--color-accent);
  transform: translateY(-2px);
}

@media (max-width: 860px){
  .ctGrid{
    grid-template-columns: 1fr;
  }
  .ctTitle{
    min-height: 0;
  }
  .ctFormTwo{
    grid-template-columns: 1fr;
  }
}
`;
