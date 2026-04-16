import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getDocuments } from "outstatic/server";
import BlogListClient from "@/components/pages/blog-list-client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "blog.metadata" });

	return {
		title: t("title"),
		description: t("description"),
		openGraph: {
			title: t("ogTitle"),
			description: t("ogDescription"),
			type: "website",
			locale: locale === "fr" ? "fr_FR" : "en_US",
			url: `https://wisetwin.eu/${locale}/blog`,
		},
		alternates: {
			canonical: `https://wisetwin.eu/${locale}/blog`,
			languages: {
				fr: "https://wisetwin.eu/fr/blog",
				en: "https://wisetwin.eu/en/blog",
			},
		},
	};
}

const postFields = [
	"title",
	"publishedAt",
	"slug",
	"description",
	"coverImage",
	"author",
] as const;

export default async function BlogPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const collection = `posts-${locale}`;
	const posts = getDocuments(collection, [...postFields]);

	return <BlogListClient posts={posts} />;
}
