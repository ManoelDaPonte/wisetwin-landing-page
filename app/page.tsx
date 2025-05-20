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
	ContactSection,
	ProfilesSection,
} from "@/components/sections";
export default function Home() {
	return (
		<>
			<HeroSection />
			<SolutionsSection />
			<FeaturesSection />
			<ProfilesSection />
			<ProblemsSection />
			<TechnologySection />
			<MarketsSection />
			<TestimonialsSection />
			<TeamSection />
			<ContactSection />
			{/* <CtaSection /> */}
		</>
	);
}
