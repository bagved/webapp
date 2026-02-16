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
  const items: Item[] = useMemo(
    () => [
      {
        id: "livestream",
        img: "/services/livestream.png",
        title: "LIVESTREAM",
        subtitle: "Broadcast & afvikling",
        href: "/services#livestream",
      },
      {
        id: "reklamefilm",
        img: "/services/reklamefilm.png",
        title: "REKLAMEFILM",
        subtitle: "Content & kampagner",
        href: "/services#reklamefilm",
      },
      {
        id: "lydlys",
        img: "/services/lydlys.png",
        title: "LYD OG LYS",
        subtitle: "Planlægning & oplevelse",
        href: "/services#lydlys",
      },
      {
        id: "planlaegning",
        img: "/services/planlaegning.png",
        title: "PLANLÆGNING",
        subtitle: "Run of show & flow",
        href: "/services#planlaegning",
      },
      {
        id: "content",
        img: "/services/content.png",
        title: "CONTENT",
        subtitle: "Én produktion → flere assets",
        href: "/services#content",
      },
    ],
    []
  );

  const railRef = useRef<HTMLDivElement | null>(null);

  const [active, setActive] = useState(0);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [progress, setProgress] = useState(0);

  // ✅ keep these for the bar + overflow state (unchanged)
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const update = () => {
      const max = Math.max(1, el.scrollWidth - el.clientWidth);
      const x = el.scrollLeft;

      setHasOverflow(el.scrollWidth - el.clientWidth > 6);
      setCanLeft(x > 6);
      setCanRight(x < max - 6);
      setProgress(Math.min(1, Math.max(0, x / max)));
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update as any);
      window.removeEventListener("resize", update);
    };
  }, []);

  // ✅ NEW: auto-highlight the tile that's visually centered (mobile friendly)
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    let raf = 0;

    const pickCentered = () => {
      const railRect = el.getBoundingClientRect();
      const railCenter = railRect.left + railRect.width / 2;

      const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
      if (!cards.length) return;

      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      for (const card of cards) {
        const r = card.getBoundingClientRect();
        const c = r.left + r.width / 2;
        const d = Math.abs(c - railCenter);

        if (d < bestDist) {
          bestDist = d;
          bestIdx = Number(card.dataset.idx || "0");
        }
      }

      setActive(bestIdx);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(pickCentered);
    };

    // run once on mount + after resize (so the correct one is highlighted)
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(pickCentered);
    };

    pickCentered();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll as any);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="srv section" id="services" aria-label="Services">
      <style>{css}</style>

      <div className="fullBleed">
        <div className="wrap">
          <div ref={railRef} className="rail" role="list" aria-label="Service tiles">
            {items.map((it, i) => {
              const isActive = i === active;

              return (
                <Link
                  key={it.id}
                  href={it.href}
                  className={`tile ${isActive ? "active" : "idle"}`}
                  role="listitem"
                  data-card
                  data-idx={i}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <div className="media" aria-hidden>
                    <div className="img" style={{ backgroundImage: `url(${it.img})` }} />
                    <div className="fade" />
                  </div>

                  <div className="meta">
                    <div className="t1">{it.title}</div>
                    <div className="t2">{it.subtitle}</div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* bottom indicator only (no arrows) */}
          <div className="bar" aria-hidden>
            <div className={`hint ${hasOverflow && canLeft ? "on" : ""}`}>←</div>
            <div className="track">
              <div
                className="fill"
                style={{ transform: `scaleX(${hasOverflow ? progress : 0})` }}
              />
            </div>
            <div className={`hint ${hasOverflow && canRight ? "on" : ""}`}>→</div>
          </div>

          <div className="ctaRow">
            <Link className="cta" href="/services">
              Se alle ydelser →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
.wrap{
  position: relative;
  padding: 32px 0 20px;
}

/*
  ✅ Key fix for “can't see the last borders”:
  Add side padding so the first/last tiles never sit flush against the viewport.
  Also remove the edge mask that can fade out borders.
*/
.rail{
  --tileW: 360px;
  --tileH: 520px;

  --edgePad: clamp(18px, 3.2vw, 44px); /* ✅ keeps borders fully visible */
  --gap: clamp(26px, 4.4vw, 64px);

  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: var(--tileW);
  gap: var(--gap);

  overflow-x: auto;
  overflow-y: visible;

  padding: 10px var(--edgePad) 14px;  /* ✅ side padding */
  scroll-padding-left: var(--edgePad); /* ✅ snap respects padding */
  scroll-padding-right: var(--edgePad);

  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  justify-content: start; /* with edge padding this feels “gallery” */
}
.rail::-webkit-scrollbar{ display:none; }

/* Tile */
.tile{
  scroll-snap-align: center;
  position: relative;
  height: var(--tileH);
  text-decoration: none;
  color: inherit;

  border-radius: 0;
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--c1) 14%, transparent);

  transition:
    transform 320ms cubic-bezier(.18,1,.22,1),
    opacity 200ms ease,
    border-color 200ms ease,
    background 220ms ease;
}

/* Deactive smaller */
.idle{
  opacity: 0.52;
  transform: scale(0.94);
}

/* Active */
.active{
  opacity: 1;
  transform: scale(1);
  border-color: color-mix(in srgb, var(--c1) 22%, transparent);
  background: color-mix(in srgb, var(--c2) 24%, transparent);
}

/* Media fills tile */
.media{
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: transparent;
}

.img{
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain; /* luxe product feel */
  filter: saturate(1.01) contrast(1.02);
}

.fade{
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0) 62%,
    color-mix(in srgb, var(--c4) 86%, transparent) 100%
  );
  pointer-events: none;
}

/* Text overlay */
.meta{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 26px 24px 22px;
  text-align: center;
}

.t1{
  font-size: var(--t14);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: color-mix(in srgb, var(--c1) 88%, transparent);
}

.t2{
  margin-top: 10px;
  font-size: var(--t11);
  font-weight: 800;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--c1) 66%, transparent);
}

/* Hover: tiny chroma shift */
@media (hover:hover){
  .tile:hover{
    border-color: color-mix(in srgb, var(--c3) 20%, transparent);
    background: color-mix(in srgb, var(--c3) 2.4%, transparent);
  }
  .tile:hover .t1{
    color: color-mix(in srgb, var(--c3) 42%, var(--c1));
  }
  .tile:hover .t2{
    color: color-mix(in srgb, var(--c1) 78%, transparent);
  }
}

/* Progress bar */
.bar{
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
  gap: 10px;
  padding: 14px 0 0;
  opacity: 0.75;
}

.track{
  height: 1px;
  background: color-mix(in srgb, var(--c1) 14%, transparent);
  position: relative;
  overflow: hidden;
}

.fill{
  position: absolute;
  inset: 0;
  background: color-mix(in srgb, var(--c1) 44%, transparent);
  transform-origin: left center;
}

.hint{
  font-size: 14px;
  font-weight: 900;
  color: var(--c1);
  opacity: 0;
  transition: opacity 160ms ease;
  text-align: center;
}
.hint.on{ opacity: 1; }

/* CTA */
  .ctaRow{
  display:flex;
  justify-content: flex-end;
  padding-top: 18px;
}
.cta{
  font-size: var(--t11);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--c1);
  opacity: 0.82;
  border-bottom: 1px solid color-mix(in srgb, var(--c1) 18%, transparent);
  padding-bottom: 8px;
}
.cta:hover{
  opacity: 1;
  color: var(--c3);
  border-bottom-color: color-mix(in srgb, var(--c3) 22%, transparent);
}

/* Mobile */
@media (max-width: 780px){
  .rail{
    --tileW: 78vw;
    --tileH: 520px;
    --edgePad: 14px;
  }
}
`;
