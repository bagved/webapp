// app/cases/page.tsx
import Link from "next/link";

type CategoryId = "livestream" | "events" | "reklamefilm" | "markedsfoering";

type CaseItem = {
  id: string;
  category: CategoryId;
  title: string;
  body: string;
  image: string;
};

const categories: { id: CategoryId; label: string }[] = [
  { id: "livestream", label: "Livestream" },
  { id: "events", label: "Events" },
  { id: "reklamefilm", label: "Reklamefilm" },
  { id: "markedsfoering", label: "Markedsføring" },
];

const cases: CaseItem[] = [
  {
    id: "livestream-personalemoede",
    category: "livestream",
    title: "Livestream af personalemøde",
    body:
      "Skarp afvikling med ro i rummet. Multi-cam, lyd der sidder, og et udtryk der føles dyrt — uden at stjæle fokus fra indholdet.",
    image: "/cases/livestream-1.jpg",
  },
  {
    id: "livestream-konference",
    category: "livestream",
    title: "Hybrid konference med publikumsflow",
    body:
      "Vi binder scene, storskærm og stream sammen, så formatet føles som én produktion — ikke to parallelle løsninger.",
    image: "/cases/livestream-2.jpg",
  },
  {
    id: "events-awards",
    category: "events",
    title: "Awards / sceneshow med timing",
    body:
      "Lys, lyd og cues styres stramt, så oplevelsen lander præcist. Setup der ser clean ud og fungerer stabilt hele vejen.",
    image: "/cases/events-1.jpg",
  },
  {
    id: "events-townhall",
    category: "events",
    title: "Townhall med storskærm og talkback",
    body:
      "Tryg afvikling for talere og teknik. Vi sørger for struktur, redundans og en rolig produktion fra start til slut.",
    image: "/cases/events-2.jpg",
  },
  {
    id: "reklamefilm-hero",
    category: "reklamefilm",
    title: "Reklamefilm med hero-look",
    body:
      "Cinematisk lys, tight pacing og lyd der føles premium. Leveret i formater til både kampagne og SoMe.",
    image: "/cases/reklamefilm-1.jpg",
  },
  {
    id: "reklamefilm-case",
    category: "reklamefilm",
    title: "Casefilm med fokus på detaljen",
    body:
      "Enkelt, elegant og let at forstå. Vi bygger historien så den fungerer både som længere film og som klip til kanalerne.",
    image: "/cases/reklamefilm-2.jpg",
  },
  {
    id: "markedsfoering-contentsystem",
    category: "markedsfoering",
    title: "Content-system til løbende output",
    body:
      "Én produktion → mange assets. Konsekvent stil, mindre friktion, og et udtryk der holder på tværs af platforme.",
    image: "/cases/markedsfoering-1.jpg",
  },
  {
    id: "markedsfoering-kampagne",
    category: "markedsfoering",
    title: "Kampagnepakke med flere leverancer",
    body:
      "Vi planlægger, producerer og leverer i en samlet pipeline — så du får både kvalitet og tempo uden at gå på kompromis.",
    image: "/cases/markedsfoering-2.jpg",
  },
];

function labelFor(cat: CategoryId) {
  return categories.find((c) => c.id === cat)?.label ?? cat;
}

export default function CasesPage() {
  return (
    <main className="casesPage" aria-label="Eksempler">
      <style>{css}</style>

      {/* TOP: Explorer layout (like the FAQ image) */}
      <section className="explore" aria-label="Udforsk">
        <div className="container">
          <h1 className="exploreTitle">
            Udforsk vores udvalg af produktioner her
          </h1>

          <div className="exploreGrid">
            {/* LEFT: Categories */}
            <aside className="cats" aria-label="Kategorier">
              <nav className="catNav">
                {categories.map((c, idx) => (
                  <a
                    key={c.id}
                    href={`#cat-${c.id}`}
                    className={`catLink ${idx === 0 ? "isActive" : ""}`}
                  >
                    {c.label}
                  </a>
                ))}
              </nav>
            </aside>

            {/* RIGHT: Title list (like FAQ lines) */}
            <div className="list" aria-label="Produktioner">
              {categories.map((c) => {
                const group = cases.filter((x) => x.category === c.id);
                return (
                  <section key={c.id} id={`cat-${c.id}`} className="listGroup">
                    <div className="groupHeader">
                      <div className="groupLabel">{labelFor(c.id)}</div>
                    </div>

                    <div className="rows">
                      {group.map((it) => (
                        <a key={it.id} className="row" href={`#case-${it.id}`}>
                          <div className="rowText">{it.title}</div>
                          <div className="rowIcon" aria-hidden>
                            +
                          </div>
                          <div className="rowLine" aria-hidden />
                        </a>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CASES: Alternating image/text blocks (like "Vi tilbyder" image) */}
      <section className="examples" aria-label="Eksempler">
        <div className="container">
          <div className="examplesGrid">
            {cases.map((it) => (
              <article key={it.id} id={`case-${it.id}`} className="exRow">
                <div className="exMedia" aria-hidden>
                  <div
                    className="exImg"
                    style={{ backgroundImage: `url(${it.image})` }}
                  />
                </div>

                <div className="exCopy">
                  <div className="exKicker">{labelFor(it.category)}</div>
                  <h2 className="exTitle">{it.title}</h2>
                  <p className="exBody">{it.body}</p>

                  <div className="exCtaRow">
                    <Link className="exCta" href="/contact">
                      Kontakt os →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const css = `
.casesPage{
  background: transparent;
}

/* --------- EXPLORE (FAQ-style) --------- */
.explore{
  padding: clamp(60px, 7vw, 92px) 0 clamp(40px, 5vw, 62px);
}

.exploreTitle{
  margin: 0;
  font-family: var(--font-heading);
  font-weight: 350;
  letter-spacing: -0.02em;
  line-height: 1.18;
  font-size: clamp(22px, 2.8vw, 38px);
  color: color-mix(in srgb, var(--c1) 92%, transparent);
}

.exploreGrid{
  margin-top: clamp(28px, 4.6vw, 54px);
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: clamp(22px, 4vw, 60px);
  align-items: start;
}

/* Left categories */
.cats{
  position: relative;
}
.catNav{
  display: grid;
  gap: 18px;
  padding-top: 8px;
}
.catLink{
  font-size: var(--t14);
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--c1) 72%, transparent);
  display: inline-block;
  width: fit-content;
  border-bottom: 1px solid transparent;
  padding-bottom: 6px;
  transition: color 160ms ease, border-color 160ms ease, opacity 160ms ease;
  opacity: 0.95;
}
.catLink:hover{
  color: var(--c3);
  border-bottom-color: color-mix(in srgb, var(--c3) 22%, transparent);
  opacity: 1;
}
.catLink.isActive{
  color: var(--c3);
  border-bottom-color: color-mix(in srgb, var(--c3) 26%, transparent);
}

/* Right list */
.list{
  display: grid;
  gap: 30px;
}

.listGroup{
  scroll-margin-top: 120px;
}

.groupHeader{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 0 10px;
}
.groupLabel{
  font-size: var(--t11);
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--c1) 55%, transparent);
}

.rows{
  display: grid;
  gap: 0;
}

.row{
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 14px;

  padding: 18px 0 18px;
  color: inherit;
  text-decoration: none;
}

.rowText{
  font-size: var(--t16);
  font-weight: 500;
  letter-spacing: -0.01em;
  color: color-mix(in srgb, var(--c1) 88%, transparent);
  line-height: 1.35;
}

.rowIcon{
  font-size: 18px;
  font-weight: 700;
  color: color-mix(in srgb, var(--c1) 62%, transparent);
  transform: translateY(-1px);
}

.rowLine{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: color-mix(in srgb, var(--c1) 16%, transparent);
}

.row:hover .rowText{
  color: color-mix(in srgb, var(--c3) 46%, var(--c1));
}
.row:hover .rowIcon{
  color: var(--c3);
}

/* --------- EXAMPLES (alternating like "Vi tilbyder") --------- */
.examples{
  padding: clamp(38px, 5vw, 62px) 0 clamp(80px, 9vw, 120px);
}

.examplesGrid{
  display: grid;
  gap: clamp(28px, 4.6vw, 54px);
}

.exRow{
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: clamp(22px, 4vw, 54px);
  align-items: stretch;
}

/* alternate image side */
.exRow:nth-child(even){
  grid-template-columns: 1fr 1.35fr;
}
.exRow:nth-child(even) .exMedia{
  order: 2;
}
.exRow:nth-child(even) .exCopy{
  order: 1;
}

/* Media */
.exMedia{
  position: relative;
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--c1) 14%, transparent);
  overflow: hidden;
  background: transparent;
  min-height: clamp(260px, 32vw, 420px);
}

.exImg{
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: saturate(1.02) contrast(1.02);
}

/* Copy */
.exCopy{
  padding: clamp(10px, 2vw, 22px) 0;
  display: grid;
  align-content: start;
}

.exKicker{
  font-size: var(--t11);
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--c1) 58%, transparent);
}

.exTitle{
  margin: 12px 0 0;
  font-family: var(--font-heading);
  font-weight: 350;
  letter-spacing: -0.02em;
  line-height: 1.12;
  font-size: clamp(24px, 3.2vw, 44px);
  color: color-mix(in srgb, var(--c1) 92%, transparent);
}

.exBody{
  margin: 14px 0 0;
  font-size: var(--t16);
  line-height: 1.75;
  color: color-mix(in srgb, var(--c1) 72%, transparent);
  max-width: 62ch;
}

.exCtaRow{
  margin-top: 22px;
}

.exCta{
  font-size: var(--t11);
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--c1);
  opacity: 0.86;
  border-bottom: 1px solid color-mix(in srgb, var(--c1) 18%, transparent);
  padding-bottom: 8px;
  width: fit-content;
}
.exCta:hover{
  opacity: 1;
  color: var(--c3);
  border-bottom-color: color-mix(in srgb, var(--c3) 22%, transparent);
}

/* --------- Responsive --------- */
@media (max-width: 980px){
  .exploreGrid{
    grid-template-columns: 1fr;
  }
  .catNav{
    grid-auto-flow: column;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px 18px;
    padding-top: 0;
  }
  .exRow,
  .exRow:nth-child(even){
    grid-template-columns: 1fr;
  }
  .exRow:nth-child(even) .exMedia,
  .exRow:nth-child(even) .exCopy{
    order: initial;
  }
}
`;
