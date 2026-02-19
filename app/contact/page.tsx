"use client";

import React, { useEffect, useRef, useState } from "react";

export default function ContactPage() {
  const boundaryRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);

  // splitPct = where the “color boundary line” hits the logo in %
  // 0% = boundary is above logo (only Logo2 visible)
  // 100% = boundary is below logo (only Logo1 visible)
  const [splitPct, setSplitPct] = useState(100);

  useEffect(() => {
    const updateSplit = () => {
      const boundaryEl = boundaryRef.current;
      const logoEl = logoRef.current;
      if (!boundaryEl || !logoEl) return;

      const boundaryRect = boundaryEl.getBoundingClientRect();
      const logoRect = logoEl.getBoundingClientRect();

      // The boundary is the TOP of the dark section (exactly where the color starts)
      const boundaryY = boundaryRect.top;

      // Where does that boundary cut through the logo (in px from logo top)?
      const cutPx = boundaryY - logoRect.top;

      // Convert to percentage of the logo height
      const pct = (cutPx / Math.max(1, logoRect.height)) * 100;

      // Clamp 0..100 so it behaves nicely when boundary is above/below the logo
      const clamped = Math.min(100, Math.max(0, pct));
      setSplitPct(clamped);
    };

    updateSplit();
    window.addEventListener("scroll", updateSplit, { passive: true });
    window.addEventListener("resize", updateSplit);
    return () => {
      window.removeEventListener("scroll", updateSplit);
      window.removeEventListener("resize", updateSplit);
    };
  }, []);

  // LogoA should show ABOVE the boundary, so we hide the bottom part below it
  const logoAClipBottom = 100 - splitPct; // % to clip from bottom
  // LogoB should show BELOW the boundary, so we hide the top part above it
  const logoBClipTop = splitPct;

  return (
    <div className="page">
      <style>{css}</style>

      {/* Fixed logo layers (split EXACTLY on the color boundary line) */}
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

      {/* TOP: transparent so global background shows through */}
      <section className="contactTop">
        <div className="container">
          <h1 className="contactTitle">Kontakt</h1>
          <p className="contactLead">
            Vi hjælper gerne med spørgsmål om produktion, priser eller samarbejde.
            Ring, skriv eller udfyld formularen — så vender vi tilbage hurtigst muligt.
          </p>

          <div className="contactInfo">
            <div>
              <div className="infoLabel">Telefon</div>
              <a className="infoValue" href="tel:+4561746416">
                +45 61 74 64 16
              </a>
            </div>

            <div>
              <div className="infoLabel">Email</div>
              <a className="infoValue" href="mailto:info@bagved.dk">
                info@bagved.dk
              </a>
            </div>

            <div>
              <div className="infoLabel">Adresse</div>
              <div className="infoValue">
                Frederiksvej 32, st. th., 2000 Frederiksberg
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM: boundaryRef is the exact “start of color” line */}
      <section className="contactFormWrap" ref={boundaryRef}>
        <div className="container">
          <form className="largeForm" onSubmit={(e) => e.preventDefault()}>
            <div className="formTitle">Send os en besked</div>

            <div className="row">
              <label>
                <span>Navn</span>
                <input type="text" name="name" placeholder="Dit navn" />
              </label>
            </div>

            <div className="row two">
              <label>
                <span>Email</span>
                <input type="email" name="email" placeholder="din@email.dk" />
              </label>
              <label>
                <span>Telefon</span>
                <input type="tel" name="phone" placeholder="+45 ..." />
              </label>
            </div>

            <div className="row">
              <label>
                <span>Formål</span>
                <select name="purpose" defaultValue="">
                  <option value="" disabled>
                    Vælg formål
                  </option>
                  <option value="virksomhed">Virksomhed (produktion)</option>
                  <option value="samarbejde">Samarbejdspartner</option>
                  <option value="arbejde">Job / arbejde hos BAGVED</option>
                  <option value="andet">Andet</option>
                </select>
              </label>
            </div>

            <div className="row">
              <label>
                <span>Besked</span>
                <textarea name="message" rows={7} placeholder="Skriv din besked..." />
              </label>
            </div>

            <div className="formActions">
              <button type="submit" className="submitBtn">
                Send besked
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

const css = `
.container{
  width: min(1100px, calc(100% - 48px));
  margin: 0 auto;
}

/* No local background -> global site background shows through */
.page{
  position: relative;
  min-height: 100vh;
  background: transparent;
}

/* LOGO LAYER: between bg and content */
.bgLogo{
  position: fixed;

  /* 2/3 down + right */
  top: 66%;
  left: 76%;
  transform: translate(-50%, -50%);

  /* smaller */
  width: clamp(200px, 26vw, 460px);
  height: clamp(200px, 26vw, 460px);

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  z-index: 1;
  pointer-events: none;
  opacity: 1;

  transition: clip-path 70ms linear;
}

.bgLogo#bgLogoA{ background-image: url('/Transparent Logo.png'); }
.bgLogo#bgLogoB{ background-image: url('/transparent-logo-2.png'); }

/* TOP */
.contactTop{
  position: relative;
  padding: clamp(64px, 8vw, 120px) 0;
  background: transparent;
  z-index: auto;
}

/* BOTTOM */
.contactFormWrap{
  position: relative;
  padding: clamp(72px, 9vw, 140px) 0;
  background: transparent;
  z-index: auto;
}

/* Dark color starts EXACTLY at the top of contactFormWrap */
.contactFormWrap::before{
  content: "";
  position: absolute;
  inset: 0;
  background: #1A0A40;
  z-index: 0;
}

/* Content above logo */
.contactTop .container,
.contactFormWrap .container{
  position: relative;
  z-index: 2;
}

.contactTitle{
  margin: 0 0 14px 0;
  font-family: var(--font-heading);
  font-weight: 350;
  letter-spacing: -0.02em;
  font-size: clamp(28px, 3.2vw, 48px);
  color: #3C3C3B;
}

.contactLead{
  margin: 0 0 34px 0;
  max-width: 72ch;
  font-size: clamp(14px, 1.1vw, 16px);
  line-height: 1.65;
  color: color-mix(in srgb, #3C3C3B 82%, transparent);
}

.contactInfo{
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 26px;
  max-width: 900px;
}

.infoLabel{
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: rgba(26,10,64,0.55);
  margin-bottom: 10px;
}

.infoValue{
  font-size: 15px;
  line-height: 1.45;
  color: #1A0A40;
  text-decoration: none;
  font-weight: 520;
}

a.infoValue:hover{ text-decoration: underline; }

/* Light form card */
.largeForm{
  max-width: 860px;
  margin: 0 auto;
  background: #FBFAFF;
  border: 1px solid rgba(168,138,236,0.18);
  box-shadow: 0 18px 55px rgba(0,0,0,0.22);
  border-radius: 22px;
  padding: clamp(22px, 3vw, 36px);
}

.formTitle{
  font-family: var(--font-heading);
  font-size: clamp(22px, 2.4vw, 34px);
  font-weight: 350;
  letter-spacing: -0.02em;
  color: #1A0A40;
  margin-bottom: 28px;
}

.largeForm .row{ display: grid; margin-bottom: 18px; }
.largeForm .row.two{ grid-template-columns: 1fr 1fr; gap: 16px; }

.largeForm label{ display: grid; gap: 8px; }

.largeForm span{
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: rgba(26,10,64,0.65);
}

.largeForm input,
.largeForm textarea,
.largeForm select{
  padding: 12px 13px;
  border-radius: 14px;
  border: 1px solid rgba(26,10,64,0.14);
  background: rgba(255,255,255,0.82);
  color: #1A0A40;
  font-family: inherit;
  font-size: 14px;
  transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
}

.largeForm input::placeholder,
.largeForm textarea::placeholder{ color: rgba(26,10,64,0.40); }

.largeForm input:focus,
.largeForm textarea:focus,
.largeForm select:focus{
  outline: none;
  border-color: rgba(168,138,236,0.55);
  box-shadow: 0 0 0 5px rgba(168,138,236,0.18);
  background: #FFFFFF;
}

.largeForm textarea{ resize: vertical; min-height: 160px; }

.formActions{
  display: flex;
  justify-content: flex-end;
  margin-top: 22px;
}

.submitBtn{
  padding: 14px 28px;
  border-radius: 999px;
  border: 1px solid rgba(26,10,64,0.18);
  background: rgba(26,10,64,0.04);
  color: #1A0A40;
  font-weight: 800;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  font-size: 11px;
  cursor: pointer;
  transition: transform 160ms ease, background 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
}

.submitBtn:hover{
  background: rgba(243,33,124,0.12);
  border-color: rgba(243,33,124,0.35);
  box-shadow: 0 10px 30px rgba(243,33,124,0.12);
  transform: translateY(-1px);
}

@media (max-width: 980px){
  .contactInfo{ grid-template-columns: 1fr; gap: 18px; }
  .largeForm .row.two{ grid-template-columns: 1fr; gap: 18px; }

  .bgLogo{
    top: 72%;
    left: 70%;
    width: clamp(180px, 54vw, 320px);
    height: clamp(180px, 54vw, 320px);
    opacity: 0.45;
  }
}
`;
