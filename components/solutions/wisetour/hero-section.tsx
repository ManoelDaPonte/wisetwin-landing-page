import { Video } from "lucide-react";
import { GenericHeroSection } from "@/components/solutions/common/generic-hero-section";

export function WiseTourHeroSection() {
	return (
		<GenericHeroSection
			title="Visites virtuelles interactives"
			subtitle="WiseTour"
			description="Valorisez votre savoir-faire industriel avec des visites virtuelles immersives de vos installations."
			icon={<Video className="size-6 text-secondary" />}
			image="/placeholder.png"
			imageAlt="Interface de WiseTour montrant une visite virtuelle"
			buttons={[
				{ label: "Demander une démo", href: "#contact", variant: "default" },
				{ label: "En savoir plus", href: "#features", variant: "outline" },
			]}
		/>
	);
}
