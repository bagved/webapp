export default function HomeHero() {
  return (
    <section className="homeHero" aria-label="Home hero">
      <style>{css}</style>

      <div className="container heroWrap">
        <div className="heroGrid">
          {/* LEFT COLUMN: Heading + Paragraph text */}
          <div className="leftCol">
            <div className="heroText" aria-hidden>
              <div className="heroBig">BAGVED det gode udtryk.</div>
              <div className="heroSub">
                Bagved leverer video, livestream og AV, der får jeres møder og events til at se knivskarpe ud — og føles lette at afvikle. Vi tager ansvar for hele setup'et fra plan til sidste frame, så I står med et professionelt udtryk, stabil lyd og billede og en produktion der kører roligt på dagen. Ingen rod, ingen stress — bare et format, der holder opmærksomheden og får budskabet helt igennem.
              </div>
            </div>
          </div>

          {/* RIGHT: portrait image */}
          <div className="imgFrame right" aria-hidden>
            <div className="imgBg rightBg" />
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
.homeHero{
  height: clamp(420px, 60vh, 720px);
  padding: 22px 0 0;
}

.heroWrap{
  height: 100%;
  display: grid;
  align-items: stretch;
}

.heroGrid{
  height: 100%;
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  column-gap: clamp(34px, 7vw, 110px);
  align-items: start;
}

.leftCol{
  position: relative;
  height: 100%;
  display: grid;
  align-content: start;

  /* ✅ allow the long text to flow visually without clipping */
  overflow: visible;
}

/* ✅ lines are “double length” / long editorial measure */
.heroText{
  position: absolute;
  left: 0;
  top: clamp(8px, 1.2vh, 14px);

  /* long line length (feels ~2x compared to the left frame) */
  width: min(72ch, calc(100vw - 80px));
  z-index: 3;
  pointer-events: none;
}

/* BIG line */
.heroBig{
  font-family: var(--font-body);
  color: var(--c1);
  font-weight: 650;
  letter-spacing: -0.03em;
  line-height: 1.02;
  font-size: clamp(34px, 4.2vw, 64px);
  text-wrap: balance;
}

/* smaller line */
.heroSub{
  margin-top: clamp(10px, 1.4vw, 14px);
  transform: translateY(-14px);
  font-family: var(--font-body);
  color: var(--c1);
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.42;
  font-size: clamp(13px, 0.95vw, 15px);
  opacity: 0.85;
  text-wrap: balance;
  max-width: 70ch;
}

/* Frames */
.imgFrame{
  position: relative;
  overflow: hidden;
  border-radius: 0;
  border: 1px solid var(--border);
  background: transparent;
}

.imgBg{
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: saturate(1.02) contrast(1.02);
}

/* LEFT image - HIDDEN */
.left{
  display: none;
}

/* RIGHT image */
.right{
  width: min(620px, 100%);
  height: clamp(320px, 52vh, 640px);
  justify-self: end;
  margin-top: clamp(18px, 2.5vh, 46px);
}

.leftBg{ background-image: url("/hero-left.jpg"); background-position: center 45%; }
.rightBg{ background-image: url("/hero-right.jpg"); background-position: center 22%; }

/* Mobile */
@media (max-width: 900px){
  .homeHero{
    height: auto;
    padding-top: 14px;
  }

  .heroGrid{
    grid-template-columns: 1fr;
    row-gap: 18px;
  }

  .heroText{
    position: relative;
    top: auto;
    left: auto;
    width: 100%;
    margin-bottom: 14px;
    pointer-events: auto;
  }

  .heroBig{
    font-size: clamp(30px, 9vw, 44px);
    line-height: 1.06;
  }

  .heroSub{
    font-size: 14px;
  }

  .left{
    width: 100%;
    height: 240px;
    margin-top: 10px;
  }

  .right{
    width: 100%;
    height: 360px;
    margin-top: 0px;
  }
}
`;
