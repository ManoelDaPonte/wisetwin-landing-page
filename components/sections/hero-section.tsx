// components/sections/hero-section.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { WordRotate } from "@/components/magicui/word-rotate";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

export function HeroSection() {
	const gridRef = useRef<HTMLDivElement>(null);

	const changingTexts = [
		"de productivité",
		"de rentabilité",
		"d'engagement",
		"de sérénité",
	];

	// Animation de la grille
	useEffect(() => {
		const grid = gridRef.current;
		if (!grid) return;

		let animationId: number;
		let position = 0;

		const animate = () => {
			position -= 0.5; // Vitesse de défilement
			grid.style.transform = `translateY(${position}px)`;

			// Reset position when scrolled one grid cell
			if (position <= -40) {
				position = 0;
			}

			animationId = requestAnimationFrame(animate);
		};

		animationId = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(animationId);
		};
	}, []);

	return (
		<div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
			{/* Grille 3D animée en arrière-plan */}
			<div className="absolute inset-0 opacity-20 pointer-events-none">
				<div
					ref={gridRef}
					className="absolute inset-0 w-full h-[120%]"
					style={{
						backgroundImage: `
                            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                        `,
						backgroundSize: "40px 40px",
						transform: "perspective(100px) rotateX(25deg)",
						transformOrigin: "center top",
					}}
				/>
				{/* Effet de dégradé pour masquer les bords */}
				<div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
				<div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
			</div>

			{/* Conteneur principal */}
			<div className="container mx-auto px-6 sm:px-8 md:px-4 max-w-7xl relative z-10">
				<div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-12 sm:py-16 lg:py-20">
					{/* Contenu textuel - Colonne gauche */}
					<div className="flex flex-col justify-center space-y-6 lg:space-y-8">
						<div className="space-y-6">
							<div className="space-y-3">
								{/* Titre fixe */}
								<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
									Plus de{" "}
									<span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-wisetwin-blue">
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
											className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-wisetwin-blue min-w-[140px] sm:min-w-[170px] lg:min-w-[200px] xl:min-w-[240px] text-left"
										/>
									</div>
								</div>
							</div>

							<p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl pt-2 lg:pt-4">
								Réduisez les incidents et ancrez une culture de
								la sécurité durable. Nos formations immersives,
								répliques exactes de vos installations,
								transforment vos procédures en réflexes.
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-4">
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
					<div className="flex items-center justify-center">
						<div className="relative w-full max-w-2xl">
							{/* Effet de halo lumineux */}
							<div className="absolute inset-0 bg-gradient-to-r from-wisetwin-blue/20 to-secondary/20 rounded-2xl blur-3xl transform scale-110" />

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

			{/* Indicateur de scroll permanent */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
				<div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
					<div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse" />
				</div>
			</div>
		</div>
	);
}
