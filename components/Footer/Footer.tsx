"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="ft" aria-label="Footer">
      <style>{css}</style>

      <div className="container">
        <div className="ftRows">
          <div className="ftRow">
            <div className="ftCell ftLeft">CVR: 42497376</div>
            <div className="ftCell ftMid">
              <Link className="ftLink" href="/cookies">
                Cookie Policy
              </Link>
            </div>
            <div className="ftCell ftRight" />
          </div>

          <div className="ftRow">
            <div className="ftCell ftLeft">Tlf: +45 61 74 64 16</div>
            <div className="ftCell ftMid">
              <Link className="ftLink" href="/privacy">
                Privacy Policy
              </Link>
            </div>
            <div className="ftCell ftRight" />
          </div>

          <div className="ftRow">
            <div className="ftCell ftLeft">Mail: info@bagved.dk</div>
            <div className="ftCell ftMid">
              <Link className="ftLink" href="/mission">
                Mission
              </Link>
            </div>
            <div className="ftCell ftRight" />
          </div>

          <div className="ftRow">
            <div className="ftCell ftLeft">
              Adresse: Frederiksvej 32, st. th., 2000 Frederiksberg
            </div>
            <div className="ftCell ftMid">
              <Link className="ftLink" href="/terms">
                Terms and Conditions
              </Link>
            </div>
            <div className="ftCell ftRight">
              © 2026
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const css = `
.ft{
  width: 100%;
  padding: 34px 0;
  background: transparent; /* global bg */
  border-top: 1px solid color-mix(in srgb, var(--c1) 10%, transparent);
  font-family: var(--font-body);
}

/* 4 clean rows */
.ftRows{
  display: grid;
  gap: 2px; /* tiny row rhythm like your left column */
}

/* each row is a 3-col grid => everything sits "on the same line" */
.ftRow{
  display: grid;
  grid-template-columns: 1fr auto 1fr; /* left / centered / right */
  column-gap: clamp(18px, 3vw, 34px);
  align-items: start; /* stable if address wraps */
}

/* ✅ single source of truth: EXACT same typography everywhere */
.ftCell{
  font-family: var(--font-body);
  font-size: 11px;          /* ✅ fixed so it cannot drift */
  line-height: 1.55;
  font-weight: 300;
  letter-spacing: 0;
  color: color-mix(in srgb, var(--c1) 78%, transparent);
}

/* alignment per column */
.ftLeft{ justify-self: start; }
.ftMid{ justify-self: center; text-align: center; }
.ftRight{ justify-self: end; text-align: right; }

/* links must look EXACTLY like text */
.ftLink{
  color: inherit;
  text-decoration: none;
  font: inherit;
  letter-spacing: inherit;
  font-weight: inherit;
  line-height: inherit;

  border-bottom: 1px solid transparent;
  padding-bottom: 2px;
  transition: color 160ms ease, border-color 160ms ease, opacity 160ms ease;
  opacity: 0.95;
}

.ftLink:hover{
  color: var(--c3);
  border-bottom-color: color-mix(in srgb, var(--c3) 22%, transparent);
  opacity: 1;
}

/* mobile: stack, but keep clean */
@media (max-width: 860px){
  .ftRow{
    grid-template-columns: 1fr;
    row-gap: 6px;
  }
  .ftMid{ justify-self: start; text-align: left; }
  .ftRight{ justify-self: start; text-align: left; }
}
`;
