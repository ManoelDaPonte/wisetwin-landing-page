// components/sections/features-section.tsx
"use client";
import { Section, SectionCard } from "@/components/common/section";
import { Icon } from "@/components/ui/icon";
import { motion } from "framer-motion";
import { FileBadge, Cpu, PencilRuler } from "lucide-react";

export function FeaturesSection() {
	const features = [
		{
			icon: <FileBadge className="h-6 w-6 text-wisetwin-blue" />,
			title: "Formation sécurité",
			description:
				"Modules spécialisés sur les protocoles de sécurité et d'intervention sur machines en milieu industriel.",
		},
		{
			icon: <Cpu className="h-6 w-6 text-wisetwin-blue" />,
			title: "Environnement 3D interactif",
			description:
				"Simulation de situations réelles permettant d'apprendre les gestes professionnels dans un environnement sécurisé.",
		},
		{
			icon: <PencilRuler className="h-6 w-6 text-wisetwin-blue" />,
			title: "Formations personnalisées",
			description:
				"Adaptation des modules à vos équipements spécifiques et à votre environnement de travail réel.",
		},
	];

	return (
		<Section
			id="features"
			header={{
				title: "Formations spécialisées",
				description:
					"Des modules de formation 3D sur mesure pour garantir la sécurité de vos équipes lors des interventions sur machines.",
				centered: true,
			}}
			gridCols={3}
		>
			{features.map((feature, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: index * 0.1, duration: 0.5 }}
				>
					<SectionCard icon={feature.icon} title={feature.title}>
						<p className="text-muted-foreground">
							{feature.description}
						</p>
					</SectionCard>
				</motion.div>
			))}
		</Section>
	);
}
