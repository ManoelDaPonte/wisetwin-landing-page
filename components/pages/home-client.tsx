"use client";

import {
	HeroSection,
	TrustedBySection,
	ConvictionsSection,
	ExpertisesSection,
	MethodSection,
	ToolsSection,
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
			<ConvictionsSection />
			<ExpertisesSection />
			<MethodSection />
			<ToolsSection />
			<TestimonialsSection />
			<TeamSection />
			<BlogSection posts={latestPosts} />
			<FaqSection />
			<ContactSection />
		</>
	);
}
