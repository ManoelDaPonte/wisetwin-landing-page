// components/sections/pricing-section.tsx
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { CheckIcon } from "@/components/ui/icon";

export function PricingSection() {
  const pricingPlans = [
    {
      title: "Starter",
      description: "Idéal pour les petites structures",
      price: "Sur devis",
      features: [
        "3 modules de formation standards",
        "Jusqu'à 50 utilisateurs",
        "Suivi individuel des formations",
        "Support par email"
      ]
    },
    {
      title: "Scale",
      description: "Pour les moyennes entreprises",
      price: "Sur devis",
      highlight: true,
      features: [
        "5 modules de formation personnalisés",
        "Jusqu'à 200 utilisateurs",
        "Suivi individuel et par équipe",
        "Support prioritaire",
        "Rapports mensuels détaillés"
      ]
    },
    {
      title: "Enterprise",
      description: "Solution complète pour grandes entreprises",
      price: "Sur devis",
      features: [
        "Modules personnalisés illimités",
        "Utilisateurs illimités",
        "Suite complète de rapports et analyses",
        "Support dédié 24/7",
        "Intégration avec vos systèmes existants",
        "Formation des responsables HSE"
      ]
    }
  ];

  return (
    <>
      <Section 
        id="pricing" 
        variant="muted"
        header={{
          title: "Nos offres",
          description: "Des solutions flexibles et sur mesure adaptées aux besoins de votre entreprise."
        }}
        gridCols={3}
      >
        {pricingPlans.map((plan, i) => (
          <div 
            key={i} 
            className={`bg-card p-8 rounded-lg flex flex-col ${plan.highlight ? 
              "ring-2 ring-[hsl(var(--wisetwin-blue))] shadow-lg shadow-[hsl(var(--wisetwin-blue)/15%)]" : 
              "ring-1 ring-border"}`}
          >
            <h3 className="font-semibold text-xl mb-2">{plan.title}</h3>
            <p className="text-muted-foreground mb-6">
              {plan.description}
            </p>
            <div className="text-3xl font-bold mb-6">
              {plan.price}
            </div>
            <ul className="mb-8 space-y-2 flex-grow">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-2">
                  <CheckIcon />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button 
              variant={plan.highlight ? "default" : "outline"} 
              className={plan.highlight ? 
                "w-full bg-[hsl(var(--wisetwin-blue))] hover:bg-[hsl(var(--wisetwin-blue-light))]" : 
                "w-full border-[hsl(var(--wisetwin-blue))] text-[hsl(var(--wisetwin-blue))] hover:bg-[hsl(var(--wisetwin-blue)/10%)]"}
            >
              Demander un devis
            </Button>
          </div>
        ))}
      </Section>
      
      <Section variant="default">
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Besoin d'une solution sur mesure ? Nous créons des formations spécifiques adaptées à vos machines.
          </p>
          <Button variant="outline" className="border-[hsl(var(--wisetwin-blue))] text-[hsl(var(--wisetwin-blue))] hover:bg-[hsl(var(--wisetwin-blue)/10%)]">
            Contactez notre équipe
          </Button>
        </div>
      </Section>
    </>
  );
}