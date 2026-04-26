"use client";

// components/sections/ContactTeaser.tsx — KONTAKT-TEASER (forsiden)
//
// HVAD DU KAN ÆNDRE:
//   Typewriter-sætninger → find `phrases`-arrayet herunder og rediger tekster
//                          Tilføj en ny streng for endnu en sætning
//   "Skriv til os"       → statisk tekst — rediger direkte i <span className="ctTitleStatic">
//   Kontaktinfo          → rediger tel:-link og mailto:-link
//   CTA-knap nederst     → skift tekst eller href på <Link className="cta">
//   Formular-felter      → LinedInput/LinedTextarea-elementerne i <form>

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadDraft, saveDraft, clearDraft, EMPTY, type Draft } from "../../lib/contactDraft";

export default function ContactTeaserSection() {
  const [draft,  setDraft]  = useState<Draft>(EMPTY);
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [sent,   setSent]   = useState(false);
  const [errors, setErrors] = useState<Record<string,string>>({});

  useEffect(() => { setDraft(loadDraft()); }, []);

  const update = (key: keyof Draft) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...draft, [key]: e.target.value };
    setDraft(next);
    saveDraft(next);
  };

  function validate() {
    const e: Record<string,string> = {};
    if (!draft.name.trim())    e.name = "Skriv dit navn";
    if (!draft.message.trim()) e.message = "Skriv en besked";
    if (!draft.email.trim() && !draft.phone.trim())
      e.contact = "Skriv en email eller et telefonnummer";
    return e;
  }

  async function handleSubmit(e: { preventDefault(): void; currentTarget: HTMLFormElement }) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("sending");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    if (res.ok) {
      clearDraft();
      setDraft(EMPTY);
      setSent(true);
      setStatus("idle");
      setTimeout(() => setSent(false), 4000);
    } else {
      setStatus("error");
    }
  }

  return (
    <section className="ct" id="contact-teaser" aria-label="Kontakt">
      <style>{css}</style>


      <div className="container ctInner">
        <div className="ctGrid">

          {/* LEFT */}
          <div className="ctLeft">
            <h2 className="ctTitle">
              {/* Statisk del af overskriften */}
              <span className="ctTitleStatic">Skriv til os</span>
              {/* Typewriter: skifter automatisk mellem sætningerne i `phrases` */}
              <TypeLine phrases={[
                "her, eller ring på +45 61 74 64 16.",
                "på info@bagved.com",
              ]} />
            </h2>

            {/* Korte sætninger under overskriften */}
            <div className="ctSubLines">
              <p className="ctSubLine">Intet projekt er for stort eller for småt</p>
              <p className="ctSubLine">og vi svarer inden for 24 timer.</p>
            </div>
            <div className="ctMeta">
              <a href="tel:+4561746416"      className="ctMetaLine">+45 61 74 64 16</a>
              <a href="mailto:info@bagved.com" className="ctMetaLine">info@bagved.com</a>
            </div>
          </div>

          {/* RIGHT: formular-panel */}
          <div className="ctPanel" aria-label="Kontaktformular">
            <div className="ctPanelWrap">

              {/* Thank you overlay */}
              <div className="ctDone" aria-hidden={!sent} style={{ opacity: sent ? 1 : 0, pointerEvents: sent ? "auto" : "none" }}>
                <p className="ctDoneText">Tak for din henvendelse.</p>
              </div>

              {/* Form — always in DOM to hold panel height */}
              <form className="ctForm" onSubmit={handleSubmit} style={{ visibility: sent ? "hidden" : "visible" }}>
                <LinedInput label="Navn" name="name" autoComplete="name"
                  value={draft.name} onChange={update("name")} error={errors.name} />

                <div className="ctFormTwo">
                  <LinedInput label="Email" name="email" type="email" autoComplete="email"
                    value={draft.email} onChange={update("email")} error={errors.contact} />
                  <LinedInput label="Telefon" name="phone" type="tel" autoComplete="tel"
                    value={draft.phone} onChange={update("phone")} />
                </div>

                <LinedTextarea label="Besked" name="message" rows={5}
                  value={draft.message} onChange={update("message")} error={errors.message} />

                <div className="ctSubmitRow">
                  <button className="ctSubmit" type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sender…" : "Send besked"}
                  </button>
                  {status === "error" && <span className="ctError">Noget gik galt — prøv igen.</span>}
                </div>
              </form>

            </div>
          </div>

        </div>

        <div className="ctFooterRow">
          <Link className="cta" href="/contact#kontaktformular">UDDYB DIN EFTERSPØRGSEL HER</Link>
        </div>
      </div>
    </section>
  );
}

// TypeLine: typewriter-komponent der skriver/sletter sætninger i rækkefølge
// Hastigheder (i millisekunder):
//   44ms  = typing-hastighed per bogstav (lavere = hurtigere)
//   18ms  = slette-hastighed per bogstav (lavere = hurtigere)
//   2600ms = pause efter en sætning er skrevet færdig
//   900ms  = ekstra pause inden sletning begynder
function TypeLine({ phrases }: { phrases: string[] }) {
  const [i, setI]         = useState(0);
  const [txt, setTxt]     = useState("");
  const [phase, setPhase] = useState<"typing"|"hold"|"deleting">("typing");
  const phrase = phrases[i] ?? "";

  useEffect(() => {
    let t = 0;
    if (phase === "typing") {
      if (txt.length < phrase.length)
        t = window.setTimeout(() => setTxt(phrase.slice(0, txt.length + 1)), 44); /* skrivehastighed */
      else
        t = window.setTimeout(() => setPhase("hold"), 2600); /* pause når sætning er færdig */
    }
    if (phase === "hold")
      t = window.setTimeout(() => setPhase("deleting"), 900); /* ventetid inden sletning */
    if (phase === "deleting") {
      if (txt.length > 0)
        t = window.setTimeout(() => setTxt(txt.slice(0, -1)), 18); /* slettehastighed */
      else
        t = window.setTimeout(() => { setI(v => (v+1) % phrases.length); setPhase("typing"); }, 520);
    }
    return () => window.clearTimeout(t);
  }, [txt, phrase, phase, phrases.length]);

  function renderTxt(t: string) {
    return t;
  }

  return (
    <span className="tw" aria-label={phrase}>
      <span className="twText"> {renderTxt(txt)}<span className="twCursor" aria-hidden /></span>
    </span>
  );
}

function LinedInput({ label, name, type = "text", autoComplete, value, onChange, error }: {
  label: string; name: string; type?: string; autoComplete?: string;
  value?: string; onChange?: React.ChangeEventHandler<HTMLInputElement>; error?: string;
}) {
  return (
    <label className="field">
      <span className="fieldLab">{label}</span>
      <input className="fieldInp" name={name} type={type} autoComplete={autoComplete} value={value} onChange={onChange} />
      <span className="fieldLine" aria-hidden />
      {error && <span className="fieldErr">{error}</span>}
    </label>
  );
}

function LinedTextarea({ label, name, rows = 5, value, onChange, error }: {
  label: string; name: string; rows?: number;
  value?: string; onChange?: React.ChangeEventHandler<HTMLTextAreaElement>; error?: string;
}) {
  return (
    <label className="field">
      <span className="fieldLab">{label}</span>
      <textarea className="fieldInp fieldTa" name={name} rows={rows} value={value} onChange={onChange} />
      <span className="fieldLine" aria-hidden />
      {error && <span className="fieldErr">{error}</span>}
    </label>
  );
}

const css = `
.ct{
  position: relative;
  padding: clamp(52px, 6vw, 80px) 0;
  overflow: hidden;
}


.ctInner{
  position: relative;
  z-index: 1;
}

.ctGrid{
  display: grid;
  grid-template-columns: 1fr minmax(0, 640px);
  gap: clamp(28px, 5vw, 70px);
  align-items: start;
}

.ctLeft{
  padding-top: 4px;
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 1vw, 12px);
}

.ctTitle{
  margin: 0;
  font-family: var(--font-body);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.12;
  font-size: clamp(32px, 4vw, 56px);
  color: var(--color-text);
  min-height: 3.6em;
}

.ctTitleStatic{
  display: inline;
}

.tw{ display: inline; }
.twText{
  display: inline;
  color: var(--color-text);
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

.ctSubLines{
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ctSubLine{
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(13px, 1.1vw, 15px);
  font-weight: 400;
  line-height: 1.6;
  color: color-mix(in srgb, var(--color-text) 58%, transparent);
}

.ctMeta{
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 0;
}

.ctMetaLine{
  font-family: var(--font-body);
  font-size: clamp(13px, 1.1vw, 15px);
  font-weight: 400;
  color: color-mix(in srgb, var(--color-text) 62%, transparent);
  text-decoration: none;
  width: fit-content;
}

.ctPanel{
  background: color-mix(in srgb, var(--color-primary) 6%, var(--color-bg));
  border: 1px solid color-mix(in srgb, var(--color-text) 7%, transparent);
  border-radius: 12px;
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
.ctSubmit:disabled{
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.ctPanelWrap{
  position: relative;
}

.ctDone{
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  transition: opacity 350ms ease;
}

.ctDoneText{
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(24px, 3vw, 40px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: var(--color-primary);
}

.fieldErr{
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: color-mix(in srgb, var(--color-text) 55%, transparent);
}

.ctError{
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: color-mix(in srgb, var(--color-text) 55%, transparent);
  margin-left: 12px;
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
    min-height: 3em;
  }
  .ctFormTwo{
    grid-template-columns: 1fr;
  }
}
`;
