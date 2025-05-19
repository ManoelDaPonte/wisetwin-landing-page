// app/profils/responsable-hse/page.tsx
"use client";

import {
	ShieldCheck,
	AlertTriangle,
	FileText,
	Users,
	LineChart,
	CheckCircle,
} from "lucide-react";
import { ProfilePageLayout } from "@/components/profils/profile-page-layout";

export default function ResponsableHSEPage() {
	// Configuration des données pour le Responsable HSE
	const profileData = {
		hero: {
			title: "Solutions immersives pour la sécurité industrielle",
			description:
				"Transformez votre approche de la santé et sécurité au travail avec des formations immersives et des analyses de comportements en temps réel.",
			icon: <ShieldCheck className="size-4 text-secondary" />,
			profileTitle: "Responsable HSE",
			ctaButtons: {
				primary: {
					text: "Découvrir les solutions",
					href: "#solutions-responsable-hse",
				},
				secondary: { text: "Demander une démo", href: "/#contact" },
			},
			imageAlt: "Simulation d'évaluation des risques en 3D",
		},

		challenges: [
			{
				icon: <AlertTriangle className="size-6 text-secondary" />,
				title: "Taux d'accidents trop élevés",
				description:
					"Réduire la fréquence et la gravité des accidents du travail tout en assurant une formation efficace sans exposer les équipes à des risques.",
			},
			{
				icon: <FileText className="size-6 text-secondary" />,
				title: "Complexité des normes de sécurité",
				description:
					"Garantir la conformité aux réglementations de sécurité changeantes et s'assurer que tous les collaborateurs comprennent et respectent les procédures.",
			},
			{
				icon: <Users className="size-6 text-secondary" />,
				title: "Engagement limité des collaborateurs",
				description:
					"Surmonter le manque d'engagement des équipes dans les formations traditionnelles et théoriques sur la sécurité.",
			},
			{
				icon: <LineChart className="size-6 text-secondary" />,
				title: "Difficulté de mesure des compétences",
				description:
					"Évaluer objectivement les compétences et connaissances en matière de sécurité et identifier les domaines nécessitant des formations supplémentaires.",
			},
		],

		solutions: [
			{
				title: "Formation sécurisée en environnement virtuel",
				description:
					"Simulez des situations à risque sans danger réel. Formez vos équipes à reconnaître et gérer les dangers sans les exposer à des risques.",
				stats: "Réduction de 75% des incidents lors des formations",
				icon: <ShieldCheck className="size-6 text-secondary" />,
			},
			{
				title: "Procédures de sécurité interactives",
				description:
					"Transformez vos procédures textuelles en expériences immersives. Les collaborateurs peuvent pratiquer et intégrer les protocoles de sécurité dans un environnement 3D réaliste.",
				stats: "Taux de rétention des informations amélioré de 65%",
				icon: <CheckCircle className="size-6 text-secondary" />,
			},
			{
				title: "Analyse détaillée des comportements",
				description:
					"Recevez des rapports détaillés sur les actions, décisions et erreurs de chaque apprenant. Identifiez les points de formation à renforcer et les compétences déjà maîtrisées.",
				stats: "Visibilité accrue de 80% sur les compétences réelles",
				icon: <LineChart className="size-6 text-secondary" />,
			},
		],

		caseStudies: [
			{
				title: "Prévention des accidents industriels",
				description:
					"Un fabricant automobile a réduit de 45% ses accidents de travail en utilisant WiseTrainer pour simuler les zones dangereuses et former aux interventions d'urgence.",
				highlight: "Réduction de 45% des accidents du travail",
			},
			{
				title: "Conformité réglementaire",
				description:
					"Une entreprise pétrochimique a atteint 100% de conformité aux nouvelles réglementations SEVESO en formant tous ses opérateurs via des simulations virtuelles des procédures de sécurité.",
				highlight: "100% de conformité aux normes SEVESO",
			},
			{
				title: "Gestion des situations d'urgence",
				description:
					"Un site industriel a amélioré son temps de réaction aux urgences de 62% après des simulations répétées d'incidents critiques dans WiseTrainer.",
				highlight: "Temps de réaction amélioré de 62%",
			},
		],

		benefits: [
			{
				title: "Réduction des risques et incidents",
				items: [
					"Formation à la sécurité sans risque réel pour les collaborateurs",
					"Diminution des accidents du travail grâce à une meilleure préparation",
					"Identification préventive des comportements à risque",
					"Amélioration continue des procédures de sécurité",
				],
			},
			{
				title: "Conformité et documentation améliorées",
				items: [
					"Suivi précis des formations et compétences de chaque collaborateur",
					"Documentation automatique des sessions de formation",
					"Preuves de conformité aux exigences réglementaires",
					"Rapports détaillés pour les audits de sécurité",
				],
			},
		],
	};

	return <ProfilePageLayout {...profileData} />;
}
