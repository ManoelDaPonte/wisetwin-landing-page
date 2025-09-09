// components/sections/markets-section.tsx
import { HardHat, Factory, Microscope, GraduationCap } from "lucide-react";
import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";

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


	return (
		<Section
			id="marches-applications"
			variant="muted"
			header={{
				title: "Marchés & Applications",
				description:
					"WiseTwin s'adapte à différents segments de clientèle et répond à des besoins spécifiques",
				centered: true,
			}}
		>

			{/* Marchés cards */}
			<div
				className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
			>
				{markets.map((market, index) => (
					<div key={index}>
						<Card className="h-full hover:shadow-md transition-all duration-200">
							<CardContent className="p-6">
								<div className="size-12 bg-wisetwin-blue/10 rounded-lg flex items-center justify-center mb-4">
									{market.icon}
								</div>
								<h3 className="font-semibold text-xl mb-2">
									{market.title}
								</h3>
								<p className="text-sm text-muted-foreground mb-4">
									{market.description}
								</p>
								<div className="mt-4">
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
							</CardContent>
						</Card>
					</div>
				))}
			</div>
		</Section>
	);
}
