"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import {
	Check,
	Cuboid,
	FileText,
	Sparkles,
	Route,
	ArrowRight,
	MessageCircle,
	MinusCircle,
} from "lucide-react";

// Les briques du LMS : activables/désactivables, le prix suit
const modules = [
	{ key: "wisepaper", icon: FileText },
	{ key: "askai", icon: Sparkles },
	{ key: "management", icon: Route },
] as const;

export function ModularPricingSection() {
	const t = useTranslations("pricing");
	const coreFeatures = t.raw("core.features") as string[];

	return (
		<Section
			id="pricing"
			variant="default"
			header={{
				eyebrow: t("eyebrow"),
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div>
				<div className="grid lg:grid-cols-5 gap-6 items-stretch">
					{/* Le socle LMS, prenable seul */}
					<div className="lg:col-span-2 relative rounded-2xl border-2 border-secondary bg-card p-8 flex flex-col shadow-lg shadow-secondary/10">
						<span className="absolute -top-3.5 left-8 text-xs font-semibold uppercase tracking-wider text-secondary-foreground bg-secondary px-3 py-1.5 rounded-full">
							{t("core.badge")}
						</span>

						<div className="mt-2 mb-1 flex items-baseline gap-2">
							<span className="text-5xl font-bold tabular-nums">
								{t("core.price")}
							</span>
							<span className="text-lg text-muted-foreground">
								{t("perYear")}
							</span>
						</div>
						<p className="text-xs text-muted-foreground mb-5">
							{t("core.note")}
						</p>
						<p className="text-muted-foreground leading-relaxed mb-6">
							{t("core.description")}
						</p>

						<ul className="space-y-3 mb-8">
							{coreFeatures.map((feature, i) => (
								<li key={i} className="flex items-start gap-2">
									<Check className="size-5 text-secondary shrink-0 mt-0.5" />
									<span className="text-sm">{feature}</span>
								</li>
							))}
						</ul>

						<Button size="lg" className="mt-auto w-full" asChild>
							<Link href="/#contact">
								{t("core.cta")}
								<ArrowRight className="size-4 ml-2" />
							</Link>
						</Button>
					</div>

					{/* Les briques en option */}
					<div className="lg:col-span-3 flex flex-col">
						<div className="mb-5">
							<h3 className="text-xl font-bold mb-1">{t("modules.title")}</h3>
							<p className="text-sm text-muted-foreground">
								{t("modules.subtitle")}
							</p>
						</div>

						<div className="flex flex-col gap-4 flex-1">
							{modules.map((module) => {
								const Icon = module.icon;
								return (
									<div
										key={module.key}
										className="bg-card border border-border rounded-xl p-5 hover:border-secondary/30 transition-colors flex-1"
									>
										<div className="flex items-center justify-between gap-3 mb-2">
											<div className="flex items-center gap-3">
												<div className="size-9 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
													<Icon className="size-4.5 text-secondary" />
												</div>
												<h4 className="font-semibold">
													{t(`modules.items.${module.key}.title`)}
												</h4>
											</div>
											<p className="font-bold tabular-nums whitespace-nowrap">
												+{t(`modules.items.${module.key}.price`)}
												<span className="text-xs text-muted-foreground font-normal">
													{" "}
													{t("perYear")}
												</span>
											</p>
										</div>
										<p className="text-xs text-muted-foreground leading-relaxed">
											{t(`modules.items.${module.key}.description`)}
										</p>
									</div>
								);
							})}
						</div>

						{/* Total tout compris */}
						<div className="mt-4 rounded-xl border border-secondary/30 bg-secondary/5 px-5 py-4 flex items-center justify-between gap-4">
							<div className="flex items-center gap-3">
								<MinusCircle className="size-4.5 text-secondary shrink-0" />
								<p className="text-sm text-muted-foreground">
									{t("modules.note")}
								</p>
							</div>
							<p className="font-bold tabular-nums whitespace-nowrap">
								{t("total.label")}{" "}
								<span className="text-xl text-secondary">
									{t("total.price")}
								</span>
								<span className="text-xs text-muted-foreground font-normal">
									{" "}
									{t("perYear")}
								</span>
							</p>
						</div>
					</div>
				</div>

				{/* Les formations sur mesure, facturées au projet */}
				<div className="mt-8 rounded-2xl border border-secondary/20 bg-gradient-to-r from-secondary/5 via-secondary/10 to-secondary/5 p-6 md:p-8">
					<div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
						<div className="flex flex-col md:flex-row items-center gap-5">
							<div className="size-14 bg-secondary/15 rounded-xl flex items-center justify-center shrink-0">
								<Cuboid className="size-7 text-secondary" />
							</div>
							<div>
								<h3 className="font-semibold text-lg mb-1">
									{t("formations.title")}
								</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">
									{t("formations.description")}
								</p>
							</div>
						</div>
						<Button size="lg" variant="outline" className="shrink-0" asChild>
							<Link href="/#contact">
								<MessageCircle className="size-4 mr-2" />
								{t("formations.cta")}
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</Section>
	);
}
