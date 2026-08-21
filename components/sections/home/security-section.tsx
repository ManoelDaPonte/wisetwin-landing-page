"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/ui/reveal";
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

export function SecuritySection({
	variant = "muted",
}: {
	variant?: "default" | "muted";
}) {
	const t = useTranslations("security");

	return (
		<Section
			id="security"
			variant={variant}
			header={{
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			{/* 2×2 grid on desktop with ISO as 5th card spanning full width */}
			<div>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{securityFeatures.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<Reveal key={feature.key} delay={index * 0.06} className="h-full">
								<div className="relative h-full bg-card border border-border rounded-2xl p-6 hover:border-secondary/40 transition-colors overflow-hidden">
									<span
										aria-hidden
										className="absolute -top-6 -right-2 font-mono font-bold text-[110px] leading-none text-secondary/[0.06] select-none"
									>
										{index + 1}
									</span>
									<div className="flex items-center justify-between mb-4">
										<div className="size-12 bg-secondary/10 rounded-lg flex items-center justify-center">
											<Icon className="size-6 text-secondary" />
										</div>
										<span className="text-xs font-mono uppercase tracking-[0.2em] text-secondary">
											SEC-{String(index + 1).padStart(2, "0")}
										</span>
									</div>
									<h3 className="font-semibold text-lg mb-2">
										{t(`${feature.key}.title`)}
									</h3>
									<p className="text-sm text-muted-foreground">
										{t(`${feature.key}.description`)}
									</p>
								</div>
							</Reveal>
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
