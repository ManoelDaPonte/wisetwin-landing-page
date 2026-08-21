import { Metadata } from "next";
import { getDocumentBySlug, getDocuments, load } from "outstatic/server";

export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";
import { getReadingTime } from "@/lib/reading-time";
import BlogPostClient from "@/components/pages/blog-post-client";

// Le blog est uniquement en français : la collection posts-fr sert les deux locales
const COLLECTION = "posts-fr";

export async function generateStaticParams() {
	const posts = getDocuments(COLLECTION, ["slug"]);
	return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
	const { locale, slug } = await params;
	const post = getDocumentBySlug(COLLECTION, slug, [
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
	const result = await remark().use(gfm).use(html).process(markdown);
	return result.toString();
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}) {
	const { slug } = await params;

	const db = await load();
	const post = await db
		.find({ collection: COLLECTION, slug, status: "published" })
		.project(["title", "publishedAt", "slug", "author", "content", "coverImage", "image", "description"])
		.first();

	if (!post) {
		notFound();
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
			author={post.author ?? "WiseTwin"}
			contentHtml={contentHtml}
			readingTime={readingTime}
		/>
	);
}
