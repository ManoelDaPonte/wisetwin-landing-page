"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe } from "lucide-react";

type Props = {
	slug: string;
	otherLocale: string;
};

export default function BlogNotAvailableClient({ slug, otherLocale }: Props) {
	const t = useTranslations("blog");

	return (
		<main>
			<Section id="blog-not-available" variant="default" className="pt-32">
				<div className="max-w-3xl mx-auto text-center">
					<Globe className="size-12 text-muted-foreground mx-auto mb-6" />
					<h1 className="text-2xl font-bold mb-4">
						{t("notAvailable")}
					</h1>
					<div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
						<Button variant="outline" asChild>
							<Link href="/blog">
								<ArrowLeft className="size-4 mr-2" />
								{t("backToBlog")}
							</Link>
						</Button>
						<Button asChild>
							<a href={`/${otherLocale}/blog/${slug}`}>
								<Globe className="size-4 mr-2" />
								{t("viewInOtherLang")}
							</a>
						</Button>
					</div>
				</div>
			</Section>
		</main>
	);
}
