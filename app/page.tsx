// app/page.tsx
import {
  Header,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  TrackingSection,
  PricingSection,
  ContactSection,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TrackingSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </div>
  );
}