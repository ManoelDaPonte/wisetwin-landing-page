// components/sections/tracking-section.tsx
"use client";
import { Section, SectionCard } from "@/components/common/section";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function TrackingSection() {
	const trackingData = [
		{
			title: "Suivi individuel",
			items: [
				"Progression détaillée par module de formation",
				"Identification des compétences acquises",
				"Points d'amélioration personnalisés",
				"Historique des formations suivies",
				"Certificats et validations",
			],
		},
		{
			title: "Analyse des groupes",
			items: [
				"Statistiques globales par équipe ou service",
				"Identification des besoins de formation complémentaire",
				"Conformité aux exigences réglementaires",
				"Rapports détaillés pour les responsables HSE",
				"Analyse des tendances et améliorations",
			],
		},
	];

	return (
		<Section
			id="tracking"
			header={{
				title: "Suivi des formations",
				description:
					"Analysez les performances individuelles et collectives de vos équipes grâce à nos outils de suivi avancés.",
				centered: true,
			}}
			gridCols={2}
			gridGap="large"
		>
			{trackingData.map((card, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: index * 0.2, duration: 0.5 }}
				>
					<SectionCard title={card.title} highlight={index === 0}>
						<ul className="space-y-3 mt-4">
							{card.items.map((item, i) => (
								<motion.li
									key={i}
									className="flex items-start gap-2"
									initial={{ opacity: 0, x: -10 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{
										delay: 0.3 + i * 0.1,
										duration: 0.3,
									}}
								>
									<CheckCircle className="h-5 w-5 text-wisetwin-blue shrink-0 mt-0.5" />
									<span className="text-sm">{item}</span>
								</motion.li>
							))}
						</ul>
					</SectionCard>
				</motion.div>
			))}

			<div className="col-span-2 mt-8">
				<motion.div
					className="bg-wisetwin-darkblue text-white p-6 rounded-lg shadow-lg"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.5, duration: 0.5 }}
				>
					<div className="flex flex-col md:flex-row items-center justify-between gap-6">
						<div>
							<h3 className="text-xl font-semibold mb-2">
								Tableau de bord personnalisé
							</h3>
							<p className="text-white/80">
								Visualisez les progrès de votre équipe en temps
								réel et identifiez les axes d'amélioration grâce
								à notre tableau de bord intuitif.
							</p>
						</div>
						<Button
							className="bg-white text-wisetwin-darkblue hover:bg-white/90 shrink-0"
							onClick={() =>
								document
									.getElementById("contact")
									?.scrollIntoView({ behavior: "smooth" })
							}
						>
							Demander une démo
						</Button>
					</div>
				</motion.div>
			</div>
		</Section>
	);
}
