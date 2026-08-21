"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/ui/reveal";
import {
	Building2,
	Users,
	Construction,
	Check,
	MessageCircle,
	Landmark,
	Factory,
	Scale,
	Layers,
	UserCog,
	Share2,
	ArrowRight,
} from "lucide-react";
import Image from "next/image";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// Grille de plan technique, signature industrielle commune aux pages produit
const blueprintGrid = {
	backgroundImage:
		"linear-gradient(color-mix(in oklab, var(--color-border) 45%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--color-border) 45%, transparent) 1px, transparent 1px)",
	backgroundSize: "44px 44px",
};

const pillars = [
	{ key: "rendering", icon: Layers },
	{ key: "collaboration", icon: UserCog },
	{ key: "sharing", icon: Share2 },
] as const;

const steps = ["define", "data", "design", "publish"] as const;

// Décalages verticaux façon événements posés sur un agenda
const stepOffsets = ["lg:mt-2", "lg:mt-10", "lg:mt-4", "lg:mt-12"] as const;

const useCases = [
	{ key: "territory", icon: Building2 },
	{ key: "stakeholders", icon: Users },
	{ key: "infrastructure", icon: Construction },
	{ key: "consultation", icon: Scale },
] as const;

const audiences = [
	{
		key: "collectivites",
		icon: Landmark,
		image: "/image/ecosystemed.wisetwin.eu_.webp",
	},
	{
		key: "entreprises",
		icon: Factory,
		image: "/image/WiseAtlas-entreprises.webp",
	},
] as const;

const actionSteps = ["demo", "needs", "proposal"] as const;

export default function WiseAtlasClient() {
	const t = useTranslations("wiseatlas");
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
			{/* Hero : texte + carte aérienne, sur grille de plan */}
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
								className="text-4xl md:text-6xl font-bold tracking-tight whitespace-pre-line mb-5"
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
							</motion.div>
						</motion.div>

						{/* La carte du bassin, en vitrine */}
						<motion.div
							initial={reduceMotion ? false : { opacity: 0, scale: 0.96, x: 24 }}
							animate={{ opacity: 1, scale: 1, x: 0 }}
							transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
						>
							<div className="relative rounded-2xl border border-border overflow-hidden shadow-2xl bg-card">
								<div className="relative w-full aspect-video">
									<Image
										src="/image/WiseAtlas.webp"
										alt="WiseAtlas"
										fill
										className="object-cover"
										sizes="(max-width: 1024px) 100vw, 50vw"
										priority
									/>
								</div>
								<span className="absolute top-4 left-4 text-xs font-mono uppercase tracking-wider text-white bg-black/50 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full">
									{t("hero.tag")}
								</span>
							</div>
						</motion.div>
					</div>
				</div>
			</div>

			{/* Pillars - What WiseAtlas is */}
			<Section
				id="pillars"
				variant="muted"
				header={{
					title: t("pillars.title"),
					description: t("pillars.subtitle"),
					centered: true,
				}}
			>
				<div className="grid md:grid-cols-3 gap-5">
					{pillars.map((pillar, i) => {
						const Icon = pillar.icon;
						return (
							<Reveal key={pillar.key} delay={i * 0.1} className="h-full">
								<div className="relative h-full bg-card border border-border rounded-2xl p-7 hover:border-secondary/40 transition-colors overflow-hidden">
									<span
										aria-hidden
										className="absolute -top-6 -right-2 font-mono font-bold text-[110px] leading-none text-secondary/[0.07] select-none"
									>
										{i + 1}
									</span>
									<div className="flex items-center justify-between mb-5">
										<div className="size-12 bg-secondary/10 rounded-xl flex items-center justify-center">
											<Icon className="size-6 text-secondary" />
										</div>
										<span className="text-xs font-mono uppercase tracking-[0.2em] text-secondary">
											{String(i + 1).padStart(2, "0")}
										</span>
									</div>
									<h3 className="text-xl font-bold mb-3">
										{t(`pillars.${pillar.key}.title`)}
									</h3>
									<p className="text-muted-foreground text-sm leading-relaxed">
										{t(`pillars.${pillar.key}.description`)}
									</p>
								</div>
							</Reveal>
						);
					})}
				</div>
			</Section>

			{/* Audiences - Who it's for */}
			<Section
				id="audiences"
				variant="default"
				header={{
					title: t("audiences.title"),
					description: t("audiences.subtitle"),
					centered: true,
				}}
			>
				<div className="flex flex-col gap-16 lg:gap-20">
					{audiences.map((audience, index) => {
						const Icon = audience.icon;
						const isReversed = index % 2 !== 0;
						return (
							<Reveal key={audience.key}>
								<div className="grid lg:grid-cols-2 gap-12 items-center">
									<div className={isReversed ? "lg:order-2" : ""}>
										<p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-4">
											{t("audiences.label")} {String(index + 1).padStart(2, "0")}
										</p>
										<div className="flex items-center gap-3 mb-6">
											<div className="size-12 bg-secondary/10 rounded-xl flex items-center justify-center">
												<Icon className="size-6 text-secondary" />
											</div>
											<div>
												<h3 className="text-2xl font-bold">
													{t(`audiences.${audience.key}.title`)}
												</h3>
												<p className="text-sm text-muted-foreground">
													{t(`audiences.${audience.key}.subtitle`)}
												</p>
											</div>
										</div>
										<ul className="space-y-3">
											{(t.raw(`audiences.${audience.key}.features`) as string[]).map((feature, i) => (
												<li key={i} className="flex items-start gap-3">
													<Check className="size-5 text-secondary shrink-0 mt-0.5" />
													<span>{feature}</span>
												</li>
											))}
										</ul>
									</div>
									<div className={isReversed ? "lg:order-1" : ""}>
										{/* Browser frame */}
										<div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-xl">
											<div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
												<div className="flex gap-1.5">
													<div className="size-2.5 rounded-full bg-red-500/80" />
													<div className="size-2.5 rounded-full bg-yellow-500/80" />
													<div className="size-2.5 rounded-full bg-green-500/80" />
												</div>
												<div className="flex-1 text-center">
													<span className="text-xs text-muted-foreground font-mono">
														wiseatlas.wisetwin.eu
													</span>
												</div>
											</div>
											<div className="relative aspect-video">
												<Image
													src={audience.image}
													alt={t(`audiences.${audience.key}.title`)}
													fill
													className="object-cover"
												/>
											</div>
										</div>
									</div>
								</div>
							</Reveal>
						);
					})}
				</div>
			</Section>

			{/* How it works : agenda, comme la méthode sur la home */}
			<Section
				id="how-it-works"
				variant="muted"
				header={{
					title: t("howItWorks.title"),
					description: t("howItWorks.subtitle"),
					centered: true,
				}}
			>
				<Reveal>
					<div className="rounded-3xl border border-border bg-card overflow-hidden">
						<div className="flex items-center gap-2 px-6 py-3.5 border-b border-border bg-muted/50">
							<div className="flex gap-1.5">
								<span className="size-2.5 rounded-full bg-border" />
								<span className="size-2.5 rounded-full bg-border" />
								<span className="size-2.5 rounded-full bg-secondary/60" />
							</div>
							<span className="flex-1 text-center text-xs text-muted-foreground font-mono">
								{t("howItWorks.calendarTitle")}
							</span>
						</div>

						<div
							className="relative grid lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-border"
							style={{
								backgroundImage:
									"repeating-linear-gradient(to bottom, transparent 0, transparent 47px, color-mix(in oklab, var(--color-border) 45%, transparent) 47px, color-mix(in oklab, var(--color-border) 45%, transparent) 48px)",
							}}
						>
							{steps.map((step, i) => (
								<div key={step} className="p-5 lg:p-6 lg:pb-14">
									<p className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground pb-3 mb-4 border-b border-border/60">
										{t(`howItWorks.steps.${step}.duration`)}
									</p>
									<Reveal delay={i * 0.12} y={16}>
										<div
											className={`rounded-xl bg-secondary/10 border border-secondary/15 border-l-4 border-l-secondary p-4 lg:p-5 hover:bg-secondary/15 transition-colors ${stepOffsets[i]}`}
										>
											<h3 className="font-semibold mb-1.5">
												{t(`howItWorks.steps.${step}.title`)}
											</h3>
											<p className="text-sm text-muted-foreground leading-relaxed">
												{t(`howItWorks.steps.${step}.description`)}
											</p>
										</div>
									</Reveal>
								</div>
							))}
						</div>
					</div>
				</Reveal>
			</Section>

			{/* Use Cases */}
			<Section
				id="use-cases"
				variant="default"
				header={{
					title: t("useCases.title"),
					centered: true,
				}}
			>
				<div className="grid md:grid-cols-2 gap-5">
					{useCases.map((useCase, i) => {
						const Icon = useCase.icon;
						const tags = t.raw(`useCases.${useCase.key}.tags`) as string[];
						return (
							<Reveal key={useCase.key} delay={i * 0.08} className="h-full">
								<div className="relative h-full bg-card border border-border rounded-2xl p-7 hover:border-secondary/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
									<span
										aria-hidden
										className="absolute -top-6 -right-2 font-mono font-bold text-[110px] leading-none text-secondary/[0.06] select-none"
									>
										{i + 1}
									</span>
									<div className="flex items-center justify-between mb-5">
										<div className="size-12 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
											<Icon className="size-6 text-secondary" />
										</div>
										<span className="text-xs font-mono uppercase tracking-[0.2em] text-secondary">
											CAS-{String(i + 1).padStart(2, "0")}
										</span>
									</div>
									<h3 className="text-xl font-bold mb-2">
										{t(`useCases.${useCase.key}.title`)}
									</h3>
									<p className="text-muted-foreground text-sm leading-relaxed mb-5">
										{t(`useCases.${useCase.key}.description`)}
									</p>
									<div className="flex flex-wrap gap-1.5">
										{tags.map((tag, j) => (
											<span
												key={j}
												className="text-[11px] font-mono uppercase tracking-wide bg-secondary/10 text-secondary border border-secondary/20 px-2.5 py-1 rounded-sm"
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							</Reveal>
						);
					})}
				</div>
			</Section>

			{/* CTA final, façon pages briques */}
			<Section id="cta" variant="muted">
				<Reveal>
					<div className="rounded-3xl border-2 border-secondary/40 bg-card p-8 md:p-12 relative overflow-hidden">
						<div aria-hidden className="absolute inset-0" style={blueprintGrid} />
						<div className="relative">
							<div className="text-center mb-10">
								<h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
									{t("cta.title")}
								</h2>
								<p className="text-muted-foreground max-w-2xl mx-auto">
									{t("cta.subtitle")}
								</p>
							</div>

							<div className="grid md:grid-cols-3 gap-6 mb-10">
								{actionSteps.map((step) => (
									<div
										key={step}
										className="flex items-start gap-4 bg-background/60 backdrop-blur-[1px] border border-border rounded-xl p-5"
									>
										<span className="font-mono text-sm text-secondary pt-0.5">
											{t(`cta.steps.${step}.number`)}
										</span>
										<div>
											<h3 className="font-semibold mb-1">
												{t(`cta.steps.${step}.title`)}
											</h3>
											<p className="text-sm text-muted-foreground">
												{t(`cta.steps.${step}.description`)}
											</p>
										</div>
									</div>
								))}
							</div>

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
