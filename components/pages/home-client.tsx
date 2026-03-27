"use client";

import {
	HeroSection,
	TrustedBySection,
	SolutionsSection,
	SecuritySection,
	FaqSection,
	ContactSection,
} from "@/components/sections";

export default function HomeClient() {
	return (
		<>
			<HeroSection />
			<TrustedBySection />
			<SolutionsSection />
			<SecuritySection />
			<FaqSection />
			<ContactSection />
		</>
	);
}
