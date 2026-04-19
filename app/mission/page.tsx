"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// ── FAQ data ──────────────────────────────────────────────────────────
const FAQ_CATS = [
  { id: "proces",    label: "Processen" },
  { id: "pris",      label: "Pris & tilbud" },
  { id: "indhold",   label: "Indhold & kreativt" },
  { id: "teknik",    label: "Teknik & udstyr" },
  { id: "levering",  label: "Levering" },
];

const FAQ_ITEMS = [
  { cat: "proces",   q: "Hvordan starter et samarbejde med Bagved?",
    a: "Vi starter altid med en uforpligtende snak om jeres behov og mål. Derefter sender vi et skræddersyet tilbud og går i gang, når I er klar." },
  { cat: "proces",   q: "Hvor lang tid tager en produktion?",
    a: "Det afhænger af projektets størrelse. En simpel virksomhedsvideo tager typisk 2–3 uger fra godkendt manuskript til levering. Større events planlægges i god tid." },
  { cat: "proces",   q: "Kan I hjælpe med konceptet, eller skal vi have det klart?",
    a: "Vi hjælper gerne med at udvikle konceptet fra bunden. Mange af vores bedste projekter starter med blot en idé eller et problem, der skal løses." },
  { cat: "pris",     q: "Hvad koster en produktion?",
    a: "Prisen afhænger af omfang, varighed og krav til udstyr og hold. Vi giver altid et fast tilbud, så der ikke er overraskelser undervejs." },
  { cat: "pris",     q: "Er der ekstra omkostninger jeg skal kende til?",
    a: "Vores tilbud er altid inklusiv alt vi har aftalt. Opstår der ændringer undervejs, aftaler vi det skriftligt, inden der sker noget nyt." },
  { cat: "pris",     q: "Kan jeg få et uforpligtende tilbud?",
    a: "Ja, altid. Send os en besked med en kort beskrivelse af jeres projekt, og vi vender tilbage hurtigt med et estimat." },
  { cat: "indhold",  q: "Hvem skriver manuskriptet eller storyboardet?",
    a: "Det gør vi — i tæt dialog med jer. Vi kan også arbejde ud fra et eksisterende manuskript, hvis I har det." },
  { cat: "indhold",  q: "Kan vi bruge vores eget musikvalg?",
    a: "Ja, men vi hjælper gerne med at finde licenseret musik, der passer til stemningen. Vi har adgang til professionelle musikbiblioteker." },
  { cat: "teknik",   q: "Hvilket kamera- og lydudstyr bruger I?",
    a: "Vi bruger broadcast-kvalitetsudstyr tilpasset hvert projekt — fra kompakte kameraer til fullframe cinema-rigs, alt efter behov." },
  { cat: "teknik",   q: "Kan I håndtere livestreaming?",
    a: "Ja, det er en af vores kernekompetencer. Vi streamer til alle platforme og kan integrere grafik, replay og flerkanalssetup." },
  { cat: "levering", q: "I hvilket format leveres den færdige video?",
    a: "Vi leverer i det format, der passer jeres brug — web, broadcast, sociale medier. Vi eksporterer gerne i flere formater til én pris." },
  { cat: "levering", q: "Har I ret til at bruge materialet i jeres portefølje?",
    a: "Vi spørger altid om tilladelse. Mange kunder siger ja, men det er altid op til jer, og vi respekterer fuldt ud et nej." },
];

// ── Testimonials ──────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "Bagved leverede en live-produktion af absolut topkvalitet. Vi fik hundredvis af positive tilbagemeldinger fra seerne — og selv de mest teknisk kræsne var imponerede.",
    name: "Mia Grønbæk",
    role: "Eventchef, SportsDanmark",
  },
  {
    quote: "Det, der adskiller Bagved, er evnen til at forstå vores brand. De stiller de rigtige spørgsmål og leverer video, der rammer præcis det, vi vil kommunikere.",
    name: "Thomas Elkjær",
    role: "Marketingdirektør, Helios Group",
  },
  {
    quote: "Fra konceptmøde til færdig film gik der to uger. Resultatet overgik vores forventninger, og samarbejdet var nemt og ukompliceret hele vejen.",
    name: "Sofie Dahl",
    role: "Brand Manager, Vera Nordic",
  },
  {
    quote: "Vi har brugt mange bureauer gennem årene. Bagved er de eneste, der altid har styr på det — teknisk, kreativt og logistisk. De er vores go-to fra nu af.",
    name: "Kristian Holm",
    role: "CEO, Momentum Events",
  },
];

// ── Process steps ─────────────────────────────────────────────────────
const STEPS = [
  { num: "01", title: "Briefing", body: "Vi sætter os ind i jeres mål, målgruppe og de rammer projektet skal leve inden for. Jo mere vi ved, jo bedre bliver resultatet." },
  { num: "02", title: "Koncept & plan", body: "Vi udvikler konceptet, laver en plan for dagen og sikrer, at alt udstyr og alle folk er klar. Ingen overraskelser på selve dagen." },
  { num: "03", title: "Produktion", body: "Vores hold møder op velforberedt og leverer. Vi håndterer det tekniske, så I kan fokusere på indholdet og jeres publikum." },
  { num: "04", title: "Levering", body: "Redigeret og klar til brug. Vi leverer i de formater, I har brug for, og sikrer, at I er tilfredse, inden vi afslutter projektet." },
];

// ── Why us benefits ───────────────────────────────────────────────────
const BENEFITS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Erfaring på tværs",
    body: "Fra store sportsbroadcasts til intime virksomhedsfilm — vi har gjort det og ved, hvad der virker i praksis.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Fast pris, ingen overraskelser",
    body: "Vi giver klare tilbud og holder dem. Ingen skjulte gebyrer, ingen efterregning — præcis det vi aftalte.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "De rigtige folk til hvert job",
    body: "Bagved er et netværk af specialister. Vi sammensætter det hold, der passer præcis til jeres projekt — ikke mere, ikke mindre.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Kvalitet vi er stolte af",
    body: "Vi leverer aldrig noget, vi ikke selv er tilfredse med. Det er ikke bare en sætning — det er vores arbejdsmetode.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Levering til tiden",
    body: "Vi ved, at deadlines er deadlines. Vores produktioner er planlagt til at holde tidsplanen — og det gør de.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Tæt dialog hele vejen",
    body: "Vi holder jer opdateret og involveret. Ingen blackbox — I ved altid, hvad der sker og hvad det næste skridt er.",
  },
];

// ─────────────────────────────────────────────────────────────────────
export default function MissionPage() {
  const [activeCat, setActiveCat] = useState("proces");
  const [openQ, setOpenQ]         = useState<number | null>(null);
  const [teIdx, setTeIdx]         = useState(0);
  const [teFade, setTeFade]       = useState(true);

  const goTo = (next: number) => {
    setTeFade(false);
    setTimeout(() => {
      setTeIdx((next + TESTIMONIALS.length) % TESTIMONIALS.length);
      setTeFade(true);
    }, 240);
  };

  useEffect(() => {
    const t = setInterval(() => goTo(teIdx + 1), 6000);
    return () => clearInterval(t);
  }, [teIdx]);

  const visibleFaq = FAQ_ITEMS.filter(f => f.cat === activeCat);
  const t = TESTIMONIALS[teIdx];

  return (
    <main className="mp" aria-label="Mission">
      <style>{css}</style>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="mpHero">
        <div className="container">
          <p className="mpEyebrow">Om Bagved</p>
          <h1 className="mpHeroTitle">
            Vi elsker<br />vores arbejde.
          </h1>
          <p className="mpHeroSub">
            Bag enhver god produktion er et team der lytter,<br />
            forstår og leverer — uden kompromis.
          </p>
        </div>
        <div className="mpHeroLine" aria-hidden />
      </section>

      {/* ── Process timeline ──────────────────────────────────── */}
      <section className="mpProcess">
        <div className="container">
          <p className="mpSectionEyebrow">Sådan arbejder vi</p>
          <h2 className="mpSectionTitle">Fra idé til færdig produktion</h2>
        </div>

        <div className="mpStepsOuter">
          <div className="mpStepsTrack" aria-hidden>
            <div className="mpStepsLine" />
          </div>
          <div className="mpSteps">
            {STEPS.map((s) => (
              <article key={s.num} className="mpStep">
                <div className="mpStepBubble">
                  <span className="mpStepNum">{s.num}</span>
                </div>
                <h3 className="mpStepTitle">{s.title}</h3>
                <p className="mpStepBody">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────── */}
      <section className="mpBenefits">
        <div className="container">
          <p className="mpSectionEyebrow">Hvorfor Bagved</p>
          <h2 className="mpSectionTitle">Det du kan forvente</h2>

          <div className="mpBenGrid">
            {BENEFITS.map((b, i) => (
              <article key={i} className="mpBenCard">
                <div className="mpBenIcon" aria-hidden>{b.icon}</div>
                <h3 className="mpBenTitle">{b.title}</h3>
                <p className="mpBenBody">{b.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial (single cycling) ─────────────────────── */}
      <section className="mpTestimonials" aria-label="Testimonials">
        <div className="mpTestiInner">
          <p className="mpSectionEyebrowDark">Hvad kunderne siger</p>

          <div className={`mpTestiBody ${teFade ? "mpTestiVisible" : "mpTestiHidden"}`}>
            <div className="mpTestiMark" aria-hidden>"</div>
            <blockquote className="mpTestiQuote">{t.quote}</blockquote>
            <footer className="mpTestiFooter">
              <span className="mpTestiName">{t.name}</span>
              <span className="mpTestiDivider" aria-hidden>·</span>
              <span className="mpTestiRole">{t.role}</span>
            </footer>
          </div>

          <div className="mpTestiControls" aria-label="Naviger citater">
            <button className="mpTestiBtn" onClick={() => goTo(teIdx - 1)} aria-label="Forrige citat">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="11 4 6 9 11 14" />
              </svg>
            </button>
            <div className="mpTestiDots" aria-hidden>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} className={`mpTestiDot ${i === teIdx ? "mpTestiDotOn" : ""}`} onClick={() => goTo(i)} />
              ))}
            </div>
            <button className="mpTestiBtn" onClick={() => goTo(teIdx + 1)} aria-label="Næste citat">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="7 4 12 9 7 14" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="mpFaq">
        <div className="container">
          <h2 className="mpFaqTitle">Spørgsmål & svar</h2>
          <p className="mpFaqHint">Alt det du måske spekulerer på.</p>

          <div className="mpFaqLayout">
            {/* Sidebar */}
            <nav className="mpFaqSidebar" aria-label="FAQ kategorier">
              {FAQ_CATS.map(c => (
                <button
                  key={c.id}
                  className={`mpFaqCat ${activeCat === c.id ? "mpFaqCatOn" : ""}`}
                  onClick={() => { setActiveCat(c.id); setOpenQ(null); }}
                >
                  {c.label}
                </button>
              ))}
            </nav>

            {/* Accordion */}
            <div className="mpFaqAccordion">
              {visibleFaq.map((item, i) => (
                <div key={i} className={`mpFaqItem ${openQ === i ? "mpFaqItemOpen" : ""}`}>
                  <button
                    className="mpFaqQ"
                    onClick={() => setOpenQ(openQ === i ? null : i)}
                    aria-expanded={openQ === i}
                  >
                    <span className="mpFaqQLabel">{item.q}</span>
                    <span className="mpFaqQChevron" aria-hidden>{openQ === i ? "−" : "+"}</span>
                  </button>
                  <div className="mpFaqA">
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="mpCta" aria-label="Kontakt os">
        <div className="mpCtaLeft">
          <p className="mpCtaEyebrow">Kom i gang</p>
          <h2 className="mpCtaTitle">Kontakt os og få et skræddersyet tilbud</h2>
          <p className="mpCtaSub">
            Har du spørgsmål, eller ønsker du et tilbud på en livestream,
            virksomhedsvideo eller et event? Vi sidder klar til at hjælpe dig.
          </p>
          <Link href="/contact" className="mpCtaBtn">Kontakt os</Link>
        </div>

        <div className="mpCtaRight">
          <div className="mpCtaImgWrap">
            <img src="/photos/Livestream.jpg" alt="" className="mpCtaImg" aria-hidden />
          </div>
          {/* Decorative stripe block */}
          <div className="mpCtaDeco" aria-hidden>
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="mpCtaDecoLine" />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

const css = `
.mp{
  background: var(--color-bg);
}

/* ── Hero ── */
.mpHero{
  padding-top: clamp(90px, 11vw, 148px);
  padding-bottom: 0;
}
.mpEyebrow{
  margin: 0 0 18px;
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-primary) 38%, transparent);
}
.mpHeroTitle{
  margin: 0 0 24px;
  font-family: var(--font-body);
  font-weight: 800;
  font-size: clamp(52px, 8vw, 110px);
  letter-spacing: -0.04em;
  line-height: 0.92;
  color: var(--color-primary);
}
.mpHeroSub{
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(14px, 1.3vw, 18px);
  line-height: 1.7;
  color: color-mix(in srgb, var(--color-text) 52%, transparent);
  max-width: 52ch;
}
.mpHeroLine{
  height: 1px;
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
  margin-top: clamp(52px, 7vw, 96px);
}

/* ── Section shared ── */
.mpSectionEyebrow{
  margin: 0 0 14px;
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-primary) 40%, transparent);
}
.mpSectionTitle{
  margin: 0 0 clamp(40px, 5.5vw, 72px);
  font-family: var(--font-body);
  font-weight: 800;
  font-size: clamp(28px, 3.4vw, 46px);
  letter-spacing: -0.03em;
  line-height: 1.08;
  color: var(--color-primary);
}
.mpSectionEyebrowDark{
  margin: 0 0 32px;
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.38);
}

/* ── Process ── */
.mpProcess{
  padding: clamp(72px, 9vw, 120px) 0;
}
.mpStepsOuter{
  position: relative;
  margin-top: clamp(32px, 4vw, 56px);
  overflow: hidden;
}
.mpStepsTrack{
  position: absolute;
  top: 28px;
  left: calc(clamp(16px,3.2vw,48px) + (100% / 8));
  right: calc(clamp(16px,3.2vw,48px) + (100% / 8));
  height: 1px;
  background: color-mix(in srgb, var(--color-primary) 12%, transparent);
  pointer-events: none;
}
.mpSteps{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(16px, 2.5vw, 32px);
  padding: 0 clamp(16px, 3.2vw, 48px);
}
.mpStep{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
}
.mpStepBubble{
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--color-primary) 16%, transparent);
  background: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}
.mpStepNum{
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-primary);
}
.mpStepTitle{
  margin: 0;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: clamp(15px, 1.4vw, 18px);
  letter-spacing: -0.01em;
  color: var(--color-primary);
}
.mpStepBody{
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(13px, 1.05vw, 15px);
  line-height: 1.75;
  color: color-mix(in srgb, var(--color-text) 58%, transparent);
}

/* ── Benefits ── */
.mpBenefits{
  padding: clamp(72px, 9vw, 120px) 0;
  background: color-mix(in srgb, var(--color-secondary) 10%, var(--color-bg));
  border-top: 1px solid color-mix(in srgb, var(--color-primary) 8%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 8%, transparent);
}
.mpBenGrid{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(24px, 3vw, 48px) clamp(24px, 3.5vw, 56px);
}
.mpBenCard{
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.mpBenIcon{
  width: 36px;
  height: 36px;
  color: var(--color-primary);
  opacity: 0.72;
}
.mpBenIcon svg{
  width: 100%;
  height: 100%;
}
.mpBenTitle{
  margin: 0;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: clamp(15px, 1.3vw, 18px);
  letter-spacing: -0.01em;
  color: var(--color-primary);
}
.mpBenBody{
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(13px, 1.05vw, 15px);
  line-height: 1.78;
  color: color-mix(in srgb, var(--color-text) 60%, transparent);
}

/* ── Testimonial (single cycling) ── */
.mpTestimonials{
  padding: clamp(72px, 9vw, 120px) 0;
  background: var(--color-primary);
}
.mpTestiInner{
  max-width: 800px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.mpTestiBody{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  transition: opacity 240ms ease, transform 240ms ease;
}
.mpTestiVisible{
  opacity: 1;
  transform: translateY(0);
}
.mpTestiHidden{
  opacity: 0;
  transform: translateY(8px);
}
.mpTestiMark{
  font-family: var(--font-body);
  font-size: 72px;
  font-weight: 900;
  line-height: 0.5;
  color: var(--color-accent);
  opacity: 0.5;
  user-select: none;
}
.mpTestiQuote{
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(16px, 1.6vw, 22px);
  font-weight: 400;
  line-height: 1.65;
  color: rgba(255,255,255,0.88);
  max-width: 68ch;
}
.mpTestiFooter{
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
}
.mpTestiName{
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.9);
}
.mpTestiDivider{
  color: rgba(255,255,255,0.28);
  font-size: 14px;
}
.mpTestiRole{
  font-family: var(--font-body);
  font-size: 11px;
  color: rgba(255,255,255,0.42);
}
.mpTestiControls{
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 36px;
}
.mpTestiBtn{
  background: transparent;
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgba(255,255,255,0.62);
  transition: border-color 160ms ease, color 160ms ease;
}
.mpTestiBtn:hover{
  border-color: rgba(255,255,255,0.5);
  color: #fff;
}
.mpTestiDots{
  display: flex;
  align-items: center;
  gap: 7px;
}
.mpTestiDot{
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.24);
  cursor: pointer;
  padding: 0;
  transition: background 200ms ease, transform 200ms ease;
}
.mpTestiDotOn{
  background: rgba(255,255,255,0.9);
  transform: scale(1.35);
}

/* ── FAQ ── */
.mpFaq{
  padding: clamp(72px, 9vw, 120px) 0;
}
.mpFaqTitle{
  margin: 0;
  font-family: var(--font-body);
  font-weight: 800;
  font-size: clamp(44px, 6.5vw, 88px);
  letter-spacing: -0.03em;
  line-height: 0.96;
  color: var(--color-primary);
}
.mpFaqHint{
  margin: 16px 0 0;
  font-family: var(--font-body);
  font-size: clamp(14px, 1.2vw, 17px);
  line-height: 1.7;
  color: color-mix(in srgb, var(--color-text) 62%, transparent);
  max-width: 52ch;
}
.mpFaqLayout{
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: clamp(32px, 5vw, 80px);
  align-items: start;
  margin-top: clamp(36px, 5vw, 56px);
  border-top: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
  padding-top: clamp(24px, 3vw, 40px);
}
.mpFaqSidebar{
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: sticky;
  top: 88px;
}
.mpFaqCat{
  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-primary) 45%, transparent);
  padding: 10px 14px;
  transition: color 140ms ease, background 140ms ease;
  position: relative;
}
.mpFaqCat::before{
  content: "";
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: transparent;
  transition: background 140ms ease;
}
.mpFaqCat:hover{
  color: var(--color-primary);
}
.mpFaqCatOn{
  color: var(--color-accent);
}
.mpFaqCatOn::before{
  background: var(--color-accent);
}

.mpFaqAccordion{
  display: flex;
  flex-direction: column;
}
.mpFaqItem{
  border-bottom: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
}
.mpFaqItem:first-child{
  border-top: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
}
.mpFaqQ{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: clamp(14px, 1.8vw, 22px) 0;
}
.mpFaqQLabel{
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-primary);
  transition: color 140ms ease;
}
.mpFaqQ:hover .mpFaqQLabel,
.mpFaqItemOpen .mpFaqQLabel{
  color: var(--color-accent);
}
.mpFaqQChevron{
  font-size: 20px;
  font-weight: 300;
  color: color-mix(in srgb, var(--color-primary) 35%, transparent);
  transition: color 140ms ease;
  flex-shrink: 0;
  line-height: 1;
}
.mpFaqQ:hover .mpFaqQChevron,
.mpFaqItemOpen .mpFaqQChevron{
  color: var(--color-accent);
}
.mpFaqA{
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 300ms cubic-bezier(.4,0,.2,1);
  overflow: hidden;
}
.mpFaqItemOpen .mpFaqA{
  grid-template-rows: 1fr;
}
.mpFaqA > p{
  min-height: 0;
  overflow: hidden;
  margin: 0;
  padding-bottom: clamp(10px, 1.4vw, 18px);
  font-family: var(--font-body);
  font-size: clamp(13px, 1.1vw, 15px);
  line-height: 1.78;
  color: color-mix(in srgb, var(--color-text) 60%, transparent);
  visibility: hidden;
}
.mpFaqItemOpen .mpFaqA > p{
  visibility: visible;
}

/* ── CTA full-width split ── */
.mpCta{
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: clamp(360px, 46vw, 580px);
  background: var(--color-primary);
}
.mpCtaLeft{
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: clamp(52px, 7vw, 96px) clamp(32px, 6vw, 88px);
}
.mpCtaEyebrow{
  margin: 0;
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.38);
}
.mpCtaTitle{
  margin: 0;
  font-family: var(--font-body);
  font-weight: 800;
  font-size: clamp(26px, 3.2vw, 46px);
  letter-spacing: -0.03em;
  line-height: 1.08;
  color: #ffffff;
}
.mpCtaSub{
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(14px, 1.15vw, 16px);
  line-height: 1.75;
  color: rgba(255,255,255,0.62);
  max-width: 44ch;
}
.mpCtaBtn{
  align-self: flex-start;
  margin-top: 8px;
  display: inline-block;
  padding: 14px 36px;
  background: var(--color-accent);
  color: #ffffff;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 160ms ease;
}
.mpCtaBtn:hover{
  background: color-mix(in srgb, var(--color-accent) 80%, #000);
}
.mpCtaRight{
  position: relative;
  overflow: hidden;
}
.mpCtaImgWrap{
  position: absolute;
  inset: 0;
}
.mpCtaImg{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  opacity: 0.72;
}
.mpCtaDeco{
  position: absolute;
  bottom: -20px;
  right: -20px;
  width: 160px;
  height: 160px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transform: rotate(-30deg);
  transform-origin: bottom right;
  pointer-events: none;
}
.mpCtaDecoLine{
  height: 10px;
  background: var(--color-accent);
  opacity: 0.62;
}

/* ── Responsive ── */
@media (max-width: 900px){
  .mpBenGrid{
    grid-template-columns: repeat(2, 1fr);
  }
  .mpFaqLayout{
    grid-template-columns: 1fr;
    gap: 24px;
    border-top: none;
    padding-top: 0;
  }
  .mpFaqSidebar{
    position: static;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 6px;
    border-top: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
    padding-top: clamp(24px, 3vw, 40px);
  }
  .mpFaqCat{
    padding: 7px 14px;
    border: 1px solid color-mix(in srgb, var(--color-primary) 14%, transparent);
    font-size: 9px;
  }
  .mpFaqCatOn{
    border-color: var(--color-accent);
  }
  .mpFaqCat::before{ display: none; }
  .mpCta{
    grid-template-columns: 1fr;
  }
  .mpCtaRight{
    min-height: clamp(200px, 50vw, 340px);
  }
}
@media (max-width: 640px){
  .mpSteps{
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 16px;
  }
  .mpStepsTrack{ display: none; }
  .mpBenGrid{
    grid-template-columns: 1fr;
  }
}
`;
