"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import {
	Check,
	X,
	Plus,
	Star,
	Minus,
	Cuboid,
	FileText,
	Camera,
	Map,
	ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = ["essential", "pro", "business"] as const;

const productSolutions = [
	{ key: "wisetrainer", icon: Cuboid, href: "/solutions/wisetrainer", flagship: true },
	{ key: "wisepaper", icon: FileText, href: "/solutions/wisepaper", flagship: false },
	{ key: "wisetour", icon: Camera, href: "/solutions/wisetour", flagship: false },
	{ key: "wiseatlas", icon: Map, href: "/solutions/wiseatlas", flagship: false },
] as const;

const productComparisonKeys = [
	"devTime",
	"activityInterruption",
	"serviceType",
	"userTracking",
	"realism",
	"interactivity",
	"networkDemand",
	"equipment",
	"web",
	"interactionTracking",
] as const;

const comparisonFeatures = [
	"wisepaper",
	"wisetour",
	"wisetrainer",
	"users",
	"unlimitedTraining",
	"platform",
	"mfa",
	"audit",
	"sso",
	"api",
	"crossCompany",
	"support",
] as const;

export function PricingSection() {
	const t = useTranslations("pricing");
	const tSolutions = useTranslations();
	const [isYearly, setIsYearly] = useState(false);
	const [adminCount, setAdminCount] = useState(1);

	const decrementAdmin = () => setAdminCount((prev) => Math.max(1, prev - 1));
	const incrementAdmin = () =>
		setAdminCount((prev) => Math.min(50, prev + 1));

	return (
		<Section
			id="pricing"
			variant="default"
			header={{
				title: t("products.title"),
				description: t("products.subtitle"),
				centered: true,
			}}
		>
			{/* Product comparison table */}
			<div className="max-w-6xl mx-auto overflow-x-auto">
				<table className="w-full border-collapse min-w-[700px]">
					<thead>
						<tr className="border-b-2 border-border">
							<th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground w-[200px]" />
							{productSolutions.map((solution) => {
								const SolIcon = solution.icon;
								return (
									<th
										key={solution.key}
										className={cn(
											"py-4 px-3 text-center",
											solution.flagship && "bg-secondary/5",
										)}
									>
										<div className="flex flex-col items-center gap-2">
											<div
												className={cn(
													"size-10 rounded-xl flex items-center justify-center",
													solution.flagship
														? "bg-secondary text-secondary-foreground"
														: "bg-secondary/10",
												)}
											>
												<SolIcon
													className={cn(
														"size-5",
														solution.flagship
															? "text-secondary-foreground"
															: "text-secondary",
													)}
												/>
											</div>
											<span className="text-base font-bold">
												{t(`products.${solution.key}.title`)}
											</span>
											<p className="text-xs text-muted-foreground font-normal leading-relaxed max-w-[160px]">
												{t(`products.${solution.key}.description`)}
											</p>
											<span className={cn(
												"text-sm font-semibold mt-1",
												solution.flagship ? "text-secondary" : "text-foreground",
											)}>
												{t(`products.${solution.key}.price`)}
											</span>
										</div>
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody>
						{productComparisonKeys.map((key, i) => (
							<tr
								key={key}
								className={cn(
									"border-b border-border/50",
									i % 2 === 0 && "bg-muted/30",
								)}
							>
								<td className="py-3 px-4 text-sm font-medium">
									{tSolutions(`solutions.comparison.labels.${key}`)}
								</td>
								{productSolutions.map((solution) => {
									const value = tSolutions.raw(
										`solutions.comparison.values.${solution.key}.${key}`,
									);
									return (
										<td
											key={solution.key}
											className={cn(
												"py-3 px-3 text-center",
												solution.flagship && "bg-secondary/5",
											)}
										>
											{value === true ? (
												<Check className="size-5 text-emerald-500 mx-auto" />
											) : value === false ? (
												<X className="size-5 text-muted-foreground/40 mx-auto" />
											) : (
												<span className="text-sm">
													{String(value)}
												</span>
											)}
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr>
							<td />
							{productSolutions.map((solution) => (
								<td
									key={solution.key}
									className={cn(
										"py-4 px-3 text-center",
										solution.flagship && "bg-secondary/5",
									)}
								>
									<Link
										href={solution.href}
										className="inline-flex items-center gap-1.5 text-sm text-secondary font-semibold hover:underline underline-offset-4 transition-all group/link"
									>
										{tSolutions("solutions.cta")}
										<ArrowRight className="size-3.5 group-hover/link:translate-x-1 transition-transform" />
									</Link>
								</td>
							))}
						</tr>
					</tfoot>
				</table>
			</div>

			{/* ============================== */}
			{/* Separator: Product + License   */}
			{/* ============================== */}
			<div className="flex items-center justify-center my-14">
				<div className="flex-1 h-px bg-border" />
				<div className="mx-6 size-12 bg-secondary/10 rounded-full flex items-center justify-center">
					<Plus className="size-6 text-secondary" />
				</div>
				<div className="flex-1 h-px bg-border" />
			</div>

			{/* ============================== */}
			{/* Subscription Licenses          */}
			{/* ============================== */}
			<div className="text-center mb-8">
				<h3 className="text-2xl font-bold mb-2">{t("title")}</h3>
				<p className="text-muted-foreground">{t("subtitle")}</p>
			</div>

			{/* Toggle Monthly / Yearly */}
			<div className="flex items-center justify-center gap-3 mb-6">
				<span
					className={cn(
						"text-sm font-medium transition-colors",
						!isYearly ? "text-foreground" : "text-muted-foreground",
					)}
				>
					{t("billing.monthly")}
				</span>
				<button
					onClick={() => setIsYearly(!isYearly)}
					className={cn(
						"relative w-14 h-7 rounded-full transition-colors",
						isYearly ? "bg-secondary" : "bg-muted",
					)}
				>
					<span
						className={cn(
							"absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform",
							isYearly && "translate-x-7",
						)}
					/>
				</button>
				<span
					className={cn(
						"text-sm font-medium transition-colors",
						isYearly ? "text-foreground" : "text-muted-foreground",
					)}
				>
					{t("billing.yearly")}
				</span>
				{isYearly && (
					<span className="text-xs font-semibold px-2 py-1 rounded-full text-secondary bg-secondary/10">
						{t("billing.savePercent")}
					</span>
				)}
			</div>

			{/* Admin Counter */}
			<div className="flex items-center justify-center gap-4 mb-10">
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
			<div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
				{tiers.map((tier) => {
					const isPopular = tier === "pro";
					const features = t.raw(`${tier}.features`) as string[];
					const includes = t(`${tier}.includes`);

					const priceMonthly = Number(
						t(`${tier}.priceMonthly`).replace(/[^0-9]/g, ""),
					);

					// 3-year commitment: 20% discount on monthly rate
					const monthlyRate = isYearly
						? Math.round(priceMonthly * 0.8)
						: priceMonthly;

					const displayPrice = monthlyRate * adminCount;
					const displayPriceFormatted =
						displayPrice.toLocaleString("fr-FR");

					const annualTotal = monthlyRate * 12 * adminCount;
					const annualFormatted =
						annualTotal.toLocaleString("fr-FR");

					return (
						<div
							key={tier}
							className={cn(
								"relative rounded-2xl p-6 border flex flex-col",
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

							<div className="text-center mb-6">
								<h3 className="text-xl font-bold mb-2">
									{t(`${tier}.title`)}
								</h3>
								<p className="text-sm text-muted-foreground mb-4">
									{t(`${tier}.description`)}
								</p>
								<div className="flex items-baseline justify-center gap-1">
									<span className="text-4xl font-bold tabular-nums">
										{displayPriceFormatted}
									</span>
									<span className="text-lg text-muted-foreground">
										€
									</span>
									<span className="text-muted-foreground">
										/mois
									</span>
								</div>
								{adminCount > 1 && (
									<p className="text-xs text-muted-foreground mt-1">
										{monthlyRate}€/mois × {adminCount}{" "}
										{adminCount > 1
											? t("adminCounter.admins")
											: t("adminCounter.admin")}
									</p>
								)}
								<p className="text-sm text-secondary font-medium mt-2">
									soit {annualFormatted}€/an
								</p>
							</div>

							{includes && (
								<p className="text-sm font-medium text-secondary mb-3">
									{includes}
								</p>
							)}

							<ul className="space-y-3 flex-grow">
								{features.map((feature, i) => (
									<li
										key={i}
										className="flex items-start gap-2"
									>
										<Check className="size-5 text-secondary shrink-0 mt-0.5" />
										<span className="text-sm">
											{feature}
										</span>
									</li>
								))}
							</ul>

							<Button
								className="w-full mt-6"
								variant={isPopular ? "default" : "outline"}
								asChild
							>
								<a href="#contact">{t(`${tier}.cta`)}</a>
							</Button>
						</div>
					);
				})}
			</div>

			{/* Notes */}
			<div className="mt-8 max-w-5xl mx-auto text-center space-y-2">
				<p className="text-xs text-muted-foreground">
					{t("notes.admin")}
				</p>
				<p className="text-xs text-muted-foreground">
					{t("notes.crossCompany")}
				</p>
				<p className="text-xs text-muted-foreground">
					{t("notes.unlimitedTraining")}
				</p>
			</div>

			{/* ============================== */}
			{/* Comparison Table               */}
			{/* ============================== */}
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
		</Section>
	);
}
