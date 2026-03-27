"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import {
	Check,
	X,
	Star,
	Minus,
	Plus,
	MessageCircle,
	HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

const tiers = ["essential", "pro", "enterprise"] as const;

const basePrices: Record<string, number> = {
	essential: 0,
	pro: 2400,
	enterprise: 3600,
};

const comparisonFeatures = [
	"users",
	"unlimitedTraining",
	"editTraining",
	"mfa",
	"audit",
	"sso",
	"api",
	"crossCompany",
	"support",
] as const;

export function PricingSection() {
	const t = useTranslations("pricing");
	const [adminCount, setAdminCount] = useState(1);
	const decrementAdmin = () => setAdminCount((prev) => Math.max(1, prev - 1));
	const incrementAdmin = () => setAdminCount((prev) => Math.min(50, prev + 1));

	return (
		<Section
			id="pricing"
			variant="default"
			header={{
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			{/* Admin Counter */}
			<div className="flex items-center justify-center gap-4 mb-6">
				<span className="text-sm font-medium text-muted-foreground">
					{t("adminCounter.title")}
				</span>
				<div className="flex items-center gap-2">
					<button
						onClick={decrementAdmin}
						disabled={adminCount <= 1}
						className="size-8 rounded-full border border-border flex items-center justify-center hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
					>
						<Minus className="size-4" />
					</button>
					<span className="w-12 text-center text-lg font-bold tabular-nums">
						{adminCount}
					</span>
					<button
						onClick={incrementAdmin}
						disabled={adminCount >= 50}
						className="size-8 rounded-full border border-border flex items-center justify-center hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
					>
						<Plus className="size-4" />
					</button>
				</div>
				<span className="text-sm text-muted-foreground">
					{adminCount > 1
						? t("adminCounter.admins")
						: t("adminCounter.admin")}
				</span>
			</div>

			{/* Tier Cards */}
			<div className="grid md:grid-cols-3 md:grid-rows-[auto_auto_auto_auto_1fr] gap-6 max-w-5xl mx-auto">
				{tiers.map((tier) => {
					const isPopular = tier === "pro";
					const isFree = tier === "essential";
					const features = t.raw(`${tier}.features`) as string[];
					const includes = t(`${tier}.includes`);

					const basePrice = basePrices[tier];
					const annualTotal = isFree
						? 0
						: basePrice + (adminCount - 1) * Math.round(basePrice / 2);
					const annualTotalFormatted = annualTotal.toLocaleString("fr-FR");

					return (
						<div
							key={tier}
							className={cn(
								"relative rounded-2xl p-6 border grid md:grid-rows-subgrid md:row-span-5",
								isPopular
									? "border-secondary bg-secondary/5 shadow-lg shadow-secondary/10"
									: "border-border bg-card",
							)}
						>
							{isPopular && (
								<div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground p-2 rounded-full">
									<Star className="size-4 fill-current" />
								</div>
							)}

							{/* Row 1: Title + description */}
							<div className="text-center">
								<h3 className="text-xl font-bold mb-2">
									{t(`${tier}.title`)}
								</h3>
								<p className="text-sm text-muted-foreground">
									{t(`${tier}.description`)}
								</p>
							</div>

							{/* Row 2: Price */}
							<div className="text-center py-4">
								{isFree ? (
									<div className="flex items-baseline justify-center gap-1">
										<span className="text-4xl font-bold">{t("free")}</span>
									</div>
								) : (
									<>
										<div className="flex items-baseline justify-center gap-1">
											<span className="text-4xl font-bold tabular-nums">
												{annualTotalFormatted}
											</span>
											<span className="text-lg text-muted-foreground">€</span>
											<span className="text-muted-foreground">/an</span>
										</div>
										{adminCount > 1 && (
											<p className="text-xs text-muted-foreground mt-1">
												{adminCount} {t("adminCounter.admins")} · {basePrice.toLocaleString("fr-FR")}€ + {adminCount - 1} × {Math.round(basePrice / 2).toLocaleString("fr-FR")}€
											</p>
										)}
									</>
								)}
							</div>

							{/* Row 3: Includes label */}
							<div>
								{includes && (
									<p className="text-sm font-medium text-secondary">
										{includes}
									</p>
								)}
							</div>

							{/* Row 4+5: Features list */}
							<ul className="space-y-3">
								{features.map((feature, i) => (
									<li key={i} className="flex items-start gap-2">
										<Check className="size-5 text-secondary shrink-0 mt-0.5" />
										<span className="text-sm">{feature}</span>
									</li>
								))}
							</ul>
						</div>
					);
				})}
			</div>

			{/* Comparison Table */}
			<div className="mt-16">
				<div className="text-center mb-8">
					<h3 className="text-2xl font-bold">
						{t("comparison.title")}
					</h3>
				</div>

				<div className="max-w-5xl mx-auto overflow-x-auto">
					<table className="w-full border-collapse">
						<thead>
							<tr className="border-b border-border">
								<th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
									{t("comparison.features")}
								</th>
								{tiers.map((tier) => (
									<th
										key={tier}
										className={cn(
											"py-4 px-4 text-center text-sm font-bold",
											tier === "pro" && "text-secondary",
										)}
									>
										{t(`${tier}.title`)}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{comparisonFeatures.map((feature) => (
								<tr
									key={feature}
									className="border-b border-border/50"
								>
									<td className="py-3 px-4 text-sm">
										{t(`comparison.items.${feature}`)}
									</td>
									{tiers.map((tier) => {
										const value = t.raw(
											`comparison.values.${tier}.${feature}`,
										);
										return (
											<td
												key={tier}
												className="py-3 px-4 text-center"
											>
												{value === true ? (
													<Check className="size-5 text-secondary mx-auto" />
												) : value === false ? (
													<X className="size-5 text-muted-foreground/40 mx-auto" />
												) : (
													<span className="text-sm font-medium">
														{String(value)}
													</span>
												)}
											</td>
										);
									})}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* CTA after comparison table */}
			<div className="mt-16 text-center">
				<h3 className="text-2xl font-bold mb-2">
					{t("ctaSection.title")}
				</h3>
				<p className="text-muted-foreground mb-6">
					{t("ctaSection.subtitle")}
				</p>
				<div className="flex flex-wrap items-center justify-center gap-3">
					<Button size="lg" variant="outline" asChild>
						<Link href="/faq">
							<HelpCircle className="size-4 mr-2" />
							{t("ctaSection.faq")}
						</Link>
					</Button>
					<Button size="lg" asChild>
						<a href="#contact">
							<MessageCircle className="size-4 mr-2" />
							{t("ctaSection.contact")}
						</a>
					</Button>
				</div>
			</div>
		</Section>
	);
}
