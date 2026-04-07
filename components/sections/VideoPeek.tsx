import Link from "next/link";
import Script from "next/script";

export default function VideoPeek() {
  return (
    <section className="videoPeek" id="video" aria-label="Video">
      <style>{css}</style>
      <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />

      <div className="videoOuter">
        <div className="videoFrame">
          <iframe
            className="video"
            src="https://player.vimeo.com/video/1180113395?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1"
            title="homepage"
            style={{ border: 0 }}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <div className="vpCtaRow">
          <Link className="vpBtn" href="/services">Se alle ydelser →</Link>
        </div>
      </div>
    </section>
  );
}

const css = `
.videoPeek{
  padding-bottom: clamp(72px, 9vw, 140px);
}

.videoOuter{
  padding: 0 clamp(14px, 2.6vw, 26px);
}

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
