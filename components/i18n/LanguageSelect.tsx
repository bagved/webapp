"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { useI18n } from "./LanguageProvider";
import { languageNames, locales, type Locale } from "@/lib/i18n/locale";
import styles from "./LanguageSelect.module.css";

export default function LanguageSelect({ hidden = false }: { hidden?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const options = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();

  useEffect(() => {
    if (hidden) setOpen(false);
  }, [hidden]);
  useEffect(() => {
    if (!open) return;
    options.current[locales.indexOf(locale)]?.focus();
    const closeOutside = (event: PointerEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open, locale]);

  const choose = (next: Locale) => {
    setLocale(next);
    setOpen(false);
    trigger.current?.focus();
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && open) {
      event.preventDefault(); event.stopPropagation();
      setOpen(false); trigger.current?.focus();
    } else if (event.key === "Tab") {
      setOpen(false);
    } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      if (!open) { setOpen(true); return; }
      const current = options.current.findIndex(option => option === document.activeElement);
      const next = event.key === "Home" ? 0 : event.key === "End" ? locales.length - 1
        : (current + (event.key === "ArrowDown" ? 1 : -1) + locales.length) % locales.length;
      options.current[next]?.focus();
    }
  };

  return <div ref={wrapper} className={styles.wrapper} onKeyDown={onKeyDown}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false); }}>
    <button ref={trigger} type="button" className={styles.trigger} aria-label={t("Vælg sprog")}
      aria-haspopup="menu" aria-expanded={open} aria-controls={menuId} tabIndex={hidden ? -1 : undefined}
      onClick={() => setOpen(value => !value)}>{locale.toUpperCase()}</button>
    {open && !hidden && <div id={menuId} className={styles.options} role="menu" aria-label={t("Vælg sprog")}>
      {locales.map((code, index) => <button key={code} ref={element => { options.current[index] = element; }} type="button"
        role="menuitemradio" aria-checked={locale === code} aria-label={languageNames[code]} lang={code} tabIndex={-1}
        className={styles.option} onClick={() => choose(code)}>{code.toUpperCase()}</button>)}
    </div>}
  </div>;
}
