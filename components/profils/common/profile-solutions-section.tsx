import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";

export type SolutionItem = {
  title: string;
  description: string;
  stats: string;
  icon: ReactNode;
};

interface ProfileSolutionsSectionProps {
  solutions: SolutionItem[];
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

export function ProfileSolutionsSection({ solutions }: ProfileSolutionsSectionProps) {
  return (
    <Section
      id="solutions"
      variant="default"
      header={{
        title: "Nos solutions pour votre métier",
        description: "Des outils adaptés pour répondre à vos enjeux spécifiques",
        centered: true,
      }}
      animate={false}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8"
      >
        {solutions.map((solution, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="h-full hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    {solution.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                    <p className="text-muted-foreground mb-2">{solution.description}</p>
                    <span className="text-xs text-secondary font-bold uppercase tracking-wide">{solution.stats}</span>
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