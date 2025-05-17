// app/page.tsx
import {
	HeroSection,
	FeaturesSection,
	HowItWorksSection,
	TrackingSection,
	PricingSection,
	ContactSection,
} from "@/components/sections";

export default function Home() {
	return (
		<>
			<HeroSection />
			<FeaturesSection />
			<HowItWorksSection />
			<TrackingSection />
			<PricingSection />
			<ContactSection />
		</>
	);
}
