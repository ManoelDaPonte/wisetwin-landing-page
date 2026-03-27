import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import {
	ArrowLeft,
	Building2,
	Users,
	Construction,
	FileText,
	Database,
	Paintbrush,
	Globe,
	Check,
	X,
	MessageCircle,
	LogIn,
} from "lucide-react";
import Image from "next/image";
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
	const tCommon = useTranslations("common");

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
			<section className="relative py-20 lg:py-28 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
				<div className="container mx-auto max-w-7xl px-4">
					<Link
						href="/"
						className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
					>
						<ArrowLeft className="size-4" />
						<span>{tCommon("back")}</span>
					</Link>

					<div className="text-center max-w-3xl mx-auto mb-12">
						<h1 className="text-4xl lg:text-5xl font-bold mb-6">
							{t("hero.title")}
						</h1>
						<p className="text-xl text-muted-foreground mb-8">
							{t("hero.subtitle")}
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="lg" asChild>
								<Link href="/#contact">
									<MessageCircle className="size-4 mr-2" />
									{t("hero.cta")}
								</Link>
							</Button>
							<Button size="lg" variant="outline" asChild>
								<a href="#" target="_blank" rel="noopener noreferrer">
									<LogIn className="size-4 mr-2" />
									{t("hero.ctaPlatform")}
								</a>
							</Button>
						</div>
					</div>

					{/* Screenshot */}
					<div className="relative max-w-5xl mx-auto">
						<div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 via-primary/20 to-secondary/20 rounded-2xl blur-2xl opacity-50" />
						<div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
							<div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
								<div className="flex gap-1.5">
									<div className="size-3 rounded-full bg-red-500" />
									<div className="size-3 rounded-full bg-yellow-500" />
									<div className="size-3 rounded-full bg-green-500" />
								</div>
								<div className="flex-1 text-center">
									<span className="text-xs text-muted-foreground">WiseAtlas - Carte interactive</span>
								</div>
							</div>
							<div className="relative">
								<Image
									src="/image/WiseAtlas.png"
									alt="WiseAtlas - Carte interactive"
									width={1200}
									height={750}
									className="w-full h-auto"
									priority
								/>
							</div>
						</div>
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
				<div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
					{(["static", "managed", "platform"] as const).map((tier) => {
						const isPopular = tier === "platform";
						const features = t.raw(`pricing.tiers.${tier}.features`) as string[];
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
								<div className="text-center mb-4">
									<h3 className="text-xl font-bold mb-2">
										{t(`pricing.tiers.${tier}.title`)}
									</h3>
									<p className="text-sm text-muted-foreground">
										{t(`pricing.tiers.${tier}.description`)}
									</p>
								</div>

								<div className="text-center py-4">
									<span className="text-3xl font-bold">
										{t(`pricing.tiers.${tier}.price`)}
									</span>
								</div>

								<ul className="space-y-3 flex-1">
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
			</Section>

			{/* Comparison Table */}
			<Section
				id="comparison"
				variant="default"
				header={{
					title: t("pricing.comparison.title"),
					centered: true,
				}}
			>
				<div className="max-w-5xl mx-auto overflow-x-auto">
					<table className="w-full border-collapse">
						<thead>
							<tr className="border-b border-border">
								<th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
									{t("pricing.comparison.features")}
								</th>
								{(["static", "managed", "platform"] as const).map((tier) => (
									<th
										key={tier}
										className={cn(
											"py-4 px-4 text-center text-sm font-bold",
											tier === "platform" && "text-secondary",
										)}
									>
										{t(`pricing.tiers.${tier}.title`)}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{(t.raw("pricing.comparison.items") as Array<{ label: string; static: boolean | string; managed: boolean | string; platform: boolean | string }>).map((item, i) => (
								<tr
									key={i}
									className="border-b border-border/50"
								>
									<td className="py-3 px-4 text-sm">{item.label}</td>
									{(["static", "managed", "platform"] as const).map((tier) => {
										const value = item[tier];
										return (
											<td key={tier} className="py-3 px-4 text-center">
												{value === true ? (
													<Check className="size-5 text-secondary mx-auto" />
												) : value === false ? (
													<X className="size-5 text-muted-foreground/40 mx-auto" />
												) : (
													<span className="text-sm font-medium">{String(value)}</span>
												)}
											</td>
										);
									})}
								</tr>
							))}
						</tbody>
					</table>
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
								<p className="text-muted-foreground text-sm leading-relaxed">
									{t(`useCases.${useCase.key}.description`)}
								</p>
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
							<a href="#" target="_blank" rel="noopener noreferrer">
								<LogIn className="size-4 mr-2" />
								{t("cta.platform")}
							</a>
						</Button>
					</div>
				</div>
			</Section>
		</main>
	);
}
