"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
	Plus,
	MessageCircle,
	LogIn,
	HelpCircle,
	PenLine,
	BarChart3,
	Route,
	ShieldCheck,
	Users,
	FileOutput,
	Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import Image from "next/image";
import { ParallaxImage } from "@/components/ui/parallax-image";
import {
	AdvantagesSection,
	PricingSection,
} from "@/components/sections";

const productImages = [
	"/placeholder.png",
	"/frame/WiseTrainer-wisetwin.png",
	"/placeholder.png",
	"/placeholder.png",
];

function ProductsShowcase({ t }: { t: ReturnType<typeof useTranslations> }) {
	const items = t.raw("products.items") as Array<{
		tag: string;
		title: string;
		description: string;
	}>;

	return (
		<Section
			id="products"
			variant="default"
			header={{
				title: t("products.title"),
				description: t("products.subtitle"),
				centered: true,
			}}
		>
			<div className="max-w-5xl mx-auto">
				{/* Vertical connecting line */}
				<div className="relative">
					<div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-secondary/0 via-secondary/30 to-secondary/0 hidden lg:block" />

					<div className="flex flex-col gap-20 lg:gap-28">
						{items.map((item, i) => {
							const isEven = i % 2 === 0;
							return (
								<div key={i} className="relative">
									{/* Step dot on the line */}
									<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:flex">
										<div className="size-4 rounded-full bg-secondary border-4 border-background shadow-sm" />
									</div>

									<div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isEven ? "" : "direction-rtl"}`}>
										{/* Image side */}
										<div className={`${isEven ? "lg:order-1" : "lg:order-2"}`}>
											<div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border shadow-lg">
												<Image
													src={productImages[i]}
													alt={item.title}
													fill
													className="object-cover"
												/>
											</div>
										</div>

										{/* Text side */}
										<div className={`${isEven ? "lg:order-2" : "lg:order-1"}`}>
											<span className="inline-block text-xs font-mono uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full mb-4">
												{item.tag}
											</span>
											<h3 className="text-2xl lg:text-3xl font-bold mb-4">{item.title}</h3>
											<p className="text-muted-foreground leading-relaxed">
												{item.description}
											</p>
											<div className="mt-6">
												<span className="text-sm font-semibold text-secondary">
													{t("products.quote")}
												</span>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</Section>
	);
}

const featureGroups = [
	{ key: "contentManagement", icon: PenLine },
	{ key: "tracking", icon: BarChart3 },
	{ key: "planning", icon: Route },
	{ key: "security", icon: ShieldCheck },
	{ key: "collaboration", icon: Users },
	{ key: "exports", icon: FileOutput },
] as const;

export default function TrainingHubClient() {
	const t = useTranslations("platform");
	return (
		<main>
			{/* Hero */}
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
				<ParallaxImage src="/image/WiseTrainer.png" alt="WiseTrainer LMS" />
				<div className="absolute inset-0 hero-overlay" />

				<div className="relative z-10 container mx-auto max-w-7xl px-4">
					<div className="text-center max-w-3xl mx-auto">
						<h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-foreground dark:text-white">
							{t("hero.title")}
						</h1>
						<p className="text-lg lg:text-xl text-foreground/70 dark:text-white/80 mb-10 leading-relaxed">
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

			{/* Advantages */}
			<AdvantagesSection />

			{/* Products — scrollable showcase */}
			<ProductsShowcase t={t} />

			{/* Plus separator */}
			<div className="flex items-center justify-center py-6 max-w-5xl mx-auto px-6">
				<div className="flex-1 h-px bg-border" />
				<div className="mx-6 size-12 bg-secondary/10 rounded-full flex items-center justify-center">
					<Plus className="size-6 text-secondary" />
				</div>
				<div className="flex-1 h-px bg-border" />
			</div>

			{/* Pricing */}
			<PricingSection />

			{/* Platform Features */}
			<Section
				id="features"
				variant="muted"
				header={{
					title: t("features.title"),
					description: t("features.subtitle"),
					centered: true,
				}}
			>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
					{featureGroups.map((group) => {
						const Icon = group.icon;
						const items = t.raw(`features.${group.key}.items`) as string[];
						return (
							<div
								key={group.key}
								className="bg-card border border-border rounded-xl p-6 flex flex-col"
							>
								<div className="size-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
									<Icon className="size-6 text-secondary" />
								</div>
								<h3 className="text-lg font-semibold mb-2">
									{t(`features.${group.key}.title`)}
								</h3>
								<p className="text-sm text-muted-foreground mb-4">
									{t(`features.${group.key}.description`)}
								</p>
								<ul className="space-y-2 mt-auto">
									{items.map((item, i) => (
										<li key={i} className="flex items-start gap-2">
											<Check className="size-4 text-secondary shrink-0 mt-0.5" />
											<span className="text-sm">{item}</span>
										</li>
									))}
								</ul>
							</div>
						);
					})}
				</div>
			</Section>

			{/* CTA */}
			<Section id="cta" variant="default">
				<div className="text-center max-w-2xl mx-auto">
					<h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
					<p className="text-muted-foreground mb-8">
						{t("cta.description")}
					</p>
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
