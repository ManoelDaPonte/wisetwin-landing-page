// components/sections/process-section.tsx
import { motion } from "framer-motion";
import { FileSearch, PenTool, Layers, Zap } from "lucide-react";

import { Section } from "@/components/common/section";

export function ProcessSection() {
	// Process steps data
	const processSteps = [
		{
			icon: <FileSearch className="size-8 text-wisetwin-blue" />,
			title: "Analyse des besoins",
			description:
				"Étude approfondie de vos équipements et identification des compétences clés à développer pour vos équipes.",
		},
		{
			icon: <PenTool className="size-8 text-wisetwin-blue" />,
			title: "Conception 3D",
			description:
				"Création de modèles 3D précis de vos installations avec scénarios de formation personnalisés.",
		},
		{
			icon: <Layers className="size-8 text-wisetwin-blue" />,
			title: "Développement",
			description:
				"Intégration des modules interactifs, construction des parcours pédagogiques et des mécanismes d'évaluation.",
		},
		{
			icon: <Zap className="size-8 text-wisetwin-blue" />,
			title: "Déploiement & Support",
			description:
				"Installation de la solution, formation des formateurs et accompagnement continu avec mises à jour.",
		},
	];

	return (
		<Section id="process" className="py-20">
			<div className="container px-4 mx-auto">
				{/* Section header */}
				<motion.div
					className="text-center max-w-3xl mx-auto mb-16"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Notre{" "}
						<span className="text-wisetwin-blue">méthode</span> de
						travail
					</h2>
					<p className="text-lg text-muted-foreground">
						Un processus éprouvé pour développer des solutions de
						formation efficaces et sur mesure.
					</p>
				</motion.div>

				{/* Process steps */}
				<div className="relative">
					{/* Connecting line */}
					<div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-wisetwin-blue/20 hidden md:block" />

					<div className="space-y-12 md:space-y-0">
						{processSteps.map((step, index) => (
							<motion.div
								key={index}
								className="md:grid md:grid-cols-2 md:gap-8 items-center"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-100px" }}
								transition={{
									duration: 0.6,
									delay: index * 0.1,
								}}
							>
								<div
									className={`${
										index % 2 === 0
											? "md:text-right"
											: "md:order-2"
									}`}
								>
									<motion.div
										className="inline-flex items-center justify-center size-16 rounded-full bg-wisetwin-blue/10 mb-4"
										whileHover={{
											scale: 1.05,
										}}
									>
										{step.icon}
									</motion.div>
									<h3 className="text-xl font-semibold mb-2">
										{step.title}
									</h3>
									<p className="text-muted-foreground">
										{step.description}
									</p>
								</div>

								<div
									className={`hidden md:flex ${
										index % 2 === 0
											? "justify-start"
											: "justify-end order-1"
									}`}
								>
									<div className="relative">
										<div className="w-4 h-4 rounded-full bg-wisetwin-blue absolute top-1/2 -translate-y-1/2 left-0 right-0 mx-auto" />
										<div
											className="w-8 h-0.5 bg-wisetwin-blue absolute top-1/2 -translate-y-1/2 left-auto right-auto"
											style={{
												left:
													index % 2 === 0
														? "auto"
														: "-1rem",
												right:
													index % 2 === 0
														? "-1rem"
														: "auto",
											}}
										/>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</Section>
	);
}
