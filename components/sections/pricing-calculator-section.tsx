"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Calculator, Shield, Wrench, Sparkles, Users, Info, Gift, Clock } from "lucide-react";

const PRICES = {
	license: {
		pro: {
			yearly: 2148, // 179€/mois × 12
			threeYears: 1788, // 149€/mois × 12
		},
		business: {
			yearly: 3588, // 299€/mois × 12
			threeYears: 2988, // 249€/mois × 12
		},
	},
	wisetrainer: {
		safe: {
			first: 4500, // Prix promo 1ère commande (prix normal: 5625)
			next: 5625,
		},
		tech: {
			first: 9000, // Prix promo 1ère commande (prix normal: 11875)
			next: 11875,
		},
	},
};


function formatPrice(price: number): string {
	return Math.round(price).toLocaleString("fr-FR");
}

type LicenseTier = "pro" | "business";
type BillingPeriod = "yearly" | "threeYears";
type WiseTrainerType = "safe" | "tech" | "mixed";

export function PricingCalculatorSection() {
	const t = useTranslations("pricing.calculator");

	const [licenseTier, setLicenseTier] = useState<LicenseTier>("pro");
	const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("yearly");
	const [admins, setAdmins] = useState(1);
	const [wisetrainers, setWisetrainers] = useState(1);
	const [wtType, setWtType] = useState<WiseTrainerType>("safe");

	const calculation = useMemo(() => {
		// License calculation
		const licensePerAdmin = PRICES.license[licenseTier][billingPeriod];
		const licenseTotal = licensePerAdmin * admins;
		// Prix sans réduction (1 an) pour afficher le prix barré sur 3 ans
		const licenseYearlyPerAdmin = PRICES.license[licenseTier].yearly;
		const licenseYearlyTotal = licenseYearlyPerAdmin * admins;
		const hasLicenseDiscount = billingPeriod === "threeYears";

		// WiseTrainer calculation
		let firstWtPrice: number; // Prix promo du 1er
		let firstWtNormalPrice: number; // Prix normal (pour afficher l'économie)
		let nextWtPrice: number;

		switch (wtType) {
			case "safe":
				firstWtPrice = PRICES.wisetrainer.safe.first;
				firstWtNormalPrice = PRICES.wisetrainer.safe.next; // Le prix normal c'est le prix des suivants
				nextWtPrice = PRICES.wisetrainer.safe.next;
				break;
			case "tech":
				firstWtPrice = PRICES.wisetrainer.tech.first;
				firstWtNormalPrice = PRICES.wisetrainer.tech.next;
				nextWtPrice = PRICES.wisetrainer.tech.next;
				break;
			case "mixed":
				// Moyenne des prix Safe et Tech
				firstWtPrice = (PRICES.wisetrainer.safe.first + PRICES.wisetrainer.tech.first) / 2;
				firstWtNormalPrice = (PRICES.wisetrainer.safe.next + PRICES.wisetrainer.tech.next) / 2;
				nextWtPrice = (PRICES.wisetrainer.safe.next + PRICES.wisetrainer.tech.next) / 2;
				break;
		}

		// Économie sur le 1er WiseTrainer
		const firstOrderSavings = firstWtNormalPrice - firstWtPrice;

		// Prix des WT suivants
		const nextWtCount = Math.max(0, wisetrainers - 1);
		const nextWtSubtotal = nextWtPrice * nextWtCount;

		// Total WiseTrainer
		const wtTotal = firstWtPrice + nextWtSubtotal;

		// Total général
		const total = licenseTotal + wtTotal;

		return {
			licensePerAdmin,
			licenseTotal,
			licenseYearlyTotal,
			hasLicenseDiscount,
			firstWtPrice,
			firstWtNormalPrice,
			firstOrderSavings,
			nextWtPrice,
			nextWtCount,
			nextWtSubtotal,
			wtTotal,
			total,
		};
	}, [licenseTier, billingPeriod, admins, wisetrainers, wtType]);

	return (
		<Section
			id="calculator"
			variant="default"
			header={{
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div className="max-w-5xl mx-auto">
				{/* Info banner - Plateforme gratuite */}
				<div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-8 flex items-start gap-3">
					<Gift className="size-5 text-green-500 shrink-0 mt-0.5" />
					<p className="text-sm text-green-700 dark:text-green-400">
						{t("platformFree")}
					</p>
				</div>

				<div className="grid lg:grid-cols-5 gap-8">
					{/* Configuration panel */}
					<div className="lg:col-span-3 space-y-6">
						{/* License tier selector */}
						<div className="bg-card border border-border rounded-xl p-6">
							<label className="text-sm font-medium block mb-4">{t("licenseTier")}</label>
							<div className="grid grid-cols-2 gap-3">
								{(["pro", "business"] as const).map((tier) => {
									const isActive = licenseTier === tier;
									return (
										<button
											key={tier}
											onClick={() => setLicenseTier(tier)}
											className={cn(
												"flex flex-col items-center gap-2 p-4 rounded-lg border transition-all",
												isActive
													? "border-secondary bg-secondary/10"
													: "border-border hover:border-secondary/50"
											)}
										>
											<Users className={cn("size-6", isActive && "text-secondary")} />
											<span className="font-semibold">{tier === "pro" ? "Pro" : "Business"}</span>
										</button>
									);
								})}
							</div>
						</div>

						{/* Billing period toggle */}
						<div className="bg-card border border-border rounded-xl p-6">
							<label className="text-sm font-medium block mb-4">{t("billingPeriod")}</label>
							<div className="flex items-center justify-center gap-3">
								<span
									className={cn(
										"text-sm font-medium transition-colors",
										billingPeriod === "yearly" ? "text-foreground" : "text-muted-foreground"
									)}
								>
									{t("yearly")}
								</span>
								<button
									onClick={() => setBillingPeriod(billingPeriod === "yearly" ? "threeYears" : "yearly")}
									className={cn(
										"relative w-14 h-7 rounded-full transition-colors",
										billingPeriod === "threeYears" ? "bg-secondary" : "bg-muted"
									)}
								>
									<span
										className={cn(
											"absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform",
											billingPeriod === "threeYears" && "translate-x-7"
										)}
									/>
								</button>
								<span
									className={cn(
										"text-sm font-medium transition-colors",
										billingPeriod === "threeYears" ? "text-foreground" : "text-muted-foreground"
									)}
								>
									{t("threeYears")}
								</span>
								{billingPeriod === "threeYears" && (
									<span className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded-full">
										-20%
									</span>
								)}
							</div>
						</div>

						{/* Admins slider */}
						<div className="bg-card border border-border rounded-xl p-6">
							<div className="flex items-center justify-between mb-2">
								<label className="text-sm font-medium">{t("admins")}</label>
								<span className="text-2xl font-bold text-secondary">{admins}</span>
							</div>
							<div className="flex items-start gap-2 mb-4">
								<Info className="size-4 text-muted-foreground shrink-0 mt-0.5" />
								<p className="text-xs text-muted-foreground">{t("adminsHint")}</p>
							</div>
							<Slider
								value={[admins]}
								onValueChange={(value) => setAdmins(value[0])}
								min={1}
								max={10}
								step={1}
								className="w-full"
							/>
							<div className="flex justify-between text-xs text-muted-foreground mt-2">
								<span>1</span>
								<span>10</span>
							</div>
						</div>

						{/* WiseTrainer slider */}
						<div className="bg-card border border-border rounded-xl p-6">
							<div className="flex items-center justify-between mb-4">
								<label className="text-sm font-medium">{t("wisetrainers")}</label>
								<span className="text-2xl font-bold text-secondary">{wisetrainers}</span>
							</div>
							<Slider
								value={[wisetrainers]}
								onValueChange={(value) => setWisetrainers(value[0])}
								min={1}
								max={20}
								step={1}
								className="w-full"
							/>
							<div className="flex justify-between text-xs text-muted-foreground mt-2">
								<span>1</span>
								<span>20</span>
							</div>
						</div>

						{/* WiseTrainer type selector */}
						<div className="bg-card border border-border rounded-xl p-6">
							<label className="text-sm font-medium block mb-4">{t("wisetrainerType")}</label>
							<div className="grid grid-cols-3 gap-3">
								{(["safe", "tech", "mixed"] as const).map((type) => {
									const isActive = wtType === type;
									const Icon = type === "safe" ? Shield : type === "tech" ? Wrench : Sparkles;
									return (
										<button
											key={type}
											onClick={() => setWtType(type)}
											className={cn(
												"flex flex-col items-center gap-2 p-4 rounded-lg border transition-all",
												isActive
													? "border-secondary bg-secondary/10 text-secondary"
													: "border-border hover:border-secondary/50"
											)}
										>
											<Icon className="size-5" />
											<span className="text-sm font-medium">{t(type)}</span>
										</button>
									);
								})}
							</div>
							{wtType === "mixed" && (
								<p className="text-xs text-muted-foreground mt-3 flex items-start gap-2">
									<Info className="size-4 shrink-0 mt-0.5" />
									{t("mixedExplanation")}
								</p>
							)}
						</div>

					</div>

					{/* Result panel */}
					<div className="lg:col-span-2">
						<div className="bg-card border-2 border-secondary rounded-xl p-6 sticky top-24">
							<div className="flex items-center gap-3 mb-6">
								<div className="size-10 bg-secondary/10 rounded-full flex items-center justify-center">
									<Calculator className="size-5 text-secondary" />
								</div>
								<h3 className="text-lg font-bold">{t("result.title")}</h3>
							</div>

							<div className="space-y-4">
								{/* License */}
								<div className="py-3 border-b border-border">
									<div className="flex justify-between items-start">
										<div>
											<p className="font-medium">{t("result.license")}</p>
											<p className="text-xs text-muted-foreground">
												{licenseTier === "pro" ? "Pro" : "Business"} × {admins} admin{admins > 1 ? "s" : ""}
											</p>
											{calculation.hasLicenseDiscount && (
												<p className="text-xs text-green-600 flex items-center gap-1">
													<Gift className="size-3" />
													-20% {t("threeYears")}
												</p>
											)}
										</div>
										<div className="text-right">
											{calculation.hasLicenseDiscount && (
												<p className="text-xs text-muted-foreground line-through">
													{formatPrice(calculation.licenseYearlyTotal)} €
												</p>
											)}
											<p className={cn("font-semibold", calculation.hasLicenseDiscount && "text-green-600")}>
												{formatPrice(calculation.licenseTotal)} € <span className="text-xs font-normal text-muted-foreground">HT/an</span>
											</p>
										</div>
									</div>
								</div>

								{/* First WiseTrainer with discount */}
								<div className="py-3 border-b border-border">
									<div className="flex justify-between items-start">
										<div>
											<p className="font-medium">{t("result.firstWt")}</p>
											<p className="text-xs text-green-600 flex items-center gap-1">
												<Gift className="size-3" />
												{t("result.firstDiscount")}
											</p>
										</div>
										<div className="text-right">
											<p className="text-xs text-muted-foreground line-through">
												{formatPrice(calculation.firstWtNormalPrice)} €
											</p>
											<p className="font-semibold text-green-600">
												{formatPrice(calculation.firstWtPrice)} € <span className="text-xs font-normal">HT</span>
											</p>
										</div>
									</div>
								</div>

								{/* Next WiseTrainers */}
								{calculation.nextWtCount > 0 && (
									<div className="py-3 border-b border-border">
										<div className="flex justify-between items-start">
											<div>
												<p className="font-medium">{t("result.nextWt")}</p>
												<p className="text-xs text-muted-foreground">
													{calculation.nextWtCount} × {formatPrice(calculation.nextWtPrice)} € HT
												</p>
											</div>
											<p className="font-semibold">{formatPrice(calculation.nextWtSubtotal)} € <span className="text-xs font-normal text-muted-foreground">HT</span></p>
										</div>
									</div>
								)}

								{/* Total */}
								<div className="pt-4">
									<div className="flex justify-between items-center">
										<p className="text-lg font-bold">{t("result.total")}</p>
										<div className="text-right">
											<p className="text-2xl font-bold text-secondary">
												{formatPrice(calculation.total)} € <span className="text-sm font-normal text-muted-foreground">HT</span>
											</p>
											<p className="text-xs text-muted-foreground">
												{t("result.firstYear")}
											</p>
										</div>
									</div>
								</div>
							</div>

							<Button className="w-full mt-6" size="lg" asChild>
								<a href="#contact">{t("result.cta")}</a>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}
