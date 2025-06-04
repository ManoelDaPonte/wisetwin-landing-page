import { Shield, AlertTriangle, Users, CheckCircle } from "lucide-react";
import { ProfileHeroSection } from "../common/profile-hero-section";
import { ProfileChallengesSection } from "../common/profile-challenges-section";
import { ProfileSolutionsSection } from "../common/profile-solutions-section";

export function ResponsableHSEProfile() {
  const hero = {
    title: "Sécurisez et prévenez les risques",
    description: "Garantissez la sécurité de vos équipes et la conformité de votre site.",
    icon: <Shield className="size-6 text-secondary" />,
    profileTitle: "Responsable HSE",
    ctaButtons: {
      primary: { text: "Découvrir nos solutions", href: "#solutions" },
      secondary: { text: "Contactez-nous", href: "#contact" },
    },
  };
  const challenges = [
    { icon: <AlertTriangle />, title: "Gestion des incidents", description: "Réactivité et traçabilité lors d'un incident ou accident." },
    { icon: <Users />, title: "Culture sécurité", description: "Impliquer tous les collaborateurs dans la prévention des risques." },
  ];
  const solutions = [
    { icon: <Shield />, title: "Gestion des risques", description: "Identifiez et suivez les risques en temps réel.", stats: "-50% incidents" },
    { icon: <CheckCircle />, title: "Formation sécurité", description: "Sensibilisez et formez efficacement vos équipes.", stats: "+60% conformité" },
  ];
  return (
    <>
      <ProfileHeroSection {...hero} />
      <ProfileChallengesSection profileTitle={hero.profileTitle} challenges={challenges} />
      <ProfileSolutionsSection solutions={solutions} />
    </>
  );
}
export default ResponsableHSEProfile; 