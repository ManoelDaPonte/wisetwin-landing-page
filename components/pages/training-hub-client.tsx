"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import {
	Plus,
	HelpCircle,
	PenLine,
	BarChart3,
	Route,
	ShieldCheck,
	Users,
	FileOutput,
	Check,
	MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import Image from "next/image";
import { ParallaxImage } from "@/components/ui/parallax-image";
import {
	AdvantagesSection,
	PricingSection,
} from "@/components/sections";

const productMedia = [
	{ type: "video", src: "/video/capture-3dgs-entrepot.mp4" },
	{ type: "video", src: "/video/3d-reconstruction-training-simulator.mp4" },
	{ type: "image", src: "/image/formation-industrielle-automatisee.svg" },
] as const;

function ProductsShowcase({ t }: { t: ReturnType<typeof useTranslations> }) {
	const items = t.raw("products.items") as Array<{
		tag: string;
		title: string;
		description: string;
	}>;

	const [activeIndex, setActiveIndex] = useState(0);
	const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const observers: IntersectionObserver[] = [];

		itemRefs.current.forEach((ref, i) => {
			if (!ref) return;
			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						setActiveIndex(i);
					}
				},
				{ threshold: 0.5 },
			);
			observer.observe(ref);
			observers.push(observer);
		});

		return () => observers.forEach((o) => o.disconnect());
	}, [items.length]);

	return (
		<section id="products" className="relative">
			{/* Section header */}
			<div className="text-center py-16 px-4">
				<h2 className="text-3xl lg:text-4xl font-bold mb-4">
					{t("products.title")}
				</h2>
				<p className="text-muted-foreground max-w-2xl mx-auto">
					{t("products.subtitle")}
				</p>
			</div>

			{/* Desktop: sticky scroll layout */}
			<div className="hidden lg:grid lg:grid-cols-2 min-h-screen">
				{/* Sticky image side */}
				<div className="relative h-screen sticky top-0">
					{productMedia.map((media, i) => (
						<div
							key={i}
							className="absolute inset-0 transition-opacity duration-700 ease-in-out"
							style={{ opacity: activeIndex === i ? 1 : 0 }}
						>
							{media.type === "video" ? (
								<video
									src={media.src}
									autoPlay
									loop
									muted
									playsInline
									className="absolute inset-0 w-full h-full object-cover"
								/>
							) : (
								<Image
									src={media.src}
									alt={items[i]?.title ?? ""}
									fill
									className="object-cover"
									priority={i === 0}
								/>
							)}
							<div className="absolute inset-0 bg-black/40" />
						</div>
					))}

					{/* Progress indicators */}
					<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
						{items.map((_, i) => (
							<div
								key={i}
								className={`h-1 rounded-full transition-all duration-500 ${
									activeIndex === i
										? "w-8 bg-white"
										: "w-4 bg-white/30"
								}`}
							/>
						))}
					</div>
				</div>

				{/* Scrolling text side */}
				<div>
					{items.map((item, i) => (
						<div
							key={i}
							ref={(el) => { itemRefs.current[i] = el; }}
							className="min-h-screen flex items-center px-12 xl:px-20"
						>
							<div className="max-w-lg">
								<span className="inline-block text-xs font-mono uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full mb-4">
									{item.tag}
								</span>
								<h3 className="text-3xl xl:text-4xl font-bold mb-6">
									{item.title}
								</h3>
								<p className="text-lg text-muted-foreground leading-relaxed mb-8">
									{item.description}
								</p>
								<span className="text-sm font-semibold text-secondary">
									{t("products.quote")}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Mobile: stacked full-width cards */}
			<div className="lg:hidden flex flex-col">
				{items.map((item, i) => {
					const media = productMedia[i];
					return (
					<div key={i} className="relative">
						{/* Full-width image/video */}
						<div className="relative aspect-[16/10] overflow-hidden">
							{media?.type === "video" ? (
								<video
									src={media.src}
									autoPlay
									loop
									muted
									playsInline
									className="absolute inset-0 w-full h-full object-cover"
								/>
							) : (
								<Image
									src={media?.src ?? "/placeholder.png"}
									alt={item.title}
									fill
									className="object-cover"
								/>
							)}
							<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
						</div>
						{/* Text below */}
						<div className="px-6 pb-12 -mt-8 relative z-10">
							<span className="inline-block text-xs font-mono uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full mb-3">
								{item.tag}
							</span>
							<h3 className="text-2xl font-bold mb-3">{item.title}</h3>
							<p className="text-muted-foreground leading-relaxed mb-4">
								{item.description}
							</p>
							<span className="text-sm font-semibold text-secondary">
								{t("products.quote")}
							</span>
						</div>
					</div>
				);
				})}
			</div>
		</section>
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

			{/* Products — immersive scroll showcase */}
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
