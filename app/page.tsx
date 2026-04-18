import HomeHero from "../components/sections/HomeHero";
import VideoPeek from "../components/sections/VideoPeek";
import ServicesRail from "../components/sections/ServicesRail";
import ContactTeaserSection from "../components/sections/ContactTeaser";

export default function Page() {
  return (
    <>
      <HomeHero />
      <div className="desktopVideo">
        <style>{`@media(max-width:720px){.desktopVideo{display:none !important;visibility:hidden;pointer-events:none;}}`}</style>
        <VideoPeek />
      </div>
      <ServicesRail />
      <ContactTeaserSection />
    </>
  );
}
