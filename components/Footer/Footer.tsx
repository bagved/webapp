"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="ft" aria-label="Footer">
      <style>{css}</style>

      <div className="container">
        {/* Desktop layout: 4 rows, left + centered link + right (only last has ©) */}
        <div className="ftDesktop" aria-hidden={false}>
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
              <div className="ftCell ftRight">© 2026</div>
            </div>
          </div>
        </div>

        {/* Mobile layout: grouped blocks + divider lines (no interleaving) */}
        <div className="ftMobile" aria-hidden={false}>
          <div className="ftBlock">
            <div className="ftCell">CVR: 42497376</div>
            <div className="ftCell">Tlf: +45 61 74 64 16</div>
            <div className="ftCell">Mail: info@bagved.dk</div>
            <div className="ftCell">
              Adresse: Frederiksvej 32, st. th., 2000 Frederiksberg
            </div>
          </div>

          <div className="ftDivider" aria-hidden />

          <div className="ftBlock">
            <Link className="ftLink ftCell" href="/cookies">
              Cookie Policy
            </Link>
            <Link className="ftLink ftCell" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="ftLink ftCell" href="/mission">
              Mission
            </Link>
            <Link className="ftLink ftCell" href="/terms">
              Terms and Conditions
            </Link>
          </div>

          <div className="ftDivider" aria-hidden />

          <div className="ftBlock">
            <div className="ftCell">© 2026</div>
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
  background: transparent;
  border-top: 1px solid color-mix(in srgb, var(--c1) 10%, transparent);
  font-family: var(--font-body);
}

/* ✅ single source of truth: EXACT same typography everywhere */
.ftCell{
  font-family: var(--font-body);
  font-size: 11px;
  line-height: 1.55;
  font-weight: 300;
  letter-spacing: 0;
  color: color-mix(in srgb, var(--c1) 78%, transparent);
}

/* ✅ enforce links to be IDENTICAL to text (mobile + desktop) */
.ftLink{
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  letter-spacing: inherit;

  color: inherit;
  text-decoration: none;

  display: inline-block;
  -webkit-font-smoothing: antialiased;
  text-rendering: geometricPrecision;

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

/* extra safety: mobile anchors inherit exactly */
.ftMobile a{
  font: inherit;
}

/* Desktop (default) */
.ftRows{
  display: grid;
  gap: 2px;
}
.ftRow{
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  column-gap: clamp(18px, 3vw, 34px);
  align-items: start;
}
.ftLeft{ justify-self: start; }
.ftMid{ justify-self: center; text-align: center; }
.ftRight{ justify-self: end; text-align: right; }

.ftDesktop{ display: block; }
.ftMobile{ display: none; }

/* ✅ Mobile: grouped layout with divider lines */
@media (max-width: 860px){
  .ftDesktop{ display: none; }
  .ftMobile{ display: grid; gap: 14px; }

  .ftBlock{
    display: grid;
    gap: 6px;
  }

  .ftDivider{
    height: 1px;
    width: 100%;
    background: color-mix(in srgb, var(--c1) 10%, transparent);
  }
}
`;
