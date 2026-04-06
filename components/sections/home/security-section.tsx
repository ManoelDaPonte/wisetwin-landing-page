"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/common/section";
import { Shield, Key, FileText, Database, ShieldCheck } from "lucide-react";

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
			{/* 2×2 grid on desktop with ISO as 5th card spanning full width */}
			<div className="max-w-5xl mx-auto">
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

				{/* ISO 27001 — full-width accent banner */}
				<div className="mt-6 rounded-xl border border-secondary/20 bg-gradient-to-r from-secondary/5 via-secondary/10 to-secondary/5 p-6 md:p-8">
					<div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
						<div className="size-14 bg-secondary/15 rounded-xl flex items-center justify-center shrink-0">
							<ShieldCheck className="size-7 text-secondary" />
						</div>
						<div>
							<h3 className="font-semibold text-lg mb-1">
								{t("iso.title")}
							</h3>
							<p className="text-sm text-muted-foreground leading-relaxed">
								{t("iso.description")}
							</p>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}
