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

## Kundecases og egne videofiler

`lib/examples.ts` samler de udvalgte kundecases (`featured: true` i
`lib/clientCases.ts`) og produktionsformaterne til én fælles liste. Forsidens hjul
og den lille, udfoldelige oversigt på Eksempler bruger den samme rækkefølge og
samme tekster. De øvrige kundecases kan stadig have egne detaljesider uden at
blive fremhævet automatisk.

En godkendt MP4/WebM-fil kan tilføjes på en case eller et produktionsformat som
`video: { kind: "file", src: "https://…/video.mp4", title: "…" }`. Afspilleren
bruger browserens egne kontroller, `playsInline` og `preload="none"`, uden autoplay
eller en ekstern video-iframe. URL'en skal være en tilgængelig videofil, ikke en
Creative Cloud-side, der kræver login. Vælg et rigtigt stillbillede fra produktionen
som `image`, og sæt `illustrative: false`, når billedet faktisk dokumenterer casen.
Bevar illustrationsmærkningen, så længe der bruges et generisk formatbillede.

## Forsidens automatiske video

`VideoPeek` bruger `HomepageVideo` til en direkte videofil i stedet for en
TwentyThree-iframe. Angiv den godkendte direkte MP4/WebM-URL i
`NEXT_PUBLIC_HOMEPAGE_VIDEO_URL` før build. Uden en URL vises det eksisterende
stillbillede; der opfindes ikke en filadresse til en upload, der ikke er tilgængelig.

Afspilningen er uden lyd, i loop og inline på mobil. Afspilleren har native
kontroller og forsøger automatisk afspilning, når den kommer ind i skærmbilledet.
Skjulte mobil/desktop-placeringer får først en kilde, når de bliver synlige;
afspilning pauser uden for skærmen og i en skjult browserfane. Reduceret bevægelse
slår automatisk afspilning fra, men manuel afspilning er stadig mulig. Browserens
autoplayregler kan også kræve manuel start. Bevar originalen uden for Git og
vurder opløsning, bitrate og codec på det faktiske materiale, før webversionen
produceres. Et stillbillede fra den konkrete video kan erstatte den generiske
poster, når filen er tilgængelig.
