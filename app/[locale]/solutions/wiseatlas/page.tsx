import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import {
	Building2,
	Users,
	Construction,
	FileText,
	Database,
	Paintbrush,
	Globe,
	Check,
	X,
	Star,
	MessageCircle,
	HelpCircle,
} from "lucide-react";
import Image from "next/image";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { cn } from "@/lib/utils";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "wiseatlas" });
	return {
		title: `${t("title")} - WiseTwin`,
		description: t("hero.subtitle"),
	};
}

export default function WiseAtlasPage() {
	const t = useTranslations("wiseatlas");
	const steps = [
		{ key: "define", icon: FileText, number: 1 },
		{ key: "data", icon: Database, number: 2 },
		{ key: "design", icon: Paintbrush, number: 3 },
		{ key: "publish", icon: Globe, number: 4 },
	];

	const useCases = [
		{ key: "territory", icon: Building2 },
		{ key: "stakeholders", icon: Users },
		{ key: "infrastructure", icon: Construction },
	];

	return (
		<main>
			{/* Hero */}
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
				<ParallaxImage src="/image/WiseAtlas.png" alt="WiseAtlas" />
				<div className="absolute inset-0 bg-black/75" />

				<div className="relative z-10 container mx-auto max-w-7xl px-4">
					<div className="text-center max-w-3xl mx-auto">
						<h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white">
							{t("hero.title")}
						</h1>
						<p className="text-lg lg:text-xl text-white/80 mb-10 leading-relaxed">
							{t("hero.subtitle")}
						</p>
						<Button size="lg" asChild>
							<Link href="/#contact">
								<MessageCircle className="size-4 mr-2" />
								{t("hero.cta")}
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* How it works - Timeline */}
			<Section
				id="how-it-works"
				variant="muted"
				header={{
					title: t("howItWorks.title"),
					description: t("howItWorks.subtitle"),
					centered: true,
				}}
			>
				<div className="max-w-5xl mx-auto">
					{/* Desktop timeline */}
					<div className="hidden lg:block">
						<div className="relative">
							{/* Connecting line */}
							<div className="absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-secondary/30" />
							<div className="absolute top-[22px] left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-secondary/60 via-secondary to-secondary/60 rounded-full" />

							<div className="grid grid-cols-4 gap-8">
								{steps.map((step) => {
									const Icon = step.icon;
									return (
										<div key={step.key} className="relative flex flex-col items-center text-center">
											<div className="relative z-10 size-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-md shadow-secondary/20">
												{step.number}
											</div>
											<div className="mt-3 mb-2">
												<span className="inline-block text-xs font-semibold text-secondary bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full">
													{t(`howItWorks.steps.${step.key}.duration`)}
												</span>
											</div>
											<div className="size-12 bg-muted rounded-xl flex items-center justify-center mb-3">
												<Icon className="size-6 text-muted-foreground" />
											</div>
											<h3 className="font-semibold mb-1">
												{t(`howItWorks.steps.${step.key}.title`)}
											</h3>
											<p className="text-sm text-muted-foreground leading-relaxed">
												{t(`howItWorks.steps.${step.key}.description`)}
											</p>
										</div>
									);
								})}
							</div>
						</div>
					</div>

					{/* Mobile timeline */}
					<div className="lg:hidden">
						<div className="relative pl-12">
							<div className="absolute left-5 top-0 bottom-0 w-0.5 bg-secondary/30" />

							<div className="flex flex-col gap-8">
								{steps.map((step) => {
									const Icon = step.icon;
									return (
										<div key={step.key} className="relative">
											<div className="absolute -left-12 top-0 z-10 size-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-md shadow-secondary/20">
												{step.number}
											</div>
											<div className="flex items-start gap-3">
												<div className="size-10 bg-muted rounded-xl flex items-center justify-center shrink-0">
													<Icon className="size-5 text-muted-foreground" />
												</div>
												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-2 mb-1">
														<h3 className="font-semibold text-sm">
															{t(`howItWorks.steps.${step.key}.title`)}
														</h3>
														<span className="inline-block text-xs font-medium text-secondary bg-secondary/10 border border-secondary/20 px-2 py-0.5 rounded-full">
															{t(`howItWorks.steps.${step.key}.duration`)}
														</span>
													</div>
													<p className="text-sm text-muted-foreground">
														{t(`howItWorks.steps.${step.key}.description`)}
													</p>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</Section>

			{/* Pricing */}
			<Section
				id="pricing"
				variant="default"
				header={{
					title: t("pricing.title"),
					description: t("pricing.subtitle"),
					centered: true,
				}}
			>
				<div className="grid md:grid-cols-2 md:grid-rows-[auto_auto_1fr] gap-6 max-w-4xl mx-auto">
					{(["selfservice", "prestation"] as const).map((tier) => {
						const isPrestation = tier === "prestation";
						const features = t.raw(`pricing.tiers.${tier}.features`) as string[];
						return (
							<div
								key={tier}
								className={cn(
									"relative rounded-2xl p-6 border grid md:grid-rows-subgrid md:row-span-3",
									isPrestation
										? "border-secondary bg-secondary/5 shadow-lg shadow-secondary/10"
										: "border-border bg-card",
								)}
							>
								{isPrestation && (
									<div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground p-2 rounded-full">
										<Star className="size-4 fill-current" />
									</div>
								)}

								{/* Row 1: Title + description */}
								<div className="text-center">
									<h3 className="text-xl font-bold mb-2">
										{t(`pricing.tiers.${tier}.title`)}
									</h3>
									<p className="text-sm text-muted-foreground">
										{t(`pricing.tiers.${tier}.description`)}
									</p>
								</div>

								{/* Row 2: Price */}
								<div className="text-center py-4">
									<div className="flex items-baseline justify-center gap-1">
										<span className="text-4xl font-bold">
											{t(`pricing.tiers.${tier}.standardPrice`)}
										</span>
										{!isPrestation && (
											<span className="text-muted-foreground">{t("pricing.perYear")}</span>
										)}
									</div>
								</div>

								{/* Row 3: Features */}
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

				{/* Enterprise comparison table */}
				<div className="mt-12">
					<div className="text-center mb-8">
						<h3 className="text-2xl font-bold">
							{t("pricing.comparison.title")}
						</h3>
					</div>

					<div className="max-w-3xl mx-auto overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="border-b border-border">
									<th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
										{t("pricing.comparison.features")}
									</th>
									<th className="py-4 px-4 text-center text-sm font-bold">
										{t("pricing.tiers.selfservice.title")}
									</th>
									<th className="py-4 px-4 text-center text-sm font-bold text-secondary">
										{t("pricing.tiers.prestation.title")}
									</th>
								</tr>
							</thead>
							<tbody>
								{(t.raw("pricing.comparison.items") as Array<{ label: string; selfservice: boolean | string; prestation: boolean | string }>).map((item, i) => (
									<tr key={i} className="border-b border-border/50">
										<td className="py-3 px-4 text-sm">{item.label}</td>
										<td className="py-3 px-4 text-center">
											{item.selfservice === true ? (
												<Check className="size-5 text-secondary mx-auto" />
											) : item.selfservice === false ? (
												<X className="size-5 text-muted-foreground/40 mx-auto" />
											) : (
												<span className="text-sm font-medium">{String(item.selfservice)}</span>
											)}
										</td>
										<td className="py-3 px-4 text-center">
											{item.prestation === true ? (
												<Check className="size-5 text-secondary mx-auto" />
											) : item.prestation === false ? (
												<X className="size-5 text-muted-foreground/40 mx-auto" />
											) : (
												<span className="text-sm font-medium">{String(item.prestation)}</span>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</Section>

			{/* Use Cases - Centered blocks */}
			<Section
				id="use-cases"
				variant="muted"
				header={{
					title: t("useCases.title"),
					centered: true,
				}}
			>
				<div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
					{useCases.map((useCase) => {
						const Icon = useCase.icon;
						return (
							<div key={useCase.key} className="text-center">
								<div className="size-14 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
									<Icon className="size-7 text-secondary" />
								</div>
								<h3 className="text-lg font-bold mb-2">
									{t(`useCases.${useCase.key}.title`)}
								</h3>
								<p className="text-muted-foreground text-sm leading-relaxed mb-4">
									{t(`useCases.${useCase.key}.description`)}
								</p>
								<div className="flex flex-wrap gap-2 justify-center">
									{(t.raw(`useCases.${useCase.key}.tags`) as string[]).map((tag) => (
										<span
											key={tag}
											className="text-xs font-medium bg-secondary/10 text-secondary px-3 py-1 rounded-full"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						);
					})}
				</div>
			</Section>

			{/* CTA */}
			<Section id="cta" variant="default">
				<div className="text-center max-w-2xl mx-auto">
					<h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
					<p className="text-muted-foreground mb-8">{t("cta.description")}</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" asChild>
							<Link href="/#contact">
								<MessageCircle className="size-4 mr-2" />
								{t("cta.button")}
							</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<Link href="/faq">
								<HelpCircle className="size-4 mr-2" />
								{t("cta.faq")}
							</Link>
						</Button>
					</div>
				</div>
			</Section>
		</main>
	);
}
