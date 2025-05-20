// components/wisetrainer/hero-section.tsx
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";

export function HeroWiseTrainerSection() {
	return (
		<Section
			id="wisetrainer-hero"
			noPadding
			className="pt-32 pb-16 md:py-32 relative overflow-hidden"
		>
			{/* Gradient background effect */}
			<div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-wisetwin-blue/10 to-transparent -z-10" />

			<div className="container px-4 mx-auto">
				<div className="flex flex-col items-center gap-8">
					{/* Hero content */}
					<motion.div
						className="text-center max-w-3xl"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<div className="flex items-center justify-center gap-3 mb-4">
							<GraduationCap className="size-10 text-secondary" />
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
								<span className="text-secondary">
									WiseTrainer
								</span>
							</h1>
						</div>
						<h2 className="text-2xl md:text-3xl font-bold mb-4">
							Formations immersives pour l'industrie 4.0
						</h2>
						<p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
							WiseTrainer transforme la formation industrielle
							avec des expériences 3D interactives pour améliorer
							la sécurité et la performance de vos équipes.
						</p>

						<div className="flex flex-wrap justify-center gap-4">
							<Button size="lg" asChild>
								<Link href="#avantages-wisetrainer">
									<div className="flex items-center">
										Découvrir les avantages
									</div>
									<ArrowRight className="ml-2 size-4" />
								</Link>
							</Button>
							<Button size="lg" variant="outline" asChild>
								<Link href="/#contact">
									<div className="flex items-center">
										Demander une démo{" "}
									</div>
								</Link>
							</Button>
						</div>
					</motion.div>

					{/* Visual Placeholder */}
					<motion.div
						className="relative w-full max-w-5xl h-[400px] mt-8 rounded-xl overflow-hidden shadow-lg"
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<div className="absolute inset-0 bg-gradient-to-br from-wisetwin-darkblue to-wisetwin-blue flex items-center justify-center">
							<p className="text-white text-lg font-medium">
								Visualisation de formation 3D WiseTrainer
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</Section>
	);
}
