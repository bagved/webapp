export default function MissionPage() {
  return (
    <main className="missionPage" aria-label="Mission">
      <style>{css}</style>


      <div className="container">

        <section className="mTop">
          <h1 className="mTitle">Vi elsker<br />vores arbejde.</h1>
          <p className="mSubtitle">Om hvem vi er, hvad vi tror på og hvordan vi arbejder.</p>
        </section>

        <section className="mBody">

          <div className="mLeft">
            <div className="mLead">
              <p>
                Vi skaber klare, effektive visuelle løsninger der kommunikerer
                med gennemslagskraft. Fra første idé til færdigt produkt
                arbejder vi tæt på dig hele vejen.
              </p>
            </div>

            <div className="mPhotos" aria-hidden>
              <div className="mPhoto mPhoto1" style={{ backgroundImage: "url('/photos/Mission1.jpg')" }} />
              <div className="mPhoto mPhoto2" style={{ backgroundImage: "url('/photos/mission2.jpg')" }} />
            </div>
          </div>

          <div className="mBlocks">

            <div className="mBlock">
              <div className="mBlockBar mBlockBarAccent" aria-hidden />
              <h2 className="mBlockTitle">Det vi tror på</h2>
              <p className="mBlockBody">
                God video handler ikke om udstyr. Det handler om at forstå
                hvad du vil sige og hvem du siger det til. Vi kombinerer
                strategisk tænkning med kreativt håndværk og et ægte øje
                for fortællingen.
              </p>
            </div>

            <div className="mBlock">
              <div className="mBlockBar mBlockBarSecondary" aria-hidden />
              <h2 className="mBlockTitle">Sådan arbejder vi</h2>
              <p className="mBlockBody">
                Hvert projekt tilpasses dine mål, din målgruppe og dit budget.
                Vi prioriterer samarbejde og ærlighed i alle faser og leverer
                aldrig noget vi ikke selv er stolte af.
              </p>
            </div>

            <div className="mBlock">
              <div className="mBlockBar mBlockBarPrimary" aria-hidden />
              <h2 className="mBlockTitle">Hvem vi er</h2>
              <p className="mBlockBody">
                Bagved er et netværk af specialister inden for video, lyd,
                lys og produktion. Vi bringer de rette folk til hvert
                projekt frem for at skalere unødvendigt.
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}

const css = `
.missionPage{
  position: relative;
  overflow: hidden;
  padding-bottom: clamp(80px, 10vw, 140px);
}


.missionPage .container{ position: relative; z-index: 1; }

.mTop{
  padding: clamp(64px, 8vw, 110px) 0 clamp(40px, 5vw, 64px);
  border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 10%, transparent);
  margin-bottom: clamp(48px, 6vw, 80px);
}

.mSubtitle{
  margin: 16px 0 0;
  font-family: var(--font-body);
  font-size: clamp(14px, 1.2vw, 17px);
  line-height: 1.7;
  color: color-mix(in srgb, var(--color-text) 68%, transparent);
  max-width: 56ch;
}

.mTitle{
  margin: 0;
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: clamp(44px, 7vw, 96px);
  letter-spacing: -0.04em;
  line-height: 0.96;
  color: var(--color-primary);
}

.mBody{
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: clamp(40px, 7vw, 100px);
  align-items: start;
}

.mLeft{
  display: flex;
  flex-direction: column;
  gap: clamp(28px, 4vw, 48px);
}

.mLead p{
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(16px, 1.6vw, 21px);
  font-weight: 500;
  line-height: 1.65;
  color: var(--color-text);
  max-width: 32ch;
}

/* Billedpar — 4:3, stacked med lille offset */
.mPhotos{
  display: grid;
  gap: clamp(8px, 1.2vw, 16px);
}

.mPhoto{
  width: 100%;
  aspect-ratio: 4 / 3;
  background-size: cover;
  background-position: center;
  background-color: color-mix(in srgb, var(--color-secondary) 44%, var(--color-bg));
  border: 1px solid color-mix(in srgb, var(--color-secondary) 80%, transparent);
}

.mPhoto2{
  margin-left: clamp(12px, 1.8vw, 28px);
  margin-right: clamp(-12px, -1.8vw, -28px);
}

.mBlocks{
  display: grid;
  gap: clamp(32px, 4vw, 52px);
}

.mBlock{
  position: relative;
  padding-left: 20px;
}

.mBlockBar{
  position: absolute;
  left: 0;
  top: 4px;
  bottom: 4px;
  width: 3px;
  border-radius: 2px;
}
.mBlockBarAccent{    background: var(--color-accent); }
.mBlockBarSecondary{ background: color-mix(in srgb, var(--color-secondary) 100%, black 12%); }
.mBlockBarPrimary{   background: color-mix(in srgb, var(--color-primary) 36%, transparent); }

.mBlockTitle{
  margin: 0 0 10px;
  font-family: var(--font-heading);
  font-size: clamp(17px, 1.6vw, 22px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-primary);
}

.mBlockBody{
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(14px, 1.2vw, 16px);
  font-weight: 400;
  line-height: 1.75;
  color: color-mix(in srgb, var(--color-text) 78%, transparent);
}

@media (max-width: 780px){
  .mBody{ grid-template-columns: 1fr; gap: 40px; }
  .mLead p{ max-width: 100%; }
  .mPhoto2{ margin-left: 0; margin-right: 0; }
}
`;
