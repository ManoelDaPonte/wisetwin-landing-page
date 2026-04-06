import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://wisetwin.eu";

	const routes = [
		{ path: "", priority: 1 },
		{ path: "/faq", priority: 0.8 },
		{ path: "/solutions/wisetrainer", priority: 0.9 },
		{ path: "/solutions/wiseatlas", priority: 0.8 },
		{ path: "/legal", priority: 0.3 },
		{ path: "/privacy", priority: 0.3 },
		{ path: "/terms", priority: 0.3 },
	];

	return routes.flatMap((route) => [
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
}
