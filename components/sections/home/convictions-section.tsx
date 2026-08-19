"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/common/section";

const items = ["tailored", "accessible", "interoperable", "local"] as const;

export function ConvictionsSection() {
	const t = useTranslations("convictions");

	return (
		<Section
			id="convictions"
			variant="default"
			header={{
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
				{items.map((item, index) => (
					<div
						key={item}
						className="relative bg-card border border-border rounded-2xl p-8 overflow-hidden hover:border-secondary/30 transition-colors"
					>
						<span className="absolute -top-3 right-4 text-7xl font-bold text-secondary/10 select-none tabular-nums">
							{String(index + 1).padStart(2, "0")}
						</span>
						<h3 className="relative text-xl font-bold mb-3 pr-16">
							{t(`items.${item}.title`)}
						</h3>
						<p className="relative text-muted-foreground leading-relaxed">
							{t(`items.${item}.description`)}
						</p>
					</div>
				))}
			</div>
		</Section>
	);
}
