import { Bot } from "lucide-react";
import { GenericHeroSection } from "@/components/solutions/common/generic-hero-section";

export function WiseAssistHeroSection() {
  return (
    <GenericHeroSection
      title="Assistant intelligent dédié à votre industrie"
      subtitle="WiseAssist"
      description="Un support intelligent qui exploite exclusivement vos données de formation pour répondre aux questions spécifiques de vos équipes."
      icon={<Bot className="size-6 text-secondary" />}
      image="/placeholder.png"
      imageAlt="Interface de WiseAssist montrant une conversation avec l'assistant"
      buttons={[
        { label: "Demander une démo", href: "#contact", variant: "default" },
        { label: "En savoir plus", href: "#features", variant: "outline" },
      ]}
      onDev={true}
    />
  );
}
