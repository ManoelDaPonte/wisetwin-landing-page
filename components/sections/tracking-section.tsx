// components/sections/tracking-section.tsx
import { Section, SectionCard } from "@/components/common/section";
import { CheckIcon } from "@/components/ui/icon";

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
			}}
			gridCols={2}
			gridGap="large"
		>
			{trackingData.map((card, index) => (
				<SectionCard key={index} title={card.title}>
					<ul className="space-y-3">
						{card.items.map((item, i) => (
							<li key={i} className="flex items-start gap-2">
								<CheckIcon />
								<span className="text-sm">{item}</span>
							</li>
						))}
					</ul>
				</SectionCard>
			))}
		</Section>
	);
}
