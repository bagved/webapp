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

  const railRef  = useRef<HTMLDivElement | null>(null);
  const [active, setActive]     = useState(2);
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
      setActive(bestIdx);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(pickCentered); };
    pickCentered();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); el.removeEventListener("scroll", onScroll as any); window.removeEventListener("resize", onScroll); };
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const center = () => {
      const card = el.querySelector<HTMLElement>('[data-idx="2"]');
      if (!card) return;
      el.scrollLeft = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
    };
    requestAnimationFrame(() => requestAnimationFrame(center));
  }, []);

  const scrollTo = (idx: number) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(`[data-idx="${idx}"]`);
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <section className="srv" id="services" aria-label="Services">
      <style>{css}</style>

      <div className="srvTop">
        <p className="srvLabel">Et udpluk af vores produktioner</p>
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

      <div className="srvFooter">
        <div className="dots" aria-hidden>
          {items.map((_, i) => (
            <button key={i} className={`dot ${i === active ? "dotOn" : ""}`} onClick={() => scrollTo(i)} />
          ))}
        </div>
        <Link className="srvCta" href="/cases">Se alle eksempler</Link>
      </div>

    </section>
  );
}

const css = `
.srv{
  padding: clamp(56px, 7vw, 96px) 0 clamp(48px, 6vw, 80px);
  background: var(--color-bg);
  overflow: hidden;
}

.srvTop{
  text-align: center;
  margin-bottom: clamp(28px, 4vw, 48px);
}

.srvLabel{
  margin: 0;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-primary) 38%, transparent);
}

/* Rail wrapper — positions nav arrows */
.railWrap{
  position: relative;
  display: flex;
  align-items: center;
}

/* Scrollable rail */
.rail{
  --tileW: clamp(220px, 24vw, 320px);
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
  scroll-padding-left: var(--edgePad);
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  flex: 1;
}
.rail::-webkit-scrollbar{ display: none; }

/* Card */
.tile{
  scroll-snap-align: center;
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
  .tile:hover{
    transform: scale(1.04);
  }
  .tile:hover .t1{
    color: var(--color-accent);
  }
  .tile:hover .t2{
    color: var(--color-accent);
  }
}

/* Image */
.img{
  flex: 1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: color-mix(in srgb, var(--color-primary) 6%, var(--color-bg));
}

/* Text panel */
.meta{
  flex: 0 0 auto;
  padding: clamp(14px, 2vw, 20px) 0 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: center;
  background: transparent;
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
.navVisible{
  opacity: 0.72;
  pointer-events: auto;
}
.navBtn:hover{
  opacity: 1;
  border-color: var(--color-primary);
  transform: scale(1.08);
}
.navPrev{ left: clamp(8px, 1.5vw, 24px); }
.navNext{ right: clamp(8px, 1.5vw, 24px); }

/* Footer row: dots + cta */
.srvFooter{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  margin-top: clamp(8px, 1.5vw, 16px);
  padding: 0 clamp(18px,3.2vw,44px);
}

.dots{
  display: flex;
  align-items: center;
  gap: 7px;
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

.srvCta{
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none;
  color: color-mix(in srgb, var(--color-primary) 50%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 18%, transparent);
  padding-bottom: 2px;
  transition: color 150ms ease, border-color 150ms ease;
}
.srvCta:hover{
  color: var(--color-accent);
  border-color: var(--color-accent);
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
