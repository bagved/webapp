"use client";
import { useI18n } from "@/components/i18n/LanguageProvider";

import Link from "@/components/i18n/LocalizedLink";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="ft" aria-label={t("Footer")}>
      <style>{css}</style>

      <div className="container">
        {/* Desktop layout: 4 rows, left + centered link + right (only last has ©) */}
        <div className="ftDesktop">
          <div className="ftRows">
            <div className="ftRow">
              <div className="ftCell ftLeft">{t("CVR: 42597376")}</div>
              <div className="ftCell ftMid">
                <Link className="ftLink" href="/mission">{t("Mission")}</Link>
              </div>
              <div className="ftCell ftRight" />
            </div>

            <div className="ftRow">
              <div className="ftCell ftLeft">{t("Tlf: +45 61 74 64 16")}</div>
              <div className="ftCell ftMid">
                <Link className="ftLink" href="/cookies">{t("Cookie Policy")}</Link>
              </div>
              <div className="ftCell ftRight" />
            </div>

            <div className="ftRow">
              <div className="ftCell ftLeft">{t("Mail: info@bagved.com")}</div>
              <div className="ftCell ftMid">
                <Link className="ftLink" href="/privacy">{t("Privacy Policy")}</Link>
              </div>
              <div className="ftCell ftRight" />
            </div>

            <div className="ftRow">
              <div className="ftCell ftLeft">
                {t("Adresse: Frederiksvej 34, st. tv., 2000 Frederiksberg")}</div>
              <div className="ftCell ftMid">
                <Link className="ftLink" href="/terms">{t("Terms and Conditions")}</Link>
              </div>
              <div className="ftCell ftRight">© 2026</div>
            </div>
          </div>
        </div>

        {/* Mobile layout: grouped blocks + divider lines */}
        <div className="ftMobile">
          <div className="ftBlock">
            <div className="ftCell">{t("CVR: 42597376")}</div>
            <div className="ftCell">{t("Tlf: +45 61 74 64 16")}</div>
            <div className="ftCell">{t("Mail: info@bagved.com")}</div>
            <div className="ftCell">{t("Adresse: Frederiksvej 34, st. tv., 2000 Frederiksberg")}</div>
          </div>

          <div className="ftDivider" aria-hidden />

          <div className="ftBlock">
            <Link className="ftLink ftCell" href="/mission">{t("Mission")}</Link>
            <Link className="ftLink ftCell" href="/cookies">{t("Cookie Policy")}</Link>
            <Link className="ftLink ftCell" href="/privacy">{t("Privacy Policy")}</Link>
            <Link className="ftLink ftCell" href="/terms">{t("Terms and Conditions")}</Link>
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
/* Brun bund med beige tekst — farverne kommer fra logoet via theme.css:
   --color-primary = brun (#571B14), --color-secondary = beige (#BFB48F) */
.ft{
  width: 100%;
  padding: 34px 0;
  background: var(--color-primary);
  border-top: none;
  font-family: var(--font-body);
}

.ftCell{
  display: block;
  font-family: var(--font-body);
  font-size: 11px;
  line-height: 1.55;
  font-weight: 400;
  letter-spacing: 0;
  color: var(--color-secondary);
}

.ftLink{
  display: block;
  color: inherit;
  text-decoration: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  transition: color 140ms ease;
}
.ftLink:hover{
  color: var(--color-bg);   /* lysner mod den varme hvide på den brune bund */
}

.ftRows{ display: grid; gap: 2px; }
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

@media (max-width: 860px){
  .ftDesktop{ display: none; }
  .ftMobile{ display: grid; gap: 14px; }

  .ftBlock{ display: grid; gap: 6px; }

  .ftBlock .ftLink{
    display: block;
    font-family: var(--font-body);
    font-size: 11px;
    line-height: 1.55;
    font-weight: 400;
    color: var(--color-secondary);
  }

  .ftDivider{
    height: 1px;
    background: color-mix(in srgb, var(--color-secondary) 30%, transparent);
  }
}
`;
