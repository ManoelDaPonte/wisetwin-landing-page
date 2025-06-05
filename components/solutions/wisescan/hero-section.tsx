"use client";
import { ChartBar } from "lucide-react";
import { GenericHeroSection } from "@/components/solutions/common/generic-hero-section";

export function WiseScanHeroSection() {
  return (
    <GenericHeroSection
      title="Analyse intelligente des incidents pour une prévention efficace"
      subtitle="WiseScan"
      description="Transformez vos données d'incidents en programmes de formation ciblés et identifiez proactivement les zones à risque dans votre industrie."
      icon={<ChartBar className="size-6 text-secondary" />}
      image="/placeholder.png"
      imageAlt="Interface de WiseScan montrant l'analyse des incidents"
      buttons={[
        { label: "Demander une démo", href: "#contact", variant: "default" },
        { label: "En savoir plus", href: "#features", variant: "outline" },
      ]}
      onDev={true}
    />
  );
}
