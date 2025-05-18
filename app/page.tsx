// app/page.tsx
"use client";
import {
	HeroSection,
	FeaturesSection,
	TestimonialsSection,
	CtaSection,
} from "@/components/sections";

export default function Home() {
	return (
		<>
			<HeroSection />
			<FeaturesSection />
			<TestimonialsSection />
			<CtaSection />
		</>
	);
}
