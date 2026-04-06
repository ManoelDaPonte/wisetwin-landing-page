import { getTranslations } from "next-intl/server";
import WiseAtlasClient from "@/components/pages/wiseatlas-client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "wiseatlas" });
	return {
		title: `${t("title")} - WiseTwin`,
		description: t("hero.subtitle"),
	};
}

export default function WiseAtlasPage() {
	return <WiseAtlasClient />;
}
