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
	const tMeta = await getTranslations({
		locale,
		namespace: "metadata.platform",
	});

	const keywords =
		locale === "fr"
			? [
					"LMS industriel",
					"plateforme formation industrielle",
					"simulateur formation industrielle",
					"formation 3D immersive",
					"accueil sécurité digital",
					"digitalisation formation",
					"IA sécurité industrielle",
					"base incidents HSE",
				]
			: [
					"industrial LMS",
					"industrial training platform",
					"industrial training simulator",
					"immersive 3D training",
					"digital safety induction",
					"training digitization",
					"industrial safety AI",
					"HSE incident database",
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
			url: `https://wisetwin.eu/${locale}/solutions/plateforme`,
		},
		twitter: {
			card: "summary_large_image",
			title: tMeta("ogTitle"),
			description: tMeta("ogDescription"),
		},
		alternates: {
			canonical: `https://wisetwin.eu/${locale}/solutions/plateforme`,
			languages: {
				fr: "https://wisetwin.eu/fr/solutions/plateforme",
				en: "https://wisetwin.eu/en/solutions/plateforme",
			},
		},
	};
}

export default async function PlatformPage({
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
					name: "WiseTwin - La plateforme LMS",
					applicationCategory: "BusinessApplication",
					operatingSystem: "Web",
					description:
						locale === "fr"
							? "Formation industrielle en briques : WiseTrainer (simulateurs 3D), WisePaper (formations documentaires IA), WiseTour (accueil sécurité immersif), ou la plateforme LMS complète avec Ask AI et base d'incidents"
							: "Industrial training in bricks: WiseTrainer (3D simulators), WisePaper (AI document-based training), WiseTour (immersive safety induction), or the complete LMS platform with Ask AI and incident database",
					url: `https://wisetwin.eu/${locale}/solutions/plateforme`,
					offers: {
						"@type": "Offer",
						price: "3500",
						priceCurrency: "EUR",
						description:
							locale === "fr"
								? "Plateforme LMS complète à 3 500€/an par site. Briques à la carte : WisePaper 1 200€/an, WiseTour 1 300€/an, WiseTrainer 1 500€/an. Création des simulateurs sur devis"
								: "Complete LMS platform at €3,500/year per site. Bricks à la carte: WisePaper €1,200/yr, WiseTour €1,300/yr, WiseTrainer €1,500/yr. Simulator creation on quote",
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
							name:
								locale === "fr"
									? "La plateforme LMS"
									: "The LMS platform",
							item: `https://wisetwin.eu/${locale}/solutions/plateforme`,
						},
					],
				}}
			/>
			<WiseTrainerClient />
		</>
	);
}
