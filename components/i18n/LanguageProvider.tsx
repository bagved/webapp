"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { isLocale, translate, type Locale } from "@/lib/i18n/locale";
import { usePathname } from "next/navigation";
import { productions } from "@/lib/productions";
import { clientCases } from "@/lib/clientCases";

type LanguageContext = {
  locale: Locale;
  ready: boolean;
  setLocale: (locale: Locale) => void;
  t: <T>(source: T, values?: Record<string, string | number>) => T;
};
const Context = createContext<LanguageContext>({ locale: "da", ready: false, setLocale: () => {}, t: source => source });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, updateLocale] = useState<Locale>("da");
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  // An explicit URL choice is shareable and overrides the remembered preference.
  useEffect(() => {
    const read = () => {
      const query = new URLSearchParams(window.location.search).get("lang");
      let stored: string | null = null;
      try { stored = localStorage.getItem("bagved:language"); } catch { /* URL selection works without storage. */ }
      updateLocale(isLocale(query) ? query : isLocale(stored) ? stored : "da");
      setReady(true);
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  const setLocale = useCallback((next: Locale) => {
    if (!isLocale(next)) return;
    updateLocale(next);
    try { localStorage.setItem("bagved:language", next); } catch { /* No consent or form state is changed. */ }
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(window.history.state, "", url);
  }, []);
  const t = useCallback(<T,>(source: T, values?: Record<string, string | number>) => translate(locale, source, values), [locale]);
  useEffect(() => {
    const titles: Record<string, string> = { "/": "Bagved", "/services": "Ydelser og idéer | Bagved", "/cases": "Produktionseksempler | Bagved", "/mission": "Mission | Bagved", "/contact": "Kontakt | Bagved", "/cookies": "Cookie Policy | Bagved", "/privacy": "Privacy Policy | Bagved", "/terms": "Terms and Conditions | Bagved" };
    const item = [...productions, ...clientCases].find(item => pathname === `/cases/${item.id}`);
    document.title = item ? `${t(item.title)} | Bagved` : t(titles[pathname] || "Bagved");
  }, [pathname, t]);
  const value = useMemo(() => ({ locale, ready, setLocale, t }), [locale, ready, setLocale, t]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useI18n() { return useContext(Context); }
