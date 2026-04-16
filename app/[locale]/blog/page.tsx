import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { load } from "outstatic/server";

export const dynamic = "force-dynamic";
import BlogListClient from "@/components/pages/blog-list-client";
import { getReadingTime } from "@/lib/reading-time";

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

export default async function BlogPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const collection = `posts-${locale}`;
	const db = await load();
	const rawPosts = await db
		.find({ collection, status: "published" })
		.project(["title", "publishedAt", "slug", "description", "coverImage", "image", "author", "content"])
		.sort({ publishedAt: -1 })
		.toArray();

	const posts = rawPosts.map((post: Record<string, unknown>) => ({
		title: (post.title as string) || "",
		publishedAt: (post.publishedAt as string) || "",
		slug: (post.slug as string) || "",
		description: (post.description as string) || "",
		coverImage: (post.coverImage as string) || (post.image as string) || "",
		author: post.author as { name: string } | string,
		readingTime: getReadingTime((post.content as string) || ""),
	}));

	return <BlogListClient posts={posts} />;
}
