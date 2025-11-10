import { 
	Users, 
	Building2, 
	Mail, 
	Bell, 
	User, 
	Wrench, 
	MapPin, 
	CreditCard 
} from "lucide-react";

import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";

export function PlatformSection() {
	const platformFeatures = [
		{
			icon: <Users className="size-6 text-primary-foreground" />,
			title: "Plans de formation personnalisés",
			description: "Créez et gérez des parcours de formation adaptés à chaque métier, avec suivi en temps réel des progressions individuelles."
		},
		{
			icon: <Building2 className="size-6 text-primary-foreground" />,
			title: "Intégration RH automatique",
			description: "Connectez-vous directement à vos systèmes RH et paie pour importer automatiquement vos employés et leurs informations."
		},
		{
			icon: <Mail className="size-6 text-primary-foreground" />,
			title: "Certifications automatisées",
			description: "Délivrance automatique de certificats personnalisés par email dès la validation des formations."
		},
		{
			icon: <Bell className="size-6 text-primary-foreground" />,
			title: "Rappels intelligents",
			description: "Système de notifications automatiques et manuelles pour maintenir l'engagement et respecter les échéances."
		},
		{
			icon: <User className="size-6 text-primary-foreground" />,
			title: "Espace personnel",
			description: "Chaque apprenant dispose de son tableau de bord personnel avec statistiques détaillées et historique de formation."
		},
		{
			icon: <Wrench className="size-6 text-primary-foreground" />,
			title: "Contenu évolutif",
			description: "Modifiez et actualisez vos formations 3D et textuelles à tout moment sans interruption de service."
		},
		{
			icon: <MapPin className="size-6 text-primary-foreground" />,
			title: "Multi-organisation",
			description: "Gérez plusieurs sites industriels depuis une plateforme unique avec des permissions granulaires par site."
		},
		{
			icon: <CreditCard className="size-6 text-primary-foreground" />,
			title: "Tarification à l'usage",
			description: "Payez uniquement pour les formations réellement suivies. Pas d'utilisation, pas de coût supplémentaire."
		}
	];

	return (
		<Section
			id="plateforme"
			variant="muted"
			header={{
				title: "Une plateforme complète de gestion",
				description:
					"Au-delà de la formation 3D, Wise Twin vous offre tous les outils pour gérer efficacement vos programmes de formation industrielle",
				centered: true,
			}}
		>
			<div className="space-y-16">
				{/* Features Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{platformFeatures.map((feature, index) => (
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
								<p className="text-sm text-muted-foreground leading-relaxed">
									{feature.description}
								</p>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Call to Action */}
				<div className="bg-secondary rounded-2xl p-8 text-secondary-foreground text-center">
					<h3 className="text-2xl font-bold mb-4">
						Prêt à transformer votre approche de la formation ?
					</h3>
					<p className="text-secondary-foreground/90 text-lg mb-6 max-w-2xl mx-auto">
						Contactez-nous dès aujourd'hui pour découvrir comment les modules Wise Trainer peuvent transformer vos méthodes de formation dans votre usine avec une solution complète et sur-mesure.
					</p>
				</div>
			</div>
		</Section>
	);
}