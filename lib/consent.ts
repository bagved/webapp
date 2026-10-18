export const CONSENT_KEY = 'bagved_analytics_consent_v1';
export const CONSENT_VERSION = 1;
export const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;
export type Consent = { version: number; updatedAt: number; statistics: boolean; marketing: boolean; media: boolean };
export const deniedConsent = (): Consent => ({version: CONSENT_VERSION, updatedAt: 0, statistics: false, marketing: false, media: false});
let sessionConsent: Consent | null = null;
const UNSAVED_KEY = CONSENT_KEY + '_unsaved';
export function parseConsent(raw: string | null, now = Date.now()): Consent | null {
  try {
    const c = JSON.parse(raw || 'null');
    return c && c.version === CONSENT_VERSION && Number.isFinite(c.updatedAt) && c.updatedAt > now - CONSENT_LIFETIME && c.updatedAt <= now && ['statistics','marketing','media'].every(k => typeof c[k] === 'boolean') ? c : null;
  } catch { return null; }
}
export function readConsent(): Consent | null {
  if (sessionConsent) return parseConsent(JSON.stringify(sessionConsent));
  // A failed write must not revive an older grant on the next page load.
  try { if (sessionStorage.getItem(UNSAVED_KEY)) return null; } catch {}
  try { return parseConsent(localStorage.getItem(CONSENT_KEY)); } catch { return null; }
}
export function saveConsent(choice: {statistics: boolean; marketing: boolean}): {consent: Consent; persisted: boolean} {
  const consent = {...deniedConsent(), updatedAt: Date.now(), statistics: choice.statistics === true, marketing: choice.marketing === true};
  sessionConsent = consent;
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    try { sessionStorage.removeItem(UNSAVED_KEY); } catch {}
    return {consent, persisted: true};
  } catch {
    try { localStorage.removeItem(CONSENT_KEY); } catch {}
    try { sessionStorage.setItem(UNSAVED_KEY, '1'); } catch {}
    return {consent, persisted: false};
  }
}
export function clearMeasurementCookies() {
  const names = document.cookie.split(';').map(c => c.trim().split('=')[0]).filter(n => /^(_ga|_gid|_gat|_gcl|__oaiq|__oppref$|__obref$)/.test(n));
  const host = location.hostname.split('.');
  const domains = ['', ...host.map((_,i) => '.' + host.slice(i).join('.'))];
  for (const name of names) for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/${domain ? '; domain='+domain : ''}; SameSite=Lax`;
}
