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
export type Plan = { context: string; goal: string; channels: string[] };
export const defaultPlan: Plan = { context: "hybrid", goal: "awareness", channels: ["website", "linkedin"] };
export function validatePlan(value: Plan): Plan | null {
  if (!contexts.some(c => c.id === value.context) || !goals.some(g => g.id === value.goal)) return null;
  if (!value.channels.length || value.channels.length > channels.length || !value.channels.every(id => channels.some(c => c.id === id))) return null;
  return { context: value.context, goal: value.goal, channels: [...new Set(value.channels)] };
}
export function encodePlan(plan: Plan) {
  return `${plan.context}:${plan.goal}:${plan.channels.join(",")}`;
}
export function decodePlan(raw: string | null): Plan | null {
  if (!raw || raw.length > 200) return null;
  const parts = raw.split(":");
  if (parts.length !== 3) return null;
  return validatePlan({ context: parts[0], goal: parts[1], channels: parts[2].split(",") });
}
export function describePlan(plan: Plan) {
  const valid = validatePlan(plan);
  if (!valid) return null;
  const context = contexts.find(c => c.id === valid.context)!;
  const goal = goals.find(g => g.id === valid.goal)!;
  const selected = channels.filter(c => valid.channels.includes(c.id));
  return {
    context, goal, selected,
    message: `Hej Bagved,\n\nVi er ${context.label}, og vi vil gerne ${goal.label}.\n\nVi vil gerne tale om denne idé:\n${context.lead}\n\nVi vil bruge indholdet på: ${selected.map(c => c.label).join(", ")}.\n${selected.map(c => `- ${c.output}`).join("\n")}\n\nLad os finde ud af, hvad der passer til vores rammer.`,
  };
}
export function planContactHref(plan: Plan) {
  const result = describePlan(plan);
  if (!result) return "/contact#kontaktformular";
  const params = new URLSearchParams({ subject: result.context.subject, idea: encodePlan(plan) });
  return `/contact?${params.toString()}#kontaktformular`;
}
