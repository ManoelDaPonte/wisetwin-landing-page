import Image from "next/image";
import { Monitor, Globe, Gamepad2, Shield } from "lucide-react";

import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";

export function WiseTrainerSection() {
	const keyFeatures = [
		{
			icon: <Monitor className="size-5 text-primary-foreground" />,
			title: "100% en ligne",
			description: "Accessible depuis n'importe où, sans installation",
		},
		{
			icon: <Shield className="size-5 text-primary-foreground" />,
			title: "Reproduction fidèle",
			description: "Environnements 3D identiques à vos installations",
		},
		{
			icon: <Gamepad2 className="size-5 text-primary-foreground" />,
			title: "Interactivité & Gamification",
			description: "Quiz, certifications et suivi des scores",
		},
		{
			icon: <Globe className="size-5 text-primary-foreground" />,
			title: "Support multilingue",
			description: "Contenus disponibles en plusieurs langues",
		},
	];

	return (
		<Section
			id="wisetrainer"
			variant="default"
			header={{
				title: "Un transfert de connaissances visuel",
				description:
					"Une solution légère, flexible et accessible depuis n'importe où.",
				centered: true,
			}}
		>
			<div className="space-y-16">
				{/* Hero Section */}
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Content Column */}
					<div className="space-y-8">
						<div className="space-y-6">
							<h3 className="text-2xl font-bold">
								Donnez du sens à vos formation en reproduisant vos environnements de travail réels
							</h3>
							<p className="text-muted-foreground text-lg leading-relaxed">
								Une{" "}
								<strong>mise en situation terrain</strong> réaliste dans des
								environnements interactifs et personnalisables,
								fidèles à votre réalité métier.
							</p>
						</div>

						{/* Key Benefits */}
						<div className="space-y-4">
							{[
								"Simulations d'accidents et erreurs courantes",
								"Analyse post-situation et feedback immédiat",
								"Entraînement à la prise de décision sans risque",
							].map((benefit, index) => (
								<div
									key={index}
									className="flex items-start gap-3"
								>
									<div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
									<p className="text-foreground font-medium">
										{benefit}
									</p>
								</div>
							))}
						</div>
					</div>

					{/* Image Column */}
					<div className="flex items-center justify-center">
						<div className="relative w-full max-w-lg">
							<div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-2xl blur-3xl transform scale-110" />
							<div className="relative w-full overflow-hidden ">
								<Image
									src="/image/exploded_view.png"
									alt="Wise Twin - Formation industrielle 3D"
									width={600}
									height={400}
									className="w-full h-auto object-contain"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Key Features Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{keyFeatures.map((feature, index) => (
						<Card
							key={index}
							className="text-center hover:shadow-md transition-all duration-200"
						>
							<CardContent className="p-6">
								<div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
									{feature.icon}
								</div>
								<h4 className="font-semibold mb-2">
									{feature.title}
								</h4>
								<p className="text-sm text-muted-foreground">
									{feature.description}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</Section>
	);
}
