"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import {
	ArrowRight,
	Cuboid,
	FileText,
	Footprints,
	LayoutGrid,
	Lock,
} from "lucide-react";

export type BrickKey = "wisetrainer" | "wisepaper" | "wisetour";

const icons = {
	wisetrainer: Cuboid,
	wisepaper: FileText,
	wisetour: Footprints,
} as const;

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// Grille de plan technique, signature industrielle des pages briques
const blueprintGrid = {
	backgroundImage:
		"linear-gradient(color-mix(in oklab, var(--color-border) 45%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--color-border) 45%, transparent) 1px, transparent 1px)",
	backgroundSize: "44px 44px",
};

export default function BrickClient({ brick }: { brick: BrickKey }) {
	const t = useTranslations("brickPages");
	const reduceMotion = useReducedMotion();
	const Icon = icons[brick];
	// WisePaper est un éditeur inclus dans la plateforme LMS ; les autres sont des projets one-shot
	const platformOnly = brick === "wisepaper";

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
		<>
			{/* Hero compact */}
			<div className="relative overflow-hidden border-b border-border bg-background">
				<div aria-hidden className="absolute inset-0" style={blueprintGrid} />
				<div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
				<div className="container mx-auto max-w-7xl px-4 relative pt-36 pb-20 md:pt-44 md:pb-24">
					<motion.div
						variants={container}
						initial="hidden"
						animate="show"
						className="max-w-3xl"
					>
						<motion.p
							variants={item}
							className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-4"
						>
							{t("common.eyebrow")} · {t(`${brick}.tag`)}
						</motion.p>
						<motion.div variants={item} className="flex items-center gap-5 mb-5">
							<div className="size-14 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
								<Icon className="size-7 text-secondary" />
							</div>
							<h1 className="text-4xl md:text-6xl font-bold tracking-tight">
								{t(`${brick}.title`)}
							</h1>
						</motion.div>
						<motion.p
							variants={item}
							className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8"
						>
							{t(`${brick}.subtitle`)}
						</motion.p>

						<motion.div variants={item} className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-9">
							{platformOnly ? (
								<span className="inline-flex items-center gap-2 text-lg font-semibold">
									<Lock className="size-4.5 text-secondary" />
									{t(`${brick}.price`)}
								</span>
							) : (
								<span className="flex items-baseline gap-2.5 flex-wrap">
									<span className="text-4xl font-bold tabular-nums">
										{t(`${brick}.price`)}
									</span>
									<span className="text-lg text-muted-foreground">
										{t(`${brick}.priceSuffix`)}
									</span>
								</span>
							)}
							<span className="text-sm text-muted-foreground max-w-sm">
								{t(`${brick}.priceNote`)}
							</span>
						</motion.div>

						<motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
							<Button size="lg" className="h-12 px-7" asChild>
								<Link href="/#contact">
									{t("common.ctaQuote")}
									<ArrowRight className="size-4 ml-2" />
								</Link>
							</Button>
							<Button size="lg" variant="outline" className="h-12 px-7" asChild>
								<Link href="/solutions/plateforme">
									<LayoutGrid className="size-4 mr-2" />
									{t("common.ctaPlatform")}
								</Link>
							</Button>
						</motion.div>
					</motion.div>
				</div>
			</div>

			{/* Ce que ça fait, en 3 points */}
			<Section variant="muted">
				<div className="grid md:grid-cols-3 gap-5">
					{([0, 1, 2] as const).map((i) => (
						<Reveal key={i} delay={i * 0.1} className="h-full">
							<div className="relative h-full bg-card border border-border rounded-2xl p-7 hover:border-secondary/40 transition-colors overflow-hidden">
								<span
									aria-hidden
									className="absolute -top-6 -right-2 font-mono font-bold text-[110px] leading-none text-secondary/[0.07] select-none"
								>
									{i + 1}
								</span>
								<p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-4">
									{String(i + 1).padStart(2, "0")}
								</p>
								<h3 className="text-xl font-bold mb-3">
									{t(`${brick}.features.${i}.title`)}
								</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">
									{t(`${brick}.features.${i}.description`)}
								</p>
							</div>
						</Reveal>
					))}
				</div>
			</Section>

			{/* Bandeau plateforme + CTA final */}
			<Section variant="default">
				<Reveal>
					<div className="rounded-3xl border-2 border-secondary/40 bg-card p-8 md:p-12 relative overflow-hidden">
						<div aria-hidden className="absolute inset-0" style={blueprintGrid} />
						<div className="relative flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
							<div className="max-w-xl">
								<p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-3">
									{t(platformOnly ? "common.included.eyebrow" : "common.included.eyebrowStandalone")}
								</p>
								<h2 className={cn("text-2xl md:text-3xl font-bold tracking-tight mb-3")}>
									{t(platformOnly ? "common.included.titleExclusive" : "common.included.title")}
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									{t(platformOnly ? "common.included.descriptionPlatform" : "common.included.description")}
								</p>
							</div>
							<div className="flex flex-col gap-3 shrink-0">
								<Button size="lg" className="h-12 px-7" asChild>
									<Link href="/solutions/plateforme">
										{t("common.included.cta")}
										<ArrowRight className="size-4 ml-2" />
									</Link>
								</Button>
								<Button size="lg" variant="ghost" asChild>
									<Link href="/#contact">{t("common.ctaQuote")}</Link>
								</Button>
							</div>
						</div>
					</div>
				</Reveal>
			</Section>
		</>
	);
}
