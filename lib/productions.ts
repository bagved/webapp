import { SPORTS } from "./features";

export type Production = {
  id: string;
  category: "live" | "film" | "event";
  title: string;
  headline: string;
  image: string;
  intro: string;
  challenge: string;
  approach: string;
  deliverables: string[];
  subject: string;
  // Add each approved case-specific embed here. With no video, show its image.
  video?: { src: string; title: string };
};

// Production formats, not attributed customer projects. Add approved client work separately.
export const productions: Production[] = [
  {
    id: "livestream", category: "live", title: "Livestream", headline: "Giv dit event en større scene.",
    image: "/photos/Livestream.jpg", subject: "Livestream",
    intro: "En oplevelse, der rækker ud over lokalet. Saml dit publikum om oplæg, lanceringer og samtaler – uanset hvor de sidder.",
    challenge: "Hvordan giver man deltagere på afstand en oplevelse, der er lige så nærværende som den i lokalet?",
    approach: "Vi kan planlægge kameravinkler, lyd, grafik og afvikling som én samlet udsendelse. Sammen finder vi den platform og det format, der passer til dit publikum.",
    deliverables: ["En liveudsendelse med flere kameravinkler", "En optagelse til efterfølgende visning", "Udvalgte klip til hjemmeside og sociale medier"],
  },
  ...(SPORTS === "yes" ? [{
    id: "sportsbroadcast", category: "live" as const, title: "Sportsbroadcast", headline: "Helt tæt på. Også fra sidelinjen.",
    image: "/photos/sportsbroadcast.jpg", subject: "Sportsbroadcast",
    intro: "Lad flere følge med i kampen. En sportsproduktion kan samle fans, skabe synlighed for klubben og give indhold til dagene efter.",
    challenge: "Hvordan gør man en sportsbegivenhed tilgængelig for dem, der ikke kan være på tribunen?",
    approach: "Vi kan samle flerkamera, kommentatorlyd og relevant grafik i et broadcast-setup tilpasset jeres rammer. Highlights og interviews tænkes ind fra starten.",
    deliverables: ["Livestream med overblik og nærbilleder", "Highlights og korte spillerinterviews", "Klip og fotos til klubbens egne kanaler"],
  }] : []),
  {
    id: "webinar-studieproduktion", category: "live", title: "Webinar & studie", headline: "Store idéer. Helt uden afstand.",
    image: "/photos/studie_pre.jpg", subject: "Livestream",
    intro: "Gør faglig viden til noget, man har lyst til at følge med i. Fra den korte præsentation til en længere samtale med flere medvirkende.",
    challenge: "Hvordan deler man viden digitalt uden at miste publikums opmærksomhed?",
    approach: "Vi kan hjælpe med struktur, framing, lyd og afvikling, så oplæg, præsentationer og samtaler fungerer på skærmen. Materialet kan planlægges til genbrug bagefter.",
    deliverables: ["Et afviklet webinar eller en studieoptagelse", "En fuld optagelse til jeres vidensbank", "Korte faglige klip til deling"],
  },
  {
    id: "virksomhedsvideo", category: "film", title: "Virksomhedsfilm", headline: "Vis, hvad der gør jer til jer.",
    image: "/photos/virksomhedsfilm.jpg", subject: "Virksomhedsvideo",
    intro: "Mennesker, faglighed og det, I tror på. En film kan gøre det lettere for kunder og kommende kolleger at forstå, hvem I er.",
    challenge: "Hvordan gør man virksomhedens værdi konkret på kort tid?",
    approach: "Sammen kan vi finde fortællingen og vælge de situationer, der viser den. Vi kan samle interviews, hverdag og produkter i en film med en klar retning.",
    deliverables: ["En hovedfilm til hjemmeside eller præsentation", "Kortere versioner til sociale medier", "Stillbilleder fra den aftalte produktion"],
  },
  {
    id: "eventvideo", category: "event", title: "Eventfilm", headline: "Lad øjeblikket leve videre.",
    image: "/photos/eventfilm.jpg", subject: "Eventvideo",
    intro: "Stemningen, menneskene og de små øjeblikke. Brug indholdet fra dit event til mere end en enkelt dag.",
    challenge: "Hvordan giver man et event værdi, efter de sidste gæster er gået hjem?",
    approach: "Vi kan planlægge interviews, stemningsbilleder og highlights ud fra det, I vil bruge materialet til bagefter. På den måde arbejder optagelserne videre i flere formater.",
    deliverables: ["En stemningsfilm eller et samlet tilbageblik", "Korte klip til invitationer og sociale medier", "Eventfotos til web, presse eller nyhedsbreve"],
  },
  {
    id: "eventteknik", category: "event", title: "Lyd, lys & afvikling", headline: "Du er til stede. Vi er bagved.",
    image: "/photos/lys_lyd_pre.jpg", subject: "Eventteknik",
    intro: "Et samlet teknisk overblik giver mere plads til indholdet. Fra de første planer til det sidste punkt på programmet.",
    challenge: "Hvordan samler man lyd, lys og billede, så de understøtter arrangementet?",
    approach: "Vi kan afstemme teknik, lokation og program i god tid og koordinere afviklingen. Et hybridformat kan kombinere oplevelsen i rummet med en udsendelse til deltagere online.",
    deliverables: ["Et teknisk setup tilpasset lokalet og programmet", "Koordineret lyd, lys og billedafvikling", "Mulighed for streaming og dokumentation"],
  },
];

export const productionCategories = [
  { id: "all", label: "Alle formater" },
  { id: "live", label: "Live & broadcast" },
  { id: "film", label: "Film & fortælling" },
  { id: "event", label: "Events & oplevelser" },
] as const;

export const legacyCategory: Record<string, string> = {
  "live-broadcast": "live", "virksomhedsfilm-reklame": "film", "sociale-medier": "film",
  "eventvideo-eventteknik": "event", "foto-drone": "film",
};
