import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import WiseAtlasClient from "@/components/pages/wiseatlas-client";
import { JsonLd } from "@/components/seo/json-ld";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "wiseatlas" });
	const tMeta = await getTranslations({
		locale,
		namespace: "metadata.wiseatlas",
	});

	const keywords =
		locale === "fr"
			? [
					"carte interactive",
					"visite virtuelle",
					"valorisation territoire",
					"communication territoriale",
					"jumeau numérique territoire",
					"visite 360",
				]
			: [
					"interactive map",
					"virtual tour",
					"territory showcase",
					"territorial communication",
					"territory digital twin",
					"360 tour",
				];

	return {
		title: `${t("title")} - WiseTwin`,
		description: tMeta("description"),
		keywords,
		openGraph: {
			title: tMeta("ogTitle"),
			description: tMeta("ogDescription"),
			type: "website",
			locale: locale === "fr" ? "fr_FR" : "en_US",
			url: `https://wisetwin.eu/${locale}/solutions/wiseatlas`,
		},
		twitter: {
			card: "summary_large_image",
			title: tMeta("ogTitle"),
			description: tMeta("ogDescription"),
		},
		alternates: {
			canonical: `https://wisetwin.eu/${locale}/solutions/wiseatlas`,
			languages: {
				fr: "https://wisetwin.eu/fr/solutions/wiseatlas",
				en: "https://wisetwin.eu/en/solutions/wiseatlas",
			},
		},
	};
}

export default async function WiseAtlasPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	return (
		<>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "SoftwareApplication",
					name: "WiseAtlas",
					applicationCategory: "BusinessApplication",
					operatingSystem: "Web",
					description:
						locale === "fr"
							? "Carte interactive pour valoriser votre territoire avec des visites virtuelles immersives"
							: "Interactive map to showcase your territory with immersive virtual tours",
					url: `https://wisetwin.eu/${locale}/solutions/wiseatlas`,
					offers: {
						"@type": "Offer",
						price: "3000",
						priceCurrency: "EUR",
						priceValidUntil: "2026-12-31",
						description:
							locale === "fr"
								? "À partir de 3 000 €/an"
								: "Starting from €3,000/year",
					},
					provider: {
						"@type": "Organization",
						name: "WiseTwin",
						url: "https://wisetwin.eu",
					},
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
							name: "WiseAtlas",
							item: `https://wisetwin.eu/${locale}/solutions/wiseatlas`,
						},
					],
				}}
			/>
			<WiseAtlasClient />
		</>
	);
}
