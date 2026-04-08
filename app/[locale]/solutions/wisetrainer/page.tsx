import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import WiseTrainerClient from "@/components/pages/wisetrainer-client";
import { JsonLd } from "@/components/seo/json-ld";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "wisetrainer" });
	const tMeta = await getTranslations({
		locale,
		namespace: "metadata.wisetrainer",
	});

	const keywords =
		locale === "fr"
			? [
					"simulateur formation industrielle",
					"formation 3D immersive",
					"jumeau numérique formation",
					"simulateur sécurité industrielle",
					"LMS industriel",
					"formation VR entreprise",
				]
			: [
					"industrial training simulator",
					"immersive 3D training",
					"digital twin training",
					"industrial safety simulator",
					"industrial LMS",
					"enterprise VR training",
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
			url: `https://wisetwin.eu/${locale}/solutions/wisetrainer`,
		},
		twitter: {
			card: "summary_large_image",
			title: tMeta("ogTitle"),
			description: tMeta("ogDescription"),
		},
		alternates: {
			canonical: `https://wisetwin.eu/${locale}/solutions/wisetrainer`,
			languages: {
				fr: "https://wisetwin.eu/fr/solutions/wisetrainer",
				en: "https://wisetwin.eu/en/solutions/wisetrainer",
			},
		},
	};
}

export default async function WiseTrainerPage({
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
					name: "WiseTrainer",
					applicationCategory: "BusinessApplication",
					operatingSystem: "Web",
					description:
						locale === "fr"
							? "Simulateur 3D immersif sur mesure pour la formation industrielle"
							: "Custom immersive 3D simulator for industrial training",
					url: `https://wisetwin.eu/${locale}/solutions/wisetrainer`,
					offers: {
						"@type": "Offer",
						price: "0",
						priceCurrency: "EUR",
						description:
							locale === "fr" ? "Sur devis" : "Custom quote",
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
							name: "WiseTrainer",
							item: `https://wisetwin.eu/${locale}/solutions/wisetrainer`,
						},
					],
				}}
			/>
			<WiseTrainerClient />
		</>
	);
}
