// components/sections/how-it-works-section.tsx
"use client";
import { Section } from "@/components/common/section";
import { motion } from "framer-motion";
import { CheckCircle2, FileSearch, Server, BarChart4 } from "lucide-react";

export function HowItWorksSection() {
	const steps = [
		{
			step: 1,
			icon: <FileSearch className="text-wisetwin-blue" />,
			title: "Analyse des besoins",
			description:
				"Nous identifions les risques spécifiques et les formations nécessaires pour votre industrie.",
		},
		{
			step: 2,
			icon: <Server className="text-wisetwin-blue" />,
			title: "Création du jumeau numérique",
			description:
				"Développement des modules 3D adaptés à vos équipements et processus.",
		},
		{
			step: 3,
			icon: <CheckCircle2 className="text-wisetwin-blue" />,
			title: "Formation des équipes",
			description:
				"Vos collaborateurs s'entraînent sur la plateforme avec des scénarios réalistes.",
		},
		{
			step: 4,
			icon: <BarChart4 className="text-wisetwin-blue" />,
			title: "Suivi et analyse",
			description:
				"Les responsables HSE suivent les progrès et identifient les points d'amélioration.",
		},
	];

	return (
		<Section
			id="how-it-works"
			variant="muted"
			header={{
				title: "Comment ça fonctionne",
				description:
					"Notre plateforme de formation 3D s'intègre facilement dans votre processus de formation continue.",
				centered: true,
			}}
			gridCols={4}
		>
			{steps.map((step, i) => (
				<motion.div
					key={i}
					className="flex flex-col items-center text-center"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: i * 0.1, duration: 0.5 }}
				>
					<div className="mb-4 relative">
						<div className="size-14 rounded-full bg-background flex items-center justify-center ring-1 ring-border shadow-sm">
							<span className="font-semibold text-wisetwin-darkblue">
								{step.step}
							</span>
						</div>
						<div className="absolute -right-2 -top-2 bg-white rounded-full p-1 shadow-sm border">
							{step.icon}
						</div>
					</div>
					<h3 className="font-medium mb-2 text-wisetwin-darkblue">
						{step.title}
					</h3>
					<p className="text-sm text-muted-foreground">
						{step.description}
					</p>
				</motion.div>
			))}

			{/* Ligne de progression */}
			<div className="absolute top-1/3 left-0 w-full hidden md:block">
				<div className="container mx-auto px-4">
					<div className="relative h-0.5 bg-border mx-20">
						<motion.div
							className="absolute left-0 h-full bg-wisetwin-blue"
							initial={{ width: "0%" }}
							whileInView={{ width: "100%" }}
							viewport={{ once: true }}
							transition={{ duration: 1.5, delay: 0.5 }}
						/>
					</div>
				</div>
			</div>
		</Section>
	);
}
