"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ContactTeaserSection() {
  return (
    <section className="ct section" id="contact-teaser" aria-label="Kontakt">
      <style>{css}</style>

      <div className="container">
        <div className="ctGrid">
          {/* LEFT COPY */}
          <div className="ctLeft">
            <h2 className="ctTitle">
              <span className="ctTitleStatic">Skriv til os</span>
              <span className="ctTitleLive">
                {" "}
                <TypeLine
                  phrases={[
                    "her — eller ring på +45 61 74 64 16",
                    "på info@bagved.com",
                    "hvor end du foretrækker det!",
                  ]}
                />
              </span>
            </h2>
          </div>

          {/* RIGHT FORM PANEL */}
          <div className="ctPanel" aria-label="Kontaktformular">
            <form
              className="ctForm"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="row">
                <LinedInput label="Navn" name="name" autoComplete="name" />
              </div>

              <div className="row two">
                <LinedInput
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                />
                <LinedInput
                  label="Telefonnummer"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                />
              </div>

              <div className="row">
                <LinedTextarea label="Besked" name="message" rows={5} />
              </div>

              <div className="ctaRow">
                <button className="send" type="submit">
                  Send besked
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* OUTSIDE BOX – centered ending line */}
        <p className="ctBelow">
          <Link className="ctBelowLink" href="/contact">
            Hvis du vil fortælle os mere om dig, din virksomhed eller mulighederne
            for et eventuelt samarbejde — så tryk her
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ---------------- Typewriter ---------------- */

function TypeLine({ phrases }: { phrases: string[] }) {
  // calmer timing
  const TYPE_MS = 44;
  const DELETE_MS = 18;

  // longer readable holds
  const HOLD_AFTER_TYPED_MS = 2600;
  const HOLD_BEFORE_DELETE_MS = 900;

  // gap before next phrase starts
  const BETWEEN_MS = 520;

  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [phase, setPhase] = useState<"typing" | "hold" | "deleting">("typing");

  const phrase = phrases[i] ?? "";

  useEffect(() => {
    let t = 0;

    if (phase === "typing") {
      if (txt.length < phrase.length) {
        t = window.setTimeout(
          () => setTxt(phrase.slice(0, txt.length + 1)),
          TYPE_MS
        );
      } else {
        t = window.setTimeout(() => setPhase("hold"), HOLD_AFTER_TYPED_MS);
      }
    }

    if (phase === "hold") {
      t = window.setTimeout(() => setPhase("deleting"), HOLD_BEFORE_DELETE_MS);
    }

    if (phase === "deleting") {
      if (txt.length > 0) {
        t = window.setTimeout(() => setTxt(txt.slice(0, -1)), DELETE_MS);
      } else {
        t = window.setTimeout(() => {
          setI((v) => (v + 1) % phrases.length);
          setPhase("typing");
        }, BETWEEN_MS);
      }
    }

    return () => window.clearTimeout(t);
  }, [txt, phrase, phase, phrases.length]);

  const longestPhrase = longest(phrases);

  return (
    <span className="tw" aria-label="Kontaktmuligheder">
      {/* invisible longest phrase to lock width */}
      <span className="twMeasure" aria-hidden>
        {longestPhrase}
      </span>

      {/* actual typing overlays measure */}
      <span className="twText">
        {txt}
        <span className="twCursor" aria-hidden />
      </span>
    </span>
  );
}

function longest(arr: string[]) {
  let best = "";
  for (const s of arr) if (s.length > best.length) best = s;
  return best;
}

/* ---------------- Lined fields ---------------- */

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
  rows = 5,
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

/* ---------------- CSS ---------------- */

const css = `
.ct{
  padding: clamp(86px, 9vw, 132px) 0;
  background: transparent;
}

.ctGrid{
  display: grid;
  grid-template-columns: 1fr minmax(520px, 1fr);
  gap: clamp(28px, 5vw, 70px);
  align-items: start;
}

/* LEFT */
.ctLeft{
  padding-top: 6px;
}

/* ✅ One consistent weight across BOTH parts */
.ctTitle{
  margin: 0;
  font-family: var(--font-heading);
  font-weight: 350; /* ✅ same for static + typing */
  letter-spacing: -0.02em;
  line-height: 1.18;
  font-size: clamp(28px, 3.0vw, 44px);
  color: color-mix(in srgb, var(--c1) 92%, transparent);
}

.ctTitleStatic{
  font-weight: inherit; /* ✅ identical */
}

.ctTitleLive{
  font-weight: inherit; /* ✅ identical */
  color: color-mix(in srgb, var(--c1) 86%, transparent);
  display: inline;      /* ✅ keep it in direct flow */
}

/* Typewriter: keep it inline + lock width without affecting layout */
.tw{
  position: relative;
  display: inline-block; /* ✅ behaves like text */
  vertical-align: baseline;
}

/* Invisible longest phrase locks width, but doesn’t push layout around */
.twMeasure{
  visibility: hidden;
  white-space: normal;
  max-width: min(44ch, 60vw);
}

/* Actual typing overlays */
.twText{
  position: absolute;
  inset: 0;
  white-space: normal;  /* ✅ can wrap instead of widening */
  max-width: min(44ch, 60vw);
}

/* Cursor: thinner and more “typographic” */
.twCursor{
  display: inline-block;
  width: 2px;
  height: 0.95em;
  margin-left: 4px;
  background: color-mix(in srgb, var(--c1) 62%, transparent);
  transform: translateY(0.08em);
  animation: blink 920ms steps(1,end) infinite;
}

@keyframes blink{
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* RIGHT PANEL */
.ctPanel{
  background: color-mix(in srgb, var(--c2) 86%, transparent);
  border: 1px solid color-mix(in srgb, var(--c1) 14%, transparent);
  border-radius: 0;
  padding: clamp(22px, 3.6vw, 40px);
}

/* FORM */
.ctForm{
  display: grid;
  gap: 18px;
}

.row{
  display: grid;
  gap: 18px;
}
.row.two{
  grid-template-columns: 1fr 1fr;
  gap: 26px;
}

.field{
  display: grid;
  gap: 10px;
  position: relative;
}

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

.ta{
  resize: vertical;
  min-height: 120px;
}

.line{
  height: 1px;
  width: 100%;
  background: color-mix(in srgb, var(--c1) 26%, transparent);
  transition: background 180ms ease;
}

.field:focus-within .line{
  background: color-mix(in srgb, var(--c3) 28%, var(--c1));
}

/* Button: premium, calm */
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
  border-color: color-mix(in srgb, var(--c3) 26%, var(--c1));
  color: var(--c1);
  background: color-mix(in srgb, var(--c3) 7%, transparent);
  transform: translateY(-1px);
}

/* BELOW TEXT (outside the box) */
.ctBelow{
  margin: 26px 0 0;
  text-align: center;
  font-size: var(--t11);
  line-height: 1.6;
  color: color-mix(in srgb, var(--c1) 70%, transparent);
}

.ctBelowLink{
  display: inline-block;
  color: inherit;
  border-bottom: 1px solid color-mix(in srgb, var(--c1) 16%, transparent);
  padding-bottom: 6px;
  transition: color 160ms ease, border-color 160ms ease;
}
.ctBelowLink:hover{
  color: var(--c3);
  border-bottom-color: color-mix(in srgb, var(--c3) 22%, transparent);
}

/* responsive */
@media (max-width: 980px){
  .ctGrid{
    grid-template-columns: 1fr;
  }
  .ctPanel{
    padding: 22px;
  }
  .row.two{
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .twMeasure,
  .twText{
    max-width: 100%;
  }
}
`;
