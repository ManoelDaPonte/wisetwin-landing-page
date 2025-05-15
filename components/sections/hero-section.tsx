// components/sections/hero-section.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";

export function HeroSection() {
  return (
    <Section 
      variant="gradient" 
      gridCols={2}
    >
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl md:text-5xl font-bold">Formation industrielle en réalité 3D</h1>
        <p className="text-lg text-muted-foreground">
          WiseTwin propose des formations 3D interactives pour améliorer la sécurité et les compétences des intervenants sur les machines industrielles.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" className="bg-[hsl(var(--wisetwin-darkblue))] hover:bg-[hsl(var(--wisetwin-darkblue-light))]">
            Demander une démo
          </Button>
          <Button variant="outline" size="lg" className="border-[hsl(var(--wisetwin-blue))] text-[hsl(var(--wisetwin-blue))] hover:bg-[hsl(var(--wisetwin-blue)/10%)]">
            Voir nos formations
          </Button>
        </div>
      </div>
      <div className="relative h-[400px] rounded-lg bg-muted p-2 ring-1 ring-border">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <div className="flex flex-col items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-[hsl(var(--wisetwin-blue))]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
              <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
              <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            <p className="text-center font-medium">Expérience 3D interactive</p>
            <p className="text-center text-sm">Plateforme de formation sécurité immersive</p>
          </div>
        </div>
      </div>
    </Section>
  );
}