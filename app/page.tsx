// app/page.tsx
"use client";
import {
	HeroSection,
	SolutionsSection,
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
			<SolutionsSection />
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
