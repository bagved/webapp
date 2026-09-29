"use client";

// components/sections/VideoPeek.tsx — VIDEOAFSPILLER
//
// Videoen hostes hos TwentyThree (mootagency.twentythree.com).
//
// HVAD DU KAN ÆNDRE:
//   Ny video  → hent embed-koden i TwentyThree og indsæt HELE src-URL'en
//               herunder. Token og photo_id hører sammen — et token fra
//               én video virker ikke på en anden, så skift dem samlet.
//   Knap-tekst → skift "Se alle ydelser →" herunder
//   Knap-link  → skift href="/services"
//   Sideafstand → CSS .videoPeek { padding-bottom } — afstand under videoen
//   Sidepadding → CSS .videoOuter { padding } — afstand til siden af skærmen

import Link from "next/link";
import InView from "../motion/InView";
import { revealFade } from "../motion/reveal";

export default function VideoPeek() {
  return (
    <section className="videoPeek" id="video" aria-label="Video">
      <style>{css}</style>

      <div className="videoOuter">
        {/* revealFade = kun ind-toning, ingen bevægelse. En video der glider
            i position kan flimre, fordi browseren tegner videolaget om. */}
        <InView className="videoFrame" variants={revealFade}>
          {/* src: hele embed-URL'en fra TwentyThree */}
          <iframe
            className="video"
            src="https://mootagency.twentythree.com/v.ihtml/player.html?token=de39eac8c2202dff9f3519e2ddd8b52e&source=embed&photo%5fid=131882502"
            title="Video Player"
            /* loading="lazy": afspilleren hentes først når videoen er tæt
               på at være synlig, i stedet for ved sideload. */
            loading="lazy"
            frameBorder={0}
            scrolling="no"
            allowFullScreen
            style={{ border: 0 }}
            allow="autoplay; fullscreen"
          >
            <p>Din browser understøtter ikke iframes, så videoen kan ikke afspilles.</p>
          </iframe>
        </InView>

        {/* Knap under videoen — på mobil er denne skjult via CSS i HomeHero */}
        <InView className="vpCtaRow" delay={0.12}>
          <Link className="vpBtn" href="/services">Se alle ydelser →</Link>
        </InView>
      </div>
    </section>
  );
}

const css = `
/* Afstand under videoen — skalerer fra 72px (mobil) til 140px (stor skærm) */
.videoPeek{
  padding-top: clamp(32px, 4vw, 56px);
  padding-bottom: clamp(36px, 4.5vw, 64px);
}

/* Vandret afstand til skærmkanten — giver videoens "indpakket" look */
.videoOuter{
  padding: 0 clamp(14px, 2.6vw, 26px);
}

/* Videoens beholder — aspect-ratio styrer format (16:9 = standard widescreen) */
/* Skift til 4/3 for et mere firkantet format, 21/9 for ultrawide */
.videoFrame{
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: color-mix(in srgb, var(--color-primary) 6%, var(--color-bg));
}

.video{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.vpCtaRow{
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
}

.vpBtn{
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
  background: var(--color-primary);
  color: var(--color-bg);
  border: 1.5px solid var(--color-primary);
  transition: background 150ms ease, color 150ms ease,
              border-color 150ms ease, transform 120ms ease;
}
.vpBtn:hover{
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-bg);
  transform: translateY(-2px);
}

@media (max-width: 720px){
  .videoFrame{
    aspect-ratio: 4 / 3;
  }
  .video{
    width: 102%;
    height: 102%;
    left: -1%;
    top: -1%;
  }
}
`;
