"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/common/section";
import { ArrowRight, Clock, Users, Cpu } from "lucide-react";

const highlights = [
	{ key: "speed", icon: Clock },
	{ key: "collaboration", icon: Users },
	{ key: "precision", icon: Cpu },
] as const;

export function VisionSection() {
	const t = useTranslations("vision");

	return (
		<Section
			id="vision"
			variant="default"
			header={{
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4 max-w-5xl mx-auto">
				{highlights.map((item, index) => {
					const Icon = item.icon;
					const isLast = index === highlights.length - 1;

					return (
						<div key={item.key} className="flex items-center gap-4">
							<div className="flex flex-col items-center text-center lg:flex-row lg:text-left gap-4 bg-card rounded-2xl p-6 border border-border hover:border-secondary/30 transition-colors">
								<div className="size-14 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
									<Icon className="size-7 text-secondary" />
								</div>
								<div>
									<h3 className="font-semibold text-lg mb-1">
										{t(`highlights.${item.key}.title`)}
									</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{t(`highlights.${item.key}.description`)}
									</p>
								</div>
							</div>

							{!isLast && (
								<div className="hidden lg:flex items-center justify-center text-secondary/50">
									<ArrowRight className="size-6" />
								</div>
							)}
						</div>
					);
				})}
			</div>
		</Section>
	);
}
