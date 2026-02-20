import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://wisetwin.eu";
	const locales = ["fr", "en"];

	const routes = [
		{ path: "", priority: 1 },
		{ path: "/faq", priority: 0.8 },
		{ path: "/solutions/wisetrainer", priority: 0.9 },
		{ path: "/solutions/platform", priority: 0.8 },
		{ path: "/legal", priority: 0.3 },
		{ path: "/privacy", priority: 0.3 },
		{ path: "/terms", priority: 0.3 },
	];

	return locales.flatMap((locale) =>
		routes.map((route) => ({
			url: `${baseUrl}/${locale}${route.path}`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: route.priority,
		}))
	);
}
