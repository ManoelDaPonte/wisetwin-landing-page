// components/sections/technology-section.tsx
import { BrainCircuit, Code } from "lucide-react";

import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";

export function TechnologySection() {
	// Animation variants

	// Caractéristiques technologiques
	const techFeatures = [
		{
			icon: <Code className="size-5 text-primary-foreground" />,
			title: "Développement agile",
			description:
				"Création de simulateurs et jumeaux numérique à partir de n'importe quelle source (photos, vidéos, plans, BIM, etc...) 25x plus rapide que les méthodes traditionnelles",
		},
		{
			icon: <BrainCircuit className="size-5 text-primary-foreground" />,
			title: "Parcours pédagogiques intelligents",
			description:
				"Notre moteur d'analyse de données en temps réel rétro-alimente et adapte automatiquement les scénarios pédagogiques de l'apprenant",
		},
		// {
		// 	icon: <ChartBar className="size-5 text-primary-foreground" />,
		// 	title: "Analyse prédictive",
		// 	description:
		// 		"Notre moteur de recherche analyse vos historiques d'incidents pour créer des formations sur mesure et identifier proactivement les zones à risque dans votre industrie.",
		// },
		// {
		// 	icon: <Bot className="size-5 text-primary-foreground" />,
		// 	title: "Assistant intelligent personnalisé",
		// 	description:
		// 		"WiseAssist crée une base de connaissances unique, garantissant des réponses pertinentes basées uniquement sur vos formations et procédures.",
		// },
		// {
		// 	icon: <Clock className="size-5 text-primary-foreground" />,
		// 	title: "Déploiement agile",
		// 	description:
		// 		"Mise en place d'un démonstrateur sur-mesure en moins d'une semaine, grâce à un déploiement en ligne accessible depuis n'importe où",
		// },
		// {
		// 	icon: <Coins className="size-5 text-primary-foreground" />,
		// 	title: "Retour sur investissement ",
		// 	description:
		// 		"Personnalisation des formations, réduction des coûts et amélioration des performances des apprenants",
		// },
	];

	// Fonctionnalités IA
	const aiFeatures = [
		{
			title: "Analyse prédictive des risques",
			description:
				"Nous travaillons sur un module intelligent qui étudie les incidents passés pour concevoir des formations ciblées et vous accompagner dans votre démarche de prévention des risques.",
		},
		{
			title: "Support intelligent dédié",
			description:
				"Ce projet permet l'exploitation exclusive des données de formations et procédures, pour un assistant 100% personnalisé à votre contexte industriel.",
		},
		// {
		// 	title: "Suivi des apprenants",
		// 	description:
		// 		"Analyse en temps réel des comportements et remédiation automatique des difficultés.",
		// },
		// {
		// 	title: "Analyse des performances",
		// 	description:
		// 		"Tableaux de bord analytiques et identification des points d'amélioration.",
		// },
		{
			title: "Individualisation des parcours",
			description:
				"Adaptation automatique des scénarios pédagogiques aux besoins spécifiques des apprenants, avec rétro-alimentation des simulateurs Wise Trainer.",
		},
	];

	return (
		<Section
			id="notre-technologie"
			// variant="dark"
			className="py-20"
			header={{
				title: "Une technologie de pointe",
				description:
					"Nous intégrons de multiples briques d'automatisation dans toutes les étapes de création de valeur",
				centered: true,
				highlight: true,
			}}
		>
			{/* Caractéristiques techniques */}
			<div className="grid md:grid-cols-2 gap-8">
				{techFeatures.map((feature, index) => (
					<div key={index}>
						<Card className="bg-card border-border/10 backdrop-blur-sm">
							<CardContent className="p-6">
								<div className="flex gap-4 items-start">
									<div className="flex-shrink-0 w-10 h-10 bg-secondary/80 rounded-full flex items-center justify-center">
										{feature.icon}
									</div>
									<div>
										<h3 className="text-xl font-semibold text-primary-foreground mb-2">
											{feature.title}
										</h3>
										<p className="text-primary-foreground/80">
											{feature.description}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				))}
			</div>

			{/* Utilisation de l'IA */}
			{/* <div>
				<Card className="mt-12 bg-secondary/80 border-secondary/10">
					<CardContent className="p-8">
						<h3 className="text-primary-foreground text-xl font-semibold mb-6 text-center">
							Nos projets de R&D 
						</h3>
						<div className="grid md:grid-cols-3 gap-6">
							{aiFeatures.map((feature, index) => (
								<div key={index} className="space-y-3">
									<h4 className="text-primary-foreground font-medium">
										{feature.title}
									</h4>
									<p className="text-primary-foreground/70 text-sm">
										{feature.description}
									</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div> */}
		</Section>
	);
}
