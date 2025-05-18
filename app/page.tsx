// app/page.tsx
"use client";
import {
	HeroSection,
	FeaturesSection,
	ProcessSection,
	TestimonialsSection,
	CtaSection,
} from "@/components/sections";

export default function Home() {
	return (
		<>
			<HeroSection />
			<FeaturesSection />
			<ProcessSection />
			<TestimonialsSection />
			<CtaSection />
		</>
	);
}
