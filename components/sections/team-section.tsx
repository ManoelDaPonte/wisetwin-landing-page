// components/sections/team-section.tsx
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";

import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function TeamSection() {
	// Données de l'équipe
	const teamMembers = [
		{
			name: "Mickaël Lambrecht",
			role: "CEO",
			bio: "Ingénieur-PhD, expert en simulations numériques dans le secteur industriel.",
			skills: [
				"Développement 3D",
				"Formation",
				"Marketing",
				"Communication",
			],
			image: "/team/placeholder.png",
			linkedin: "#",
		},
		{
			name: "Manoel Daponte",
			role: "CTO",
			bio: "Ingénieur, développeur de logiciels chez Total.",
			skills: [
				"Développement logiciel",
				"Analyse de données",
				"Machine Learning",
				"IA",
			],
			image: "/team/placeholder.png",
			linkedin: "#",
		},
		{
			name: "Gauthier Delmarre",
			role: "CFO",
			bio: "Directeur industriel dans les secteurs automobile et énergie.",
			skills: [
				"Vente",
				"Relations partenariats",
				"Communication",
				"Développement",
			],
			image: "/team/placeholder.png",
			linkedin: "#",
		},
	];

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
			transition: { duration: 0.6 },
		},
	};

	return (
		<Section
			id="notre-equipe"
			variant="muted"
			header={{
				title: "Notre Équipe Fondatrice",
				description:
					"Des experts combinant expertise technique et vision industrielle",
				centered: true,
			}}
		>
			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				className="grid md:grid-cols-3 gap-8"
			>
				{teamMembers.map((member, index) => (
					<motion.div
						key={member.name}
						variants={itemVariants}
						whileHover={{ y: -10 }}
						transition={{ duration: 0.3 }}
					>
						<Card className="h-full overflow-hidden">
							<CardContent className="p-0">
								<div className="aspect-[4/3] bg-muted relative">
									{member.image ? (
										<Image
											src={member.image}
											alt={member.name}
											width={400}
											height={300}
											className="object-cover w-full h-full"
										/>
									) : (
										<div className="w-full h-full bg-wisetwin-blue/20 flex items-center justify-center">
											<span className="text-wisetwin-blue">
												Photo
											</span>
										</div>
									)}
									<div className="absolute bottom-4 right-4 flex gap-2">
										{member.linkedin && (
											<a
												href={member.linkedin}
												target="_blank"
												rel="noopener noreferrer"
												className="size-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
											>
												<Linkedin className="size-4 text-wisetwin-darkblue" />
											</a>
										)}
									</div>
								</div>
								<div className="p-6">
									<h3 className="text-xl font-bold">
										{member.name}
									</h3>
									<p className="text-secondary font-medium mb-3">
										{member.role}
									</p>
									<p className="text-muted-foreground text-sm mb-4">
										{member.bio}
									</p>

									<h4 className="text-xs uppercase text-muted-foreground font-medium mb-2 mt-4">
										Compétences clés
									</h4>
									<div className="flex flex-wrap gap-2">
										{member.skills.map((skill, i) => (
											<span
												key={i}
												className="inline-block bg-secondary/10 text-secondary px-2 py-1 rounded-md text-xs"
											>
												{skill}
											</span>
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</motion.div>

			<motion.div
				className="mt-12 text-center"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: 0.5 }}
			>
				<p className="text-muted-foreground mb-6">
					Envie de rejoindre l'aventure WiseTwin ? Nous sommes
					toujours à la recherche de talents passionnés.
				</p>
				<Button variant="outline" asChild>
					<a href="/carrieres">
						<div className="flex items-center gap-2">
							<Mail className="size-4" />
							Rejoindre l'équipe
						</div>
					</a>
				</Button>
			</motion.div>
		</Section>
	);
}
