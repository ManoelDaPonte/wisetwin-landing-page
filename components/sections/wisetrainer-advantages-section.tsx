import { CheckCircle, Clock, Users, Globe, Box, Video, FileText } from "lucide-react";
import Image from "next/image";

import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";

export function WiseTrainerAdvantagesSection() {
	const advantages = [
		{
			icon: <CheckCircle className="size-6 text-secondary" />,
			title: "Sur-mesure",
			description:
				"Catalogues personnalisés adaptés à votre secteur et vos procédures spécifiques",
		},
		{
			icon: <Clock className="size-6 text-secondary" />,
			title: "Suivi et validation",
			description:
				"Tableau de bord complet avec suivi des progressions et certifications",
		},
		{
			icon: <Users className="size-6 text-secondary" />,
			title: "Support et accompagnement",
			description:
				"Équipe dédiée pour vous accompagner dans le déploiement",
		},
		{
			icon: <Globe className="size-6 text-secondary" />,
			title: "Gestion des accès",
			description:
				"Contrôle granulaire des permissions et des groupes d'utilisateurs",
		},
	];

	const benefits = [
		{
			title: "25x plus rapide",
			subtitle:
				"Développement de jumeaux numériques vs méthodes traditionnelles",
		},
		{
			title: "5x moins cher",
			subtitle: "Coût de création comparé aux solutions concurrentes",
		},
		{
			title: "< 1 semaine",
			subtitle: "Déploiement rapide vs 3+ mois pour la concurrence",
		},
	];

	const trainingFormats = [
		{
			icon: <Box className="size-6 text-secondary" />,
			title: "Environnement 3D immersif",
			description:
				"Naviguez librement dans des environnements 3D fidèles à vos installations industrielles",
		},
		{
			icon: <Video className="size-6 text-secondary" />,
			title: "Vidéos intégrées 3D",
			description:
				"Intégrez des vidéos contextuelles directement dans l'environnement 3D pour des explications visuelles",
		},
		{
			icon: <FileText className="size-6 text-secondary" />,
			title: "Formations interactives",
			description:
				"Transformez vos PDF et PowerPoint existants en formations interactives avec validation",
		},
	];

	return (
		<Section
			id="wisetrainer-advantages"
			header={{
				title: "Pourquoi choisir Wise Twin ?",
				description:
					"Une solution légère, flexible et accessible qui révolutionne la formation industrielle",
				centered: true,
			}}
		>
			<div className="space-y-16">
				{/* Performance Metrics */}
				<div className="grid md:grid-cols-3 gap-8">
					{benefits.map((benefit, index) => (
						<Card
							key={index}
							className="text-center hover:shadow-md transition-all duration-200"
						>
							<CardContent className="p-6">
								<div className="text-4xl font-bold mb-2 text-wisetwin-darkblue">
									{benefit.title}
								</div>
								<p className="text-muted-foreground">
									{benefit.subtitle}
								</p>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Main Content */}
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					{/* Advantages List */}
					<div className="space-y-8">
						<div>
							<h3 className="text-2xl font-bold mb-4">
								Une expérience unique et personnalisable
							</h3>
							<p className="text-muted-foreground text-lg mb-8">
								Wise Twin s'adapte parfaitement à vos objectifs
								pédagogiques et à vos apprenants pour offrir une
								expérience sur-mesure.
							</p>
						</div>

						<div className="space-y-6">
							{advantages.map((advantage, index) => (
								<div key={index} className="flex gap-4">
									<div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
										{advantage.icon}
									</div>
									<div>
										<h4 className="font-semibold mb-1">
											{advantage.title}
										</h4>
										<p className="text-muted-foreground">
											{advantage.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Dashboard Preview */}
					<div className="flex items-center justify-center">
						<div className="relative w-full max-w-md">
							<div className="absolute inset-0 bg-gradient-to-r from-wisetwin-blue/20 to-secondary/20 rounded-2xl blur-2xl transform scale-110" />
							<Image
								src="/placeholder.png"
								alt="dashboard"
								width={600}
								height={300}
							/>
						</div>
					</div>
				</div>

				{/* Accessibility Section */}
				<div className="bg-gradient-to-r from-wisetwin-darkblue to-wisetwin-blue rounded-2xl p-8 text-white">
					<div className="max-w-4xl mx-auto">
						<div className="grid md:grid-cols-2 gap-8 items-center">
							<div>
								<h3 className="text-2xl font-bold mb-4">
									Accessibilité & Support multilingue
								</h3>
								<p className="text-white/90 mb-6">
									Une offre multilingue, sans frontière,
									adaptée aux contextes culturels
								</p>
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<CheckCircle className="size-5 " />
										<span>
											Tous les contenus disponibles en
											plusieurs langues
										</span>
									</div>
									<div className="flex items-center gap-3">
										<CheckCircle className="size-5" />
										<span>
											Voix off, sous-titrage, et textes
											localisés
										</span>
									</div>
									<div className="flex items-center gap-3">
										<CheckCircle className="size-5" />
										<span>
											Branding, scénarios et formats
											personnalisés
										</span>
									</div>
								</div>
							</div>
							<div className="flex justify-center">
								<div className=" rounded-xl p-6 backdrop-blur-sm">
									<div className="text-center space-y-2">
										<div className="text-3xl font-bold">
											2
										</div>
										<div className="text-sm text-white/80">
											Langues supportées
										</div>
									</div>
									<div className="flex flex-wrap gap-2 mt-4 justify-center">
										<span className="px-3 py-1 bg-white/20 rounded-full text-xs">
											🇫🇷 Français
										</span>
										<span className="px-3 py-1 bg-white/20 rounded-full text-xs">
											🇬🇧 English
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Training Formats Section */}
				<div className="space-y-12">
					<div className="text-center space-y-4">
						<h3 className="text-2xl font-bold text-wisetwin-darkblue">
							Formats de formation variés
						</h3>
						<p className="text-muted-foreground text-lg max-w-3xl mx-auto">
							Créez des expériences d'apprentissage engageantes avec nos différents formats adaptés à vos besoins
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{trainingFormats.map((format, index) => (
							<div key={index} className="text-center space-y-4">
								<div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto">
									{format.icon}
								</div>
								<div>
									<h4 className="font-semibold mb-2 text-lg">
										{format.title}
									</h4>
									<p className="text-muted-foreground text-sm leading-relaxed">
										{format.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Section>
	);
}
