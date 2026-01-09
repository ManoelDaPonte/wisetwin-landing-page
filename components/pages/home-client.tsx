"use client";

import {
	HeroSection,
	TrustedBySection,
	AdvantagesSection,
	SolutionsSection,
	PricingSection,
	PricingCalculatorSection,
	SecuritySection,
	FaqSection,
	ContactSection,
} from "@/components/sections";

export default function HomeClient() {
	return (
		<>
			<HeroSection />
			<TrustedBySection />
			<AdvantagesSection />
			<SolutionsSection />
			<PricingSection />
			<PricingCalculatorSection />
			<SecuritySection />
			<FaqSection />
			<ContactSection />
		</>
	);
}
