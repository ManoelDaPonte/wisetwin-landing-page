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
							? "Le LMS modulable pour l'industrie : diffusion de vos formations (créées par WiseTwin ou importées), éditeur WisePaper, IA Ask AI avec base d'incidents, plans de formation et analytiques"
							: "The modular LMS for industry: delivery of your trainings (built by WiseTwin or imported), WisePaper editor, Ask AI with incident database, training plans and analytics",
					url: `https://wisetwin.eu/${locale}/solutions/plateforme`,
					offers: {
						"@type": "Offer",
						price: "3600",
						priceCurrency: "EUR",
						description:
							locale === "fr"
								? "Plateforme LMS à 3 600€/an par site tout compris, moins si vous retirez des briques. Socle seul à partir de 1 800€/an. Formations sur mesure facturées au projet : WiseTrainer 5 000 à 15 000€, WiseTour 10 000 à 20 000€"
								: "LMS platform at €3,600/year per site all included, less if you remove bricks. Core alone from €1,800/year. Custom trainings billed per project: WiseTrainer €5,000 to €15,000, WiseTour €10,000 to €20,000",
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
