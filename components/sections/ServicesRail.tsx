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
        img: "/photos/Livestream.jpg",
        title: "LIVESTREAM",
        subtitle: "Live & broadcast",
        href: "/cases?cat=live-broadcast&case=livestream",
      },
      {
        id: "sportsbroadcast",
        img: "/photos/sportsbroadcast.jpg",
        title: "SPORTSBROADCAST",
        subtitle: "Live & broadcast",
        href: "/cases?cat=live-broadcast&case=sportsbroadcast",
      },
      {
        id: "webinar-studieproduktion",
        img: "/photos/studie_pre.jpg",
        title: "WEBINAR & STUDIEPRODUKTION",
        subtitle: "Live & broadcast",
        href: "/cases?cat=live-broadcast&case=webinar-studieproduktion",
      },
      // {
      //   id: "reklamefilm",
      //   img: "/photos/virksomhedsfilm.jpg",
      //   title: "REKLAMEFILM",
      //   subtitle: "Virksomhedsfilm & reklame",
      //   href: "/cases?cat=virksomhedsfilm-reklame&case=reklamefilm",
      // },
      {
        id: "virksomhedsvideo",
        img: "/photos/virksomhedsfilm.jpg",
        title: "VIRKSOMHEDSVIDEO",
        subtitle: "Virksomhedsfilm & reklame",
        href: "/cases?cat=virksomhedsfilm-reklame&case=virksomhedsvideo",
      },
      // {
      //   id: "produktvideo",
      //   img: "/photos/produktfilm.jpg",
      //   title: "PRODUKTVIDEO",
      //   subtitle: "Virksomhedsfilm & reklame",
      //   href: "/cases?cat=virksomhedsfilm-reklame&case=produktvideo",
      // },
      // {
      //   id: "sociale-medier",
      //   img: "/photos/eventfilm.jpg",
      //   title: "VIDEO TIL SOCIALE MEDIER",
      //   subtitle: "Sociale medier",
      //   href: "/cases?cat=sociale-medier&case=sociale-medier",
      // },
      {
        id: "eventvideo",
        img: "/photos/eventfilm.jpg",
        title: "EVENTVIDEO",
        subtitle: "Eventvideo & eventteknik",
        href: "/cases?cat=eventvideo-eventteknik&case=eventvideo",
      },
      {
        id: "eventteknik",
        img: "/photos/lys_lyd_pre.jpg",
        title: "LYD, LYS & EVENTTEKNIK",
        subtitle: "Eventvideo & eventteknik",
        href: "/cases?cat=eventvideo-eventteknik&case=eventteknik",
      },
      // {
      //   id: "drone",
      //   img: "/photos/sports_pre.jpg",
      //   title: "DRONEVIDEO & DRONEBILLEDER",
      //   subtitle: "Foto & drone",
      //   href: "/cases?cat=foto-drone&case=drone",
      // },
      // {
      //   id: "stillfoto",
      //   img: "/photos/produktfilm.jpg",
      //   title: "STILLFOTO & BILLEDREDIGERING",
      //   subtitle: "Foto & drone",
      //   href: "/cases?cat=foto-drone&case=stillfoto",
      // },
    ],
    []
  );

  const railRef = useRef<HTMLDivElement | null>(null);

  const [active, setActive] = useState(0);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [progress, setProgress] = useState(0);

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

          <p className="railHint">Swipe for at se alle ydelser</p>

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

          <div className="srvCtaRow">
            <Link className="srvCta" href="/cases">
              Se alle eksempler →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
.fullBleed{
  background: var(--color-primary);
}

.wrap{
  position: relative;
  padding: 32px 0 20px;
}

.railHint{
  margin: 0 0 10px;
  padding: 0 clamp(18px, 3.2vw, 44px);
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-bg) 38%, transparent);
}

.rail{
  --tileW: 360px;
  --tileH: 520px;
  --edgePad: clamp(18px, 3.2vw, 44px);
  --gap: clamp(26px, 4.4vw, 64px);

  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: var(--tileW);
  gap: var(--gap);

  overflow-x: auto;
  overflow-y: visible;

  padding: 10px var(--edgePad) 14px;
  scroll-padding-left: var(--edgePad);
  scroll-padding-right: var(--edgePad);

  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  justify-content: start;
}
.rail::-webkit-scrollbar{ display:none; }

.tile{
  scroll-snap-align: center;
  position: relative;
  height: var(--tileH);
  text-decoration: none;
  color: inherit;

  border-radius: 0;
  background: color-mix(in srgb, var(--color-secondary) 18%, var(--color-primary));
  border: 1px solid color-mix(in srgb, var(--color-secondary) 30%, transparent);

  transition:
    transform 320ms cubic-bezier(.18,1,.22,1),
    opacity 200ms ease,
    border-color 220ms ease,
    background 220ms ease;
}

.idle{
  opacity: 0.45;
  transform: scale(0.94);
  background: color-mix(in srgb, var(--color-secondary) 10%, var(--color-primary));
  border-color: color-mix(in srgb, var(--color-secondary) 18%, transparent);
}

.active{
  opacity: 1;
  transform: scale(1);
  border-color: var(--color-secondary);
  background: color-mix(in srgb, var(--color-secondary) 38%, var(--color-primary));
}
.active .t1{
  color: var(--color-secondary);
}
.active .t2{
  color: color-mix(in srgb, var(--color-secondary) 70%, transparent);
}
.active .t1{
  color: var(--color-accent);
}
.active .t2{
  color: color-mix(in srgb, var(--color-accent) 72%, transparent);
}

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
  background-size: cover;
  filter: saturate(1.02) contrast(1.04);
}

.fade{
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    transparent 38%,
    color-mix(in srgb, var(--color-primary) 55%, transparent) 72%,
    color-mix(in srgb, var(--color-primary) 90%, transparent) 100%
  );
  pointer-events: none;
}

.active .fade{
  background: linear-gradient(
    180deg,
    transparent 0%,
    transparent 36%,
    color-mix(in srgb, var(--color-secondary) 28%, var(--color-primary) 55%) 70%,
    color-mix(in srgb, var(--color-secondary) 44%, var(--color-primary) 88%) 100%
  );
}

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
  color: color-mix(in srgb, var(--color-bg) 88%, transparent);
  transition: color 220ms ease;
}

.t2{
  margin-top: 10px;
  font-size: var(--t11);
  font-weight: 800;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-bg) 52%, transparent);
  transition: color 220ms ease;
}

@media (hover:hover){
  .tile:hover{
    border-color: var(--color-secondary);
    background: color-mix(in srgb, var(--color-secondary) 38%, var(--color-primary));
  }
  .tile:hover .t1{
    color: var(--color-secondary);
  }
  .tile:hover .t2{
    color: color-mix(in srgb, var(--color-secondary) 70%, transparent);
  }
}

.bar{
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
  gap: 10px;
  padding: 14px 0 0;
  opacity: 0.85;
}

.track{
  height: 1px;
  background: color-mix(in srgb, var(--color-secondary) 35%, transparent);
  position: relative;
  overflow: hidden;
}

.fill{
  position: absolute;
  inset: 0;
  background: var(--color-secondary);
  transform-origin: left center;
}

.hint{
  font-size: 14px;
  font-weight: 900;
  color: var(--color-secondary);
  opacity: 0;
  transition: opacity 160ms ease;
  text-align: center;
}
.hint.on{ opacity: 1; }

.srvCtaRow{
  display: flex;
  justify-content: flex-end;
  padding-top: 18px;
  padding-right: clamp(18px, 3.2vw, 44px);
}
.srvCta{
  font-family: var(--font-body);
  font-size: var(--t14);
  font-weight: 400;
  letter-spacing: 0;
  color: color-mix(in srgb, var(--color-bg) 72%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--color-bg) 18%, transparent);
  padding-bottom: 4px;
  transition: color 150ms ease, border-color 150ms ease;
}
.srvCta:hover{
  color: var(--color-secondary);
  border-bottom-color: color-mix(in srgb, var(--color-secondary) 40%, transparent);
}

@media (max-width: 780px){
  .rail{
    --tileW: 78vw;
    --tileH: 520px;
    --edgePad: 14px;
  }
}
`;