"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/common/section";
import { ArrowRight, Cuboid, FileText, Camera, Map } from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
	{
		key: "wisetrainer",
		href: "/solutions/wisetrainer",
		icon: Cuboid,
	},
	{
		key: "wisepaper",
		href: "/solutions/wisepaper",
		icon: FileText,
	},
	{
		key: "wisetour",
		href: "/solutions/wisetour",
		icon: Camera,
	},
	{
		key: "wiseatlas",
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
			<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px max-w-5xl mx-auto bg-border border border-border rounded-xl overflow-hidden">
				{products.map((product) => {
					const Icon = product.icon;
					return (
						<Link
							key={product.key}
							href={product.href}
							className={cn(
								"group relative bg-card p-6 transition-colors hover:bg-muted/50 flex flex-col",
							)}
						>
							<div className="absolute inset-x-0 top-0 h-0.5 bg-secondary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
							<div className="flex items-start justify-between mb-4">
								<div className="size-10 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center">
									<Icon className="size-5 text-secondary" />
								</div>
								<span className="text-xs font-semibold text-foreground">
									{t(`${product.key}.price`)}
								</span>
							</div>
							<p className="text-xs font-mono uppercase tracking-wider text-secondary mb-2">
								{t(`${product.key}.tag`)}
							</p>
							<h3 className="font-bold text-lg mb-2">
								{t(`${product.key}.title`)}
							</h3>
							<p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
								{t(`${product.key}.description`)}
							</p>
							<span className="inline-flex items-center gap-1 text-sm font-semibold text-secondary group-hover:underline underline-offset-4 mt-auto">
								{t("cta")}
								<ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
							</span>
						</Link>
					);
				})}
			</div>
		</Section>
	);
}
