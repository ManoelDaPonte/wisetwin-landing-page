"use client";

import { useTranslations } from "next-intl";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export function HeroSection() {
	const t = useTranslations("hero");
	const chips = t.raw("chips") as string[];

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
				<div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-120px)] py-12 sm:py-16 lg:py-20">
					<div className="flex flex-col justify-center space-y-6 lg:space-y-8">
						<div className="space-y-6">
							<span className="inline-flex w-fit items-center px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-xs sm:text-sm font-medium text-secondary">
								{t("badge")}
							</span>

							<h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
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
							</h1>

							<p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
								{t("subtitle")}
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
							<Button
								size="lg"
								className="px-8 py-4 text-base font-medium"
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
								className="px-8 py-4 text-base font-medium"
								asChild
							>
								<a href="#expertises">{t("ctaSecondary")}</a>
							</Button>
						</div>

						<ul className="flex flex-wrap gap-x-6 gap-y-2">
							{chips.map((chip, i) => (
								<li
									key={i}
									className="flex items-center gap-2 text-sm text-muted-foreground"
								>
									<Check className="size-4 text-secondary shrink-0" />
									{chip}
								</li>
							))}
						</ul>
					</div>

					<div className="flex flex-col items-center justify-center gap-4 pointer-events-auto">
						<div className="relative w-full max-w-2xl">
							<div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl transform scale-110" />
							<video
								autoPlay
								loop
								muted
								playsInline
								className="relative rounded-2xl shadow-2xl w-full"
							>
								<source src="/video/WiseTrainer-SimulateursDeFormation.mp4" type="video/mp4" />
							</video>
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
					</div>
				</div>
			</div>
		</div>
	);
}
