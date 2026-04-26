const KEY = "bagved_contact_draft";

export type Draft = { name: string; email: string; phone: string; message: string };
export const EMPTY: Draft = { name: "", email: "", phone: "", message: "" };

export function loadDraft(): Draft {
  if (typeof window === "undefined") return EMPTY;
  try { return { ...EMPTY, ...JSON.parse(localStorage.getItem(KEY) ?? "{}") }; }
  catch { return EMPTY; }
}

export function saveDraft(data: Partial<Draft>) {
  const cur = loadDraft();
  localStorage.setItem(KEY, JSON.stringify({ ...cur, ...data }));
}

export function clearDraft() {
  localStorage.removeItem(KEY);
}
