"use client";

import { useEffect, useState } from "react";

type CategoryId =
  | "live-broadcast"
  | "virksomhedsfilm-reklame"
  | "sociale-medier"
  | "eventvideo-eventteknik"
  | "foto-drone";

type CaseItem = {
  id: string;
  category: CategoryId;
  title: string;
  body: string;
  image: string;
  contactSubject: string;
};

const categories: { id: CategoryId; label: string }[] = [
  { id: "live-broadcast",          label: "Live & broadcast" },
  { id: "virksomhedsfilm-reklame", label: "Virksomhedsfilm & reklame" },
  { id: "sociale-medier",          label: "Sociale medier" },
  { id: "eventvideo-eventteknik",  label: "Eventvideo & eventteknik" },
  { id: "foto-drone",              label: "Foto & drone" },
];

const allCases: CaseItem[] = [
  {
    id: "livestream",
    category: "live-broadcast",
    title: "Livestream",
    body: "Stabil livestream med professionel afvikling til events, oplæg og digitale produktioner. Vi sikrer et roligt setup, god lyd og en udsendelse, der fungerer fra start til slut.",
    image: "/photos/Livestream.jpg",
    contactSubject: "Livestream",
  },
  {
    id: "sportsbroadcast",
    category: "live-broadcast",
    title: "Sportsbroadcast",
    body: "Flerkameraproduktion til sport med fokus på flow, timing og et klart broadcast-udtryk. En løsning, der gør det let at følge begivenheden – både på location og online.",
    image: "/photos/sportsbroadcast.jpg",
    contactSubject: "Sportsbroadcast",
  },
  {
    id: "webinar-studieproduktion",
    category: "live-broadcast",
    title: "Webinar & studieproduktion",
    body: "Webinarer og studieopsætninger i kontrollerede rammer, hvor teknik, framing og lyd går op i en højere enhed. Velegnet til præsentationer, undervisning og intern kommunikation.",
    image: "/photos/studie_pre.jpg",
    contactSubject: "Livestream",
  },
  // { id: "reklamefilm", category: "virksomhedsfilm-reklame", title: "Reklamefilm", body: "...", image: "/photos/virksomhedsfilm.jpg" },
  {
    id: "virksomhedsvideo",
    category: "virksomhedsfilm-reklame",
    title: "Virksomhedsvideo",
    body: "Video, der præsenterer virksomheden professionelt og troværdigt. Ideel til hjemmeside, employer branding, salgsarbejde og præsentation af kultur, ydelser eller værdier.",
    image: "/photos/virksomhedsfilm.jpg",
    contactSubject: "Virksomhedsvideo",
  },
  // { id: "produktvideo", category: "virksomhedsfilm-reklame", title: "Produktvideo", body: "...", image: "/photos/produktfilm.jpg" },
  // { id: "sociale-medier", category: "sociale-medier", title: "Video til sociale medier", body: "...", image: "/photos/eventfilm.jpg" },
  {
    id: "eventvideo",
    category: "eventvideo-eventteknik",
    title: "Eventvideo",
    body: "Visuelle highlights og stemningsvideoer fra events, konferencer og arrangementer. En effektiv måde at forlænge værdien af et event og skabe indhold efterfølgende.",
    image: "/photos/eventfilm.jpg",
    contactSubject: "Eventvideo",
  },
  {
    id: "eventteknik",
    category: "eventvideo-eventteknik",
    title: "Lyd, lys & eventteknik",
    body: "Vi planlægger og leverer teknisk afvikling til events, talks og fester. Lyd, lys og AV sat op til formålet — så I har tryghed i afviklingen og kan fokusere på selve arrangementet.",
    image: "/photos/lys_lyd_pre.jpg",
    contactSubject: "Eventteknik",
  },
  // { id: "drone", category: "foto-drone", title: "Dronevideo & dronebilleder", body: "...", image: "/photos/sports_pre.jpg" },
  // { id: "stillfoto", category: "foto-drone", title: "Stillfoto & billedredigering", body: "...", image: "/photos/produktfilm.jpg" },
];

function labelFor(cat: CategoryId) {
  return categories.find((c) => c.id === cat)?.label ?? cat;
}

export default function CasesPage() {
  const [openCat, setOpenCat] = useState<CategoryId | null>(null);

  const scrollTo = (id: string, delay = 50) => {
    setTimeout(() => {
      document.getElementById(`case-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, delay);
  };

  const scrollToCat = (catId: string, delay = 380) => {
    setTimeout(() => {
      document.getElementById(`cat-${catId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, delay);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("cat") as CategoryId | null;
    const caseId = params.get("case");

    if (caseId) {
      const hit = allCases.find(c => c.id === caseId);
      if (hit) {
        setOpenCat(hit.category);
        scrollTo(caseId, 380);
      }
    } else if (cat) {
      setOpenCat(cat);
      scrollToCat(cat);
    }
  }, []);

  return (
    <main className="casesPage" aria-label="Eksempler">
      <style>{css}</style>

      {/* Top section */}
      <section className="explore">
        <div className="container topBar">
          <h1 className="pageTitle">Vores produktioner</h1>
          <p className="pageHint">Et udvalg af projekter vi har arbejdet på.</p>

          <div className="catList">
            {categories.map((cat) => {
              const items = allCases.filter((c) => c.category === cat.id);
              if (items.length === 0) return null;
              const isOpen = openCat === cat.id;
              return (
                <div key={cat.id} id={`cat-${cat.id}`} className={`catRow ${isOpen ? "isOpen" : ""}`}>
                  <button
                    type="button"
                    className="catBtn"
                    onClick={() => setOpenCat(isOpen ? null : cat.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="catBtnLabel">{cat.label}</span>
                    <span className="catBtnChevron" aria-hidden>{isOpen ? "−" : "+"}</span>
                  </button>

                  <div className="catSub">
                    <div className="catSubInner">
                      {items.map((it) => (
                        <button
                          key={it.id}
                          type="button"
                          className="subLink"
                          onClick={() => scrollTo(it.id)}
                        >
                          {it.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="examples">
        {allCases.map((it, idx) => (
          <article
            key={it.id}
            id={`case-${it.id}`}
            className={`exRow ${idx % 2 === 1 ? "exRowAlt" : ""}`}
          >
            <div className="exMedia">
              <div className="exImg" style={{ backgroundImage: `url(${it.image})` }} />
            </div>
            <div className="exCopy">
              <div className="exKicker">{labelFor(it.category)}</div>
              <h2 className="exTitle">{it.title}</h2>
              <p className="exBody">{it.body}</p>
              <a className="exBtn" href={`/contact?subject=${encodeURIComponent(it.contactSubject)}#kontaktformular`}>Tag kontakt nu</a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

const css = `
.casesPage{}

.explore{
  padding: 0;
  min-height: calc(100svh - 56px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.topBar{
  padding-top: 96px;
  padding-bottom: clamp(32px, 4vw, 52px);
}

.pageTitle{
  margin: 0;
  font-family: var(--font-body);
  font-weight: 800;
  font-size: clamp(44px, 6.5vw, 88px);
  letter-spacing: -0.03em;
  line-height: 0.96;
  color: var(--color-primary);
}

.pageHint{
  margin: 16px 0 0;
  font-family: var(--font-body);
  font-size: clamp(14px, 1.2vw, 17px);
  line-height: 1.7;
  color: color-mix(in srgb, var(--color-text) 62%, transparent);
  max-width: 52ch;
}

/* Category list */
.catList{
  margin-top: clamp(36px, 5vw, 56px);
  border-top: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
}

.catRow{
  border-bottom: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
}

.catBtn{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: clamp(14px, 1.8vw, 22px) 0;
  background: transparent;
  border: 0;
  cursor: pointer;
  text-align: left;
}

.catBtnLabel{
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-primary);
  transition: color 140ms ease;
}
.catBtn:hover .catBtnLabel,
.catRow.isOpen .catBtnLabel{
  color: var(--color-accent);
}

.catBtnChevron{
  font-size: 20px;
  font-weight: 300;
  color: color-mix(in srgb, var(--color-primary) 35%, transparent);
  transition: color 140ms ease;
  flex-shrink: 0;
  line-height: 1;
}
.catBtn:hover .catBtnChevron,
.catRow.isOpen .catBtnChevron{
  color: var(--color-accent);
}

/* Sub-items slide */
.catSub{
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 300ms cubic-bezier(.4,0,.2,1);
  overflow: hidden;
}
.catRow.isOpen .catSub{
  grid-template-rows: 1fr;
}

.catSubInner{
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-bottom: clamp(10px, 1.4vw, 18px);
  visibility: hidden;
}
.catRow.isOpen .catSubInner{
  visibility: visible;
}

.subLink{
  appearance: none;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
  padding: 8px 0 8px 20px;
  font-family: var(--font-body);
  font-size: clamp(13px, 1.1vw, 15px);
  font-weight: 400;
  color: color-mix(in srgb, var(--color-text) 68%, transparent);
  border-left: 2px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
  transition: color 140ms ease, border-color 140ms ease;
}
.subLink:hover{
  color: var(--color-accent);
  border-left-color: var(--color-accent);
}

/* Examples — full-width split screen, image and text meet at center */
.examples{
  border-top: 1px solid color-mix(in srgb, var(--color-text) 8%, transparent);
  padding-bottom: clamp(80px, 10vw, 140px);
}

.exRow{
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: clamp(380px, 46vw, 620px);
  border-bottom: 1px solid color-mix(in srgb, var(--color-text) 8%, transparent);
}

.exRowAlt .exMedia{ order: 2; }
.exRowAlt .exCopy{ order: 1; }

/* Image fills its half completely — no gaps, no borders */
.exMedia{
  position: relative;
  overflow: hidden;
  background: color-mix(in srgb, var(--color-secondary) 8%, var(--color-bg));
}

.exImg{
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

/* Text sits in its half, padded inward from the center and from the viewport edge */
.exCopy{
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(40px, 5vw, 72px) clamp(28px, 4.5vw, 64px);
}

/* For normal rows (image left), text padding pushes away from center (left) */
.exRow:not(.exRowAlt) .exCopy{
  padding-left: clamp(36px, 5vw, 72px);
}

/* For alt rows (image right), text padding pushes away from center (right) */
.exRowAlt .exCopy{
  padding-right: clamp(36px, 5vw, 72px);
}

.exKicker{
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-primary) 45%, transparent);
}

.exTitle{
  margin: 14px 0 0;
  font-family: var(--font-body);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.08;
  font-size: clamp(28px, 3.4vw, 52px);
  color: var(--color-primary);
}

.exBody{
  margin: 18px 0 0;
  font-family: var(--font-body);
  font-size: var(--t16);
  line-height: 1.8;
  max-width: 52ch;
  color: color-mix(in srgb, var(--color-text) 70%, transparent);
}

.exBtn{
  display: inline-flex;
  align-items: center;
  margin-top: 32px;
  align-self: flex-start;
  padding: 11px 24px;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  background: transparent;
  color: var(--color-primary);
  border: 1.5px solid color-mix(in srgb, var(--color-primary) 28%, transparent);
  transition: border-color 150ms ease, color 150ms ease, transform 120ms ease;
}
.exBtn:hover{
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

@media (max-width: 780px){
  .exRow{
    grid-template-columns: 1fr;
    min-height: unset;
  }
  .exRow .exMedia,
  .exRowAlt .exMedia{ order: 1 !important; min-height: 56vw; }
  .exRow .exCopy,
  .exRowAlt .exCopy{
    order: 2 !important;
    padding: 28px 20px 36px !important;
  }
  .exTitle{ font-size: clamp(22px, 7vw, 32px) !important; }
  .exBtn{ margin-top: 22px; }
}
`;
