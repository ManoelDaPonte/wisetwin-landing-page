// app/solutions/wisetour/page.tsx
"use client";
import {
	HeroWiseTourSection,
	FeaturesWiseTourSection,
} from "@/components/wisetour";
import { CtaSection } from "@/components/sections/cta-section";

export default function WiseTourPage() {
	return (
		<>
			<HeroWiseTourSection />
			<FeaturesWiseTourSection />
			<CtaSection />
		</>
	);
}
