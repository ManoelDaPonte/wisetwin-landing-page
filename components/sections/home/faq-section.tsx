"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

// Les 5 questions principales pour la homepage
const featuredFaqKeys = [
	"whatIsWisetwin",
	"howHelps",
	"deploymentTime",
	"pricingModel",
	"security",
];

export function FaqSection() {
	const t = useTranslations("faq");

	return (
		<Section
			id="faq"
			variant="default"
			header={{
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div className="max-w-3xl mx-auto">
				<Accordion type="single" collapsible className="space-y-4 pb-1">
					{featuredFaqKeys.map((key, index) => (
						<AccordionItem
							key={key}
							value={`item-${index}`}
							className="border border-border rounded-lg px-6 bg-background/50 backdrop-blur-sm"
						>
							<AccordionTrigger className="text-left hover:no-underline">
								<span className="font-semibold">
									{t(`items.${key}.question`)}
								</span>
							</AccordionTrigger>
							<AccordionContent className="text-muted-foreground leading-relaxed">
								{t(`items.${key}.answer`)}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>

				<div className="mt-8 text-center">
					<Button variant="outline" asChild>
						<Link href="/faq" className="gap-2">
							{t("seeAll")}
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>
			</div>
		</Section>
	);
}
