"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/common/section";
import { ArrowRight, GraduationCap, Map } from "lucide-react";

const hubs = [
	{
		key: "formation",
		href: "/solutions/wisetrainer",
		icon: GraduationCap,
	},
	{
		key: "communication",
		href: "/solutions/wiseatlas",
		icon: Map,
	},
] as const;

export function SolutionsSection() {
	const t = useTranslations("solutions");

	return (
		<Section
			id="solutions"
			variant="default"
			header={{
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
				{hubs.map((hub) => {
					const Icon = hub.icon;
					return (
						<Link
							key={hub.key}
							href={hub.href}
							className="group relative bg-card border border-border rounded-2xl p-8 transition-all hover:border-secondary/50 hover:shadow-lg hover:shadow-secondary/5 flex flex-col overflow-hidden"
						>
							<div className="absolute inset-x-0 top-0 h-1 bg-secondary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />

							<div className="mb-5">
								<div className="size-14 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
									<Icon className="size-7 text-secondary" />
								</div>
							</div>

							<p className="text-xs font-mono uppercase tracking-wider text-secondary mb-2">
								{t(`${hub.key}.tag`)}
							</p>
							<h3 className="font-bold text-2xl mb-3">
								{t(`${hub.key}.title`)}
							</h3>
							<p className="text-muted-foreground leading-relaxed mb-6 flex-1">
								{t(`${hub.key}.description`)}
							</p>

							<span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary group-hover:underline underline-offset-4 mt-auto">
								{t("cta")}
								<ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
							</span>
						</Link>
					);
				})}
			</div>
		</Section>
	);
}
