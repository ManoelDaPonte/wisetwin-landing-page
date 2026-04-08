import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HomeClient from "@/components/pages/home-client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "metadata.home" });

	const keywords =
		locale === "fr"
			? [
					"jumeau numérique",
					"formation industrielle",
					"simulateur 3D",
					"réalité virtuelle",
					"industrie 4.0",
					"formation immersive",
					"formation sécurité",
					"digitalisation industrielle",
				]
			: [
					"digital twin",
					"industrial training",
					"3D simulator",
					"virtual reality",
					"industry 4.0",
					"immersive training",
					"safety training",
					"industrial digitization",
				];

	return {
		title: t("title"),
		description: t("description"),
		keywords,
		openGraph: {
			title: t("ogTitle"),
			description: t("ogDescription"),
			type: "website",
			locale: locale === "fr" ? "fr_FR" : "en_US",
			url: `https://wisetwin.eu/${locale}`,
		},
		twitter: {
			card: "summary_large_image",
			title: t("ogTitle"),
			description: t("ogDescription"),
		},
		alternates: {
			canonical: `https://wisetwin.eu/${locale}`,
			languages: {
				fr: "https://wisetwin.eu/fr",
				en: "https://wisetwin.eu/en",
			},
		},
	};
}

export default function Home() {
	return <HomeClient />;
}
