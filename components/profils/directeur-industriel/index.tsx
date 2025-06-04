import { Briefcase, BarChart, Users, Shield } from "lucide-react";
import { ProfileHeroSection } from "../common/profile-hero-section";
import { ProfileChallengesSection } from "../common/profile-challenges-section";
import { ProfileSolutionsSection } from "../common/profile-solutions-section";

export function DirecteurIndustrielProfile() {
  const hero = {
    title: "Pilotez la performance industrielle",
    description: "Prenez des décisions éclairées pour optimiser la production et la sécurité.",
    icon: <Briefcase className="size-6 text-secondary" />,
    profileTitle: "Directeur industriel",
    ctaButtons: {
      primary: { text: "Découvrir nos solutions", href: "#solutions" },
      secondary: { text: "Contactez-nous", href: "#contact" },
    },
    image: "/storyset/directeur-industriel.png",
  };
  const challenges = [
    { icon: <BarChart />, title: "Performance globale", description: "Difficulté à avoir une vision consolidée des indicateurs clés." },
    { icon: <Shield />, title: "Sécurité", description: "Garantir la sécurité des équipes et la conformité réglementaire." },
  ];
  const solutions = [
    { icon: <Briefcase />, title: "Reporting centralisé", description: "Accédez à tous vos KPIs en un coup d'œil.", stats: "+10% OEE" },
    { icon: <Users />, title: "Collaboration renforcée", description: "Fluidifiez la communication entre les services.", stats: "+30% synergie" },
  ];
  const caseStudies = [
    { title: "Groupe X", description: "Mise en place d'un reporting digital multi-sites.", highlight: "+12% productivité" },
    { title: "Groupe Y", description: "Déploiement d'une solution de gestion des incidents.", highlight: "-40% accidents" },
  ];
  const benefits = [
    { title: "Vision stratégique", items: ["Décisions plus rapides", "Meilleure anticipation"] },
    { title: "Sécurité renforcée", items: ["Moins d'accidents", "Conformité assurée"] },
  ];
  return (
    <>
      <ProfileHeroSection {...hero} />
      <ProfileChallengesSection profileTitle={hero.profileTitle} challenges={challenges} />
      <ProfileSolutionsSection solutions={solutions} />
    </>
  );
}
export default DirecteurIndustrielProfile; 