// app/profils/directeur-industriel/page.tsx
"use client";

import {
	ChartBar,
	TrendingDown,
	Briefcase,
	Factory,
	BarChart3,
	Globe,
	Target,
	PieChart,
} from "lucide-react";
import { ProfilePageLayout } from "@/components/profils/profile-page-layout";

export default function DirecteurIndustrielPage() {
	// Configuration des données pour le Directeur Industriel
	const profileData = {
		hero: {
			title: "Transformation digitale de vos sites industriels",
			description:
				"Pilotez efficacement la modernisation de vos installations, optimisez vos performances globales et valorisez votre savoir-faire industriel grâce aux jumeaux numériques.",
			icon: <ChartBar className="size-4 text-secondary" />,
			profileTitle: "Directeur Industriel",
			ctaButtons: {
				primary: {
					text: "Découvrir les solutions",
					href: "#solutions-directeur-industriel",
				},
				secondary: { text: "Demander une démo", href: "/#contact" },
			},
			imageAlt:
				"Visualisation 3D d'un site industriel avec tableaux de bord",
		},

		challenges: [
			{
				icon: <TrendingDown className="size-6 text-secondary" />,
				title: "Pression sur les coûts opérationnels",
				description:
					"Face à une concurrence mondiale, la nécessité de réduire les coûts tout en maintenant la qualité et la conformité réglementaire.",
			},
			{
				icon: <Factory className="size-6 text-secondary" />,
				title: "Modernisation des installations",
				description:
					"La transformation digitale des sites industriels existants représente un défi technique, financier et humain considérable.",
			},
			{
				icon: <Briefcase className="size-6 text-secondary" />,
				title: "Attraction et rétention des talents",
				description:
					"Difficulté à attirer et conserver des collaborateurs qualifiés dans un contexte de pénurie de compétences techniques.",
			},
			{
				icon: <Globe className="size-6 text-secondary" />,
				title: "Gestion multi-sites complexe",
				description:
					"Garantir l'uniformité des procédures, la qualité et la performance entre différents sites géographiquement dispersés.",
			},
		],

		solutions: [
			{
				title: "Jumeaux numériques industriels",
				description:
					"Créez des répliques virtuelles de vos installations pour optimiser les processus, former vos équipes et tester des améliorations sans perturber la production.",
				stats: "ROI moyen de 312% sur 3 ans",
				icon: <Factory className="size-6 text-secondary" />,
			},
			{
				title: "Pilotage centralisé de la performance",
				description:
					"Intégrez toutes vos données de formation, maintenance et production dans un tableau de bord unifié pour une prise de décision basée sur des données précises.",
				stats: "Visibilité améliorée de 85%",
				icon: <BarChart3 className="size-6 text-secondary" />,
			},
			{
				title: "Valorisation du savoir-faire industriel",
				description:
					"Capturez et pérennisez l'expertise de vos collaborateurs expérimentés sous forme de formations immersives, assurant le transfert de compétences critiques.",
				stats: "Préservation de 95% du savoir-faire critique",
				icon: <Target className="size-6 text-secondary" />,
			},
		],

		caseStudies: [
			{
				title: "Transformation digitale réussie",
				description:
					"Un groupe industriel international a déployé des jumeaux numériques sur 8 sites, réduisant les coûts opérationnels de 22% tout en augmentant la productivité de 15%.",
				highlight: "22% de réduction des coûts",
			},
			{
				title: "Standardisation multi-sites",
				description:
					"Une entreprise manufacturière a uniformisé ses procédures sur 12 sites dans 4 pays, éliminant les écarts de qualité et réduisant les non-conformités de 78%.",
				highlight: "Réduction de 78% des non-conformités",
			},
			{
				title: "Transfert de compétences critiques",
				description:
					"Un leader de l'industrie chimique a préservé l'expertise de collaborateurs seniors partant à la retraite via des modules WiseTrainer, assurant la continuité opérationnelle.",
				highlight: "100% de préservation du savoir-faire",
			},
		],

		benefits: [
			{
				title: "Optimisation de la performance globale",
				items: [
					"Réduction des coûts opérationnels et de formation",
					"Amélioration de la productivité des installations",
					"Diminution des temps d'arrêt non planifiés",
					"Valorisation des actifs industriels existants",
				],
			},
			{
				title: "Excellence opérationnelle et industrielle",
				items: [
					"Standardisation des meilleures pratiques à l'échelle globale",
					"Digitalisation des processus industriels clés",
					"Prise de décision basée sur des données précises",
					"Adaptation rapide aux évolutions du marché et des réglementations",
				],
			},
		],
	};

	return <ProfilePageLayout {...profileData} />;
}
