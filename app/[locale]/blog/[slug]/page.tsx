import { Metadata } from "next";
import { getDocumentBySlug, getDocuments } from "outstatic/server";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";
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

	const post = getDocumentBySlug(collection, slug, [
		"title",
		"publishedAt",
		"slug",
		"author",
		"content",
		"coverImage",
		"description",
	]);

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

	const contentHtml = await markdownToHtml(post.content || "");

	return (
		<BlogPostClient
			title={post.title}
			publishedAt={post.publishedAt}
			author={post.author}
			coverImage={post.coverImage}
			contentHtml={contentHtml}
		/>
	);
}
