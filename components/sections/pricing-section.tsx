// components/sections/pricing-section.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import { CheckCircle, Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function PricingSection() {
	const pricingPlans = [
		{
			title: "Starter",
			description: "Idéal pour les petites structures",
			price: "Sur devis",
			features: [
				"3 modules de formation standards",
				"Jusqu'à 50 utilisateurs",
				"Suivi individuel des formations",
				"Support par email",
			],
		},
		{
			title: "Scale",
			description: "Pour les moyennes entreprises",
			price: "Sur devis",
			highlight: true,
			features: [
				"5 modules de formation personnalisés",
				"Jusqu'à 200 utilisateurs",
				"Suivi individuel et par équipe",
				"Support prioritaire",
				"Rapports mensuels détaillés",
			],
		},
		{
			title: "Enterprise",
			description: "Solution complète pour grandes entreprises",
			price: "Sur devis",
			features: [
				"Modules personnalisés illimités",
				"Utilisateurs illimités",
				"Suite complète de rapports et analyses",
				"Support dédié 24/7",
				"Intégration avec vos systèmes existants",
				"Formation des responsables HSE",
			],
		},
	];

	const scrollToContact = () => {
		document
			.getElementById("contact")
			?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<>
			<Section
				id="pricing"
				variant="muted"
				header={{
					title: "Nos offres",
					description:
						"Des solutions flexibles et sur mesure adaptées aux besoins de votre entreprise.",
					centered: true,
				}}
				gridCols={3}
			>
				{pricingPlans.map((plan, i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: i * 0.1, duration: 0.5 }}
						className={cn(
							"bg-card p-6 rounded-lg flex flex-col h-full transition-all duration-300",
							plan.highlight
								? "ring-2 ring-wisetwin-blue shadow-lg shadow-wisetwin-blue/15 relative"
								: "ring-1 ring-border hover:shadow-md"
						)}
					>
						{plan.highlight && (
							<div className="absolute -top-3 -right-3 bg-wisetwin-blue text-white p-1.5 rounded-full">
								<Star className="h-5 w-5" />
							</div>
						)}

						<h3 className="font-semibold text-xl mb-2">
							{plan.title}
						</h3>
						<p className="text-muted-foreground mb-4">
							{plan.description}
						</p>
						<div className="text-3xl font-bold mb-6 text-wisetwin-darkblue">
							{plan.price}
						</div>
						<ul className="mb-8 space-y-2 flex-grow">
							{plan.features.map((feature, j) => (
								<li key={j} className="flex items-start gap-2">
									<CheckCircle className="h-5 w-5 text-wisetwin-blue shrink-0 mt-0.5" />
									<span className="text-sm">{feature}</span>
								</li>
							))}
						</ul>
						<Button
							variant={plan.highlight ? "default" : "outline"}
							className={
								plan.highlight
									? "w-full bg-wisetwin-darkblue hover:bg-wisetwin-darkblue-light"
									: "w-full border-wisetwin-blue text-wisetwin-blue hover:bg-wisetwin-blue/10"
							}
							onClick={scrollToContact}
						>
							Demander un devis
						</Button>
					</motion.div>
				))}
			</Section>

			<Section variant="default">
				<motion.div
					className="mt-8 text-center max-w-xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<h3 className="text-xl font-semibold mb-4">
						Vous avez des besoins spécifiques ?
					</h3>
					<p className="text-muted-foreground mb-6">
						Nous créons des formations sur mesure adaptées à vos
						machines et à votre environnement de travail spécifique.
						Contactez-nous pour discuter de votre projet.
					</p>
					<Button
						variant="outline"
						className="border-wisetwin-darkblue text-wisetwin-darkblue hover:bg-wisetwin-darkblue/10"
						onClick={scrollToContact}
					>
						Contactez notre équipe
					</Button>
				</motion.div>
			</Section>
		</>
	);
}
