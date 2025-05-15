// components/sections/footer.tsx
import Image from "next/image";

export function Footer() {
  const footerLinks = [
    {
      title: "Solutions",
      links: ["Formations 3D", "Formations sécurité", "Suivi de progression", "Rapports et analyses"]
    },
    {
      title: "Entreprise",
      links: ["À propos", "Nos clients", "Témoignages", "Contact"]
    },
    {
      title: "Légal",
      links: ["Confidentialité", "CGU", "Mentions légales"]
    }
  ];

  return (
    <footer className="py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="md:max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/vercel.svg"
                alt="WiseTwin Logo"
                width={24}
                height={24}
                className="dark:invert"
              />
              <span className="font-semibold text-xl">WiseTwin</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Des formations 3D pour la sécurité et la performance de vos équipes industrielles. Solutions sur mesure pour tous types d'équipements.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerLinks.map((section, i) => (
              <div key={i}>
                <h4 className="font-medium mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} WiseTwin. Sécurité et formation au cœur de l'industrie.</p>
        </div>
      </div>
    </footer>
  );
}