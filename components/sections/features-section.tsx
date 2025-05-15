// components/sections/features-section.tsx
import { Section, SectionCard } from "@/components/section";
import { Icon } from "@/components/ui/icon";

export function FeaturesSection() {
  const features = [
    {
      icon: (
        <Icon>
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
          <path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"/>
          <path d="M14 12a1 1 0 0 1 1 1v1a1 1 0 0 0 1 1 1 1 0 0 0-1 1v1a1 1 0 0 1-1 1"/>
        </Icon>
      ),
      title: "Formation sécurité",
      description: "Modules spécialisés sur les protocoles de sécurité et d'intervention sur machines en milieu industriel."
    },
    {
      icon: (
        <Icon>
          <path d="m7 11 2-2-2-2"/>
          <path d="M11 13h4"/>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        </Icon>
      ),
      title: "Environnement 3D interactif",
      description: "Simulation de situations réelles permettant d'apprendre les gestes professionnels dans un environnement sécurisé."
    },
    {
      icon: (
        <Icon>
          <path d="M12 20h9"/>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </Icon>
      ),
      title: "Formations personnalisées",
      description: "Adaptation des modules à vos équipements spécifiques et à votre environnement de travail réel."
    }
  ];

  return (
    <Section 
      id="features"
      header={{
        title: "Formations spécialisées",
        description: "Des modules de formation 3D sur mesure pour garantir la sécurité de vos équipes lors des interventions sur machines."
      }}
      gridCols={3}
    >
      {features.map((feature, index) => (
        <SectionCard
          key={index}
          icon={feature.icon}
          title={feature.title}
        >
          <p className="text-muted-foreground">
            {feature.description}
          </p>
        </SectionCard>
      ))}
    </Section>
  );
}