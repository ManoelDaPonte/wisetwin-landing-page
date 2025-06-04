import { Video, Globe, Users, Presentation } from "lucide-react";
import { SolutionSection } from "../common/solution-section";

export function WiseTourFeaturesSection() {
	const features = [
		{
			title: "Visites immersives",
			description: "Créez des visites virtuelles interactives en 3D de vos installations industrielles.",
			icon: <Video className="size-5 text-secondary" />,
		},
		{
			title: "Accès universel",
			description: "Accessible depuis n'importe quel navigateur web, sans installation requise.",
			icon: <Globe className="size-5 text-secondary" />,
		},
		{
			title: "Collaboration",
			description: "Partagez facilement vos visites avec vos clients, partenaires et collaborateurs.",
			icon: <Users className="size-5 text-secondary" />,
		},
		{
			title: "Présentation dynamique",
			description: "Intégrez des points d'intérêt et des informations contextuelles dans vos visites.",
			icon: <Presentation className="size-5 text-secondary" />,
		},
	];

	return (
		<SolutionSection
			title="WiseTour"
			description="Visites virtuelles interactives de vos installations industrielles"
			features={features}
		/>
	);
}
