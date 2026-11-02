export const contexts = [
  { id: "business", label: "en mindre virksomhed", title: "Gør din værdi synlig.", image: "/photos/virksomhedsfilm.jpg", production: "virksomhedsvideo", subject: "Virksomhedsvideo", lead: "En kort virksomhedsfilm, der gør det let at forstå, hvem I er, og hvad I kan hjælpe med.", value: "Ét samlet optageforløb kan give jer materiale til både præsentation, salg og løbende kommunikation." },
  { id: "sports", label: "en klub eller sportsarrangør", title: "Saml flere om sporten.", image: "/photos/sportsbroadcast.jpg", production: "sportsbroadcast", subject: "Sportsbroadcast", lead: "En flerkamera-livestream, der bringer kampen ud til dem, der ikke er på tribunen.", value: "Tænk liveudsendelse, spillerinterviews og highlights sammen, så begivenheden også lever på klubbens egne kanaler." },
  { id: "hybrid", label: "en arrangør af et hybridevent", title: "Ét event. Publikum i to rum.", image: "/photos/Livestream.jpg", production: "livestream", subject: "Livestream", lead: "En livestream af dit event med tydelig lyd, flere kameravinkler og et forløb tilpasset deltagere både i lokalet og online.", value: "Oplæg og samtaler kan genbruges som en vidensbank. En bagomfilm og fotos kan fortælle historien om dagen bagefter." },
  { id: "event", label: "en event- eller konferencearrangør", title: "Få mere ud af den ene dag.", image: "/photos/eventfilm.jpg", production: "eventvideo", subject: "Eventvideo", lead: "En eventfilm med stemning, korte interviews og de øjeblikke, der samler fortællingen om dagen.", value: "Planlæg indhold til både tilbageblik og næste invitation. En bagomfilm og eventfotos kan forlænge fortællingen." },
] as const;
export const goals = [
  { id: "awareness", label: "gøre flere opmærksomme på os", value: "Skab en tydelig introduktion, som kan deles igen og igen." },
  { id: "engagement", label: "engagere vores fællesskab", value: "Lad mennesker og øjeblikke give publikum noget at samles om." },
  { id: "sales", label: "gøre vores tilbud lettere at forstå", value: "Vis den konkrete løsning og giv modtageren et klart næste skridt." },
  { id: "knowledge", label: "dele viden med flere", value: "Gør viden tilgængelig både under udsendelsen og i korte formater bagefter." },
] as const;
export const channels = [
  { id: "website", label: "Hjemmeside", output: "En hovedfilm eller optagelse i 16:9 til jeres hjemmeside." },
  { id: "linkedin", label: "LinkedIn", output: "Korte faglige klip med undertekster til LinkedIn." },
  { id: "instagram", label: "Instagram / Facebook", output: "Lodrette highlights og fotos til opslag, stories og reels." },
  { id: "youtube", label: "YouTube", output: "En længere 16:9-version og korte uddrag til YouTube." },
  { id: "internal", label: "Internt / nyhedsbrev", output: "Udvalgte klip og fotos til intern kommunikation og nyhedsbreve." },
] as const;
export const activities = [
  { id: "event", label: "et event" },
  { id: "livestream", label: "en livestream" },
  { id: "film", label: "en video" },
  { id: "webinar", label: "et webinar" },
  { id: "unsure", label: "en idé, vi gerne vil udforske" },
] as const;
export const frequencies = [
  { id: "once", label: "som en enkelt produktion", note: "Vi kan samle planlægning, optagelse og levering i ét afgrænset forløb." },
  { id: "frequent", label: "flere gange om ugen", note: "Et fast setup, genkendelig grafik og en tydelig afviklingsplan kan gøre hyppige produktioner lettere at gennemføre." },
  { id: "weekly", label: "hver uge", note: "Et ugentligt format kan bygges op som en serie med et fast udtryk og en genkendelig rytme." },
  { id: "monthly", label: "hver måned", note: "En månedlig plan kan samle idéer, optagelser og udgivelser, så der er en rød tråd fra gang til gang." },
  { id: "quarterly", label: "hvert kvartal", note: "Et tilbagevendende koncept kan tilpasses hvert kvartals budskaber og aktiviteter." },
  { id: "yearly", label: "hvert år", note: "Et årligt koncept kan skabe genkendelighed, mens indhold og afvikling tilpasses den enkelte udgave." },
  { id: "as-needed", label: "efter behov", note: "Vi kan finde et fleksibelt setup, hvor hver produktion tager udgangspunkt i den konkrete opgave." },
  { id: "unsure", label: "med endnu ukendt hyppighed", note: "Vi kan sammen afklare, om et enkelt projekt eller et tilbagevendende format passer bedst." },
] as const;
export const deliveryModes = [
  { id: "hybrid", label: "hybridt", note: "Vi tænker oplevelsen i lokalet og online sammen, så lyd, billeder og deltagelse fungerer for begge målgrupper." },
  { id: "online", label: "online", note: "Vi planlægger indhold og afvikling til dem, der følger med på skærmen." },
  { id: "onsite", label: "fysisk", note: "Vi tager udgangspunkt i oplevelsen på stedet og kan dokumentere den til brug bagefter." },
  { id: "mixed", label: "forskelligt fra gang til gang", note: "Vi kan tilpasse samme grundidé til fysiske, digitale og hybride udgaver." },
  { id: "unsure", label: "ikke afklaret endnu", note: "Format og teknik finder vi ud af sammen, inden vi lægger den endelige plan." },
] as const;
export type Plan = { context: string; goal: string; channels: string[]; activity?: string; frequency?: string; mode?: string };
export type ValidPlan = Plan & { activity: string; frequency: string; mode: string };
export const defaultPlan: ValidPlan = { context: "hybrid", goal: "awareness", channels: ["website", "linkedin"], activity: "event", frequency: "once", mode: "hybrid" };
export function validatePlan(value: Plan): ValidPlan | null {
  if (!contexts.some(c => c.id === value.context) || !goals.some(g => g.id === value.goal)) return null;
  if (!value.channels.length || value.channels.length > channels.length || !value.channels.every(id => channels.some(c => c.id === id))) return null;
  // Missing new fields represent a legacy link. Explicit empty fields remain incomplete choices.
  const activity = value.activity ?? "unsure", frequency = value.frequency ?? "unsure", mode = value.mode ?? "unsure";
  if (!activities.some(item => item.id === activity) || !frequencies.some(item => item.id === frequency) || !deliveryModes.some(item => item.id === mode)) return null;
  return { context: value.context, goal: value.goal, channels: [...new Set(value.channels)], activity, frequency, mode };
}
export function encodePlan(plan: Plan) {
  const valid = validatePlan(plan);
  return valid ? `v2:${valid.context}:${valid.goal}:${valid.channels.join(",")}:${valid.activity}:${valid.frequency}:${valid.mode}` : "";
}
export function decodePlan(raw: string | null): Plan | null {
  if (!raw || raw.length > 200) return null;
  const parts = raw.split(":");
  if (parts.length === 3) return validatePlan({ context: parts[0], goal: parts[1], channels: parts[2].split(",") });
  if (parts.length !== 7 || parts[0] !== "v2") return null;
  return validatePlan({ context: parts[1], goal: parts[2], channels: parts[3].split(","), activity: parts[4], frequency: parts[5], mode: parts[6] });
}
export function describePlan(plan: Plan, t: (source: string, values?: Record<string, string | number>) => string = (source, values) => source.replace(/\{(\w+)\}/g, (token, name) => String(values?.[name] ?? token))) {
  const valid = validatePlan(plan);
  if (!valid) return null;
  const context = contexts.find(c => c.id === valid.context)!;
  const goal = goals.find(g => g.id === valid.goal)!;
  const selected = channels.filter(c => valid.channels.includes(c.id));
  const activity = activities.find(item => item.id === valid.activity)!;
  const frequency = frequencies.find(item => item.id === valid.frequency)!;
  const mode = deliveryModes.find(item => item.id === valid.mode)!;
  let recommendation: { title: string; lead: string; value: string; image: string; subject: string } = context;
  if (activity.id === "film") recommendation = contexts[0];
  else if (activity.id === "livestream") recommendation = context.id === "sports" ? contexts[1] : contexts[2];
  else if (activity.id === "event") recommendation = mode.id === "online" || mode.id === "hybrid" ? contexts[2] : contexts[3];
  else if (activity.id === "webinar") recommendation = { title: "Viden, man kan følge med i.", lead: "Et webinar med klar struktur, god lyd og plads til jeres faglighed.", value: "Optagelsen kan blive til korte faglige klip og materiale til jeres vidensbank.", image: "/photos/studie_pre.jpg", subject: "Livestream" };
  return {
    context, goal, selected, activity, frequency, mode, recommendation,
    message: [
      t("Hej Bagved,"),
      t("Vi er {context}, og vi vil gerne {goal}.", { context: t(context.label), goal: t(goal.label) }),
      t("Vi planlægger {activity} {frequency}, og formatet er {mode}.", { activity: t(activity.label), frequency: t(frequency.label), mode: t(mode.label) }),
      t("Vi vil gerne tale om denne idé:"), t(recommendation.lead),
      t(frequency.note), t(mode.note),
      t("Vi vil bruge indholdet på: {channels}.", { channels: selected.map(c => t(c.label)).join(", ") }),
      selected.map(c => `- ${t(c.output)}`).join("\n"),
      t("Lad os finde ud af, hvad der passer til vores rammer."),
    ].join("\n\n"),
  };
}
export function planContactHref(plan: Plan) {
  const result = describePlan(plan);
  if (!result) return "/contact#kontaktformular";
  const params = new URLSearchParams({ subject: result.recommendation.subject, idea: encodePlan(plan) });
  return `/contact?${params.toString()}#kontaktformular`;
}
