// components/sections/features-section.tsx
import { ShieldCheck, RotateCw, BarChart3 } from "lucide-react";
import Image from "next/image";

import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";

export function FeaturesSection() {
	// Animation variants for staggered animation

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
		<Section
			id="features"
			variant="default"
			header={{
				title: "Une approche révolutionnaire de la formation",
				description:
					"Notre technologie de jumeaux numériques offre une expérience d'apprentissage sans précédent pour les environnements industriels complexes.",
				centered: true,
				highlight: true,
			}}
		>
			<div className="grid lg:grid-cols-2 gap-16 items-center">
				{/* Image Column */}
				<div className="flex justify-center">
					<div className="relative max-w-lg w-full">
						<div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-wisetwin-blue/20 rounded-2xl blur-3xl transform scale-110" />
						<Image
							src="/placeholder.png"
							alt="Formation industrielle révolutionnaire"
							width={500}
							height={350}
							className="relative rounded-2xl shadow-2xl border border-border/50"
						/>
					</div>
				</div>

				{/* Features Column */}
				<div className="space-y-8">
					{features.map((feature, index) => (
						<Card
							key={index}
							className="h-full hover:shadow-md transition-all duration-200"
						>
							<CardContent className="p-6">
								<div className="flex gap-4 items-start">
									<div className="size-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
										{feature.icon}
									</div>
									<div>
										<h3 className="text-xl font-semibold mb-3">
											{feature.title}
										</h3>
										<p className="text-muted-foreground">
											{feature.description}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</Section>
	);
}
