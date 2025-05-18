// components/sections/cta-section.tsx
import { motion } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";

export function CtaSection() {
	return (
		<Section id="cta">
			<div className="container px-4 mx-auto py-16">
				<motion.div
					className="bg-gradient-to-r from-wisetwin-darkblue to-wisetwin-blue rounded-xl p-8 md:p-12 overflow-hidden relative"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6 }}
				>
					{/* Background pattern */}
					<div className="absolute top-0 right-0 w-full h-full opacity-10">
						<svg
							className="w-full h-full"
							viewBox="0 0 100 100"
							preserveAspectRatio="none"
						>
							<defs>
								<pattern
									id="grid"
									width="8"
									height="8"
									patternUnits="userSpaceOnUse"
								>
									<path
										d="M 8 0 L 0 0 0 8"
										fill="none"
										stroke="white"
										strokeWidth="0.5"
									/>
								</pattern>
							</defs>
							<rect width="100" height="100" fill="url(#grid)" />
						</svg>
					</div>

					<div className="max-w-3xl mx-auto text-center relative z-10">
						<h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
							Prêt à transformer votre approche de formation?
						</h2>
						<p className="text-white/80 mb-8 text-lg">
							Nos experts vous accompagnent dans la création d'un
							programme sur mesure adapté à vos besoins
							spécifiques.
						</p>
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Button
								size="lg"
								asChild
								className="bg-white text-wisetwin-darkblue hover:bg-white/90"
							>
								<Link href="/contact">
									<div>Demander une consultation</div>
								</Link>
							</Button>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</Section>
	);
}
