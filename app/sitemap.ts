import { MetadataRoute } from "next";
import { getDocuments } from "outstatic/server";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://wisetwin.eu";

	const routes = [
		{ path: "", priority: 1 },
		{ path: "/blog", priority: 0.8 },
		{ path: "/faq", priority: 0.8 },
		{ path: "/solutions/wisetrainer", priority: 0.9 },
		{ path: "/solutions/wiseatlas", priority: 0.8 },
		{ path: "/legal", priority: 0.3 },
		{ path: "/privacy", priority: 0.3 },
		{ path: "/terms", priority: 0.3 },
	];

	const staticEntries = routes.flatMap((route) => [
		{
			url: `${baseUrl}/fr${route.path}`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: route.priority,
			alternates: {
				languages: {
					fr: `${baseUrl}/fr${route.path}`,
					en: `${baseUrl}/en${route.path}`,
				},
			},
		},
		{
			url: `${baseUrl}/en${route.path}`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: route.priority,
			alternates: {
				languages: {
					fr: `${baseUrl}/fr${route.path}`,
					en: `${baseUrl}/en${route.path}`,
				},
			},
		},
	]);

	// Blog posts
	const postsFr = getDocuments("posts-fr", ["slug", "publishedAt"]);
	const postsEn = getDocuments("posts-en", ["slug", "publishedAt"]);

	const blogEntries = [
		...postsFr.map((post) => ({
			url: `${baseUrl}/fr/blog/${post.slug}`,
			lastModified: new Date(post.publishedAt),
			changeFrequency: "weekly" as const,
			priority: 0.7,
		})),
		...postsEn.map((post) => ({
			url: `${baseUrl}/en/blog/${post.slug}`,
			lastModified: new Date(post.publishedAt),
			changeFrequency: "weekly" as const,
			priority: 0.7,
		})),
	];

	return [...staticEntries, ...blogEntries];
}
