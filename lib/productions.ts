import { SPORTS } from "./features";

export type ProductionVideo = { src: string; title: string; kind?: "embed" | "file" };

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
  video?: ProductionVideo;
};

// Production formats, not attributed customer projects. Add approved client work separately.
export const productions: Production[] = [
  {
    id: "livestream", category: "live", title: "Livestream", headline: "Livestream af events og konferencer.",
    image: "/photos/Livestream.jpg", subject: "Livestream",
    intro: "En livestream af jeres event, konference eller lancering med flere kameraer, lyd og grafik. Publikum kan følge med online, mens arrangementet finder sted.",
    challenge: "Hvordan giver man deltagere på afstand en oplevelse, der er lige så nærværende som den i lokalet?",
    approach: "Vi kan planlægge kameravinkler, lyd, grafik og afvikling som én samlet udsendelse. Sammen finder vi den platform og det format, der passer til dit publikum.",
    deliverables: ["En liveudsendelse med flere kameravinkler", "En optagelse til efterfølgende visning", "Udvalgte klip til hjemmeside og sociale medier"],
  },
  ...(SPORTS === "yes" ? [{
    id: "sportsbroadcast", category: "live" as const, title: "Sportsbroadcast", headline: "Sportsproduktion til broadcast og livestream.",
    image: "/photos/sportsbroadcast.jpg", subject: "Sportsbroadcast",
    intro: "En sportsproduktion til broadcast, livestream eller storskærm. Vi kan vise konkurrencer, kampe og atletikstævner til seere hjemme og publikum på stedet.",
    challenge: "Hvordan gør man en sportsbegivenhed tilgængelig for dem, der ikke kan være på tribunen?",
    approach: "Vi kan samle flerkamera, kommentatorlyd og relevant grafik i et broadcast-setup tilpasset jeres rammer. Highlights og interviews tænkes ind fra starten.",
    deliverables: ["Livestream med overblik og nærbilleder", "Highlights og korte spillerinterviews", "Klip og fotos til klubbens egne kanaler"],
  }] : []),
  {
    id: "webinar-studieproduktion", category: "live", title: "Webinar & studie", headline: "Webinarer og studieproduktion.",
    image: "/photos/studie_pre.jpg", subject: "Livestream",
    intro: "Webinarer, præsentationer og samtaler optaget i studie eller sendt live. Formatet kan rumme oplæg, interviews og flere medvirkende.",
    challenge: "Hvordan deler man viden digitalt uden at miste publikums opmærksomhed?",
    approach: "Vi kan hjælpe med struktur, framing, lyd og afvikling, så oplæg, præsentationer og samtaler fungerer på skærmen. Materialet kan planlægges til genbrug bagefter.",
    deliverables: ["Et afviklet webinar eller en studieoptagelse", "En fuld optagelse til jeres vidensbank", "Korte faglige klip til deling"],
  },
  {
    id: "virksomhedsvideo", category: "film", title: "Virksomhedsfilm", headline: "Virksomhedsfilm til web og præsentation.",
    image: "/photos/virksomhedsfilm.jpg", subject: "Virksomhedsvideo",
    intro: "En virksomhedsfilm med interviews, hverdagsbilleder og produkter. Brug filmen til at præsentere virksomheden på hjemmesiden, i salg eller over for kommende kolleger.",
    challenge: "Hvordan gør man virksomhedens værdi konkret på kort tid?",
    approach: "Sammen kan vi finde fortællingen og vælge de situationer, der viser den. Vi kan samle interviews, hverdag og produkter i en film med en klar retning.",
    deliverables: ["En hovedfilm til hjemmeside eller præsentation", "Kortere versioner til sociale medier", "Stillbilleder fra den aftalte produktion"],
  },
  {
    id: "eventvideo", category: "event", title: "Eventfilm", headline: "Eventfilm, highlights og interviews.",
    image: "/photos/eventfilm.jpg", subject: "Eventvideo",
    intro: "En eventfilm med stemningsbilleder, highlights og korte interviews. Materialet kan bruges som tilbageblik, på sociale medier og til at invitere til næste arrangement.",
    challenge: "Hvordan giver man et event værdi, efter de sidste gæster er gået hjem?",
    approach: "Vi kan planlægge interviews, stemningsbilleder og highlights ud fra det, I vil bruge materialet til bagefter. På den måde arbejder optagelserne videre i flere formater.",
    deliverables: ["En stemningsfilm eller et samlet tilbageblik", "Korte klip til invitationer og sociale medier", "Eventfotos til web, presse eller nyhedsbreve"],
  },
  {
    id: "eventteknik", category: "event", title: "Lyd, lys & afvikling", headline: "Lyd, lys og teknik til events.",
    image: "/photos/lys_lyd_pre.jpg", subject: "Eventteknik",
    intro: "Lyd, lys og billedafvikling til events, konferencer og hybride arrangementer. Vi kan planlægge teknikken og koordinere afviklingen på dagen.",
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
