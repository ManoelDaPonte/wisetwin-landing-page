// app/page.tsx
"use client";
import {
	HeroSection,
	SolutionSection,
	FeaturesSection,
	ProblemsSection,
	TechnologySection,
	MarketsSection,
	TestimonialsSection,
	TeamSection,
	CtaSection,
} from "@/components/sections";

export default function Home() {
	return (
		<>
			<HeroSection />
			<SolutionSection />
			<FeaturesSection />
			<ProblemsSection />
			<TechnologySection />
			<MarketsSection />
			<TestimonialsSection />
			<TeamSection />
			<CtaSection />
		</>
	);
}
