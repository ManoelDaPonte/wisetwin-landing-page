"use client";

import {
	HeroSection,
	TrustedBySection,
	StatsSection,
	ConvictionsSection,
	ExpertisesSection,
	MethodSection,
	ToolsSection,
	TerritorySection,
	TestimonialsSection,
	TeamSection,
	BlogSection,
	FaqSection,
	ContactSection,
} from "@/components/sections";

type Post = {
	title: string;
	publishedAt: string;
	slug: string;
	description: string;
	coverImage: string;
	readingTime: number;
};

export default function HomeClient({ latestPosts }: { latestPosts: Post[] }) {
	return (
		<>
			<HeroSection />
			<TrustedBySection />
			<StatsSection />
			<ConvictionsSection />
			<ExpertisesSection />
			<MethodSection />
			<ToolsSection />
			<TerritorySection />
			<TestimonialsSection />
			<TeamSection />
			<BlogSection posts={latestPosts} />
			<FaqSection />
			<ContactSection />
		</>
	);
}
