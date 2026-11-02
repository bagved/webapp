import messages from "./messages.json";

export const locales = ["da", "en", "de"] as const;
export type Locale = typeof locales[number];
export const languageNames: Record<Locale, string> = { da: "Dansk", en: "English", de: "Deutsch" };
export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale);
}
const catalog: Record<string, { en: string; de: string }> = messages;
// Danish is the source. Whitespace belongs to the caller, never the dictionary.
export function translate<T>(locale: Locale, source: T, values?: Record<string, string | number>): T {
  if (typeof source !== "string") return source;
  const key = source.trim().replace(/\s+/g, " ");
  let translated = locale === "da" ? key : catalog[key]?.[locale] ?? key;
  if (values) translated = translated.replace(/\{(\w+)\}/g, (token, name) => String(values[name] ?? token));
  const leading = source.match(/^\s*/)?.[0] ?? "";
  const trailing = source.trim() ? source.match(/\s*$/)?.[0] ?? "" : "";
  return (leading + translated + trailing) as T;
}
