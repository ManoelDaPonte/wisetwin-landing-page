// components/sections/hero-section.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import { motion } from "framer-motion";
import { ArrowRight, Box } from "lucide-react";

export function HeroSection() {
	const scrollToContact = () => {
		document
			.getElementById("contact")
			?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<Section variant="gradient" gridCols={2}>
			<motion.div
				className="flex flex-col gap-6"
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h1 className="text-4xl md:text-5xl font-bold">
					Formation industrielle en réalité 3D
				</h1>
				<p className="text-lg text-muted-foreground">
					WiseTwin propose des formations 3D interactives pour
					améliorer la sécurité et les compétences des intervenants
					sur les machines industrielles.
				</p>
				<div className="flex flex-col sm:flex-row gap-3">
					<Button
						size="lg"
						className="bg-wisetwin-darkblue hover:bg-wisetwin-darkblue-light"
						onClick={scrollToContact}
					>
						Demander une démo
					</Button>
					<Button
						variant="outline"
						size="lg"
						className="border-wisetwin-blue text-wisetwin-blue hover:bg-wisetwin-blue/10 transition-colors"
						onClick={() =>
							document
								.getElementById("features")
								?.scrollIntoView({ behavior: "smooth" })
						}
					>
						Découvrir nos formations
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</div>
			</motion.div>
			<motion.div
				className="relative h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-wisetwin-darkblue/90 to-wisetwin-blue/90 p-2 ring-1 ring-border shadow-lg"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<div className="absolute inset-0 flex items-center justify-center text-white">
					<div className="flex flex-col items-center gap-4">
						<Box className="w-16 h-16" />
						<p className="text-center font-medium text-xl">
							Expérience 3D interactive
						</p>
						<p className="text-center text-sm text-white/80 max-w-xs">
							Notre plateforme immersive permet à vos
							collaborateurs de s'entraîner en toute sécurité sur
							des représentations fidèles de vos équipements
							industriels.
						</p>
					</div>
				</div>
			</motion.div>
		</Section>
	);
}
