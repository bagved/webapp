"use client";
import { useI18n } from "@/components/i18n/LanguageProvider";

// Native homepage video. Set NEXT_PUBLIC_HOMEPAGE_VIDEO_URL to the approved
// direct MP4/WebM URL. Until a file is available, retain an image rather than
// a broken video URL or a third-party player.

import Link from "@/components/i18n/LocalizedLink";
import InView from "../motion/InView";
import { revealFade } from "../motion/reveal";
import HomepageVideo from "./HomepageVideo";

export default function VideoPeek() {
  const { t } = useI18n();
  return (
    <section className="videoPeek" id="video" aria-label={t("Video")}>
      <style>{css}</style>

      <div className="videoOuter">
        {/* revealFade = kun ind-toning, ingen bevægelse. En video der glider
            i position kan flimre, fordi browseren tegner videolaget om. */}
        <InView className="videoFrame" variants={revealFade}>
          <HomepageVideo className="video" src={process.env.NEXT_PUBLIC_HOMEPAGE_VIDEO_URL}
            poster="/photos/Livestream.jpg" />
        </InView>

        {/* Knap under videoen — på mobil er denne skjult via CSS i HomeHero */}
        <InView className="vpCtaRow" delay={0.12}>
          <Link className="vpBtn" href="/services">{t("Se alle ydelser →")}</Link>
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
  object-fit: cover;
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
