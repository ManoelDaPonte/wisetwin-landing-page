import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://wisetwin.fr";
	const locales = ["fr", "en"];

	const routes = [
		{ path: "", priority: 1 },
		{ path: "/roadmap", priority: 0.8 },
		{ path: "/faq", priority: 0.8 },
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
