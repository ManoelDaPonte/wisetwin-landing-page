import { Metadata } from "next";
import HomeClient from "@/components/pages/home-client";
import { getLatestPosts } from "@/lib/blog";

export const metadata: Metadata = {
	title: "WiseTwin - Solutions innovantes pour la sécurité",
	description:
		"Transformez votre formation industrielle avec nos solutions VR immersives. WiseTour, WiseTrainer, WiseScan et WiseAssist pour optimiser vos processus et former vos équipes.",
	keywords: [
		"réalité virtuelle",
		"industrie 4.0",
		"formation industrielle",
		"VR",
		"simulation",
		"maintenance prédictive",
		"formation sécurité",
		"jumeau numérique",
	],
	openGraph: {
		title: "WiseTwin - Solutions innovantes pour la sécurité",
		description:
			"Transformez votre formation industrielle avec nos solutions VR immersives",
		type: "website",
		locale: "fr_FR",
	},
	twitter: {
		card: "summary_large_image",
		title: "WiseTwin - Solutions innovantes pour la sécurité",
		description:
			"Transformez votre formation industrielle avec nos solutions VR immersives",
	},
	alternates: {
		canonical: "https://wisetwin.fr",
	},
};

export default async function Home() {
	const blogPosts = await getLatestPosts();

	return <HomeClient blogPosts={blogPosts} />;
}
