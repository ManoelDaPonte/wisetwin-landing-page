// components/sections/solution-section.tsx
import { Lightbulb, Trophy, Zap } from "lucide-react";

import { Section } from "@/components/common/section";

export function SolutionSection() {
	return (
		<Section
			id="notre-solution"
			variant="muted" // Utiliser "muted" au lieu de "default"
			header={{
				title: "Notre Solution Immersive",
				description:
					"Une plateforme d'ingénierie pédagogique multimédia pour transformer la formation industrielle.",
				centered: true,
			}}
		>
			<div className="flex flex-col md:flex-row gap-10 items-center">
				{/* Visualisation du produit */}
				<div
					className="w-full md:w-1/2"
				>
					<div className="aspect-video bg-gradient-to-br from-primary to-secondary rounded-xl overflow-hidden shadow-lg relative">
						<div className="absolute inset-0 flex items-center justify-center">
							<p className="text-primary-foreground text-lg font-medium">
								Jumeaux numériques en 3D
							</p>
						</div>
					</div>
				</div>

				{/* Description */}
				<div
					className="w-full md:w-1/2"
				>
					<h3 className="text-2xl font-bold mb-4">
						Les jumeaux numériques au service de la formation
					</h3>
					<p className="text-muted-foreground mb-6">
						Nous concevons, développons et distribuons des solutions
						pédagogiques numériques et immersives d'environnements
						de travail. Ces solutions sont destinées à sensibiliser
						et former les collaborateurs aux pratiques métiers, aux
						règles de sécurité et à l'usage des machines
						industrielles.
					</p>

					<div className="space-y-4">
						{[
							{
								icon: <Lightbulb className="text-secondary" />,
								title: "Solution légère et flexible",
								desc: "Accessible depuis n'importe où, sans équipement coûteux",
							},
							{
								icon: <Zap className="text-secondary" />,
								title: "Développement rapide",
								desc: "25 fois plus rapide et 5 fois moins cher que les solutions traditionnelles",
							},
							{
								icon: <Trophy className="text-secondary" />,
								title: "Engagement accru",
								desc: "Les formations visuelles et ludiques augmentent l'engagement des apprenants",
							},
						].map((item, index) => (
							<div
								key={index}
								className="flex gap-3 items-start"
							>
								<div className="mt-1 size-8 bg-secondary/10 rounded-lg flex items-center justify-center">
									{item.icon}
								</div>
								<div>
									<h4 className="font-medium">
										{item.title}
									</h4>
									<p className="text-sm text-muted-foreground">
										{item.desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Section>
	);
}
