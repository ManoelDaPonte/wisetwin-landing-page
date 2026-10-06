"use client";

import {
	HeroSequence,
	TrustedBySection,
	TeamSection,
	// TestimonialsSection, — désactivé en attendant les vraies vidéos clients
	MethodSection,
	ToolsSection,
	TerritorySection,
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

// Home allégée (branche feat/home-premium) : la séquence du cube remplace le hero,
// les convictions et les savoir-faire ; le blog n'est plus sur la home (menu + footer).
export default function HomeClient(_props: {
	latestPosts: Post[];
	// Conservé pour la réactivation des témoignages (pool public/videos/temoignages/)
	testimonialVideos: string[];
}) {
	return (
		<>
			<HeroSequence />
			<TrustedBySection />
			<ToolsSection />
			<MethodSection />
			<TeamSection />
			<TerritorySection />
			<ContactSection />
		</>
	);
}
