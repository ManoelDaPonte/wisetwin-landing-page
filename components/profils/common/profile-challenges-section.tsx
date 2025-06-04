import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";

export type ChallengeItem = {
  icon: ReactNode;
  title: string;
  description: string;
};

interface ProfileChallengesSectionProps {
  profileTitle: string;
  challenges: ChallengeItem[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function ProfileChallengesSection({ profileTitle, challenges }: ProfileChallengesSectionProps) {
  return (
    <Section
      id={`defis-${profileTitle.toLowerCase().replace(" ", "-")}`}
      variant="muted"
      header={{
        title: `Les défis des ${profileTitle}s`,
        description: `Les professionnels ${profileTitle.toLowerCase()} font face à des enjeux complexes dans l'industrie moderne`,
        centered: true,
      }}
      animate={false}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-6"
      >
        {challenges.map((challenge, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="h-full hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    {challenge.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
                    <p className="text-muted-foreground">{challenge.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
} 