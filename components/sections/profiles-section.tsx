// components/sections/profiles-section.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, School, HardHat, ChartBar } from "lucide-react";

import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ProfilesSection() {
	// Données des différents profils
	const profiles = [
		{
			id: "responsable-hse",
			title: "Responsable HSE",
			description:
				"Réduisez les incidents et améliorez la culture sécurité dans votre entreprise",
			icon: <Shield className="size-10 text-secondary" />,
			challenges: [
				"Taux d'accidents élevés",
				"Conformité réglementaire",
				"Engagement des équipes",
			],
			solution:
				"WiseTwin permet de former sans risque à la sécurité et d'analyser précisément les comportements.",
		},
		{
			id: "responsable-formation",
			title: "Responsable Formation",
			description:
				"Optimisez l'efficacité de vos programmes de formation et mesurez les résultats",
			icon: <School className="size-10 text-secondary" />,
			challenges: [
				"Engagement limité",
				"Temps de formation long",
				"Évaluation complexe",
			],
			solution:
				"WiseTwin offre des formations immersives et des analyses détaillées des compétences acquises.",
		},
		{
			id: "chef-production",
			title: "Chef de Production",
			description:
				"Maximisez le temps de fonctionnement et l'efficacité de vos équipements",
			icon: <HardHat className="size-10 text-secondary" />,
			challenges: [
				"Arrêts machines coûteux",
				"Formation sans immobilisation",
				"Optimisation des procédures",
			],
			solution:
				"WiseTwin permet de former sur des jumeaux numériques sans arrêter la production.",
		},
		{
			id: "directeur-industriel",
			title: "Directeur Industriel",
			description:
				"Pilotez la transformation digitale et valorisez votre savoir-faire industriel",
			icon: <ChartBar className="size-10 text-secondary" />,
			challenges: [
				"Réduction des coûts",
				"Modernisation",
				"Gestion multi-sites",
			],
			solution:
				"WiseTwin crée des jumeaux numériques de vos installations pour optimiser la performance globale.",
		},
	];

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	return (
		<Section
			id="vous-etes"
			variant="muted"
			header={{
				title: "Vous êtes ?",
				description:
					"WiseTwin s'adapte aux besoins spécifiques de chaque profil dans l'industrie",
				centered: true,
			}}
		>
			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				className="grid md:grid-cols-2 gap-8"
			>
				{profiles.map((profile, index) => (
					<motion.div key={profile.id} variants={itemVariants}>
						<Card className="h-full hover:shadow-lg transition-all duration-300">
							<CardContent className="p-6">
								<div className="flex flex-col items-center md:items-start md:flex-row gap-4 md:gap-6">
									<div className="flex-shrink-0">
										<div className="size-20 bg-secondary/10 rounded-lg flex items-center justify-center">
											{profile.icon}
										</div>
									</div>
									<div className="flex-grow">
										<h3 className="text-2xl font-bold text-center md:text-left mb-2">
											{profile.title}
										</h3>
										<p className="text-muted-foreground text-center md:text-left mb-4">
											{profile.description}
										</p>

										<div className="mb-4">
											<h4 className="text-sm font-medium mb-2">
												Défis principaux :
											</h4>
											<ul className="flex flex-wrap gap-2 justify-center md:justify-start">
												{profile.challenges.map(
													(challenge, i) => (
														<li
															key={i}
															className="text-xs bg-wisetwin-blue/10 text-wisetwin-darkblue px-2 py-1 rounded-full"
														>
															{challenge}
														</li>
													)
												)}
											</ul>
										</div>

										<p className="text-sm text-muted-foreground mb-6 text-center md:text-left">
											{profile.solution}
										</p>

										<div className="flex justify-center md:justify-start">
											<Button asChild variant="secondary">
												<Link
													href={`/profils/${profile.id}`}
												>
													<span className="flex items-center gap-1">
														En savoir plus
														<ArrowRight className="size-4 ml-1" />
													</span>
												</Link>
											</Button>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</motion.div>
		</Section>
	);
}
