// components/sections/solutions-section.tsx
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, GraduationCap, Video, Bot, ChartBar } from "lucide-react";

import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";

export function SolutionsSection() {
	// Animation variants
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

	return (
		<Section
			id="nos-solutions"
			variant="muted"
			header={{
				title: "Nos Solutions",
				description:
					"WiseTwin propose des solutions complémentaires pour répondre aux besoins de formation et de valorisation de votre industrie.",
				centered: true,
			}}
		>
			<div className="container px-4 mx-auto">
				<div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
					{/* WiseTrainer Column */}
					<motion.div
						className="md:col-span-2"
						variants={itemVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						<Card className="h-full hover:shadow-md transition-all duration-200">
							<CardContent className="p-8">
								<div className="size-16 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
									<GraduationCap className="size-8 text-secondary" />
								</div>
								<h3 className="text-2xl font-semibold mb-4">
									WiseTrainer
								</h3>
								<p className="text-muted-foreground mb-6">
									Notre solution phare de formation industrielle en 3D. Créez des expériences d'apprentissage immersives sans équipement VR.
								</p>
								<ul className="space-y-3 mb-8">
									<li className="flex items-center gap-2 text-sm text-muted-foreground">
										<div className="size-1.5 rounded-full bg-blue-400/60"></div>
										Reproduisez vos machines et environnements
									</li>
									<li className="flex items-center gap-2 text-sm text-muted-foreground">
										<div className="size-1.5 rounded-full bg-blue-400/60"></div>
										Formez sans risque ni immobilisation des équipements
									</li>
									<li className="flex items-center gap-2 text-sm text-muted-foreground">
										<div className="size-1.5 rounded-full bg-blue-400/60"></div>
										Suivez la progression des apprenants avec des analyses détaillées
									</li>
								</ul>
								<Button asChild className="w-full">
									<Link href="/solutions/wisetrainer">
										<div className="flex items-center justify-center gap-2">
											Découvrir WiseTrainer
											<ArrowRight className="size-4" />
										</div>
									</Link>
								</Button>
							</CardContent>
						</Card>
					</motion.div>

					{/* Other Solutions Column */}
					<div className="md:col-span-2 space-y-6">
						{/* WiseTour */}
						<motion.div
							variants={itemVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							<Card className="hover:shadow-md transition-all duration-200">
								<CardContent className="p-6">
									<div className="flex gap-4">
										<div className="size-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
											<Video className="size-6 text-secondary" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2">
												WiseTour
											</h3>
											<p className="text-muted-foreground mb-4">
												Visites industrielles virtuelles en 3D pour présenter vos installations et valoriser votre savoir-faire.
											</p>
											<Button variant="outline" asChild size="sm">
												<Link href="/solutions/wisetour">
													<div className="flex items-center gap-2">
														En savoir plus
														<ArrowRight className="size-4" />
													</div>
												</Link>
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>

						{/* WiseScan */}
						<motion.div
							variants={itemVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							<Card className="hover:shadow-md transition-all duration-200">
								<CardContent className="p-6">
									<div className="flex gap-4">
										<div className="size-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
											<ChartBar className="size-6 text-secondary" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2">
												WiseScan
											</h3>
											<p className="text-muted-foreground">
												Analyse intelligente des accidents pour des recommandations sur-mesure.
											</p>
											<Button variant="outline" asChild size="sm" className="mt-4">
												<Link href="/solutions/wisescan">
													<div className="flex items-center gap-2">
														En savoir plus
														<ArrowRight className="size-4" />
													</div>
												</Link>
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>

						{/* WiseAssist */}
						<motion.div
							variants={itemVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							<Card className="hover:shadow-md transition-all duration-200">
								<CardContent className="p-6">
									<div className="flex gap-4">
										<div className="size-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
											<Bot className="size-6 text-secondary" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2">
												WiseAssist
											</h3>
											<p className="text-muted-foreground">
												Assistant IA pour guider vos équipes et répondre à leurs questions en temps réel.
											</p>
											<Button variant="outline" asChild size="sm" className="mt-4">
												<Link href="/solutions/wiseassist">
													<div className="flex items-center gap-2">
														En savoir plus
														<ArrowRight className="size-4" />
													</div>
												</Link>
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>
			</div>
		</Section>
	);
}
