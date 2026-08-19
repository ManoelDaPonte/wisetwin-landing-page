"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function HeroSection() {
	const t = useTranslations("hero");
	const reduceMotion = useReducedMotion();
	const chips = t.raw("chips") as string[];

	const container = {
		hidden: {},
		show: { transition: { staggerChildren: 0.1 } },
	};
	const item = reduceMotion
		? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
		: {
				hidden: { opacity: 0, y: 28 },
				show: {
					opacity: 1,
					y: 0,
					transition: { duration: 0.8, ease: EASE },
				},
			};

	return (
		<div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
			<InteractiveGridPattern
				className={cn(
					"opacity-40 dark:opacity-60 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
				)}
				width={30}
				height={30}
				squares={[50, 35]}
				squaresClassName="hover:fill-blue-500 dark:hover:fill-cyan-400"
			/>

			<div className="container mx-auto px-6 sm:px-8 md:px-4 max-w-7xl relative z-10 pointer-events-none">
				<div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[calc(100vh-120px)] py-12 sm:py-16 lg:py-20">
					<motion.div
						variants={container}
						initial="hidden"
						animate="show"
						className="flex flex-col justify-center space-y-7 lg:space-y-8"
					>
						<motion.span
							variants={item}
							className="inline-flex w-fit items-center px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-xs sm:text-sm font-medium text-secondary"
						>
							{t("badge")}
						</motion.span>

						<motion.h1
							variants={item}
							className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05]"
						>
							{t("titlePrefix").split("\n").map((line, i, arr) => (
								<span key={i}>
									{line}
									{i < arr.length - 1 && <br />}
								</span>
							))}
							<br />
							<span className="text-secondary">
								{t("titleHighlight")}
							</span>
						</motion.h1>

						<motion.p
							variants={item}
							className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg"
						>
							{t("subtitle")}
						</motion.p>

						<motion.div
							variants={item}
							className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
						>
							<Button
								size="lg"
								className="h-13 px-8 text-base font-medium"
								asChild
							>
								<a href="#contact">
									{t("cta")}
									<ArrowRight className="size-4 ml-2" />
								</a>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="h-13 px-8 text-base font-medium"
								asChild
							>
								<a href="#expertises">{t("ctaSecondary")}</a>
							</Button>
						</motion.div>

						<motion.ul variants={item} className="flex flex-wrap gap-x-6 gap-y-2">
							{chips.map((chip, i) => (
								<li
									key={i}
									className="flex items-center gap-2 text-sm text-muted-foreground"
								>
									<Check className="size-4 text-secondary shrink-0" />
									{chip}
								</li>
							))}
						</motion.ul>
					</motion.div>

					<motion.div
						initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 24 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
						className="flex flex-col items-center justify-center gap-4 pointer-events-auto"
					>
						<div className="relative w-full max-w-2xl">
							<div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl transform scale-110" />
							{/* Browser frame */}
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
								<video
									autoPlay
									loop
									muted
									playsInline
									poster="/image/wisetrainer-hero-poster.jpg"
									className="w-full aspect-video object-cover"
								>
									<source src="/video/WiseTrainer-SimulateursDeFormation.mp4" type="video/mp4" />
								</video>
							</div>
						</div>
						<p className="text-sm text-muted-foreground text-center max-w-md">
							{t("videoCaption")}{" "}
							<Link
								href="/solutions/wisetrainer"
								className="inline-flex items-center gap-1 font-medium text-secondary hover:underline underline-offset-4"
							>
								{t("videoLink")}
								<ArrowRight className="size-3.5" />
							</Link>
						</p>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
