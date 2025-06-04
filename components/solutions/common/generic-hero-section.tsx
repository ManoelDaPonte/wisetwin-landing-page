"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface HeroButton {
  label: string;
  href: string;
  variant?: "default" | "outline";
}

interface GenericHeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  icon: ReactNode;
  image: string;
  imageAlt: string;
  variant?: "default" | "muted";
  buttons?: HeroButton[];
}

export function GenericHeroSection({
  title,
  subtitle,
  description,
  icon,
  image,
  imageAlt,
  variant = "default",
  buttons = [],
}: GenericHeroSectionProps) {
  return (
    <Section className="pt-24 md:pt-32 overflow-hidden" variant={variant} animate={false}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="size-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                {icon}
              </div>
              {subtitle && <h2 className="text-xl font-medium">{subtitle}</h2>}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              {buttons.map((btn, i) => (
                <Button key={i} size="lg" asChild variant={btn.variant || (i === 0 ? "default" : "outline") }>
                  <a href={btn.href}>{btn.label}</a>
                </Button>
              ))}
            </div>
          </motion.div>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border bg-muted">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
} 