// app/profils/chef-production/page.tsx
"use client";

import {
	HardHat,
	AlertCircle,
	Workflow,
	Clock,
	PenTool,
	Wrench,
	Gauge,
	Repeat,
	LineChart,
} from "lucide-react";
import { ProfilePageLayout } from "@/components/profils/profile-page-layout";

export default function ChefProductionPage() {
	// Configuration des données pour le Chef de Production
	const profileData = {
		hero: {
			title: "Maximisez l'efficacité de vos lignes de production",
			description:
				"Optimisez la productivité de vos équipements et de vos équipes grâce à des formations immersives et une maîtrise parfaite des procédures opérationnelles.",
			icon: <HardHat className="size-4 text-secondary" />,
			profileTitle: "Chef de Production",
			ctaButtons: {
				primary: {
					text: "Découvrir les solutions",
					href: "#solutions-chef-production",
				},
				secondary: { text: "Demander une démo", href: "/#contact" },
			},
			imageAlt: "Simulation 3D d'une ligne de production industrielle",
		},

		challenges: [
			{
				icon: <Clock className="size-6 text-secondary" />,
				title: "Temps d'arrêt machine coûteux",
				description:
					"Les arrêts non planifiés et les temps de maintenance prolongés impactent directement la productivité et génèrent des coûts importants.",
			},
			{
				icon: <AlertCircle className="size-6 text-secondary" />,
				title: "Gestion des incidents complexe",
				description:
					"La résolution rapide des incidents de production nécessite des compétences spécifiques et une capacité à prendre les bonnes décisions sous pression.",
			},
			{
				icon: <PenTool className="size-6 text-secondary" />,
				title: "Formation sur équipement limitée",
				description:
					"Former les opérateurs sur les équipements réels immobilise les machines et réduit la capacité de production.",
			},
			{
				icon: <Workflow className="size-6 text-secondary" />,
				title: "Optimisation des processus difficile",
				description:
					"Identifier les inefficacités dans les processus de production et mettre en œuvre des améliorations sans perturber les opérations.",
			},
		],

		solutions: [
			{
				title: "Maintenance prédictive virtuelle",
				description:
					"Formez vos équipes à identifier les signes précurseurs de panne et à réaliser les interventions préventives grâce à des simulations 3D de vos équipements spécifiques.",
				stats: "Réduction des arrêts non planifiés jusqu'à 65%",
				icon: <Wrench className="size-6 text-secondary" />,
			},
			{
				title: "Optimisation des procédures",
				description:
					"Testez et améliorez vos procédures opérationnelles dans un environnement virtuel avant de les déployer. Identifiez les goulots d'étranglement et optimisez les flux de travail.",
				stats: "Amélioration de la productivité jusqu'à 30%",
				icon: <Gauge className="size-6 text-secondary" />,
			},
			{
				title: "Formation sans immobilisation",
				description:
					"Formez vos opérateurs sur des jumeaux numériques de vos machines, permettant un apprentissage complet sans arrêter la production réelle.",
				stats: "0% d'arrêt machine pour la formation",
				icon: <Repeat className="size-6 text-secondary" />,
			},
		],

		caseStudies: [
			{
				title: "Réduction des temps d'arrêt",
				description:
					"Un fabricant de composants automobiles a réduit ses temps d'arrêt machine de 42% grâce à des formations WiseTrainer sur la maintenance préventive de ses équipements spécifiques.",
				highlight: "42% de réduction des temps d'arrêt",
			},
			{
				title: "Amélioration des changements de série",
				description:
					"Une usine agroalimentaire a optimisé ses procédures de changement de série, réduisant le temps nécessaire de 53 minutes à seulement 17 minutes après simulation et formation.",
				highlight: "Gain de 36 minutes par changement",
			},
			{
				title: "Formation multi-compétences",
				description:
					"Un site industriel a formé ses opérateurs sur 5 postes différents sans immobiliser d'équipement, augmentant la polyvalence de l'équipe et la flexibilité de production.",
				highlight: "Polyvalence des équipes multipliée par 3",
			},
		],

		benefits: [
			{
				title: "Maximisation du temps productif",
				items: [
					"Formation sans arrêt des lignes de production",
					"Réduction des temps d'intervention en cas d'incident",
					"Optimisation des procédures de maintenance préventive",
					"Diminution des erreurs opérateur impactant la production",
				],
			},
			{
				title: "Optimisation continue des processus",
				items: [
					"Test virtuel des optimisations avant déploiement",
					"Identification des inefficacités dans les procédures",
					"Standardisation des meilleures pratiques entre équipes",
					"Analyse comparative des performances entre différentes méthodes",
				],
			},
		],
	};

	return <ProfilePageLayout {...profileData} />;
}
