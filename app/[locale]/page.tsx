import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { load } from "outstatic/server";

export const dynamic = "force-dynamic";
import HomeClient from "@/components/pages/home-client";
import { getReadingTime } from "@/lib/reading-time";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "metadata.home" });

	const keywords =
		locale === "fr"
			? [
					"conseil transformation digitale industrie",
					"développement logiciel industriel sur mesure",
					"digitalisation formation industrielle",
					"formation immersive",
					"simulateur 3D",
					"jumeau numérique",
					"prévention HSE",
					"excellence opérationnelle",
					"application métier sur mesure",
					"intelligence artificielle industrie",
				]
			: [
					"industrial digital transformation consulting",
					"custom industrial software development",
					"industrial training digitization",
					"immersive training",
					"3D simulator",
					"digital twin",
					"HSE prevention",
					"operational excellence",
					"custom business applications",
					"AI for industry",
				];

	return {
		title: t("title"),
		description: t("description"),
		keywords,
		openGraph: {
			title: t("ogTitle"),
			description: t("ogDescription"),
			type: "website",
			locale: locale === "fr" ? "fr_FR" : "en_US",
			url: `https://wisetwin.eu/${locale}`,
		},
		twitter: {
			card: "summary_large_image",
			title: t("ogTitle"),
			description: t("ogDescription"),
		},
		alternates: {
			canonical: `https://wisetwin.eu/${locale}`,
			languages: {
				fr: "https://wisetwin.eu/fr",
				en: "https://wisetwin.eu/en",
			},
		},
	};
}

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const collection = `posts-${locale}`;
	const db = await load();
	const rawPosts = await db
		.find({ collection, status: "published" })
		.project(["title", "publishedAt", "slug", "description", "coverImage", "image", "content"])
		.sort({ publishedAt: -1 })
		.limit(3)
		.toArray();

	const latestPosts = rawPosts.map((post: Record<string, unknown>) => ({
		title: (post.title as string) || "",
		publishedAt: (post.publishedAt as string) || "",
		slug: (post.slug as string) || "",
		description: (post.description as string) || "",
		coverImage: (post.coverImage as string) || (post.image as string) || "",
		readingTime: getReadingTime((post.content as string) || ""),
	}));

	return <HomeClient latestPosts={latestPosts} />;
}
