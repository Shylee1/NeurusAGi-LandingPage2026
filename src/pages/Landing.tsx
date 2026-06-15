import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/features/HeroSection";
import ManifestoSection from "@/components/features/ManifestoSection";
import ArchSection from "@/components/features/ArchSection";
import IntelligenceSection from "@/components/features/IntelligenceSection";
import SafetySection from "@/components/features/SafetySection";
import CapabilitiesSection from "@/components/features/CapabilitiesSection";
import ContactSection from "@/components/features/ContactSection";
import FooterSection from "@/components/features/FooterSection";
import CustomCursor from "@/components/features/CustomCursor";

export default function Landing() {
  return (
    <div className="bg-void min-h-screen overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <ManifestoSection />
        <ArchSection />
        <IntelligenceSection />
        <SafetySection />
        <CapabilitiesSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}
