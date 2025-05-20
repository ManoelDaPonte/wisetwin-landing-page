// app/profils/responsable-formation/page.tsx
"use client";

import {
	School,
	Activity,
	FileText,
	Clock,
	BarChart,
	Users,
	Brain,
} from "lucide-react";
import { ProfilePageLayout } from "@/components/profils/profile-page-layout";

export default function ResponsableFormationPage() {
	// Configuration des données pour le Responsable Formation
	const profileData = {
		hero: {
			title: "Optimisez la montée en compétences de vos équipes",
			description:
				"Révolutionnez vos formations industrielles avec des expériences immersives, un suivi personnalisé et des analyses de performance en temps réel.",
			icon: <School className="size-4 text-secondary" />,
			profileTitle: "Responsable Formation",
			ctaButtons: {
				primary: {
					text: "Découvrir les solutions",
					href: "#solutions-responsable-formation",
				},
				secondary: { text: "Demander une démo", href: "/#contact" },
			},
			imageAlt: "Simulation 3D de formation industrielle",
		},

		challenges: [
			{
				icon: <Activity className="size-6 text-secondary" />,
				title: "Faible engagement des apprenants",
				description:
					"Les méthodes de formation traditionnelles peinent à maintenir l&apos;attention et l&apos;intérêt des collaborateurs, réduisant l&apos;efficacité de l&apos;apprentissage.",
			},
			{
				icon: <Clock className="size-6 text-secondary" />,
				title: "Temps de formation trop long",
				description:
					"Les cycles de formation actuels mobilisent les équipes et les équipements pendant des périodes prolongées, impactant la productivité.",
			},
			{
				icon: <FileText className="size-6 text-secondary" />,
				title: "Difficulté à mesurer les résultats",
				description:
					"L&apos;évaluation objective des compétences acquises et du retour sur investissement des formations reste un défi majeur.",
			},
			{
				icon: <Users className="size-6 text-secondary" />,
				title: "Standardisation vs personnalisation",
				description:
					"Trouver l&apos;équilibre entre des formations standardisées et des parcours adaptés aux besoins spécifiques de chaque collaborateur.",
			},
		],

		solutions: [
			{
				title: "Formations immersives en 3D",
				description:
					"Plongez vos collaborateurs dans des environnements de travail virtuels où ils peuvent pratiquer et maîtriser leurs compétences dans des conditions réalistes.",
				stats: "Augmentation de 93% de l&apos;engagement des apprenants",
				icon: <Brain className="size-6 text-secondary" />,
			},
			{
				title: "Parcours d&apos;apprentissage adaptatifs",
				description:
					"Notre système IA analyse les performances de chaque apprenant pour adapter automatiquement le contenu et la difficulté, optimisant ainsi le temps d&apos;apprentissage.",
				stats: "Réduction de 40% du temps de formation",
				icon: <Activity className="size-6 text-secondary" />,
			},
			{
				title: "Analytique de performance avancée",
				description:
					"Obtenez des insights détaillés sur les progrès individuels et collectifs, identifiez les lacunes et mesurez précisément l&apos;impact de vos programmes de formation.",
				stats: "Vue à 360° sur les compétences acquises",
				icon: <BarChart className="size-6 text-secondary" />,
			},
		],

		caseStudies: [
			{
				title: "Accélération de l&apos;onboarding",
				description:
					"Un équipementier industriel a réduit de 60% le temps d&apos;intégration de ses nouveaux opérateurs grâce à des formations immersives WiseTrainer adaptées à chaque poste.",
				highlight: "Temps d&apos;intégration réduit de 60%",
			},
			{
				title: "Formation multi-sites harmonisée",
				description:
					"Un groupe agroalimentaire présent dans 5 pays a uniformisé ses pratiques de production grâce à des formations virtuelles identiques, garantissant une qualité constante.",
				highlight: "Standardisation des pratiques à 98%",
			},
			{
				title: "Certification accélérée",
				description:
					"Une entreprise manufacturière a augmenté de 70% son taux de réussite aux certifications techniques après l&apos;implémentation de simulations pratiques WiseTrainer.",
				highlight: "Taux de réussite amélioré de 70%",
			},
		],

		benefits: [
			{
				title: "Formation optimisée et efficiente",
				items: [
					"Réduction significative du temps nécessaire à l&apos;acquisition de compétences",
					"Formation sans mobilisation des équipements de production",
					"Possibilité de former plusieurs personnes simultanément",
					"Répétition illimitée des scénarios sans coût supplémentaire",
				],
			},
			{
				title: "Mesure précise et pilotage de la performance",
				items: [
					"Évaluation objective des compétences acquises",
					"Tableaux de bord analytiques pour suivre la progression",
					"Identification automatique des besoins en formation complémentaire",
					"Démonstration claire du ROI des actions de formation",
				],
			},
		],
	};

	return <ProfilePageLayout {...profileData} />;
}
