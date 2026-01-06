"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/common/section";
import { Cuboid, LayoutDashboard, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const solutions = [
	{
		key: "wisetrainer",
		translationKey: "wisetrainer",
		icon: Cuboid,
		href: "/solutions/wisetrainer",
		flagship: true,
		image: "/image/loto.webp",
	},
	{
		key: "platform",
		translationKey: "platform",
		icon: LayoutDashboard,
		href: "/solutions/platform",
		flagship: false,
		image: "/image/dashboard.webp",
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
			<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
				{solutions.map((solution) => {
					const Icon = solution.icon;
					const isHighlighted = solution.flagship;

					return (
						<Link
							key={solution.key}
							href={solution.href}
							className="group block"
						>
							<div
								className={cn(
									"h-full bg-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative",
									isHighlighted
										? "border-2 border-secondary shadow-lg shadow-secondary/10"
										: "border border-border hover:border-secondary/50"
								)}
							>
								{/* Flagship badge */}
								{isHighlighted && (
									<div className="absolute top-4 right-4 z-10 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
										<Star className="size-3 fill-current" />
										{t("solutions.flagship")}
									</div>
								)}

								{/* Image */}
								<div className="aspect-[16/10] relative bg-muted overflow-hidden">
									<Image
										src={solution.image}
										alt={t(`${solution.translationKey}.title`)}
										fill
										className="object-cover group-hover:scale-105 transition-transform duration-500"
									/>
								</div>

								{/* Content */}
								<div className="p-6 flex flex-col h-[220px]">
									{/* Header */}
									<div className="flex items-center gap-3 mb-4">
										<div
											className={cn(
												"size-11 rounded-xl flex items-center justify-center transition-colors",
												isHighlighted
													? "bg-secondary text-secondary-foreground"
													: "bg-secondary/10 group-hover:bg-secondary/20"
											)}
										>
											<Icon
												className={cn(
													"size-5",
													isHighlighted ? "text-secondary-foreground" : "text-secondary"
												)}
											/>
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
