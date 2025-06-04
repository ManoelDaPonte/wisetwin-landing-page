"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}

interface SolutionSectionProps {
  title: string;
  description: string;
  features: Feature[];
  children?: ReactNode;
}

export function SolutionSection({
  title,
  description,
  features,
  children,
}: SolutionSectionProps) {
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

  return (
    <Section
      variant="muted"
      header={{
        title,
        description,
        centered: true,
      }}
      animate={false}
    >
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        {children}
      </div>
    </Section>
  );
} 