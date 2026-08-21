"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
	PenLine,
	BarChart3,
	Route,
	Users,
	FileOutput,
	Check,
	MessageCircle,
	Clock,
	Workflow,
	MousePointerClick,
	Sparkles,
	ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/ui/reveal";
import Image from "next/image";
import {
	ModularPricingSection,
	SecuritySection,
} from "@/components/sections";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// Grille de plan technique, signature industrielle commune aux pages produit
const blueprintGrid = {
	backgroundImage:
		"linear-gradient(color-mix(in oklab, var(--color-border) 45%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--color-border) 45%, transparent) 1px, transparent 1px)",
	backgroundSize: "44px 44px",
};

// Posters indispensables : le chargement vidéo peut rester bloqué (readyState 0).
// Le 4e panneau (Ask AI) est un visuel généré en CSS, pas un média.
const productMedia = [
	{
		type: "video",
		src: "/video/wisetour-capture.mp4",
		poster: "/image/wisetour-capture-poster.jpg",
		fit: "cover",
	},
	{
		type: "video",
		src: "/video/3d-reconstruction-training-simulator.mp4",
		poster: "/image/wisetrainer-brick-poster.jpg",
		fit: "cover",
	},
	{
		type: "image",
		src: "/image/formation-industrielle-automatisee.svg",
		fit: "contain",
	},
	{
		type: "askai",
		src: "",
		fit: "cover",
	},
] as const;

// Panneau visuel du volet Ask AI (pas de média : généré en CSS)
function AskAiPanel() {
	return (
		<div className="absolute inset-0 bg-gradient-to-br from-[#0f0b40] via-[#0a1a2a] to-[#04060f] flex items-center justify-center">
			<div
				aria-hidden
				className="absolute inset-0 opacity-20"
				style={{
					backgroundImage:
						"linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
					backgroundSize: "44px 44px",
				}}
			/>
			<div className="relative text-center">
				<div className="mx-auto size-20 rounded-2xl bg-secondary/15 border border-secondary/30 flex items-center justify-center mb-6">
					<Sparkles className="size-10 text-secondary" />
				</div>
				<p className="font-mono text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
					WiseTwin AI
				</p>
				<p className="text-3xl font-bold text-white">Ask AI</p>
			</div>
		</div>
	);
}

function ProductsShowcase({ t }: { t: ReturnType<typeof useTranslations> }) {
	const items = t.raw("products.items") as Array<{
		tag: string;
		title: string;
		description: string;
		deployment: string;
		process: string;
		interaction: string;
		price: string;
		useCases: string[];
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
				<div className="h-screen sticky top-0">
					{productMedia.map((media, i) => (
						<div
							key={i}
							className="absolute inset-0 transition-opacity duration-700 ease-in-out"
							style={{ opacity: activeIndex === i ? 1 : 0 }}
						>
							{media.type === "video" ? (
								<video
									src={media.src}
									poster={"poster" in media ? media.poster : undefined}
									autoPlay
									loop
									muted
									playsInline
									className="absolute inset-0 w-full h-full object-cover"
								/>
							) : media.type === "image" ? (
								<Image
									src={media.src}
									alt={items[i]?.title ?? ""}
									fill
									className={
										media.fit === "contain"
											? "object-contain"
											: "object-cover"
									}
									priority={i === 0}
								/>
							) : (
								<AskAiPanel />
							)}
							{/* Voile très léger, juste pour la lisibilité des indicateurs */}
							<div className="absolute inset-0 bg-black/10" />
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
							ref={(el) => {
								itemRefs.current[i] = el;
							}}
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
								<div className="space-y-4 mb-8">
									<div className="flex items-center gap-3">
										<div className="size-8 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
											<Clock className="size-4 text-secondary" />
										</div>
										<p className="text-sm font-semibold">{item.deployment}</p>
									</div>
									<div className="flex items-center gap-3">
										<div className="size-8 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
											<Workflow className="size-4 text-secondary" />
										</div>
										<p className="text-sm text-muted-foreground flex-1">{item.process}</p>
									</div>
									<div className="flex items-center gap-3">
										<div className="size-8 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
											<MousePointerClick className="size-4 text-secondary" />
										</div>
										<p className="text-sm text-muted-foreground flex-1">{item.interaction}</p>
									</div>
								</div>
								<div className="flex flex-wrap gap-2 mb-8">
									{item.useCases.map((uc, j) => (
										<span key={j} className="text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1.5 rounded-full">
											{uc}
										</span>
									))}
								</div>
								<span className="text-sm font-semibold text-secondary">
									{item.price}
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
										poster={"poster" in media ? media.poster : undefined}
										autoPlay
										loop
										muted
										playsInline
										className="absolute inset-0 w-full h-full object-cover"
									/>
								) : media?.type === "askai" ? (
									<AskAiPanel />
								) : (
									<Image
										src={media?.src ?? "/placeholder.png"}
										alt={item.title}
										fill
										className={
											media?.fit === "contain"
												? "object-contain"
												: "object-cover"
										}
									/>
								)}
								<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
							</div>
							{/* Text below */}
							<div className="px-6 pb-12 -mt-8 relative z-10">
								<span className="inline-block text-xs font-mono uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full mb-3">
									{item.tag}
								</span>
								<h3 className="text-2xl font-bold mb-3">
									{item.title}
								</h3>
								<p className="text-muted-foreground leading-relaxed mb-4">
									{item.description}
								</p>
								<div className="space-y-3 mb-4">
									<div className="flex items-center gap-2">
										<div className="size-7 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
											<Clock className="size-3.5 text-secondary" />
										</div>
										<p className="text-sm font-semibold">{item.deployment}</p>
									</div>
									<div className="flex items-center gap-2">
										<div className="size-7 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
											<Workflow className="size-3.5 text-secondary" />
										</div>
										<p className="text-sm text-muted-foreground flex-1">{item.process}</p>
									</div>
									<div className="flex items-center gap-2">
										<div className="size-7 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
											<MousePointerClick className="size-3.5 text-secondary" />
										</div>
										<p className="text-sm text-muted-foreground flex-1">{item.interaction}</p>
									</div>
								</div>
								<div className="flex flex-wrap gap-1.5 mb-4">
									{item.useCases.map((uc, j) => (
										<span key={j} className="text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20 px-2.5 py-1 rounded-full">
											{uc}
										</span>
									))}
								</div>
								<span className="text-sm font-semibold text-secondary">
									{item.price}
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}

// La sécurité a sa propre section (SecuritySection) juste en dessous — pas de doublon ici
const featureGroups = [
	{ key: "contentManagement", icon: PenLine },
	{ key: "askai", icon: Sparkles },
	{ key: "tracking", icon: BarChart3 },
	{ key: "planning", icon: Route },
	{ key: "collaboration", icon: Users },
	{ key: "exports", icon: FileOutput },
] as const;

export default function WiseTrainerClient() {
	const t = useTranslations("platform");
	const reduceMotion = useReducedMotion();

	const container = {
		hidden: {},
		show: { transition: { staggerChildren: 0.08 } },
	};
	const item = reduceMotion
		? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
		: {
				hidden: { opacity: 0, y: 24 },
				show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
			};

	return (
		<main>
			{/* Hero : positionnement LMS, sur grille de plan */}
			<div className="relative overflow-hidden border-b border-border bg-background">
				<div aria-hidden className="absolute inset-0" style={blueprintGrid} />
				<div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
				<div className="container mx-auto max-w-7xl px-4 relative pt-36 pb-20 md:pt-44 md:pb-24">
					<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
						<motion.div variants={container} initial="hidden" animate="show">
							<motion.p
								variants={item}
								className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-4"
							>
								{t("hero.eyebrow")}
							</motion.p>
							<motion.h1
								variants={item}
								className="text-4xl md:text-6xl font-bold tracking-tight mb-5"
							>
								{t("hero.title")}
							</motion.h1>
							<motion.p
								variants={item}
								className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8"
							>
								{t("hero.subtitle")}
							</motion.p>

							<motion.div
								variants={item}
								className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-9"
							>
								<span className="text-4xl font-bold tabular-nums">
									{t("hero.price")}
								</span>
								<span className="text-sm text-muted-foreground max-w-sm">
									{t("hero.priceNote")}
								</span>
							</motion.div>

							<motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
								<Button size="lg" className="h-12 px-7" asChild>
									<Link href="/#contact">
										<MessageCircle className="size-4 mr-2" />
										{t("hero.cta")}
									</Link>
								</Button>
								<Button size="lg" variant="outline" className="h-12 px-7" asChild>
									<a href="#pricing">{t("hero.ctaSecondary")}</a>
								</Button>
							</motion.div>
						</motion.div>

						{/* La plateforme, dans un cadre navigateur */}
						<motion.div
							initial={reduceMotion ? false : { opacity: 0, scale: 0.96, x: 24 }}
							animate={{ opacity: 1, scale: 1, x: 0 }}
							transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
						>
							<div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
								<div className="flex items-center gap-2 px-4 py-2.5 bg-muted/50 border-b border-border">
									<div className="flex gap-1.5">
										<div className="size-2.5 rounded-full bg-red-500/80" />
										<div className="size-2.5 rounded-full bg-yellow-500/80" />
										<div className="size-2.5 rounded-full bg-green-500/80" />
									</div>
									<div className="flex-1 text-center">
										<span className="text-xs text-muted-foreground font-mono">
											app.wisetwin.eu
										</span>
									</div>
								</div>
								<div className="relative w-full aspect-video">
									<Image
										src="/image/WiseTrainer.webp"
										alt={t("hero.title")}
										fill
										className="object-cover object-top"
										sizes="(max-width: 1024px) 100vw, 50vw"
										priority
									/>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</div>

			{/* Products - immersive scroll showcase, juste après le hero */}
			<ProductsShowcase t={t} />

			{/* Pricing */}
			<ModularPricingSection />

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
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{featureGroups.map((group, index) => {
						const Icon = group.icon;
						const items = t.raw(
							`features.${group.key}.items`,
						) as string[];
						return (
							<Reveal key={group.key} delay={index * 0.06} className="h-full">
								<div className="relative h-full bg-card border border-border rounded-2xl p-6 flex flex-col hover:border-secondary/40 transition-colors overflow-hidden">
									<span
										aria-hidden
										className="absolute -top-6 -right-2 font-mono font-bold text-[110px] leading-none text-secondary/[0.06] select-none"
									>
										{index + 1}
									</span>
									<div className="flex items-center justify-between mb-4">
										<div className="size-12 bg-secondary/10 rounded-lg flex items-center justify-center">
											<Icon className="size-6 text-secondary" />
										</div>
										<span className="text-xs font-mono uppercase tracking-[0.2em] text-secondary">
											MOD-{String(index + 1).padStart(2, "0")}
										</span>
									</div>
									<h3 className="text-lg font-semibold mb-2">
										{t(`features.${group.key}.title`)}
									</h3>
									<p className="text-sm text-muted-foreground mb-4">
										{t(`features.${group.key}.description`)}
									</p>
									<ul className="space-y-2 mt-auto">
										{items.map((item, i) => (
											<li
												key={i}
												className="flex items-start gap-2"
											>
												<Check className="size-4 text-secondary shrink-0 mt-0.5" />
												<span className="text-sm">
													{item}
												</span>
											</li>
										))}
									</ul>
								</div>
							</Reveal>
						);
					})}
				</div>
			</Section>

			{/* Security & compliance — platform-specific, lives here rather than on the homepage */}
			<SecuritySection variant="default" />

			{/* CTA final, façon pages briques */}
			<Section id="cta" variant="muted">
				<Reveal>
					<div className="rounded-3xl border-2 border-secondary/40 bg-card p-8 md:p-12 relative overflow-hidden">
						<div aria-hidden className="absolute inset-0" style={blueprintGrid} />
						<div className="relative text-center max-w-2xl mx-auto">
							<h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
								{t("cta.title")}
							</h2>
							<p className="text-muted-foreground mb-8">
								{t("cta.description")}
							</p>
							<div className="flex justify-center">
								<Button size="lg" className="h-12 px-7" asChild>
									<Link href="/#contact">
										{t("cta.button")}
										<ArrowRight className="size-4 ml-2" />
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</Reveal>
			</Section>
		</main>
	);
}
