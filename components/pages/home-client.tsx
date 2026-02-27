"use client";

import { Plus } from "lucide-react";
import {
	HeroSection,
	TrustedBySection,
	AdvantagesSection,
	SolutionsSection,
	PricingSection,
	// PricingCalculatorSection,
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
			{/* Plus separator between Solutions and Pricing */}
			<div className="flex items-center justify-center py-6 max-w-5xl mx-auto px-6">
				<div className="flex-1 h-px bg-border" />
				<div className="mx-6 size-12 bg-secondary/10 rounded-full flex items-center justify-center">
					<Plus className="size-6 text-secondary" />
				</div>
				<div className="flex-1 h-px bg-border" />
			</div>
			<PricingSection />
			{/* <PricingCalculatorSection /> */}
			<SecuritySection />
			<FaqSection />
			<ContactSection />
		</>
	);
}
