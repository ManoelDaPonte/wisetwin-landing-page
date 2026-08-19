import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { BrickKey } from "@/components/pages/brick-client";

// Métadonnées partagées des petites pages briques (WiseTrainer, WisePaper, WiseTour, Ask AI)
export async function brickPageMetadata(
	brick: BrickKey,
	params: Promise<{ locale: string }>
): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "brickPages" });
	const url = `https://wisetwin.eu/${locale}/solutions/${brick}`;

	return {
		title: t(`${brick}.metaTitle`),
		description: t(`${brick}.metaDescription`),
		openGraph: {
			title: t(`${brick}.metaTitle`),
			description: t(`${brick}.metaDescription`),
			type: "website",
			locale: locale === "fr" ? "fr_FR" : "en_US",
			url,
		},
		twitter: {
			card: "summary_large_image",
			title: t(`${brick}.metaTitle`),
			description: t(`${brick}.metaDescription`),
		},
		alternates: {
			canonical: url,
			languages: {
				fr: `https://wisetwin.eu/fr/solutions/${brick}`,
				en: `https://wisetwin.eu/en/solutions/${brick}`,
			},
		},
	};
}

export function brickBreadcrumbJsonLd(brick: BrickKey, locale: string, name: string) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: locale === "fr" ? "Accueil" : "Home",
				item: `https://wisetwin.eu/${locale}`,
			},
			{
				"@type": "ListItem",
				position: 2,
				name,
				item: `https://wisetwin.eu/${locale}/solutions/${brick}`,
			},
		],
	};
}
