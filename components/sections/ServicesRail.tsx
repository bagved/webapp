"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Item = {
  id: string;
  img: string;
  title: string;
  subtitle: string;
  href: string;
};

export default function ServicesRail() {
  const items: Item[] = useMemo(() => [
    { id: "livestream",               img: "/photos/Livestream.jpg",      title: "Livestream",                subtitle: "Live & broadcast",          href: "/cases?cat=live-broadcast&case=livestream" },
    { id: "sportsbroadcast",          img: "/photos/sportsbroadcast.jpg", title: "Sportsbroadcast",            subtitle: "Live & broadcast",          href: "/cases?cat=live-broadcast&case=sportsbroadcast" },
    { id: "webinar-studieproduktion", img: "/photos/studie_pre.jpg",      title: "Webinar & studieproduktion", subtitle: "Live & broadcast",          href: "/cases?cat=live-broadcast&case=webinar-studieproduktion" },
    { id: "virksomhedsvideo",         img: "/photos/virksomhedsfilm.jpg", title: "Virksomhedsvideo",           subtitle: "Virksomhedsfilm & reklame", href: "/cases?cat=virksomhedsfilm-reklame&case=virksomhedsvideo" },
    { id: "eventvideo",               img: "/photos/eventfilm.jpg",       title: "Eventvideo",                 subtitle: "Eventvideo & eventteknik",  href: "/cases?cat=eventvideo-eventteknik&case=eventvideo" },
    { id: "eventteknik",              img: "/photos/lys_lyd_pre.jpg",     title: "Lyd, lys & eventteknik",     subtitle: "Eventvideo & eventteknik",  href: "/cases?cat=eventvideo-eventteknik&case=eventteknik" },
  ], []);

  const railRef = useRef<HTMLDivElement | null>(null);
  const [scrollActive, setScrollActive] = useState(2);
  const [hoverActive, setHoverActive]   = useState<number | null>(null);
  const active = hoverActive ?? scrollActive;
  const [canLeft, setCanLeft]   = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const update = () => {
      const max = Math.max(1, el.scrollWidth - el.clientWidth);
      const x   = el.scrollLeft;
      setCanLeft(x > 6);
      setCanRight(x < max - 6);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update as any); window.removeEventListener("resize", update); };
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    let raf = 0;
    const pickCentered = () => {
      const mid   = el.getBoundingClientRect().left + el.clientWidth / 2;
      const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
      if (!cards.length) return;
      let bestIdx = 0, bestDist = Infinity;
      for (const card of cards) {
        const r = card.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestDist) { bestDist = d; bestIdx = Number(card.dataset.idx ?? "0"); }
      }
      setScrollActive(bestIdx);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(pickCentered); };
    pickCentered();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); el.removeEventListener("scroll", onScroll as any); window.removeEventListener("resize", onScroll); };
  }, []);

  useEffect(() => {
    const card = railRef.current?.querySelector<HTMLElement>('[data-idx="2"]');
    if (!card) return;
    const y = window.scrollY;
    card.scrollIntoView({ inline: "center", block: "nearest" });
    window.scrollTo({ top: y, behavior: "instant" } as ScrollToOptions);
  }, []);

  const scrollTo = (idx: number) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(`[data-idx="${idx}"]`);
    if (!card) return;
    const railRect = el.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const cardPosInScroll = el.scrollLeft + (cardRect.left - railRect.left);
    el.scrollTo({ left: cardPosInScroll - (el.clientWidth - cardRect.width) / 2, behavior: "smooth" });
  };

  return (
    <section className="srv" id="services" aria-label="Services">
      <style>{css}</style>

      <div className="container srvTop">
        <h2 className="srvHeading">Et udpluk af vores produktioner</h2>
        <p className="srvSub">
          Reklamefilm, livestream, og events, der skaber opmærksomhed og gør indtryk.
        </p>
      </div>

      <div className="railWrap">
        <button
          className={`navBtn navPrev ${canLeft ? "navVisible" : ""}`}
          onClick={() => scrollTo(active - 1)}
          aria-label="Forrige"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="10 3 5 8 10 13" />
          </svg>
        </button>

        <div ref={railRef} className="rail" role="list" aria-label="Service tiles">
          {items.map((it, i) => (
            <Link
              key={it.id}
              href={it.href}
              className="tile"
              role="listitem"
              data-card
              data-idx={i}
              onMouseEnter={() => setHoverActive(i)}
              onMouseLeave={() => setHoverActive(null)}
            >
              <div className="img" style={{ backgroundImage: `url(${it.img})` }} aria-hidden />
              <div className="meta">
                <span className="t2">{it.subtitle}</span>
                <span className="t1">{it.title}</span>
              </div>
            </Link>
          ))}
        </div>

        <button
          className={`navBtn navNext ${canRight ? "navVisible" : ""}`}
          onClick={() => scrollTo(active + 1)}
          aria-label="Næste"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 3 11 8 6 13" />
          </svg>
        </button>
      </div>

      {/* Dots — centered */}
      <div className="srvDots" aria-hidden>
        {items.map((_, i) => (
          <button key={i} className={`dot ${i === active ? "dotOn" : ""}`} onClick={() => scrollTo(i)} />
        ))}
      </div>

      {/* CTA — right-aligned in container, same x as vpBtn / ctFooterRow */}
      <div className="container srvCtaRow">
        <Link className="srvCta" href="/cases">Se alle eksempler →</Link>
      </div>

    </section>
  );
}

const css = `
.srv{
  padding: clamp(32px, 4vw, 56px) 0 clamp(24px, 3vw, 40px);
  background: color-mix(in srgb, var(--color-secondary) 18%, var(--color-bg));
  overflow: hidden;
}

.srvTop{
  text-align: left;
  margin-bottom: clamp(20px, 3vw, 36px);
}

.srvHeading{
  margin: 0 0 10px;
  font-family: var(--font-body);
  font-weight: 800;
  font-size: clamp(22px, 2.6vw, 36px);
  letter-spacing: -0.03em;
  line-height: 1.08;
  color: var(--color-primary);
}

.srvSub{
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(14px, 1.25vw, 17px);
  font-weight: 400;
  line-height: 1.75;
  color: color-mix(in srgb, var(--color-text) 72%, transparent);
  max-width: 46ch;
  text-align: left;
}

/* Rail wrapper */
.railWrap{
  position: relative;
  display: flex;
  align-items: center;
}

/* Scrollable rail — tileW sized so 3 full + ~¼ tile visible on each side */
.rail{
  --tileW: clamp(240px, 27vw, 400px);
  --tileH: clamp(300px, 34vw, 460px);
  --edgePad: clamp(48px, 8vw, 120px);
  --gap: clamp(12px, 1.6vw, 20px);
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: var(--tileW);
  gap: var(--gap);
  overflow-x: auto;
  overflow-y: visible;
  padding: 24px var(--edgePad) 32px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  flex: 1;
}
.rail::-webkit-scrollbar{ display: none; }

/* Card */
.tile{
  display: flex;
  flex-direction: column;
  height: var(--tileH);
  text-decoration: none;
  color: inherit;
  transition: transform 340ms cubic-bezier(0.16,1,0.3,1);
  transform-origin: center bottom;
  will-change: transform;
}

@media (hover:hover){
  .tile:hover{ transform: scale(1.04); }
  .tile:hover .t1{ color: var(--color-accent); }
  .tile:hover .t2{ color: var(--color-accent); }
}

.img{
  flex: 1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: color-mix(in srgb, var(--color-primary) 6%, var(--color-bg));
}

.meta{
  flex: 0 0 auto;
  padding: clamp(14px, 2vw, 20px) 0 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: center;
}

.t2{
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: var(--color-primary);
  transition: color 200ms ease;
}

.t1{
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  line-height: 1.4;
  color: var(--color-primary);
  transition: color 200ms ease;
}

/* Arrow nav buttons */
.navBtn{
  position: absolute;
  z-index: 2;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--color-primary) 18%, transparent);
  background: var(--color-bg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-primary);
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms ease, border-color 150ms ease, transform 130ms ease;
}
.navVisible{ opacity: 0.72; pointer-events: auto; }
.navBtn:hover{ opacity: 1; border-color: var(--color-primary); transform: scale(1.08); }
.navPrev{ left: clamp(8px, 1.5vw, 24px); }
.navNext{ right: clamp(8px, 1.5vw, 24px); }

/* Dots row — centered */
.srvDots{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin-top: clamp(6px, 1vw, 12px);
}

.dot{
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border: none;
  background: color-mix(in srgb, var(--color-primary) 22%, transparent);
  cursor: pointer;
  padding: 0;
  transition: background 200ms ease, transform 200ms ease;
}
.dotOn{
  background: var(--color-primary);
  transform: scale(1.35);
}

/* CTA row — right-aligned in container, matches vpBtn / ctFooterRow x-position */
.srvCtaRow{
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
}

.srvCta{
  display: inline-flex;
  align-items: center;
  padding: 11px 22px;
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
.srvCta:hover{
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateY(-2px);
}

@media (max-width: 780px){
  .rail{
    --tileW: 68vw;
    --tileH: clamp(300px, 88vw, 420px);
    --edgePad: 16vw;
    --gap: 12px;
  }
  .navBtn{ display: none; }
}
`;
