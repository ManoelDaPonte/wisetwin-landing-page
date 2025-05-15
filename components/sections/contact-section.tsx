// components/sections/contact-section.tsx
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";

export function ContactSection() {
  return (
    <Section 
      id="contact"
      header={{
        title: "Nous contacter",
        description: "Discutons de vos besoins en formation pour la sécurité de vos collaborateurs."
      }}
    >
      <div className="max-w-md mx-auto bg-card p-8 rounded-lg ring-1 ring-border">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Prénom</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 bg-background rounded-md border outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--wisetwin-blue))]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 bg-background rounded-md border outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--wisetwin-blue))]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email professionnel</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 bg-background rounded-md border outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--wisetwin-blue))]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Entreprise</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 bg-background rounded-md border outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--wisetwin-blue))]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <textarea 
              rows={4}
              className="w-full px-3 py-2 bg-background rounded-md border outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--wisetwin-blue))] resize-none"
              placeholder="Décrivez brièvement vos besoins en formation..."
            ></textarea>
          </div>
          <Button className="w-full bg-[hsl(var(--wisetwin-darkblue))] hover:bg-[hsl(var(--wisetwin-darkblue-light))]">
            Envoyer la demande
          </Button>
        </div>
      </div>
    </Section>
  );
}