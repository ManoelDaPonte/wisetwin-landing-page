// components/sections/problems-section.tsx
import { CheckCircle2 } from "lucide-react";

import { Section } from "@/components/common/section";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export function ProblemsSection() {
	// Définition des problèmes et leurs solutions
	const problems = [
		{
			id: "inefficacite",
			title: "L'inefficacité des formations traditionnelles",
			problems: [
				"Les formations classiques ne permettent pas de se projeter dans son environnement de travail",
				"La formation sur équipements réels est coûteuse, risquée et immobilise des ressources productives",
				"Les formations théoriques développent des connaissances mais pas de compétences",
			],
			solution:
				"WiseTwin propose des jumeaux numériques en 3D qui permettent une immersion totale dans l'environnement de travail sans risque ni coût élevé.",
		},
		{
			id: "inadaptation",
			title: "L'inadaptation des parcours pédagogiques standardisés",
			problems: [
				"Les formations «taille unique» ne répondent pas aux besoins spécifiques de chaque apprenant",
				"Absence d'analyse précise des comportements et difficultés des utilisateurs",
				"Incapacité à personnaliser l'expérience d'apprentissage à grande échelle",
			],
			solution:
				"Notre technologie IA analyse les parcours utilisateurs et adapte automatiquement les scénarios pédagogiques aux besoins spécifiques des apprenants.",
		},
		{
			id: "limitations",
			title: "Les limitations des solutions immersives actuelles",
			problems: [
				"Solutions VR/AR existantes nécessitant des équipements coûteux (casques), complexes à déployer, et fragiles",
				"Barrière d'adoption technique pour de nombreux collaborateurs",
				"Difficultés de maintenance et de mise à jour des contenus",
			],
			solution:
				"WiseTwin est accessible sans équipement spécial, depuis n'importe quel navigateur, facilitant le déploiement et la maintenance.",
		},
	];

	// Animation variants

	return (
		<Section
			id="problemes-resolus"
			variant="default"
			header={{
				title: "Problèmes résolus par notre technologie",
				description:
					"WiseTwin répond à des défis majeurs de la formation industrielle traditionnelle",
				centered: true,
			}}
		>
			<div className="max-w-4xl mx-auto">
					<Accordion type="single" collapsible className="w-full">
						{problems.map((problem) => (
							<div key={problem.id}>
								<AccordionItem value={problem.id}>
									<AccordionTrigger className="text-lg font-medium">
										{problem.title}
									</AccordionTrigger>
									<AccordionContent>
										<div className="space-y-4 pt-2">
											<p className="text-sm text-muted-foreground mb-4">
												Ces problèmes affectent la
												qualité et l'efficacité de vos
												formations:
											</p>
											<ul className="space-y-2">
												{problem.problems.map(
													(item, i) => (
														<li
															key={i}
															className="flex items-start gap-2"
														>
															<div className="min-w-[20px] mt-1">
																<div className="size-5 rounded-full bg-secondary/20 flex items-center justify-center">
																	<CheckCircle2 className="size-3 text-secondary" />
																</div>
															</div>
															<p className="text-sm">
																{item}
															</p>
														</li>
													)
												)}
											</ul>

											<div className="mt-6 bg-wisetwin-blue/10 p-4 rounded-lg">
												<h4 className="font-semibold mb-2">
													Notre solution
												</h4>
												<p className="text-sm">
													{problem.solution}
												</p>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>
							</div>
						))}
					</Accordion>
			</div>
		</Section>
	);
}
