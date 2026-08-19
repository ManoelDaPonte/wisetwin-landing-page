"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import {
	GraduationCap,
	Cuboid,
	BrainCircuit,
	Compass,
	Check,
	ArrowRight,
} from "lucide-react";

const domains = [
	{ key: "training", icon: GraduationCap },
	{ key: "immersive", icon: Cuboid },
	{ key: "software", icon: BrainCircuit },
	{ key: "consulting", icon: Compass },
] as const;

export function ExpertisesSection() {
	const t = useTranslations("expertises");

	return (
		<Section
			id="expertises"
			variant="muted"
			header={{
				eyebrow: t("eyebrow"),
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div className="max-w-5xl mx-auto">
				<div className="grid md:grid-cols-2 gap-6">
					{domains.map((domain) => {
						const Icon = domain.icon;
						const items = t.raw(`domains.${domain.key}.items`) as string[];
						return (
							<div
								key={domain.key}
								className="bg-card border border-border rounded-2xl p-6 md:p-8"
							>
								<div className="flex items-center gap-4 mb-6">
									<div className="size-12 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
										<Icon className="size-6 text-secondary" />
									</div>
									<h3 className="text-xl font-bold">
										{t(`domains.${domain.key}.title`)}
									</h3>
								</div>
								<ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
									{items.map((item, i) => (
										<li key={i} className="flex items-start gap-2">
											<Check className="size-4 text-secondary shrink-0 mt-0.5" />
											<span className="text-sm">{item}</span>
										</li>
									))}
								</ul>
							</div>
						);
					})}
				</div>

				{/* "Doesn't fit a box" CTA banner */}
				<div className="mt-8 rounded-2xl border border-secondary/20 bg-gradient-to-r from-secondary/5 via-secondary/10 to-secondary/5 p-6 md:p-8">
					<div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
						<div>
							<h3 className="font-semibold text-lg mb-1">{t("note")}</h3>
							<p className="text-sm text-muted-foreground">
								{t("noteDescription")}
							</p>
						</div>
						<Button size="lg" className="shrink-0" asChild>
							<a href="#contact">
								{t("cta")}
								<ArrowRight className="size-4 ml-2" />
							</a>
						</Button>
					</div>
				</div>
			</div>
		</Section>
	);
}
