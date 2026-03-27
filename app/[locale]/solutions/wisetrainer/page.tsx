import { getTranslations } from "next-intl/server";
import TrainingHubClient from "@/components/pages/training-hub-client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "wisetrainer" });
	return {
		title: `${t("title")} - WiseTwin`,
		description: t("hero.subtitle"),
	};
}

export default function WiseTrainerPage() {
	return <TrainingHubClient />;
}
