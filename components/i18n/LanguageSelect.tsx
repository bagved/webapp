"use client";

import { useI18n } from "./LanguageProvider";
import { isLocale, languageNames, locales } from "@/lib/i18n/locale";
import styles from "./LanguageSelect.module.css";

export default function LanguageSelect({ hidden = false }: { hidden?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  return <select className={styles.select} aria-label={t("Vælg sprog")} value={locale} tabIndex={hidden ? -1 : undefined}
    onChange={event => { if (isLocale(event.target.value)) setLocale(event.target.value); }}>
    {locales.map(code => <option key={code} value={code} lang={code} aria-label={languageNames[code]}>{code.toUpperCase()}</option>)}
  </select>;
}
