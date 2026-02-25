"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import {
	Check,
	X,
	Plus,
	Star,
	Minus,
	FileText,
	Camera,
	Cuboid,
	ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const productSolutions = [
	{ key: "wisetrainer", image: "/image/loto.webp", href: "/solutions/wisetrainer" },
	{ key: "wisepaper", image: "/placeholder.png", href: "/solutions/wisepaper" },
	{ key: "wisetour", image: "/placeholder.png", href: "/solutions/wisetour" },
	{ key: "wiseatlas", image: "/placeholder.png", href: "/solutions/wiseatlas" },
] as const;

const tiers = ["essential", "pro", "enterprise"] as const;

const addonKeys = ["wisepaper", "wisetour", "wisetrainer"] as const;

const addonPrices: Record<string, number> = {
	wisepaper: 210,
	wisetour: 410,
	wisetrainer: 1390,
};

const addonIcons: Record<string, typeof FileText> = {
	wisepaper: FileText,
	wisetour: Camera,
	wisetrainer: Cuboid,
};

const basePrices: Record<string, number> = {
	essential: 590,
	pro: 990,
};

const comparisonFeatures = [
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
	const tSolutions = useTranslations("solutions");
	const [isYearly, setIsYearly] = useState(false);
	const [adminCount, setAdminCount] = useState(1);
	const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({
		wisepaper: false,
		wisetour: false,
		wisetrainer: false,
	});

	const decrementAdmin = () => setAdminCount((prev) => Math.max(1, prev - 1));
	const incrementAdmin = () => setAdminCount((prev) => Math.min(50, prev + 1));

	const toggleAddon = (key: string) => {
		setSelectedAddons((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	const addonTotal = Object.entries(selectedAddons)
		.filter(([, checked]) => checked)
		.reduce((sum, [key]) => sum + (addonPrices[key] || 0), 0);

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
			{/* Solutions Grid 2×2 */}
			<div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
				{productSolutions.map((product) => (
					<Link key={product.key} href={product.href} className="block group">
						<div className="rounded-2xl border border-border overflow-hidden bg-card transition-all hover:shadow-lg hover:border-secondary/30 h-full flex flex-col">
							<div className="bg-muted/50 px-4 py-2.5 flex items-center gap-1.5 border-b border-border">
								<span className="size-2.5 rounded-full bg-red-400/60" />
								<span className="size-2.5 rounded-full bg-yellow-400/60" />
								<span className="size-2.5 rounded-full bg-green-400/60" />
							</div>
							<div className="relative h-48 overflow-hidden">
								<Image
									src={product.image}
									alt={t(`products.${product.key}.title`)}
									fill
									className="object-cover"
								/>
							</div>
							<div className="p-5 flex flex-col flex-1">
								<h3 className="font-bold text-lg mb-1.5">
									{t(`products.${product.key}.title`)}
								</h3>
								<p className="text-sm text-muted-foreground mb-4 flex-1">
									{t(`products.${product.key}.description`)}
								</p>
								<div className="flex items-center justify-between">
									<span className="text-sm font-semibold text-secondary">
										{t(`products.${product.key}.price`)}
									</span>
									<span className="inline-flex items-center gap-1 text-sm font-semibold text-secondary group-hover:underline underline-offset-4">
										{tSolutions("cta")}
										<ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
									</span>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>

			{/* Plus separator */}
			<div className="flex items-center justify-center my-14">
				<div className="flex-1 h-px bg-border" />
				<div className="mx-6 size-12 bg-secondary/10 rounded-full flex items-center justify-center">
					<Plus className="size-6 text-secondary" />
				</div>
				<div className="flex-1 h-px bg-border" />
			</div>

			{/* Subscription Licenses */}
			<div className="text-center mb-8">
				<h3 className="text-2xl font-bold mb-2">{t("title")}</h3>
				<p className="text-muted-foreground">{t("subtitle")}</p>
			</div>

			{/* Toggle 1 year / 3 years */}
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
					const isEnterprise = tier === "enterprise";
					const features = t.raw(`${tier}.features`) as string[];
					const includes = t(`${tier}.includes`);

					let displayPriceFormatted = "";
					let monthlyEquiv = "";
					let perAdminRate = 0;

					if (!isEnterprise) {
						const basePrice = basePrices[tier];
						const totalAnnualPerAdmin = basePrice + addonTotal;
						perAdminRate = isYearly
							? Math.round(totalAnnualPerAdmin * 0.8)
							: totalAnnualPerAdmin;
						const displayPrice = perAdminRate * adminCount;
						displayPriceFormatted = displayPrice.toLocaleString("fr-FR");
						monthlyEquiv = Math.round(perAdminRate / 12).toLocaleString("fr-FR");
					}

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

							<div className="text-center mb-4">
								<h3 className="text-xl font-bold mb-2">
									{t(`${tier}.title`)}
								</h3>
								<p className="text-sm text-muted-foreground mb-4">
									{t(`${tier}.description`)}
								</p>
								{isEnterprise ? (
									<>
										<div className="flex items-baseline justify-center gap-1">
											<span className="text-4xl font-bold">
												{t(`${tier}.customPricing`)}
											</span>
										</div>
										<p className="text-sm text-muted-foreground mt-2">
											&nbsp;
										</p>
									</>
								) : (
									<>
										<div className="flex items-baseline justify-center gap-1">
											<span className="text-4xl font-bold tabular-nums">
												{displayPriceFormatted}
											</span>
											<span className="text-lg text-muted-foreground">€</span>
											<span className="text-muted-foreground">/an</span>
										</div>
										{adminCount > 1 && (
											<p className="text-xs text-muted-foreground mt-1">
												{perAdminRate.toLocaleString("fr-FR")}€/an × {adminCount}{" "}
												{t("adminCounter.admins")}
											</p>
										)}
										<p className="text-sm text-secondary font-medium mt-2">
											soit ~{monthlyEquiv}€/mois
										</p>
									</>
								)}
							</div>

							{/* Addon tools */}
							<div className="space-y-2 mb-4 pb-4 border-b border-border/50">
								<p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
									{t("addons.title")}
								</p>
								{addonKeys.map((key) => {
									const Icon = addonIcons[key];
									const checked = isEnterprise || selectedAddons[key];
									return isEnterprise ? (
										<div
											key={key}
											className="flex items-center gap-2.5 w-full rounded-lg px-3 py-2 text-sm bg-secondary/10 border border-secondary/30"
										>
											<div className="size-4 rounded bg-secondary border-2 border-secondary flex items-center justify-center shrink-0">
												<Check className="size-2.5 text-secondary-foreground" />
											</div>
											<Icon className="size-3.5 text-secondary shrink-0" />
											<span className="font-medium flex-1">{t(`addons.${key}.title`)}</span>
											<span className="text-xs font-semibold text-secondary">
												{t("addons.included")}
											</span>
										</div>
									) : (
										<button
											key={key}
											onClick={() => toggleAddon(key)}
											className={cn(
												"flex items-center gap-2.5 w-full rounded-lg px-3 py-2 text-left transition-all text-sm",
												checked
													? "bg-secondary/10 border border-secondary/30"
													: "border border-transparent hover:bg-muted/50",
											)}
										>
											<div
												className={cn(
													"size-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors",
													checked
														? "bg-secondary border-secondary"
														: "border-muted-foreground/30",
												)}
											>
												{checked && <Check className="size-2.5 text-secondary-foreground" />}
											</div>
											<Icon className="size-3.5 text-secondary shrink-0" />
											<span className="font-medium flex-1">{t(`addons.${key}.title`)}</span>
											<span className="text-xs text-muted-foreground">
												+{t(`addons.${key}.price`)}€/an
											</span>
										</button>
									);
								})}
							</div>

							{includes && (
								<p className="text-sm font-medium text-secondary mb-3">
									{includes}
								</p>
							)}

							<ul className="space-y-3 flex-grow">
								{features.map((feature, i) => (
									<li key={i} className="flex items-start gap-2">
										<Check className="size-5 text-secondary shrink-0 mt-0.5" />
										<span className="text-sm">{feature}</span>
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
