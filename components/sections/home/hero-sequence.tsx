"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import {
	motion,
	useInView,
	useMotionValueEvent,
	useReducedMotion,
	useScroll,
	useTransform,
} from "framer-motion";
import { ArrowRight, BrainCircuit, Compass, Cuboid, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HeroCubeScene = dynamic(() => import("./hero-cube-scene"), { ssr: false });

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// Les 4 cartes reprennent la position des 4 fragments : arrière à gauche / à droite
// (en haut), avant à gauche / à droite (en bas)
const domains = [
	{ key: "training", side: "left", icon: GraduationCap },
	{ key: "consulting", side: "left", icon: Compass },
	{ key: "immersive", side: "right", icon: Cuboid },
	{ key: "software", side: "right", icon: BrainCircuit },
] as const;

type Phase = "intro" | "reveal" | "domains" | "between";

export function HeroSequence() {
	const t = useTranslations("hero");
	const te = useTranslations("expertises");
	const reduceMotion = useReducedMotion();
	const { resolvedTheme } = useTheme();
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { amount: 0 });
	const [phase, setPhase] = useState<Phase>("intro");

	const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

	const introOpacity = useTransform(scrollYProgress, [0, 0.08, 0.16], [1, 1, 0]);
	const introY = useTransform(scrollYProgress, [0, 0.16], [0, -80]);
	const hintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);
	const revealOpacity = useTransform(scrollYProgress, [0.42, 0.48, 0.58, 0.63], [0, 1, 1, 0]);
	const revealY = useTransform(scrollYProgress, [0.42, 0.48], [24, 0]);
	const domainsOpacity = useTransform(scrollYProgress, [0.74, 0.82], [0, 1]);
	const domainsY = useTransform(scrollYProgress, [0.74, 0.82], [32, 0]);

	// Seule la phase visible reçoit les clics (les calques transparents restent inertes)
	useMotionValueEvent(scrollYProgress, "change", (v) => {
		setPhase(v < 0.12 ? "intro" : v > 0.42 && v < 0.62 ? "reveal" : v > 0.76 ? "domains" : "between");
	});

	return (
		<section ref={ref} className="relative h-[420vh] bg-background">
			<div className="sticky top-0 h-[100svh] overflow-hidden">
				<div
					aria-hidden
					className="absolute inset-0"
					style={{
						background:
							"radial-gradient(60% 55% at 62% 48%, color-mix(in oklab, var(--color-secondary) 14%, transparent), transparent 70%)",
					}}
				/>
				<div
					aria-hidden
					className="absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_50%,white,transparent)]"
					style={{
						backgroundImage:
							"linear-gradient(color-mix(in oklab, var(--color-border) 45%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--color-border) 45%, transparent) 1px, transparent 1px)",
						backgroundSize: "64px 64px",
					}}
				/>

				<motion.div
					className="absolute inset-0"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1.2, delay: 0.3 }}
				>
					<HeroCubeScene
						progress={scrollYProgress}
						active={inView}
						theme={resolvedTheme === "light" ? "light" : "dark"}
						labels={{
							danger: t("scene.poi.danger"),
							emergency: t("scene.poi.emergency"),
							quality: t("scene.poi.quality"),
						}}
					/>
				</motion.div>

				{/* Temps 1 : la promesse */}
				<motion.div
					style={{ opacity: introOpacity, y: introY }}
					className="absolute inset-0 pointer-events-none"
				>
					<div className="container mx-auto max-w-7xl px-6 sm:px-8 h-full flex items-end pb-[14svh] md:items-center md:pb-0">
						<motion.div
							initial={reduceMotion ? false : { opacity: 0, y: 28 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.9, ease: EASE }}
							className={cn("max-w-3xl space-y-7", phase === "intro" && "pointer-events-auto")}
						>
							<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.03]">
								{t("titlePrefix").split("\n").map((line, i) => (
									<span key={i} className="block">
										{line}
									</span>
								))}
								<span className="block text-secondary">{t("titleHighlight")}</span>
							</h1>
							<p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
								{t("subtitle")}
							</p>
							<div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
								<Button size="lg" className="h-13 px-8 text-base font-medium w-fit" asChild>
									<a href="#contact">
										{t("cta")}
										<ArrowRight className="size-4 ml-2" />
									</a>
								</Button>
								<p className="text-sm text-muted-foreground">{t("proof")}</p>
							</div>
						</motion.div>
					</div>
				</motion.div>

				<motion.div
					style={{ opacity: hintOpacity }}
					className="pointer-events-none absolute bottom-6 inset-x-0 flex flex-col items-center gap-3"
				>
					<span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
						{t("scroll")}
					</span>
					<span className="relative h-10 w-px overflow-hidden bg-border">
						<span className="absolute inset-x-0 top-0 h-1/2 bg-secondary animate-[scroll-hint_1.8s_ease-in-out_infinite]" />
					</span>
				</motion.div>

				{/* Temps 2 : ce qu'il y a dans le cube */}
				<motion.div
					style={{ opacity: revealOpacity, y: revealY }}
					className="pointer-events-none absolute inset-x-0 top-[15svh] px-6 text-center"
				>
					<h2 className="text-3xl md:text-5xl font-bold tracking-tight">{t("reveal.title")}</h2>
					<p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
						{t("reveal.subtitle")}
					</p>
				</motion.div>

				{/* Temps 3 : les 4 savoir-faire, portés par les 4 fragments. Le voile assombrit
				    les côtés de la scène pour que les cartes s'en détachent. */}
				<motion.div
					aria-hidden
					style={{
						opacity: domainsOpacity,
						background:
							"linear-gradient(90deg, color-mix(in oklab, var(--color-background) 88%, transparent) 0%, transparent 32%, transparent 68%, color-mix(in oklab, var(--color-background) 88%, transparent) 100%), linear-gradient(180deg, color-mix(in oklab, var(--color-background) 70%, transparent) 0%, transparent 25%)",
					}}
					className="pointer-events-none absolute inset-0"
				/>
				<motion.div
					style={{ opacity: domainsOpacity, y: domainsY }}
					className="pointer-events-none absolute inset-0"
				>
					<div className="container mx-auto max-w-7xl px-6 sm:px-8 h-full flex flex-col pt-[13svh] pb-[6svh]">
						<h2 className="text-center text-3xl md:text-5xl font-bold tracking-tight">
							{t("domains.title")}
						</h2>
						<div className="flex-1 grid grid-cols-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)] gap-x-4 md:gap-x-8 content-end md:content-center gap-y-3 md:gap-y-24 mt-6">
							{(["left", "right"] as const).map((side) => (
								<div
									key={side}
									className={cn(
										"flex flex-col gap-3 md:gap-24",
										side === "right" && "md:col-start-3 md:items-end md:text-right"
									)}
								>
									{domains
										.filter((d) => d.side === side)
										.map((d) => {
											const Icon = d.icon;
											return (
												<div
													key={d.key}
													className={cn(
														"relative w-full max-w-sm overflow-hidden rounded-2xl border border-secondary/30 bg-card/95 p-4 md:p-6 shadow-2xl shadow-black/40 backdrop-blur-md",
														"before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-secondary before:to-transparent"
													)}
												>
													<div
														className={cn(
															"flex items-center gap-3",
															side === "right" && "md:flex-row-reverse"
														)}
													>
														<span className="flex size-9 md:size-11 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
															<Icon className="size-5 md:size-6" />
														</span>
														<h3 className="text-base md:text-2xl font-semibold leading-tight">
															{te(`domains.${d.key}.title`)}
														</h3>
													</div>
													<p className="hidden md:block mt-3 text-base text-foreground/75 leading-relaxed">
														{te(`domains.${d.key}.hook`)}
													</p>
												</div>
											);
										})}
								</div>
							))}
						</div>
						<p className="mt-6 text-center text-sm md:text-base text-muted-foreground">
							{t("domains.note")}{" "}
							<a
								href="#contact"
								className={cn(
									"inline-flex items-center gap-1 font-medium text-secondary hover:underline underline-offset-4",
									phase === "domains" && "pointer-events-auto"
								)}
							>
								{t("domains.cta")}
								<ArrowRight className="size-4" />
							</a>
						</p>
					</div>
				</motion.div>
			</div>

			{/* Ancre du menu « Savoir-faire » : tombe sur le temps 3 */}
			<div id="expertises" aria-hidden className="absolute top-[66%] h-px w-px" />
		</section>
	);
}
