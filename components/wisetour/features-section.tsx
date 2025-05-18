// components/wisetour/features-section.tsx
import { motion } from "framer-motion";
import { Globe, Users, PanelTop, EyeOff } from "lucide-react";

import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";

export function FeaturesWiseTourSection() {
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
			icon: <Globe className="size-6 text-secondary" />,
			title: "Accessibilité mondiale",
			description:
				"Présentez vos installations à des clients, partenaires ou formations dans le monde entier, sans déplacement physique.",
		},
		{
			icon: <Users className="size-6 text-secondary" />,
			title: "Valorisation du savoir-faire",
			description:
				"Mettez en valeur vos équipements, processus et innovations technologiques de manière interactive et engageante.",
		},
		{
			icon: <PanelTop className="size-6 text-secondary" />,
			title: "Interface personnalisable",
			description:
				"Adaptez l'expérience de visite en fonction de vos objectifs : formation, marketing, communication ou présentation.",
		},
		{
			icon: <EyeOff className="size-6 text-secondary" />,
			title: "Zones restreintes accessibles",
			description:
				"Rendez virtuellement accessibles des zones habituellement restreintes pour des raisons de sécurité, confidentialité ou accès limité.",
		},
	];

	return (
		<Section id="avantages-wisetour" variant="default" className="py-20">
			<div className="container px-4 mx-auto">
				{/* Section header */}
				<motion.div
					className="text-center max-w-3xl mx-auto mb-16"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Visitez vos installations{" "}
						<span className="text-secondary">
							depuis n'importe où
						</span>
					</h2>
					<p className="text-lg text-muted-foreground">
						WiseTour transforme vos sites industriels en expériences
						virtuelles interactives pour la communication, la
						formation ou la valorisation.
					</p>
				</motion.div>

				{/* Features grid */}
				<motion.div
					className="grid md:grid-cols-2 gap-8"
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

				{/* Placeholder notice */}
				<motion.div
					className="mt-16 text-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1, duration: 0.6 }}
				>
					<p className="text-muted-foreground italic">
						Plus d'informations sur WiseTour à venir prochainement.
						Contactez-nous pour une démonstration personnalisée.
					</p>
				</motion.div>
			</div>
		</Section>
	);
}
