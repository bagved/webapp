# Sprog: dansk, engelsk og tysk

Alle tre sprog bruger de samme React-komponenter, produktionsdata, formularer,
cookiekontroller og animationer. Layout- og funktionsændringer gælder derfor
alle sprogene uden separate kopier af siderne.

## Ret tekster

Dansk er kildesproget. Synlig tekst og tilgængelighedstekst gengives med `t(...)`
fra `useI18n()`. Oversættelserne står samlet i `messages.json`: den danske tekst
er nøglen, og `en` og `de` er de to oversættelser. Produktionsindhold forbliver i
`lib/productions.ts`, `lib/productionPlan.ts` og `lib/clientCases.ts`; det oversættes
ved visningen. ID'er, formularværdier, ruter og kundernes egne indtastninger
oversættes ikke.

1. Ret den danske tekst i komponenten eller produktionsdataene.
2. Ret den samme nøgle og de engelske/tyske tekster i `messages.json`.
3. Kør `npm run check:translations` og `npm run build`.

Kontrollen køres automatisk før hvert build. Nye eller ændrede danske tekster
uden oversættelse samt manglende `{placeholder}`-værdier stopper buildet.
I udvikling falder en manglende oversættelse tilbage til den aktuelle danske
tekst. Oversættelserne er redigerbare tekster; der sendes ikke indhold eller
kundeoplysninger til en ekstern oversættelsestjeneste. En dansk tekstændring
kræver opdaterede oversættelser, før den kan udgives.

For dynamiske tekster bruges hele sætninger med navngivne pladsholdere:
`t("Vis {title}", { title: t(item.title) })`. Lad mellemrum mellem inline-ord
blive i kildeteksten eller som `{" "}` i JSX. Oversæt en hel sætning før en
skrivemaskineanimation begynder at vise enkelte tegn.

## Sprogvalg og links

`LanguageProvider` deler sproget på tværs af siden. Headeren og den åbne menu
bruger samme `LanguageSelect`. `?lang=da`, `?lang=en` eller `?lang=de` vælger sprog
ved indlæsning. Sprogvalget huskes lokalt ved en bevidst ændring. Blokerer browseren
lagring, fungerer URL-valget fortsat. `LocalizedLink` viderefører engelsk/tysk
sprogvalg i interne links uden at miste formularparametre eller ankre og
videresender refs til det faktiske link.

Sprogskift ændrer ikke cookievalg, formularinput eller behovsvælgerens stabile
valg. Et nyt idéoplæg dannes på det valgte sprog, når kontaktformularen åbnes;
efterfølgende sprogskift overskriver ikke besøgendes besked.

Denne løsning bevarer de eksisterende ruter og statiske danske HTML-sider.
Oversatte tekster, dokumenttitel og `html[lang]` opdateres i React efter indlæsning.
Den tilføjer ikke særskilte SEO-ruter eller serverrenderede engelske/tyske sider.

## Specifikke casevideoer

`Production.video` i `lib/productions.ts` kan få `{ src, title }` med den godkendte
embed-URL og videotitel. `ProductionMedia` viser casens billede, indtil dette
felt findes. En specifik video indlæses først efter klik. Cases bruger ikke
længere den fælles showreel som erstatning for en endnu ikke tilføjet casevideo.
