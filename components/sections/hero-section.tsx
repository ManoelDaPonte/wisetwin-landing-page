"use client";

import { useTranslations } from "next-intl";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { WordRotate } from "@/components/magicui/word-rotate";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { Clock, Users, Factory } from "lucide-react";

export function HeroSection() {
	const t = useTranslations("hero");
	const rotatingWords = t.raw("rotatingWords") as string[];

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
							<div className="space-y-3">
								<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
									{t("titlePrefix")}{" "}
									<span className="text-secondary">
										{t("titleHighlight")}
									</span>
								</h1>

								<div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
									<div className="flex items-center flex-wrap gap-2">
										<span>{t("rotatingPrefix")}</span>
										<WordRotate
											words={rotatingWords}
											duration={2500}
											className="text-secondary min-w-[140px] sm:min-w-[170px] lg:min-w-[200px] xl:min-w-[240px] text-left"
										/>
									</div>
								</div>
							</div>

							<p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl pt-2 lg:pt-4">
								{t("subtitle")}
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
							<Button
								size="lg"
								className="px-8 py-4 text-base font-medium"
								asChild
							>
								<a
									href="https://app.wisetwin.eu"
									target="_blank"
									rel="noopener noreferrer"
								>
									{t("cta")}
								</a>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="px-8 py-4 text-base font-medium"
								asChild
							>
								<Link href="/#contact">
									{t("ctaSecondary")}
								</Link>
							</Button>
						</div>
					</div>

					<div className="flex items-center justify-center pointer-events-none">
						<div className="relative w-full max-w-2xl pointer-events-auto">
							<div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl transform scale-110" />
							<HeroVideoDialog
								animationStyle="from-center"
								videoSrc="/video/wisetrainer-presentation.mp4"
								thumbnailSrc="/image/wisetrainer-presentation.png"
								thumbnailAlt="WiseTwin Platform Demo"
							/>
						</div>
					</div>
				</div>

				{/* What we do - 3 key points */}
				<div className="pb-16 lg:pb-20 pointer-events-auto">
					<div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
						<div className="flex items-center gap-3 text-center md:text-left">
							<div className="size-10 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
								<Factory className="size-5 text-secondary" />
							</div>
							<span className="text-sm md:text-base text-muted-foreground">
								{t("highlights.replica")}
							</span>
						</div>
						<div className="hidden md:block w-px h-8 bg-border" />
						<div className="flex items-center gap-3 text-center md:text-left">
							<div className="size-10 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
								<Users className="size-5 text-secondary" />
							</div>
							<span className="text-sm md:text-base text-muted-foreground">
								{t("highlights.team")}
							</span>
						</div>
						<div className="hidden md:block w-px h-8 bg-border" />
						<div className="flex items-center gap-3 text-center md:text-left">
							<div className="size-10 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
								<Clock className="size-5 text-secondary" />
							</div>
							<span className="text-sm md:text-base text-muted-foreground">
								{t("highlights.speed")}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}