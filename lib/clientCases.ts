import type { ProductionVideo } from "./productions";

export type ClientCase = {
  id: string; category: "live" | "film" | "event"; title: string; subtitle: string;
  image: string; partner: string | null; client: string; intro: string; role: string;
  deliverables: string[]; subject: string; featured?: boolean; video?: ProductionVideo;
  illustrative?: boolean;
};

// Project facts supplied by the owner. Generic images remain labelled as illustrations.
export const clientCases: ClientCase[] = [
  {
    id: "cag-2025", category: "live", title: "Atletik stævne til Broadcast og Storskærm", subtitle: "CAG 2025 · Østerbro Stadion",
    featured: true, illustrative: true,
    image: "/photos/sportsbroadcast.jpg", partner: "Sports Productions", client: "CAG 2025",
    intro: "Broadcast og storskærmsproduktion fra atletikstævnet CAG 2025 på Østerbro Stadion. Produceret i samarbejde med Sports Productions.",
    role: "Bagved deltog i produktionen til broadcast og storskærm i samarbejde med Sports Productions.",
    deliverables: ["Broadcast af atletikstævnet", "Billedproduktion til stadionets storskærm"], subject: "Sportsbroadcast",
  },
  {
    id: "finansforbundet-nytaarskur", category: "event", title: "Nytårskur for Finansforbundet", subtitle: "Eventproduktion · I samarbejde med Moot Agency",
    image: "/photos/eventfilm.jpg", partner: "Moot Agency", client: "Finansforbundet",
    intro: "En nytårskur for Finansforbundet. Bagved deltog i produktionen i samarbejde med Moot Agency.",
    role: "Deltagelse i produktionen i samarbejde med Moot Agency.",
    deliverables: [], subject: "Eventteknik",
  },
  {
    id: "is-nordic", category: "film", title: "IS Nordic", subtitle: "Virksomhedsfilm & hjemmesidelayout",
    image: "/photos/virksomhedsfilm.jpg", partner: null, client: "IS Nordic",
    intro: "Virksomhedsvideo og hjemmesidelayout for IS Nordic. Et projekt med både levende billeder og virksomhedens digitale præsentation.",
    role: "Virksomhedsvideo og hjemmesidelayout.",
    deliverables: ["Virksomhedsvideo", "Hjemmesidelayout"], subject: "Virksomhedsvideo",
  },
];
