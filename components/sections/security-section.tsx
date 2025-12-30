"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/common/section";
import { Shield, Key, FileText, Database } from "lucide-react";

const securityFeatures = [
	{
		key: "sso",
		icon: Key,
	},
	{
		key: "mfa",
		icon: Shield,
	},
	{
		key: "audit",
		icon: FileText,
	},
	{
		key: "isolation",
		icon: Database,
	},
];

export function SecuritySection() {
	const t = useTranslations("security");

	return (
		<Section
			id="security"
			variant="muted"
			header={{
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
				{securityFeatures.map((feature) => {
					const Icon = feature.icon;
					return (
						<div
							key={feature.key}
							className="bg-card border border-border rounded-xl p-6 hover:border-secondary/30 hover:shadow-md transition-all"
						>
							<div className="size-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
								<Icon className="size-6 text-secondary" />
							</div>
							<h3 className="font-semibold text-lg mb-2">
								{t(`${feature.key}.title`)}
							</h3>
							<p className="text-sm text-muted-foreground">
								{t(`${feature.key}.description`)}
							</p>
						</div>
					);
				})}
			</div>
		</Section>
	);
}
