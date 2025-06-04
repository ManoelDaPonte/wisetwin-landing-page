// components/sections/team-section.tsx
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function TeamSection() {
	// Données de l'équipe
	const teamMembers = [
		{
			name: "Manoel Daponte",
			role: "CTO",
			bio: "Ingénieur, développeur de logiciels.",
			skills: [
				"Développement logiciel",
				"Science de la donnée",
			],
			image: "/equipe/manoel.jpeg",
			linkedin: "#",
			initials: "MD",
		},
		{
			name: "Mickaël Lambrecht",
			role: "CEO",
			bio: "Ingénieur-PhD, expert en simulations numériques dans le secteur industriel.",
			skills: [
				"Développement 3D",
				"Formation",
			],
			image: "/equipe/mickael.jpeg",
			linkedin: "#",
			initials: "ML",
		},

		{
			name: "Gauthier Delmarre",
			role: "CFO",
			bio: "Directeur industriel dans les secteurs automobile et énergie.",
			skills: [
				"Relations partenariats",
				"Communication",
				"Marketing"
			],
			image: "/equipe/gauthier.jpeg",
			linkedin: "#",
			initials: "GD",
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
			variant="default"
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
				{teamMembers.map((member, _) => (
					<motion.div key={member.name} variants={itemVariants}>
						<Card className="h-full overflow-hidden hover:shadow-md transition-all duration-200">
							<CardContent className="p-0">
								<div className="p-6 flex flex-col items-center">
									{/* Avatar au lieu d'une grande image */}
									<Avatar className="h-24 w-24 mb-4">
										{member.image ? (
											<AvatarImage
												src={member.image}
												alt={member.name}
											/>
										) : null}
										<AvatarFallback className="bg-wisetwin-blue/20 text-wisetwin-blue text-xl">
											{member.initials}
										</AvatarFallback>
									</Avatar>

									<h3 className="text-xl font-bold text-center">
										{member.name}
									</h3>
									<p className="text-secondary font-medium mb-2 text-center">
										{member.role}
									</p>
									<p className="text-muted-foreground text-sm mb-4 text-center">
										{member.bio}
									</p>

									<h4 className="text-xs uppercase text-muted-foreground font-medium mb-2 mt-2">
										Compétences clés
									</h4>
									<div className="flex flex-wrap gap-2 justify-center">
										{member.skills.map((skill, i) => (
											<Badge
												key={i}
												variant="secondary"
												className="font-normal"
											>
												{skill}
											</Badge>
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
