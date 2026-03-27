"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
	Plus,
	ArrowLeft,
	LogIn,
	Cuboid,
	FileText,
	Camera,
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
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
	AdvantagesSection,
	PricingSection,
} from "@/components/sections";

const productKeys = ["wisetrainer", "wisepaper", "wisetour"] as const;
type ProductKey = (typeof productKeys)[number];

const productMeta: Record<ProductKey, { icon: typeof Cuboid; image: string; price: string }> = {
	wisetrainer: { icon: Cuboid, image: "/frame/WiseTrainer-wisetwin.png", price: "5 000" },
	wisepaper: { icon: FileText, image: "/placeholder.png", price: "0" },
	wisetour: { icon: Camera, image: "/placeholder.png", price: "500" },
};

function ProductsShowcase({
	tWisetrainer,
	tWisepaper,
	tWisetour,
	tPlatform,
}: {
	tWisetrainer: ReturnType<typeof useTranslations>;
	tWisepaper: ReturnType<typeof useTranslations>;
	tWisetour: ReturnType<typeof useTranslations>;
	tPlatform: ReturnType<typeof useTranslations>;
}) {
	const [selected, setSelected] = useState<ProductKey>("wisetrainer");

	const translators: Record<ProductKey, ReturnType<typeof useTranslations>> = {
		wisetrainer: tWisetrainer,
		wisepaper: tWisepaper,
		wisetour: tWisetour,
	};

	const tp = translators[selected];
	const meta = productMeta[selected];

	return (
		<Section
			id="products"
			variant="default"
			header={{
				title: tPlatform("products.title"),
				description: tPlatform("products.subtitle"),
				centered: true,
			}}
		>
			<div className="max-w-6xl mx-auto">
				{/* Selector tabs */}
				<div className="flex flex-col sm:flex-row gap-3 mb-10 justify-center">
					{productKeys.map((key) => {
						const TabIcon = productMeta[key].icon;
						const t = translators[key];
						const isSelected = selected === key;
						return (
							<button
								key={key}
								onClick={() => setSelected(key)}
								className={cn(
									"flex items-center gap-3 px-6 py-4 rounded-xl text-left transition-all duration-300",
									isSelected
										? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20"
										: "bg-card border border-border hover:border-secondary/50 text-foreground",
								)}
							>
								<div
									className={cn(
										"size-10 rounded-lg flex items-center justify-center shrink-0",
										isSelected ? "bg-white/20" : "bg-secondary/10",
									)}
								>
									<TabIcon className="size-5" />
								</div>
								<div>
									<div className="font-bold">{t("title")}</div>
									<div className={cn(
										"text-sm",
										isSelected ? "text-secondary-foreground/80" : "text-muted-foreground",
									)}>
										{t("subtitle")}
									</div>
								</div>
							</button>
						);
					})}
				</div>

				{/* Content panel */}
				<AnimatePresence mode="wait">
					<motion.div
						key={selected}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
					>
						<div className="grid lg:grid-cols-2 gap-12 items-start">
							<div className="flex flex-col">
								<h3 className="text-2xl font-bold mb-4">{tp("hero.title")}</h3>
								<p className="text-muted-foreground leading-relaxed mb-6">
									{tp("description")}
								</p>
								<ul className="space-y-3">
									{(tp.raw("hero.highlights") as string[] | undefined)
										? (tp.raw("hero.highlights") as string[]).map((item, i) => (
											<li key={i} className="flex items-start gap-2">
												<Check className="size-5 text-secondary shrink-0 mt-0.5" />
												<span className="text-sm">{item}</span>
											</li>
										))
										: null
									}
								</ul>
								<div className="flex-1" />
								<div className="text-center mt-8">
									<span className="text-sm text-muted-foreground block mb-1">{tPlatform("products.from")}</span>
									<span className="text-4xl font-bold">{meta.price}</span>
									<span className="text-2xl text-muted-foreground ml-1">€</span>
								</div>
							</div>
							<div className="relative">
								<div className="absolute -inset-4 bg-gradient-to-r from-secondary/10 via-primary/10 to-secondary/10 rounded-2xl blur-2xl opacity-50" />
								<div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-xl">
									<div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
										<div className="flex gap-1.5">
											<div className="size-3 rounded-full bg-red-500" />
											<div className="size-3 rounded-full bg-yellow-500" />
											<div className="size-3 rounded-full bg-green-500" />
										</div>
									</div>
									<Image
										src={meta.image}
										alt={String(tp("title"))}
										width={600}
										height={375}
										className="w-full h-auto"
									/>
								</div>
							</div>
						</div>
					</motion.div>
				</AnimatePresence>
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
	const tCommon = useTranslations("common");
	const tWisetrainer = useTranslations("wisetrainer");
	const tWisepaper = useTranslations("wisepaper");
	const tWisetour = useTranslations("wisetour");

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
						<Button size="lg" asChild>
							<a href="https://app.wisetwin.eu" target="_blank" rel="noopener noreferrer">
								<LogIn className="size-4 mr-2" />
								{t("hero.cta")}
							</a>
						</Button>
					</div>

					<div className="relative max-w-5xl mx-auto">
						<div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-gradient-to-r from-secondary/20 via-primary/20 to-secondary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
						<div className="relative flex items-end justify-center overflow-hidden -mt-16">
							<div className="relative w-[220%] -ml-[20%] z-20">
								<Image
									src="/frame/WiseTrainer-wisetwin.png"
									alt="WiseTrainer - Simulation 3D sur laptop"
									width={1200}
									height={750}
									className="w-full h-auto"
									priority
								/>
							</div>
							<div className="relative w-[140%] -ml-[68%] z-30">
								<Image
									src="/frame/WiseTour-wisetwin.png"
									alt="WiseTour - Visite virtuelle sur tablette"
									width={800}
									height={600}
									className="w-full h-auto"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Advantages */}
			<AdvantagesSection />

			{/* Products — interactive selector */}
			<ProductsShowcase
				tWisetrainer={tWisetrainer}
				tWisepaper={tWisepaper}
				tWisetour={tWisetour}
				tPlatform={t}
			/>

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
					<Button size="lg" asChild>
						<a href="https://app.wisetwin.eu" target="_blank" rel="noopener noreferrer">
							<LogIn className="size-4 mr-2" />
							{t("cta.button")}
						</a>
					</Button>
				</div>
			</Section>
		</main>
	);
}
