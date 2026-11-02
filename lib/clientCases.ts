// Project facts supplied by the owner. Images illustrate formats; they are not project documentation.
export const clientCases = [
  {
    id: "cag-2025", category: "live", title: "CAG 2025", subtitle: "Østerbro Stadion · Livestream & storskærm",
    image: "/photos/sportsbroadcast.jpg", partner: "Sports Productions", client: "CAG 2025",
    intro: "Livestream og storskærm ved CAG 2025 på Østerbro Stadion. Opgaven blev gennemført i samarbejde med Sports Productions.",
    role: "Livestream og storskærm i samarbejde med Sports Productions.",
    deliverables: ["Livestream", "Storskærm"], subject: "Sportsbroadcast",
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
] as const;
