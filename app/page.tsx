import { HeroSection } from "@/components/home/hero";
import { ServiceCardsSection } from "@/components/home/service-cards";
import { JourneySection } from "@/components/home/journey";
import { DestinationGridSection } from "@/components/home/destination-grid";
import { CasilleroBandSection } from "@/components/home/casillero-band";
import { FaqSection } from "@/components/home/faq-section";
import { FinalCtaSection } from "@/components/home/final-cta";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServiceCardsSection />
      <JourneySection />
      <DestinationGridSection />
      <CasilleroBandSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
