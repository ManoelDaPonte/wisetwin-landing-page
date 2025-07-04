// components/sections/technology-section.tsx
import { motion } from "framer-motion";
import { BrainCircuit, Code, Clock, Coins, Bot, ChartBar } from "lucide-react";

import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";

export function TechnologySection() {
	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	// Caractéristiques technologiques
	const techFeatures = [
		{
			icon: <Code className="size-5 text-white" />,
			title: "Développement agile",
			description:
				"Création de jumeaux numériques en 3D 25x plus rapide et 5x moins chère que les méthodes traditionnelles.",
		},
		{
			icon: <BrainCircuit className="size-5 text-white" />,
			title: "IA intégrée",
			description:
				"Notre plateforme analyse les parcours utilisateurs et adapte automatiquement les scénarios pédagogiques.",
		},
		{
			icon: <ChartBar className="size-5 text-white" />,
			title: "Analyse prédictive",
			description:
				"WiseScan analyse vos historiques d'incidents pour créer des formations sur mesure et identifier proactivement les zones à risque dans votre industrie.",
		},
		{
			icon: <Bot className="size-5 text-white" />,
			title: "Assistant intelligent personnalisé",
			description:
				"WiseAssist crée une base de connaissances unique, garantissant des réponses pertinentes basées uniquement sur vos formations et procédures.",
		},
		{
			icon: <Clock className="size-5 text-white" />,
			title: "Déploiement rapide",
			description:
				"Mise en place en moins d'une semaine, contre plus de 3 mois pour les solutions concurrentes.",
		},
		{
			icon: <Coins className="size-5 text-white" />,
			title: "ROI exceptionnel",
			description:
				"Personnalisation des formations, réduction des coûts et amélioration des performances des apprenants.",
		},
	];

	// Fonctionnalités IA
	const aiFeatures = [
		{
			title: "Analyse prédictive des risques",
			description:
				"WiseScan étudie les incidents passés pour concevoir des formations ciblées et vous accompagner dans votre démarche de prévention des risques.",
		},
		{
			title: "Support intelligent dédié",
			description:
				"WiseAssist exploite exclusivement les données de vos formations et procédures, sans partage entre clients, pour un assistant 100% personnalisé à votre contexte industriel.",
		},
		{
			title: "Suivi des apprenants",
			description:
				"Analyse en temps réel des comportements et remédiation automatique des difficultés.",
		},
		{
			title: "Analyse des performances",
			description:
				"Tableaux de bord analytiques et identification des points d'amélioration.",
		},
		{
			title: "Individualisation des parcours",
			description:
				"Adaptation automatique des scénarios pédagogiques aux besoins spécifiques.",
		},
	];

	return (
		<Section
			id="notre-technologie"
			variant="dark"
			className="bg-wisetwin-darkblue py-20"
			header={{
				title: "Notre Technologie Innovante",
				description:
					"WiseTwin intègre l'intelligence artificielle dans toutes les étapes de création de valeur",
				centered: true,
				highlight: true,
			}}
		>
			<div className="max-w-5xl mx-auto">

				{/* Caractéristiques techniques */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="grid md:grid-cols-2 gap-8"
				>
					{techFeatures.map((feature, index) => (
						<motion.div key={index} variants={itemVariants}>
							<Card className="bg-wisetwin-darkblue/80 border-wisetwin-blue/20 backdrop-blur-sm">
								<CardContent className="p-6">
									<div className="flex gap-4 items-start">
										<div className="flex-shrink-0 w-10 h-10 bg-wisetwin-blue/30 rounded-full flex items-center justify-center">
											{feature.icon}
										</div>
										<div>
											<h3 className="text-xl font-semibold text-white mb-2">
												{feature.title}
											</h3>
											<p className="text-white/70">
												{feature.description}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>

				{/* Utilisation de l'IA */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					<Card className="mt-12 bg-wisetwin-blue/10 border-wisetwin-blue/20">
						<CardContent className="p-8">
							<h3 className="text-white text-xl font-semibold mb-6 text-center">
								L'IA au service de l'industrie
							</h3>
							<div className="grid md:grid-cols-3 gap-6">
								{aiFeatures.map((feature, index) => (
									<div key={index} className="space-y-3">
										<h4 className="text-wisetwin-blue font-medium">
											{feature.title}
										</h4>
										<p className="text-white/70 text-sm">
											{feature.description}
										</p>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</Section>
	);
}
