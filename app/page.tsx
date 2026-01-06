import BrandSection from "../components/sections/BrandSection";
import VideoSection from "../components/sections/VideoSection";
import ContactSection from "../components/sections/ContactSection";
import ServicesSection from "../components/sections/ServicesSection";
import CasesSection from "../components/sections/CasesSection";

export default function HomePage() {
  return (
    <>
      <BrandSection />
      <VideoSection />
      <ContactSection />
      <ServicesSection />
      <CasesSection />
      {/* Footer is global in layout.tsx */}
    </>
  );
}
