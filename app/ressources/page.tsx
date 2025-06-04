// app/ressources/page.tsx
"use client";

import { useState } from "react";
import {
	Download,
	FileText,
} from "lucide-react";

import { Section } from "@/components/common/section";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Type pour nos ressources
type Resource = {
	id: string;
	title: string;
	description: string;
	category: "guide" | "whitepaper" | "brochure" | "presentation";
	fileUrl: string;
	fileType: string;
	date: string;
};

export default function ResourcesPage() {
	// Données des ressources (pour le moment, une seule ressource)
	const resources: Resource[] = [
		{
			id: "presentation-wisetwin",
			title: "Présentation de WiseTwin",
			description:
				"Découvrez les jumeaux numériques pour la formation et notre approche innovante pour transformer l'industrie.",
			category: "presentation",
			fileUrl: "ressources/WiseTrainer-Plaquette-B.pdf",
			fileType: "PDF",
			date: "2024-05-01",
		},
	];

	// Catégories pour le filtrage
	const categories = [
		{ id: "all", label: "Toutes les ressources" },
		{ id: "guide", label: "Guides pratiques" },
		{ id: "whitepaper", label: "Livres blancs" },
		{ id: "brochure", label: "Brochures produits" },
		{ id: "presentation", label: "Présentations" },
	];

	// État pour le filtrage
	const [activeCategory, setActiveCategory] = useState("all");

	// Fonction pour filtrer les ressources
	const filteredResources =
		activeCategory === "all"
			? resources
			: resources.filter(
					(resource) => resource.category === activeCategory
			  );

	return (
		<div className="pt-24">
			<Section
				id="ressources"
				variant="default"
				header={{
					title: "Centre de Ressources",
					description:
						"Découvrez nos guides pratiques, livres blancs et documentations techniques pour vous aider à optimiser vos formations industrielles.",
					centered: true,
				}}
				animate={false}
			>
				{/* Filtres de catégories */}
				<div className="flex flex-wrap gap-2 justify-center mb-10">
					{categories.map((category) => (
						<Button
							key={category.id}
							variant={
								activeCategory === category.id
									? "default"
									: "outline"
							}
							size="sm"
							onClick={() => setActiveCategory(category.id)}
							className="transition-all"
						>
							{category.label}
						</Button>
					))}
				</div>

				{/* Grille de ressources */}
				<div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
				>
					{filteredResources.map((resource) => (
						<div key={resource.id}>
							<Card className="h-full flex flex-col hover:shadow-md transition-all duration-200">
								<CardHeader>
									<div className="flex items-start gap-3">
										<div className="p-2 rounded-md bg-wisetwin-blue/10 flex items-center justify-center">
											<FileText className="size-5 text-wisetwin-blue" />
										</div>
										<div>
											<CardTitle className="text-lg">
												{resource.title}
											</CardTitle>
											<p className="text-xs text-muted-foreground mt-1">
												{new Date(
													resource.date
												).toLocaleDateString("fr-FR", {
													year: "numeric",
													month: "long",
													day: "numeric",
												})}
											</p>
										</div>
									</div>
								</CardHeader>
								<CardContent className="flex-grow">
									<p className="text-sm text-muted-foreground">
										{resource.description}
									</p>
								</CardContent>
								<CardFooter>
									<Button
										asChild
										className="w-full"
										variant="outline"
									>
										<a
											href={resource.fileUrl}
											download
											target="_blank"
											rel="noopener noreferrer"
										>
											<Download className="mr-2 size-4 text-wisetwin-blue" />
											Télécharger ({resource.fileType})
										</a>
									</Button>
								</CardFooter>
							</Card>
						</div>
					))}
				</div>

				{filteredResources.length === 0 && (
					<div className="text-center py-10">
						<p className="text-muted-foreground">
							Aucune ressource disponible dans cette catégorie
							pour le moment.
						</p>
						<p className="text-muted-foreground mt-2">
							De nouveaux documents seront ajoutés prochainement.
						</p>
					</div>
				)}
			</Section>
		</div>
	);
}
