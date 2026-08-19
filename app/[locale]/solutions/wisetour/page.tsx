import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BrickClient from "@/components/pages/brick-client";
import { JsonLd } from "@/components/seo/json-ld";
import { brickPageMetadata, brickBreadcrumbJsonLd } from "@/lib/brick-seo";

const BRICK = "wisetour" as const;

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	return brickPageMetadata(BRICK, params);
}

export default async function BrickPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "brickPages" });

	return (
		<>
			<JsonLd data={brickBreadcrumbJsonLd(BRICK, locale, t(`${BRICK}.title`))} />
			<BrickClient brick={BRICK} />
		</>
	);
}
