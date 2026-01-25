export default function VideoPeek() {
  return (
    <section className="videoPeek" id="video" aria-label="Video">
      <style>{css}</style>

      <div className="fullBleed">
        <div className="videoOuter" aria-hidden>
          <div className="videoFrame">
            <iframe
              className="video"
              src="https://player.vimeo.com/video/1150126676?h=2b9851b0d2&badge=0&autopause=0&player_id=0&app_id=58479"
              title="BAGVED video"
              frameBorder={0}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
.videoPeek{
  margin-top: clamp(-92px, -7vh, -48px);
  padding-top: clamp(26px, 4vh, 44px);
  padding-bottom: clamp(72px, 9vw, 140px);
}

/* Outer breathing room */
.videoOuter{
  padding: clamp(14px, 2.6vw, 26px);
}

/* Frame: NO border. Clean cut. */
.videoFrame{
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;

  border: 0;            /* ✅ remove frame border */
  outline: 0;
  border-radius: 0;
  background: transparent;
}

/* Vimeo iframe */
.video{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

/* Mobile */
@media (max-width: 720px){
  .videoPeek{
    margin-top: -44px;
    padding-top: 18px;
    padding-bottom: 84px;
  }

  .videoOuter{
    padding: 12px;
  }

  .videoFrame{
    aspect-ratio: 4 / 3;
  }

  /* ✅ slight overscan to avoid “edge lines” on mobile */
  .video{
    width: 102%;
    height: 102%;
    left: -1%;
    top: -1%;
  }
}
`;
