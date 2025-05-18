// components/sections/hero-section.tsx
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";

export function HeroSection() {
	return (
		<Section
			id="hero"
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
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
							<span className="text-wisetwin-blue">
								Formations immersives
							</span>{" "}
							pour l'industrie 4.0
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
							WiseTwin transforme la formation industrielle avec
							des expériences 3D interactives pour améliorer la
							sécurité et la performance de vos équipes.
						</p>

						<div className="flex flex-wrap justify-center gap-4">
							<Button size="lg" asChild>
								<Link href="/contact">
									<div className="flex items-center">
										Demander une démo{" "}
										<ArrowRight className="ml-2 size-4" />
									</div>
								</Link>
							</Button>
							<Button size="lg" variant="outline" asChild>
								<Link href="/solutions">
									<div>Découvrir nos solutions</div>
								</Link>
							</Button>
						</div>
					</motion.div>

					{/* Visual Placeholder - Replace with actual product visualization */}
					<motion.div
						className="relative w-full max-w-5xl h-[400px] mt-8 rounded-xl overflow-hidden shadow-lg"
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<div className="absolute inset-0 bg-gradient-to-br from-wisetwin-darkblue to-wisetwin-blue flex items-center justify-center">
							<p className="text-white text-lg font-medium">
								Visualisation de formation 3D
							</p>
						</div>
					</motion.div>

					{/* Trust Indicators */}
					<motion.div
						className="mt-8 flex flex-col items-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.5 }}
					>
						<p className="text-sm text-muted-foreground mb-4">
							Ils nous font confiance
						</p>
						<div className="flex flex-wrap justify-center gap-8 opacity-70">
							{/* Replace with actual client logos */}
							{[1, 2, 3, 4, 5].map((i) => (
								<div
									key={i}
									className="size-12 bg-muted rounded-md flex items-center justify-center"
								>
									<span className="text-xs text-muted-foreground">
										Logo {i}
									</span>
								</div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</Section>
	);
}
