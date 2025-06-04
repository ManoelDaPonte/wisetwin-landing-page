import { GraduationCap, Zap, Shield, ChartBar } from "lucide-react";
import { SolutionSection } from "../common/solution-section";

export function WiseTrainerFeaturesSection() {
	const features = [
		{
			title: "Formation immersive",
			description: "Créez des expériences d'apprentissage en 3D sans équipement VR pour une formation engageante et efficace.",
			icon: <GraduationCap className="size-5 text-secondary" />,
		},
		{
			title: "Déploiement rapide",
			description: "Mise en place en quelques jours, sans installation complexe ni équipement spécifique.",
			icon: <Zap className="size-5 text-secondary" />,
		},
		{
			title: "Formation sécurisée",
			description: "Formez vos équipes sur des équipements virtuels sans risque ni immobilisation de la production.",
			icon: <Shield className="size-5 text-secondary" />,
		},
		{
			title: "Suivi détaillé",
			description: "Analysez les performances et la progression de vos apprenants avec des tableaux de bord détaillés.",
			icon: <ChartBar className="size-5 text-secondary" />,
		},
	];

	return (
		<SolutionSection
			title="WiseTrainer"
			description="Formation industrielle immersive en 3D sans équipement VR"
			features={features}
		/>
	);
}
