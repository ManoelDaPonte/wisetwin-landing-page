import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";

export type ProfileHeroProps = {
  title: string;
  description: string;
  icon: ReactNode;
  profileTitle: string;
  ctaButtons?: {
    primary?: { text: string; href: string };
    secondary?: { text: string; href: string };
  };
  imageAlt?: string;
};

export function ProfileHeroSection({
  title,
  description,
  icon,
  profileTitle,
  ctaButtons,
  imageAlt,
}: ProfileHeroProps) {
  return (
    <Section
      id={`hero-${profileTitle.toLowerCase().replace(" ", "-")}`}
      variant="default"
      className="py-20"
      animate={false}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              {icon}
              <span>{profileTitle}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {title.split(" ").map((word, i, arr) =>
                i === arr.length - 1 ? (
                  <span key={i} className="text-secondary">{word} </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">{description}</p>
            <div className="flex flex-wrap gap-4">
              {ctaButtons?.primary && (
                <Button size="lg" asChild>
                  <Link href={ctaButtons.primary.href}>
                    <div className="flex items-center">
                      {ctaButtons.primary.text}
                      <ArrowRight className="ml-2 size-4" />
                    </div>
                  </Link>
                </Button>
              )}
              {ctaButtons?.secondary && (
                <Button size="lg" variant="outline" asChild>
                  <Link href={ctaButtons.secondary.href}>
                    <div>{ctaButtons.secondary.text}</div>
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="aspect-video bg-gradient-to-br from-wisetwin-darkblue to-wisetwin-blue rounded-xl overflow-hidden shadow-lg relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-lg font-medium">
                  {imageAlt || "Simulation en 3D pour votre métier"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
} 