// components/wisetrainer/features-section.tsx
import { motion } from "framer-motion";
import { ShieldCheck, RotateCw, BarChart3 } from "lucide-react";

import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";

export function FeaturesWiseTrainerSection() {
	// Animation variants for staggered animation
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

	// Feature items data
	const features = [
		{
			icon: <ShieldCheck className="size-6 text-secondary" />,
			title: "Sécurité renforcée",
			description:
				"Formez vos équipes aux procédures de sécurité sans risques réels. Simulez des incidents et pratiquez les interventions d'urgence en toute sécurité.",
		},
		{
			icon: <RotateCw className="size-6 text-secondary" />,
			title: "Adaptabilité totale",
			description:
				"Nos formations s'adaptent à vos équipements spécifiques. Reproduisez fidèlement vos machines et procédés pour un apprentissage parfaitement contextualisé.",
		},
		{
			icon: <BarChart3 className="size-6 text-secondary" />,
			title: "Suivi analytique",
			description:
				"Mesurez la progression et identifiez les points d'amélioration grâce à nos tableaux de bord analytiques détaillés et personnalisables.",
		},
	];

	return (
		<Section id="avantages-wisetrainer" variant="default" className="py-20">
			<div className="container px-4 mx-auto">
				{/* Section header */}
				<motion.div
					className="text-center max-w-3xl mx-auto mb-16"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Une approche{" "}
						<span className="text-secondary">révolutionnaire</span>{" "}
						de la formation
					</h2>
					<p className="text-lg text-muted-foreground">
						WiseTrainer offre une expérience d'apprentissage sans
						précédent pour les environnements industriels complexes.
					</p>
				</motion.div>

				{/* Features grid */}
				<motion.div
					className="grid md:grid-cols-3 gap-8"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
				>
					{features.map((feature, index) => (
						<motion.div key={index} variants={itemVariants}>
							<Card className="h-full hover:shadow-md transition-all duration-200">
								<CardContent className="pt-6">
									<div className="size-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
										{feature.icon}
									</div>
									<h3 className="text-xl font-semibold mb-3">
										{feature.title}
									</h3>
									<p className="text-muted-foreground">
										{feature.description}
									</p>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>
			</div>
		</Section>
	);
}
