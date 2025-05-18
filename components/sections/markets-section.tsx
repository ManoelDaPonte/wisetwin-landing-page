// components/sections/markets-section.tsx
import { motion } from "framer-motion";
import { HardHat, Factory, Microscope, GraduationCap } from "lucide-react";
import { Section, SectionCard } from "@/components/common/section";

export function MarketsSection() {
	// Marchés ciblés
	const markets = [
		{
			icon: <Factory className="size-5 text-wisetwin-blue" />,
			title: "Industrie Privée",
			description:
				"Formations pour les responsables SHE, techniques et formation dans l'industrie. Solutions sur mesure pour améliorer la sécurité et les compétences.",
			items: [
				"Industrie automobile",
				"Production énergétique",
				"Agroalimentaire",
				"Industrie chimique",
			],
		},
		{
			icon: <GraduationCap className="size-5 text-wisetwin-blue" />,
			title: "Organismes de Formation",
			description:
				"Solutions pour les responsables de formation et de plateaux techniques. Création de parcours pédagogiques personnalisés.",
			items: [
				"Centres de formation professionnelle",
				"Organismes publics",
				"Écoles techniques",
				"Centres d'apprentissage",
			],
		},
		{
			icon: <HardHat className="size-5 text-wisetwin-blue" />,
			title: "Producteurs de Machines",
			description:
				"Transformation des notices d'utilisation en expériences immersives. Solutions uniques pour chaque machine industrielle.",
			items: [
				"Fabricants d'équipements",
				"Assembleurs",
				"Intégrateurs de systèmes",
				"Fournisseurs de technologies",
			],
		},
		{
			icon: <Microscope className="size-5 text-wisetwin-blue" />,
			title: "Kit du Formateur",
			description:
				"Support WiseTwin pour animer des formations en entreprise. Solutions anonymisées pour les formateurs.",
			items: [
				"Formateurs indépendants",
				"Départements formation",
				"Consultants en sécurité",
				"Experts métiers",
			],
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
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	return (
		<Section
			id="marches-applications"
			variant="muted" // Ajouter "muted"
			header={{
				title: "Marchés & Applications",
				description:
					"WiseTwin s'adapte à différents segments de clientèle et répond à des besoins spécifiques",
				centered: true,
			}}
			gridCols={2}
			gridGap="large"
		>
			<motion.div
				className="col-span-2 mb-8 text-center"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<p className="text-muted-foreground max-w-3xl mx-auto">
					Notre approche sur-mesure, économique et rapide nous permet
					d'adresser efficacement plusieurs segments de marché:
				</p>
			</motion.div>

			{/* Marchés cards */}
			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				className="col-span-2 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
			>
				{markets.map((market, index) => (
					<motion.div key={index} variants={itemVariants}>
						<SectionCard
							icon={market.icon}
							title={market.title}
							highlight={index === 0}
						>
							<p className="text-sm text-muted-foreground mb-4">
								{market.description}
							</p>
							<div className="mt-auto">
								<h4 className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">
									Applications
								</h4>
								<ul className="text-sm space-y-1">
									{market.items.map((item, i) => (
										<li
											key={i}
											className="flex items-center"
										>
											<span className="size-1.5 bg-secondary rounded-full mr-2"></span>
											{item}
										</li>
									))}
								</ul>
							</div>
						</SectionCard>
					</motion.div>
				))}
			</motion.div>
		</Section>
	);
}
