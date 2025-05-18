// app/solutions/page.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, GraduationCap, Video } from "lucide-react";

import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { CtaSection } from "@/components/sections/cta-section";

export default function SolutionsPage() {
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
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.7 },
		},
	};

	// Solutions
	const solutions = [
		{
			id: "wisetrainer",
			icon: <GraduationCap className="size-16 text-secondary" />,
			title: "WiseTrainer",
			subtitle: "Formation industrielle immersive",
			description:
				"Plateforme de formation industrielle immersive en 3D pour améliorer la sécurité et les compétences des employés. WiseTrainer transforme la formation en expérience interactive.",
			highlights: [
				"Reproduisez vos machines et environnements",
				"Formez sans risque ni immobilisation des équipements",
				"Suivez la progression des apprenants avec des analyses détaillées",
				"Créez des scénarios de formation réalistes et personnalisés",
				"Réduisez les coûts de formation tout en améliorant les compétences",
			],
			color: "bg-wisetwin-blue/10",
			href: "/solutions/wisetrainer",
		},
		{
			id: "wisetour",
			icon: <Video className="size-16 text-secondary" />,
			title: "WiseTour",
			subtitle: "Visites industrielles virtuelles",
			description:
				"Visites industrielles virtuelles en 3D pour présenter vos installations, former vos clients ou valoriser votre savoir-faire. WiseTour transforme vos sites en expériences immersives.",
			highlights: [
				"Créez des parcours de visite interactifs",
				"Mettez en valeur vos équipements et processus",
				"Accédez virtuellement à des zones sensibles ou restreintes",
				"Présentez vos installations à distance sans déplacement",
				"Personnalisez les visites selon les besoins de vos audiences",
			],
			color: "bg-wisetwin-blue/10",
			href: "/solutions/wisetour",
		},
	];

	return (
		<>
			<Section
				id="nos-solutions"
				noPadding
				className="pt-32 pb-16 md:pt-40 md:pb-20"
			>
				<div className="container px-4 mx-auto">
					<motion.div
						className="mb-12 text-center max-w-3xl mx-auto"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<h1 className="text-4xl md:text-5xl font-bold mb-6">
							Nos{" "}
							<span className="text-secondary">Solutions</span>{" "}
							Immersives
						</h1>
						<p className="text-lg text-muted-foreground">
							WiseTwin propose deux solutions complémentaires pour
							transformer votre industrie grâce à des expériences
							3D interactives : formation et visite virtuelle.
						</p>
					</motion.div>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="space-y-16"
					>
						{solutions.map((solution, index) => (
							<motion.div
								key={solution.id}
								variants={itemVariants}
								className="flex flex-col md:flex-row gap-10 items-stretch"
							>
								<div className="md:w-1/3 flex flex-col">
									<div className="bg-muted p-8 rounded-xl flex flex-col items-center md:items-start text-center md:text-left h-full">
										<div
											className={`size-24 ${solution.color} rounded-xl flex items-center justify-center mb-6`}
										>
											{solution.icon}
										</div>
										<h2 className="text-3xl font-bold mb-2">
											{solution.title}
										</h2>
										<p className="text-xl text-muted-foreground mb-4">
											{solution.subtitle}
										</p>
										<p className="text-muted-foreground mb-6">
											{solution.description}
										</p>
										<div className="mt-auto pt-4">
											<Button
												asChild
												size="lg"
												variant="secondary"
											>
												<Link href={solution.href}>
													<span>
														Découvrir{" "}
														{solution.title}
													</span>
													<ArrowRight className="ml-2 size-4" />
												</Link>
											</Button>
										</div>
									</div>
								</div>
								<div className="md:w-2/3">
									<Card className="h-full border-secondary/10">
										<CardHeader>
											<CardTitle>
												Avantages clés
											</CardTitle>
											<CardDescription>
												Ce que {solution.title} peut
												apporter à votre entreprise
											</CardDescription>
										</CardHeader>
										<CardContent>
											<ul className="grid md:grid-cols-2 gap-4">
												{solution.highlights.map(
													(highlight, i) => (
														<li
															key={i}
															className="flex items-start gap-2"
														>
															<div className="min-w-[20px] mt-1">
																<div className="size-5 rounded-full bg-secondary/20 flex items-center justify-center">
																	<div className="size-2 rounded-full bg-secondary" />
																</div>
															</div>
															<p>{highlight}</p>
														</li>
													)
												)}
											</ul>
										</CardContent>
									</Card>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</Section>
			<CtaSection />
		</>
	);
}
