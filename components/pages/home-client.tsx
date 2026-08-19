"use client";

import {
	HeroSection,
	TrustedBySection,
	ConvictionsSection,
	TeamSection,
	TestimonialsSection,
	ExpertisesSection,
	MethodSection,
	ToolsSection,
	TerritorySection,
	BlogSection,
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
			<ConvictionsSection />
			<TeamSection />
			<TestimonialsSection />
			<ExpertisesSection />
			<MethodSection />
			<ToolsSection />
			<TerritorySection />
			<BlogSection posts={latestPosts} />
			<ContactSection />
		</>
	);
}
