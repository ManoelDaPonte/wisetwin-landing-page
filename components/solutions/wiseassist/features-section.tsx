import { Bot, Lock, Zap, BookOpen } from "lucide-react";
import { SolutionSection } from "../common/solution-section";

export function WiseAssistFeaturesSection() {
  const features = [
    {
      title: "Base de connaissances dédiée",
      description: "Création d'une base de connaissances unique basée exclusivement sur vos formations et procédures.",
      icon: <BookOpen className="size-5 text-secondary" />,
    },
    {
      title: "Réponses contextualisées",
      description: "Assistant intelligent qui comprend le contexte spécifique de votre industrie et de vos processus.",
      icon: <Bot className="size-5 text-secondary" />,
    },
    {
      title: "Confidentialité totale",
      description: "Vos données restent isolées et ne sont jamais partagées avec d'autres clients.",
      icon: <Lock className="size-5 text-secondary" />,
    },
    {
      title: "Support instantané",
      description: "Réponses immédiates aux questions de vos équipes, disponible 24/7.",
      icon: <Zap className="size-5 text-secondary" />,
    },
  ];

  return (
    <SolutionSection
      title="WiseAssist"
      description="Assistant intelligent personnalisé exploitant uniquement vos données pour un support sur mesure"
      features={features}
    />
  );
} 