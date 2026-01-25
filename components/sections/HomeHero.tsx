export default function HomeHero() {
  return (
    <section className="homeHero" aria-label="Home hero">
      <style>{css}</style>

      <div className="container heroWrap">
        <div className="heroGrid">
          {/* LEFT: landscape, lower */}
          <div className="imgFrame left" aria-hidden>
            <div className="imgBg leftBg" />
          </div>

          {/* RIGHT: portrait, higher, but CONTROLLED height */}
          <div className="imgFrame right" aria-hidden>
            <div className="imgBg rightBg" />
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
/* As before: airy “gallery” hero */
.homeHero{
  height: clamp(420px, 60vh, 720px);
  padding: 22px 0 0;
}

.heroWrap{
  height: 100%;
  display: grid;
  align-items: stretch;
}

/* Big air between */
.heroGrid{
  height: 100%;
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  column-gap: clamp(34px, 7vw, 110px);
  align-items: start;
}

/* Shared frame */
.imgFrame{
  position: relative;
  overflow: hidden;              /* ✅ always crops */
  border-radius: 0;
  border: 1px solid var(--border);
  background: transparent;
}

/* Image layer */
.imgBg{
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: saturate(1.02) contrast(1.02);
}

/* LEFT: landscape, placed lower */
.left{
  width: min(760px, 100%);
  height: clamp(220px, 34vh, 360px);  /* ✅ controlled “landscape” height */
  justify-self: start;
  margin-top: clamp(90px, 10vh, 160px);
}

/* RIGHT: portrait, placed higher, goes LOWER than left BUT stops */
.right{
  width: min(620px, 100%);
  height: clamp(320px, 52vh, 640px);  /* ✅ taller than left, still finite */
  justify-self: end;
  margin-top: clamp(18px, 2.5vh, 46px);
}

/* Tune the crop so portrait feels right */
.leftBg{ background-image: url("/hero-left.jpg"); background-position: center 45%; }
.rightBg{ background-image: url("/hero-right.jpg"); background-position: center 22%; }

/* Mobile: stack */
@media (max-width: 900px){
  .homeHero{
    height: auto;
    padding-top: 14px;
  }

  .heroGrid{
    grid-template-columns: 1fr;
    row-gap: 18px;
  }

  .left{
    width: 100%;
    height: 220px;
    margin-top: 40px;
  }

  .right{
    width: 100%;
    height: 360px; /* portrait vibe, still controlled */
    margin-top: 0px;
  }
}
`;
