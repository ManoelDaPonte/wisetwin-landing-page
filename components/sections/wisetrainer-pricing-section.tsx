"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Shield, Wrench, TrendingUp, Plus } from "lucide-react";

const gammes = [
	{ key: "safe", icon: Shield },
	{ key: "tech", icon: Wrench },
	{ key: "lean", icon: TrendingUp },
] as const;

export function WiseTrainerPricingSection() {
	const t = useTranslations("wisetrainerPricing");

	return (
		<Section
			id="wisetrainer-pricing"
			variant="muted"
			header={{
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div className="max-w-4xl mx-auto">
				<p className="text-center text-muted-foreground mb-8">
					{t("description")}
				</p>

				{/* Gammes */}
				<div className="grid md:grid-cols-3 gap-6 mb-8">
					{gammes.map((gamme) => {
						const Icon = gamme.icon;
						return (
							<div
								key={gamme.key}
								className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-md transition-shadow"
							>
								<div className="size-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
									<Icon className="size-7 text-secondary" />
								</div>
								<h3 className="text-lg font-bold mb-1">
									{t(`gammes.${gamme.key}.title`)}
								</h3>
								<p className="text-sm text-muted-foreground mb-4">
									{t(`gammes.${gamme.key}.description`)}
								</p>
								<div className="text-sm text-muted-foreground mb-1">
									{t(`gammes.${gamme.key}.unit`)}
								</div>
								<div className="text-3xl font-bold text-secondary">
									{t(`gammes.${gamme.key}.price`)}€
								</div>
							</div>
						);
					})}
				</div>

				{/* Scenario addon */}
				<div className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
					<div className="flex items-center gap-4">
						<div className="size-12 bg-secondary/10 rounded-full flex items-center justify-center">
							<Plus className="size-6 text-secondary" />
						</div>
						<div>
							<h4 className="font-semibold">{t("scenario.title")}</h4>
							<p className="text-sm text-muted-foreground">
								{t("scenario.unit")}
							</p>
						</div>
					</div>
					<div className="text-2xl font-bold">
						{t("scenario.price")}€
					</div>
				</div>

				{/* CTA */}
				<div className="mt-8 text-center">
					<Button size="lg" asChild>
						<Link href="/#contact">Demander un devis</Link>
					</Button>
				</div>
			</div>
		</Section>
	);
}
