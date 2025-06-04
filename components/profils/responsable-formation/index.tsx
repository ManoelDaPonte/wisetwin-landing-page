import { BookOpen, Users, GraduationCap, CheckCircle } from "lucide-react";
import { ProfileHeroSection } from "../common/profile-hero-section";
import { ProfileChallengesSection } from "../common/profile-challenges-section";
import { ProfileSolutionsSection } from "../common/profile-solutions-section";
export function ResponsableFormationProfile() {
  const hero = {
    title: "Développez les compétences de vos équipes",
    description: "Formez efficacement et suivez la progression de chaque collaborateur.",
    icon: <BookOpen className="size-6 text-secondary" />,
    profileTitle: "Responsable formation",
    ctaButtons: {
      primary: { text: "Découvrir nos solutions", href: "#solutions" },
      secondary: { text: "Contactez-nous", href: "#contact" },
    },
  };
  const challenges = [
    { icon: <Users />, title: "Engagement des apprenants", description: "Difficulté à motiver et impliquer les équipes dans la formation." },
    { icon: <GraduationCap />, title: "Suivi des acquis", description: "Manque de visibilité sur la progression et les compétences acquises." },
  ];
  const solutions = [
    { icon: <BookOpen />, title: "Parcours personnalisés", description: "Adaptez la formation à chaque profil.", stats: "+25% engagement" },
    { icon: <CheckCircle />, title: "Suivi digitalisé", description: "Visualisez la progression et les résultats en temps réel.", stats: "+40% efficacité" },
  ];
  return (
    <>
      <ProfileHeroSection {...hero} />
      <ProfileChallengesSection profileTitle={hero.profileTitle} challenges={challenges} />
      <ProfileSolutionsSection solutions={solutions} />
    </>
  );
}
export default ResponsableFormationProfile; 