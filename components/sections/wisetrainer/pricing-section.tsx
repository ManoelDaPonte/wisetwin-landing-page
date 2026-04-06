"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/common/section";
import {
	Check,
	X,
	Star,
	Minus,
	Plus,
	Gift,
	Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = ["essential", "pro", "enterprise"] as const;

const basePrices: Record<string, number> = {
	essential: 0,
	pro: 2400,
	enterprise: 3600,
};

// Bracket-based degressive pricing — never reaches 0
const priceBrackets: Record<string, Array<{ min: number; max: number | null; price: number }>> = {
	pro: [
		{ min: 2, max: 3, price: 500 },
		{ min: 4, max: 5, price: 400 },
		{ min: 6, max: 10, price: 300 },
		{ min: 11, max: null, price: 250 },
	],
	enterprise: [
		{ min: 2, max: 3, price: 750 },
		{ min: 4, max: 5, price: 600 },
		{ min: 6, max: 10, price: 450 },
		{ min: 11, max: null, price: 350 },
	],
};

function getBracketPrice(tier: string, nth: number): number {
	const brackets = priceBrackets[tier];
	if (!brackets) return 0;
	for (const bracket of brackets) {
		if (nth >= bracket.min && (bracket.max === null || nth <= bracket.max)) {
			return bracket.price;
		}
	}
	return brackets[brackets.length - 1].price;
}

function calculateTotal(tier: string, adminCount: number): number {
	if (tier === "essential") return 0;
	let total = basePrices[tier];
	for (let i = 2; i <= adminCount; i++) {
		total += getBracketPrice(tier, i);
	}
	return total;
}

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

function InfoPopover({
	children,
	open,
	onToggle,
}: {
	children: React.ReactNode;
	open: boolean;
	onToggle: () => void;
}) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		function handleClick(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				onToggle();
			}
		}
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [open, onToggle]);

	return (
		<div className="relative" ref={ref}>
			<button
				onClick={onToggle}
				className="size-5 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
			>
				<Info className="size-3.5" />
			</button>
			{open && (
				<div className="absolute top-7 left-1/2 -translate-x-1/2 z-50 w-80 bg-card border border-border rounded-xl p-4 shadow-xl">
					{children}
				</div>
			)}
		</div>
	);
}

export function PricingSection() {
	const t = useTranslations("pricing");
	const [adminCount, setAdminCount] = useState(1);
	const [showBreakdown, setShowBreakdown] = useState(false);
	const [showMultiSite, setShowMultiSite] = useState(false);
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
			{/* Features link */}
			<div className="flex justify-center mb-8">
				<a href="#features" className="inline-flex items-center gap-1 text-sm text-secondary hover:underline">
					{t("seeFeatures")}
				</a>
			</div>

			{/* Admin Counter */}
			<div className="flex flex-col items-center gap-3 mb-8">
				<div className="flex items-center gap-4">
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

					{/* Degressive pricing info */}
					<InfoPopover open={showBreakdown} onToggle={() => setShowBreakdown(!showBreakdown)}>
						<p className="text-xs text-muted-foreground mb-3">
							{t("adminCounter.degressiveTooltip")}
						</p>
						<div className="space-y-4">
							{(["pro", "enterprise"] as const).map((tier) => (
								<div key={tier}>
									<p className="text-xs font-semibold mb-2">{t(`${tier}.title`)}</p>
									<table className="w-full text-xs">
										<thead>
											<tr className="border-b border-border">
												<th className="text-left py-1.5 pr-2 text-muted-foreground font-medium">
													{t("adminCounter.adminLabel")}
												</th>
												<th className="text-right py-1.5 text-muted-foreground font-medium">
													{t("adminCounter.priceLabel")}
												</th>
											</tr>
										</thead>
										<tbody>
											<tr className="border-b border-border/50">
												<td className="py-1.5 pr-2">1er</td>
												<td className="text-right py-1.5 text-secondary font-medium">{t("adminCounter.included")}</td>
											</tr>
											{priceBrackets[tier].map((bracket) => (
												<tr key={bracket.min} className="border-b border-border/50">
													<td className="py-1.5 pr-2">
														{bracket.max
															? `${bracket.min}e – ${bracket.max}e`
															: `${bracket.min}e+`
														}
													</td>
													<td className="text-right py-1.5">+{bracket.price.toLocaleString("fr-FR")}€/an</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							))}
						</div>
					</InfoPopover>
				</div>
			</div>

			{/* Tier Cards */}
			<div className="grid md:grid-cols-3 md:grid-rows-[auto_auto_auto_auto_1fr] gap-6 max-w-5xl mx-auto">
				{tiers.map((tier) => {
					const isPopular = tier === "pro";
					const isFree = tier === "essential";
					const isEnterprise = tier === "enterprise";
					const features = t.raw(`${tier}.features`) as string[];
					const includes = t(`${tier}.includes`);
					const annualTotal = calculateTotal(tier, adminCount);
					const annualTotalFormatted = annualTotal.toLocaleString("fr-FR");

					return (
						<div
							key={tier}
							className={cn(
								"relative rounded-2xl p-6 border border-border bg-card grid md:grid-rows-subgrid md:row-span-5",
								!isFree && "border-t-0 pt-[25px]",
							)}
						>
							{/* Green accent top + floating badge — paid tiers only */}
							{!isFree && (
								<>
									<div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
									<div className="absolute -top-3.5 left-1/2 -translate-x-1/2 size-7 bg-emerald-500 rounded-full flex items-center justify-center shadow-md shadow-emerald-500/30 z-10">
										<Gift className="size-3.5 text-white" />
									</div>
								</>
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
										<div className="flex items-center justify-center gap-1">
											<span className="text-4xl font-bold tabular-nums">
												{annualTotalFormatted}
											</span>
											<span className="text-lg text-muted-foreground">€</span>
											<span className="text-muted-foreground">/an</span>
											{isEnterprise && (
												<InfoPopover open={showMultiSite} onToggle={() => setShowMultiSite(!showMultiSite)}>
													<p className="text-xs text-muted-foreground">
														{t("adminCounter.multiSiteNote")}
													</p>
												</InfoPopover>
											)}
										</div>
										{adminCount > 1 && (
											<p className="text-xs text-muted-foreground mt-1">
												{adminCount} {t("adminCounter.admins")}
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

			{/* Free year note */}
			<div className="flex items-center justify-center gap-2 mt-6">
				<Gift className="size-4 text-emerald-500" />
				<p className="text-sm text-muted-foreground">
					{t("freeYear")}
				</p>
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

		</Section>
	);
}
