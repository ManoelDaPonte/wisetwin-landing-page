// components/sections/profiles-section.tsx
"use client";

import { Shield, School, HardHat, ChartBar } from "lucide-react";

import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";

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
			<div className="grid md:grid-cols-2 gap-12">
			{profiles.map((profile, index) => (
				<Card key={index} className="h-full hover:shadow-lg transition-all duration-300">
					<CardContent className="p-6">
						<div className="flex flex-col items-center text-center space-y-4">
							{/* Icône en haut, centrée */}
							<div className="flex-shrink-0">
								<div className="size-16 bg-secondary/10 rounded-lg flex items-center justify-center">
									{profile.icon}
								</div>
							</div>

							{/* Contenu centré */}
							<div className="flex-grow space-y-4">
								<h3 className="text-xl font-bold">
									{profile.title}
								</h3>
								
								<p className="text-muted-foreground text-sm leading-relaxed">
									{profile.description}
								</p>

								{/* Défis principaux */}
								<div>
									<h4 className="text-xs font-medium mb-3 text-muted-foreground uppercase tracking-wide">
										Défis principaux
									</h4>
									<div className="flex flex-wrap gap-2 justify-center">
										{profile.challenges.map((challenge, i) => (
											<span
												key={i}
												className="text-xs bg-wisetwin-blue/10 text-wisetwin-darkblue px-3 py-1 rounded-full"
											>
												{challenge}
											</span>
										))}
									</div>
								</div>

								{/* Solution */}
								<div className="pt-2">
									<h4 className="text-xs font-medium mb-3 text-muted-foreground uppercase tracking-wide">
										Notre solution
									</h4>
									<p className="text-sm text-foreground font-medium leading-relaxed">
										{profile.solution}
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
			</div>
		</Section>
	);
}
