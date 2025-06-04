
import { ChartBar, Shield, Target, Brain } from "lucide-react";
import { SolutionSection } from "../common/solution-section";

export function WiseScanFeaturesSection() {
  const features = [
    {
      title: "Analyse des incidents",
      description: "Étude approfondie de vos historiques d'incidents pour identifier les schémas récurrents et les zones à risque.",
      icon: <ChartBar className="size-5 text-secondary" />,
    },
    {
      title: "Formation ciblée",
      description: "Création automatique de programmes de formation basés sur les risques identifiés dans votre environnement.",
      icon: <Target className="size-5 text-secondary" />,
    },
    {
      title: "Prévention proactive",
      description: "Identification précoce des situations à risque pour une meilleure prévention des accidents.",
      icon: <Shield className="size-5 text-secondary" />,
    },
    {
      title: "Apprentissage continu",
      description: "Le système s'améliore en continu en analysant les nouveaux incidents et leurs causes.",
      icon: <Brain className="size-5 text-secondary" />,
    },
  ];

  return (
    <SolutionSection
      title="WiseScan"
      description="Analyse intelligente des incidents pour une formation sur mesure et une prévention efficace des risques"
      features={features}
    />
  );
} 