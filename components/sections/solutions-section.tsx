"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/common/section";
import { Cuboid, FileText, LayoutDashboard, ArrowRight } from "lucide-react";
import Image from "next/image";

const solutions = [
	{
		key: "wisetrainer",
		translationKey: "wisetrainer",
		icon: Cuboid,
		href: "/solutions/wisetrainer",
	},
	{
		key: "wisepaper",
		translationKey: "wisepaper",
		icon: FileText,
		href: "/solutions/wisepaper",
	},
	{
		key: "platform",
		translationKey: "platform",
		icon: LayoutDashboard,
		href: "/solutions/platform",
	},
] as const;

export function SolutionsSection() {
	const t = useTranslations();

	return (
		<Section
			id="solutions"
			variant="muted"
			header={{
				title: t("solutions.title"),
				description: t("solutions.subtitle"),
				centered: true,
			}}
		>
			<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
				{solutions.map((solution) => {
					const Icon = solution.icon;

					return (
						<Link
							key={solution.key}
							href={solution.href}
							className="group block"
						>
							<div className="h-full bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-secondary/50 transition-all duration-300 hover:-translate-y-1">
								{/* Image */}
								<div className="aspect-[16/10] relative bg-muted overflow-hidden">
									<Image
										src="/placeholder.svg"
										alt={t(`${solution.translationKey}.title`)}
										fill
										className="object-cover group-hover:scale-105 transition-transform duration-500"
									/>
								</div>

								{/* Content */}
								<div className="p-6 flex flex-col h-[220px]">
									{/* Header */}
									<div className="flex items-center gap-3 mb-4">
										<div className="size-11 bg-secondary/10 rounded-xl flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
											<Icon className="size-5 text-secondary" />
										</div>
										<h3 className="text-xl font-bold">
											{t(`${solution.translationKey}.title`)}
										</h3>
									</div>

									{/* Description */}
									<p className="text-muted-foreground leading-relaxed flex-grow">
										{t(`${solution.translationKey}.description`)}
									</p>

									{/* Link - always at bottom */}
									<div className="pt-4 mt-auto">
										<span className="inline-flex items-center text-secondary group-hover:underline underline-offset-4 transition-all">
											{t("solutions.cta")}
											<ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
										</span>
									</div>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</Section>
	);
}
