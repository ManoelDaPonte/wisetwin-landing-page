"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = ["free", "pro", "business"] as const;

export function PricingSection() {
	const t = useTranslations("pricing");
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
					const hasDiscount = plan === "pro" || plan === "business";

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

							{/* Bandeau réduction WiseTrainer */}
							{hasDiscount && (
								<div className="absolute -top-3 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
									{t(`discountBanner.${plan}`)}
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
				<p className="text-xs text-muted-foreground">{t("notes.admin")}</p>
				<p className="text-xs text-muted-foreground">{t("notes.crossCompany")}</p>
				<p className="text-xs text-muted-foreground">{t("notes.wisetrainer")}</p>
			</div>

			{/* Lien vers pricing WiseTrainer */}
			<div className="mt-8 text-center">
				<Link
					href="/solutions/wisetrainer#gammes"
					className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors"
				>
					{t("wisetrainerLink")}
					<ArrowRight className="size-4" />
				</Link>
			</div>
		</Section>
	);
}
