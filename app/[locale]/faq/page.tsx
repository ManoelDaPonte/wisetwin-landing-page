import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import FaqClient from "@/components/pages/faq-client";
import { allFaqKeys } from "@/data/faq-keys";
import { JsonLd } from "@/components/seo/json-ld";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const tMeta = await getTranslations({ locale, namespace: "metadata.faq" });

	const keywords =
		locale === "fr"
			? [
					"FAQ WiseTwin",
					"questions formation immersive",
					"simulateur 3D FAQ",
					"tarifs formation VR",
					"sécurité données formation",
				]
			: [
					"WiseTwin FAQ",
					"immersive training questions",
					"3D simulator FAQ",
					"VR training pricing",
					"training data security",
				];

	return {
		title: tMeta("title"),
		description: tMeta("description"),
		keywords,
		openGraph: {
			title: tMeta("ogTitle"),
			description: tMeta("ogDescription"),
			type: "website",
			locale: locale === "fr" ? "fr_FR" : "en_US",
			url: `https://wisetwin.eu/${locale}/faq`,
		},
		twitter: {
			card: "summary_large_image",
			title: tMeta("ogTitle"),
			description: tMeta("ogDescription"),
		},
		alternates: {
			canonical: `https://wisetwin.eu/${locale}/faq`,
			languages: {
				fr: "https://wisetwin.eu/fr/faq",
				en: "https://wisetwin.eu/en/faq",
			},
		},
	};
}

export default async function FaqPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "faq" });

	const faqJsonLd = allFaqKeys.map((faq) => ({
		"@type": "Question",
		name: t(`items.${faq.key}.question`),
		acceptedAnswer: {
			"@type": "Answer",
			text: t(`items.${faq.key}.answer`),
		},
	}));

	return (
		<>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "FAQPage",
					mainEntity: faqJsonLd,
				}}
			/>
			<JsonLd
				data={{
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
							name: "FAQ",
							item: `https://wisetwin.eu/${locale}/faq`,
						},
					],
				}}
			/>
			<FaqClient />
		</>
	);
}
