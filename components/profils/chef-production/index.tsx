import { ChefHat, CheckCircle, BarChart, Users } from "lucide-react";
import { ProfileHeroSection } from "../common/profile-hero-section";
import { ProfileChallengesSection } from "../common/profile-challenges-section";
import { ProfileSolutionsSection } from "../common/profile-solutions-section";

export function ChefProductionProfile() {
  const hero = {
    title: "Optimisez la production de votre usine",
    description: "Gérez vos équipes et vos lignes avec efficacité grâce à des outils digitaux adaptés.",
    icon: <ChefHat className="size-6 text-secondary" />,
    profileTitle: "Chef de production",
    ctaButtons: {
      primary: { text: "Découvrir nos solutions", href: "#solutions" },
      secondary: { text: "Contactez-nous", href: "#contact" },
    },
    image: "/storyset/chef-production.png",
  };
  const challenges = [
    { icon: <BarChart />, title: "Suivi de la performance", description: "Difficulté à suivre en temps réel la performance des lignes de production." },
    { icon: <Users />, title: "Gestion des équipes", description: "Coordination complexe des équipes sur plusieurs postes." },
  ];
  const solutions = [
    { icon: <ChefHat />, title: "Tableaux de bord", description: "Visualisez vos indicateurs clés en temps réel.", stats: "+20% productivité" },
    { icon: <CheckCircle />, title: "Procédures digitalisées", description: "Standardisez et diffusez les bonnes pratiques.", stats: "-30% erreurs" },
  ];
  return (
    <>
      <ProfileHeroSection {...hero} />
      <ProfileChallengesSection profileTitle={hero.profileTitle} challenges={challenges} />
      <ProfileSolutionsSection solutions={solutions} />
    </>
  );
}
export default ChefProductionProfile; 