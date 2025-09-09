"use client";

import {
	HeroSection,
	WiseTrainerSection,
	WiseTrainerAdvantagesSection,
	ProfilesSection,
	PlatformSection,
	TechnologySection,
	FaqSection,
	BlogSection,
	ContactSection,
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
			<WiseTrainerAdvantagesSection />
			<ProfilesSection />
			<PlatformSection />
			<TechnologySection />
			<FaqSection />
			<BlogSection posts={blogPosts} />
			<ContactSection />
		</>
	);
}
