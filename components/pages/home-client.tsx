"use client";

import {
	HeroSection,
	TrustedBySection,
	ConvictionsSection,
	TeamSection,
	// TestimonialsSection, — désactivé en attendant les vraies vidéos clients
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

export default function HomeClient({
	latestPosts,
}: {
	latestPosts: Post[];
	// Conservé pour la réactivation des témoignages (pool public/videos/temoignages/)
	testimonialVideos: string[];
}) {
	return (
		<>
			<HeroSection />
			<TrustedBySection />
			<ConvictionsSection />
			<TeamSection />
			{/* Témoignages clients : réactiver quand on aura de vraies vidéos.
			    ⚠️ En le réactivant (variant muted), rebasculer l'alternance des fonds :
			    expertises → default, method → muted, tools → default
			<TestimonialsSection videoPool={testimonialVideos} /> */}
			<ExpertisesSection />
			<MethodSection />
			<ToolsSection />
			<TerritorySection />
			<BlogSection posts={latestPosts} />
			<ContactSection />
		</>
	);
}
