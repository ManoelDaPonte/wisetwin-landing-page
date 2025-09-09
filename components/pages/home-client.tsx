"use client";

import {
	HeroSection,
	WiseTrainerSection,
	FeaturesSection,
	TechnologySection,
	BlogSection,
	ContactSection,
	ProfilesSection,
} from "@/components/sections";
import { BlogPost } from "@/types/blog";

interface HomeClientProps {
	blogPosts: BlogPost[];
}

export default function HomeClient({ blogPosts }: HomeClientProps) {
	return (
		<>
			<HeroSection />
			<WiseTrainerSection />
			<FeaturesSection />
			<ProfilesSection />
			<TechnologySection />
			<BlogSection posts={blogPosts} />
			<ContactSection />
		</>
	);
}
