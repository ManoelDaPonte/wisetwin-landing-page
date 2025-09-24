"use client";

import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WordRotate } from "@/components/magicui/word-rotate";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

export function HeroSection() {
	const changingTexts = [
		"de productivité",
		"de rentabilité",
		"d'engagement",
		"de sérénité",
	];

	return (
		<div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
			{/* Grille interactive en arrière-plan avec couleurs WiseTwin */}
			<InteractiveGridPattern
				className={cn(
					"opacity-40 dark:opacity-60 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
				)}
				width={30}
				height={30}
				squares={[50, 35]}
				squaresClassName="hover:fill-blue-500 dark:hover:fill-cyan-400"
			/>

			{/* ÉTAPE 2: Layout 2 colonnes avec vidéo */}
			<div className="container mx-auto px-6 sm:px-8 md:px-4 max-w-7xl relative z-10 pointer-events-none">
				<div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-12 sm:py-16 lg:py-20">
					{/* Contenu textuel - Colonne gauche */}
					<div className="flex flex-col justify-center space-y-6 lg:space-y-8">
						<div className="space-y-6">
							<div className="space-y-3">
								{/* Titre fixe */}
								<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
									Plus de{" "}
									<span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
										sécurité
									</span>
								</h1>

								{/* Texte qui change avec animation */}
								<div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
									<div className="flex items-center flex-wrap gap-2">
										<span>Plus</span>
										<WordRotate
											words={changingTexts}
											duration={2500}
											className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary min-w-[140px] sm:min-w-[170px] lg:min-w-[200px] xl:min-w-[240px] text-left"
										/>
									</div>
								</div>
							</div>

							<p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl pt-2 lg:pt-4">
								Vous voulez ancrer une culture sécurité durable au sein de vos équipes? 
								Nous développons des simulateurs immersifs,
								répliques exactes de vos installations, 
								qui transforment vos formations en expériences  
								et vos procédures en réflexes.
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
							<Button
								size="lg"
								className="px-8 py-4 text-base font-medium"
								asChild
							>
								<Link href="#contact">
									<div className="flex items-center">
										Demander une démo
									</div>
								</Link>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="px-8 py-4 text-base font-medium"
								asChild
							>
								<Link href="#nos-solutions">
									<div>Découvrir nos solutions</div>
								</Link>
							</Button>
						</div>
					</div>

					{/* Vidéo - Colonne droite */}
					<div className="flex items-center justify-center pointer-events-none">
						<div className="relative w-full max-w-2xl pointer-events-auto">
							{/* Effet de halo lumineux */}
							<div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl transform scale-110" />

							{/* Composant vidéo hero */}
							<HeroVideoDialog
								animationStyle="from-center"
								videoSrc="/video/wisetrainer-presentation.mp4"
								thumbnailSrc="/image/wisetrainer-presentation.png"
								thumbnailAlt="WiseTwin Platform Demo"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}