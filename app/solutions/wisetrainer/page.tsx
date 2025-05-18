"use client";
import {
	HeroWiseTrainerSection,
	FeaturesWiseTrainerSection,
} from "@/components/wisetrainer";
import { ProblemsSection } from "@/components/sections/problems-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { CtaSection } from "@/components/sections/cta-section";

export default function WiseTrainerPage() {
	return (
		<>
			<HeroWiseTrainerSection />
			<FeaturesWiseTrainerSection />
			<ProblemsSection />
			<TechnologySection />
			<CtaSection />
		</>
	);
}
