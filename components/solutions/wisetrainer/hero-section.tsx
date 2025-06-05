import { GraduationCap } from "lucide-react";
import { GenericHeroSection } from "@/components/solutions/common/generic-hero-section";

export function WiseTrainerHeroSection() {
  return (
    <GenericHeroSection
      title="Formation industrielle immersive en 3D"
      subtitle="WiseTrainer"
      description="Créez des expériences d'apprentissage engageantes sans équipement VR. Formez vos équipes efficacement sur vos machines et procédures."
      icon={<GraduationCap className="size-6 text-secondary" />}
      image="/image/wisetrainer.png"
      imageAlt="Interface de WiseTrainer montrant une formation en 3D"
      buttons={[
        { label: "Demander une démo", href: "#contact", variant: "default" },
        { label: "En savoir plus", href: "#features", variant: "outline" },
      ]}
    />
  );
}
