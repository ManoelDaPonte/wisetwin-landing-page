"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Check, Shield, Wrench, Plus, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = ["free", "pro", "business"] as const;

const gammes = [
	{ key: "safe", icon: Shield },
	{ key: "tech", icon: Wrench },
] as const;

export function PricingSection() {
	const t = useTranslations("pricing");
	const tWt = useTranslations("wisetrainer");
	const [isYearly, setIsYearly] = useState(false);

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
			{/* Toggle Mensuel / Annuel */}
			<div className="flex items-center justify-center gap-3 mb-8">
				<span
					className={cn(
						"text-sm font-medium transition-colors",
						!isYearly ? "text-foreground" : "text-muted-foreground"
					)}
				>
					{t("billing.monthly")}
				</span>
				<button
					onClick={() => setIsYearly(!isYearly)}
					className={cn(
						"relative w-14 h-7 rounded-full transition-colors",
						isYearly ? "bg-secondary" : "bg-muted"
					)}
				>
					<span
						className={cn(
							"absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform",
							isYearly && "translate-x-7"
						)}
					/>
				</button>
				<span
					className={cn(
						"text-sm font-medium transition-colors",
						isYearly ? "text-foreground" : "text-muted-foreground"
					)}
				>
					{t("billing.yearly")}
				</span>
				{isYearly && (
					<span className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded-full">
						{t("billing.savePercent")}
					</span>
				)}
			</div>

			<div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
				{plans.map((plan) => {
					const isPopular = plan === "pro";
					const isFree = plan === "free";
					const features = t.raw(`${plan}.features`) as string[];
					const includes = t(`${plan}.includes`);
					const price = isYearly
						? t(`${plan}.priceYearly`)
						: t(`${plan}.priceMonthly`);

					return (
						<div
							key={plan}
							className={cn(
								"relative rounded-2xl p-6 border flex flex-col",
								isPopular
									? "border-secondary bg-secondary/5 shadow-lg shadow-secondary/10"
									: "border-border bg-card"
							)}
						>
							{/* Badge Populaire */}
							{isPopular && (
								<div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
									Populaire
								</div>
							)}

							<div className="text-center mb-6">
								<h3 className="text-xl font-bold mb-2">{t(`${plan}.title`)}</h3>
								<p className="text-sm text-muted-foreground mb-4">
									{t(`${plan}.description`)}
								</p>
								<div className="flex items-baseline justify-center gap-1">
									<span className="text-4xl font-bold">{price}</span>
									<span className="text-lg text-muted-foreground">€</span>
									<span className="text-muted-foreground">
										{t(`${plan}.period`)}
									</span>
								</div>
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

							{isFree ? (
								<Button className="w-full mt-6" variant="outline" asChild>
									<a
										href="https://app.wisetwin.eu"
										target="_blank"
										rel="noopener noreferrer"
									>
										{t(`${plan}.cta`)}
									</a>
								</Button>
							) : (
								<Button
									className="w-full mt-6"
									variant={isPopular ? "default" : "outline"}
									asChild
								>
									<a href="#contact">{t(`${plan}.cta`)}</a>
								</Button>
							)}
						</div>
					);
				})}
			</div>

			{/* Notes explicatives */}
			<div className="mt-8 max-w-3xl mx-auto text-center space-y-2">
				<p className="text-xs text-muted-foreground">
					{t("notes.wisetrainer")}{" "}
					<Link
						href="/solutions/wisetrainer"
						className="text-secondary hover:underline inline-flex items-center gap-1"
					>
						{t("notes.wisetrainerLink")}
						<ArrowRight className="size-3" />
					</Link>
				</p>
				<p className="text-xs text-muted-foreground">{t("notes.admin")}</p>
				<p className="text-xs text-muted-foreground">{t("notes.crossCompany")}</p>
			</div>

			{/* Séparateur avec + */}
			<div className="flex items-center justify-center my-12">
				<div className="flex-1 h-px bg-border" />
				<div className="mx-6 size-12 bg-secondary/10 rounded-full flex items-center justify-center">
					<Plus className="size-6 text-secondary" />
				</div>
				<div className="flex-1 h-px bg-border" />
			</div>

			{/* Section WiseTrainer Pricing */}
			<div>
				<div className="text-center mb-8">
					<h3 className="text-2xl font-bold mb-2">{tWt("gammes.title")}</h3>
					<p className="text-muted-foreground">{tWt("gammes.subtitle")}</p>
				</div>

				{/* Gammes WiseTrainer */}
				<div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
					{gammes.map((gamme) => {
						const Icon = gamme.icon;
						return (
							<div
								key={gamme.key}
								className="relative bg-card border border-border rounded-xl p-6 text-center hover:shadow-md transition-shadow overflow-visible flex flex-col h-full"
							>
								{/* Badge réduction */}
								<div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
									<span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
										{t("discountBanner.firstOrder")}
									</span>
								</div>

								<div className="size-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 mt-2">
									<Icon className="size-7 text-secondary" />
								</div>
								<h4 className="text-lg font-bold mb-1">
									{tWt(`gammes.${gamme.key}.title`)}
								</h4>
								<p className="text-sm text-secondary font-medium mb-2">
									{tWt(`gammes.${gamme.key}.subtitle`)}
								</p>
								<p className="text-sm text-muted-foreground flex-grow">
									{tWt(`gammes.${gamme.key}.description`)}
								</p>
								<div className="pt-4 mt-4 border-t border-border">
									<p className="text-sm text-muted-foreground mb-1">
										{tWt(`gammes.${gamme.key}.unit`)}
									</p>
									<div className="text-3xl font-bold text-secondary">
										{tWt(`gammes.${gamme.key}.price`)}
										<span className="text-lg font-normal text-muted-foreground"> €</span>
									</div>
									<p className="text-xs text-muted-foreground mt-1">
										{tWt("gammes.includedScenarios")}
									</p>
								</div>
							</div>
						);
					})}
				</div>

				{/* Scenario addon */}
				<div className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
					<div className="flex items-center gap-4">
						<div className="size-12 bg-secondary/10 rounded-full flex items-center justify-center">
							<Plus className="size-6 text-secondary" />
						</div>
						<div>
							<h4 className="font-semibold">{tWt("gammes.scenario.title")}</h4>
							<p className="text-sm text-muted-foreground">
								{tWt("gammes.scenario.unit")}
							</p>
						</div>
					</div>
					<div className="text-2xl font-bold">
						{tWt("gammes.scenario.price")}€
					</div>
				</div>

				{/* Note Scénario */}
				<p className="text-xs text-muted-foreground text-center mt-6 max-w-2xl mx-auto">
					{t("notes.scenario")}
				</p>
			</div>
		</Section>
	);
}
