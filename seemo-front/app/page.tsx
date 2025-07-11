import HeroSection from "@/components/hero-section";
import IntegrationsSection from "@/components/integrations-3";
import LogoCloud from "@/components/logo-cloud";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogoCloud />
      <IntegrationsSection />
      <Testimonials />
    </>
  );
}
