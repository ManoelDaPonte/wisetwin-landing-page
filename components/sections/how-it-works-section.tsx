// components/sections/how-it-works-section.tsx
import { Section } from "@/components/common/section";

export function HowItWorksSection() {
	const steps = [
		{
			step: 1,
			title: "Analyse des besoins",
			description:
				"Nous identifions les risques spécifiques et les formations nécessaires pour votre industrie.",
		},
		{
			step: 2,
			title: "Création du jumeau numérique",
			description:
				"Développement des modules 3D adaptés à vos équipements et processus.",
		},
		{
			step: 3,
			title: "Formation des équipes",
			description:
				"Vos collaborateurs s'entraînent sur la plateforme avec des scénarios réalistes.",
		},
		{
			step: 4,
			title: "Suivi et analyse",
			description:
				"Les responsables HSE suivent les progrès et identifient les points d'amélioration.",
		},
	];

	return (
		<Section
			id="how-it-works"
			variant="muted"
			header={{
				title: "Comment ça fonctionne",
				description:
					"Notre plateforme de formation 3D s'intègre facilement dans votre processus de formation continue.",
			}}
			gridCols={4}
		>
			{steps.map((step, i) => (
				<div key={i} className="flex flex-col items-center text-center">
					<div className="size-12 rounded-full bg-background flex items-center justify-center ring-1 ring-border mb-4">
						<span className="font-semibold">{step.step}</span>
					</div>
					<h3 className="font-medium mb-2">{step.title}</h3>
					<p className="text-sm text-muted-foreground">
						{step.description}
					</p>
				</div>
			))}
		</Section>
	);
}
