// components/sections/solutions-section.tsx
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

	// Solutions
	const solutions = [
		{
			id: "wisetrainer",
			icon: <GraduationCap className="size-8 text-secondary" />,
			title: "WiseTrainer",
			description:
				"Plateforme de formation industrielle immersive en 3D pour améliorer la sécurité et les compétences des employés.",
			highlights: [
				"Reproduisez vos machines et environnements",
				"Formez sans risque ni immobilisation des équipements",
				"Suivez la progression des apprenants avec des analyses détaillées",
			],
			color: "bg-wisetwin-blue/10",
			href: "/solutions/wisetrainer",
		},
		{
			id: "wisetour",
			icon: <Video className="size-8 text-secondary" />,
			title: "WiseTour",
			description:
				"Visites industrielles virtuelles en 3D pour présenter vos installations, former vos clients ou valoriser votre savoir-faire.",
			highlights: [
				"Créez des parcours de visite interactifs",
				"Mettez en valeur vos équipements et processus",
				"Accédez virtuellement à des zones sensibles ou restreintes",
			],
			color: "bg-wisetwin-blue/10",
			href: "/solutions/wisetour",
		},
	];

	return (
		<Section
			id="nos-solutions"
			variant="muted"
			header={{
				title: "Nos Solutions Immersives",
				description:
					"WiseTwin propose deux solutions complémentaires pour répondre aux besoins de formation et de valorisation de votre industrie.",
				centered: true,
			}}
		>
			<div className="max-w-6xl mx-auto">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="grid md:grid-cols-2 gap-8"
				>
					{solutions.map((solution) => (
						<motion.div key={solution.id} variants={itemVariants}>
							<Card className="h-full  hover:shadow-lg transition-all duration-300">
								<CardContent className="p-6">
									<div
										className={`size-16 ${solution.color} rounded-lg flex items-center justify-center mb-4`}
									>
										{solution.icon}
									</div>
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-2xl font-bold">
											{solution.title}
										</CardTitle>
										<CardDescription className="text-base mt-2">
											{solution.description}
										</CardDescription>
									</CardHeader>
									<div className="space-y-4">
										<ul className="space-y-2">
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
														<p className="text-sm">
															{highlight}
														</p>
													</li>
												)
											)}
										</ul>
										<div className="pt-4">
											<Button asChild variant="secondary">
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
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>
			</div>
		</Section>
	);
}
