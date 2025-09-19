// components/sections/profiles-section.tsx
"use client";

import Image from "next/image";
import { Shield, School, HardHat, ChartBar } from "lucide-react";

import { Section } from "@/components/common/section";

export function ProfilesSection() {
	// Données des différents profils
	const profiles = [
		{
			id: "responsable-hse",
			title: "Responsable HSE",
			description:
				"Réduisez les incidents et améliorez la culture sécurité dans votre entreprise",
			icon: <Shield className="size-6 text-secondary" />,
			image: "/storyset/responsable-hse.png",
			challenges: [
				"Taux d'accidents élevés",
				"Conformité réglementaire",
				"Engagement des équipes",
			],
			solution:
				"Wise Twin permet de former sans risque à la sécurité et d'analyser précisément les comportements.",
		},
		{
			id: "responsable-formation",
			title: "Responsable Formation",
			description:
				"Optimisez l'efficacité de vos programmes de formation et mesurez les résultats",
			icon: <School className="size-6 text-secondary" />,
			image: "/storyset/responsable-formation.png",
			challenges: [
				"Engagement limité",
				"Temps de formation long",
				"Évaluation complexe",
			],
			solution:
				"Wise Twin offre des formations immersives et des analyses détaillées des compétences acquises.",
		},
		{
			id: "chef-production",
			title: "Chef de Production",
			description:
				"Maximisez le temps de fonctionnement et l'efficacité de vos équipements",
			icon: <HardHat className="size-6 text-secondary" />,
			image: "/storyset/chef-production.png",
			challenges: [
				"Arrêts machines coûteux",
				"Formation sans immobilisation",
				"Optimisation des procédures",
			],
			solution:
				"Wise Twin permet de former sur des jumeaux numériques sans arrêter la production.",
		},
		{
			id: "directeur-industriel",
			title: "Directeur Industriel",
			description:
				"Pilotez la transformation digitale et valorisez votre savoir-faire industriel",
			icon: <ChartBar className="size-6 text-secondary" />,
			image: "/storyset/directeur-industriel.png",
			challenges: [
				"Réduction des coûts",
				"Modernisation",
				"Gestion multi-sites",
			],
			solution:
				"Wise Twin crée des jumeaux numériques de vos installations pour optimiser la performance globale.",
		},
	];

	// Animation variants

	return (
		<Section
			id="vous-etes"
			variant="default"
			header={{
				title: "Vous êtes ?",
				description:
					"WiseTwin s'adapte aux besoins spécifiques de chaque profil dans l'industrie",
				centered: true,
			}}
		>
			<div className="space-y-20">
				{profiles.map((profile, index) => (
					<div
						key={index}
						className={`grid lg:grid-cols-2 gap-12 items-center ${
							index % 2 === 1 ? "lg:flex-row-reverse" : ""
						}`}
					>
						{/* Image Column */}
						<div
							className={`flex items-center justify-center ${
								index % 2 === 1 ? "lg:order-2" : "lg:order-1"
							}`}
						>
							<div className="w-full max-w-sm">
								<Image
									src={profile.image}
									alt={`${profile.title} - Wise Twin`}
									width={400}
									height={400}
									className="w-full h-auto object-contain"
								/>
							</div>
						</div>

						{/* Content Column */}
						<div
							className={`space-y-6 ${
								index % 2 === 1 ? "lg:order-1" : "lg:order-2"
							}`}
						>
							{/* Header with icon */}
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
									{profile.icon}
								</div>
								<h3 className="text-2xl font-bold text-foreground">
									{profile.title}
								</h3>
							</div>

							<p className="text-muted-foreground text-lg leading-relaxed">
								{profile.description}
							</p>

							{/* Défis principaux */}
							<div>
								<h4 className="text-sm font-semibold mb-3 text-foreground">
									Défis principaux
								</h4>
								<div className="flex flex-wrap gap-2">
									{profile.challenges.map((challenge, i) => (
										<span
											key={i}
											className="text-sm bg-secondary/10 text-foreground px-3 py-1.5 rounded-full"
										>
											{challenge}
										</span>
									))}
								</div>
							</div>

							{/* Solution */}
							<div className="bg-gradient-to-r from-secondary/5 to-secondary/5 border-l-4 border-secondary p-4 rounded-r-lg">
								<p className="text-foreground font-medium leading-relaxed">
									{profile.solution}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</Section>
	);
}
