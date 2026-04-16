import { Metadata } from "next";
import { getDocumentBySlug, getDocuments, load } from "outstatic/server";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";
import { getReadingTime } from "@/lib/reading-time";
import BlogPostClient from "@/components/pages/blog-post-client";
import BlogNotAvailableClient from "@/components/pages/blog-not-available-client";

export async function generateStaticParams() {
	const postsFr = getDocuments("posts-fr", ["slug"]);
	const postsEn = getDocuments("posts-en", ["slug"]);

	const slugs = new Set([
		...postsFr.map((p) => p.slug),
		...postsEn.map((p) => p.slug),
	]);

	return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
	const { locale, slug } = await params;
	const collection = `posts-${locale}`;
	const post = getDocumentBySlug(collection, slug, [
		"title",
		"description",
		"coverImage",
	]);

	if (!post) return {};

	return {
		title: `${post.title} - WiseTwin Blog`,
		description: post.description,
		openGraph: {
			title: post.title,
			description: post.description,
			type: "article",
			locale: locale === "fr" ? "fr_FR" : "en_US",
			url: `https://wisetwin.eu/${locale}/blog/${slug}`,
			...(post.coverImage && {
				images: [{ url: post.coverImage }],
			}),
		},
		alternates: {
			canonical: `https://wisetwin.eu/${locale}/blog/${slug}`,
		},
	};
}

async function markdownToHtml(markdown: string) {
	const result = await remark().use(html).process(markdown);
	return result.toString();
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}) {
	const { locale, slug } = await params;
	const collection = `posts-${locale}`;
	const otherLocale = locale === "fr" ? "en" : "fr";

	const db = await load();
	const post = await db
		.find({ collection, slug, status: "published" })
		.project(["title", "publishedAt", "slug", "author", "content", "coverImage", "image", "description"])
		.first();

	// Article not available in this language — check if it exists in the other
	if (!post) {
		const otherPost = getDocumentBySlug(`posts-${otherLocale}`, slug, [
			"title",
			"slug",
		]);

		if (!otherPost) {
			notFound();
		}

		return (
			<BlogNotAvailableClient
				slug={slug}
				otherLocale={otherLocale}
			/>
		);
	}

	const postData = post as Record<string, unknown>;
	const coverImage = (postData.coverImage as string) || (postData.image as string) || "";

	// Strip cover image from content to avoid duplicate
	let content = (post.content as string) || "";
	if (coverImage) {
		const escapedSrc = coverImage.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		content = content.replace(new RegExp(`!\\[([^\\]]*)\\]\\(${escapedSrc}\\)\\n?`, "g"), "");
	}

	const contentHtml = await markdownToHtml(content);
	const readingTime = getReadingTime(content);

	return (
		<BlogPostClient
			title={post.title}
			publishedAt={post.publishedAt}
			author={post.author}
			contentHtml={contentHtml}
			readingTime={readingTime}
		/>
	);
}
