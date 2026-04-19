// app/page.tsx — FORSIDEN
//
// RÆKKEFØLGE AF SEKTIONER (top til bund):
//   1. HomeHero        — stor overskrift + knapper
//   2. VideoPeek       — Vimeo-videoafspilleren (kun desktop, skjult på mobil)
//   3. ServicesRail    — vandret scroll-rail med eksempel-fliser
//   4. ContactTeaser   — kontaktformular og typewriter-tekst
//
// På MOBIL er videoen i stedet placeret inde i HomeHero (se HomeHero.tsx).
// De to videoer er separate for at undgå konflikter med autoplay.

import HomeHero from "../components/sections/HomeHero";
import VideoPeek from "../components/sections/VideoPeek";
import ServicesRail from "../components/sections/ServicesRail";
import ContactTeaserSection from "../components/sections/ContactTeaser";

export default function Page() {
  return (
    <>
      <HomeHero />

      {/* Desktop-video: skjules automatisk på skærme <= 720px */}
      <div className="desktopVideo">
        <style>{`@media(max-width:720px){.desktopVideo{display:none !important;visibility:hidden;pointer-events:none;}}`}</style>
        <VideoPeek />
      </div>

      <ServicesRail />
      <ContactTeaserSection />
    </>
  );
}
