import Image from "next/image";

import { Section } from "@/components/common/section";

export function WiseTrainerSection() {
	return (
		<Section
			id="wisetrainer"
			variant="default"
			header={{
				title: "WiseTrainer",
				description:
					"WiseTrainer sécurise vos lancements, fiabilise vos procédures et accélère la montée en compétences, sans immobiliser vos installations.",
				centered: true,
			}}
		>
			<div className="grid lg:grid-cols-2 gap-12 items-center">
				{/* Content Column */}

				<div className="space-y-6">
					<div className="flex items-start gap-4">
						<div className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-sm">
							1
						</div>
						<p className="text-foreground font-medium pt-1">
							Reproduisez fidèlement vos installations.
						</p>
					</div>
					<div className="flex items-start gap-4">
						<div className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-sm">
							2
						</div>
						<p className="text-foreground font-medium pt-1">
							Suivez la progression avec des analyses détaillées
							et individualisées à chaque apprenant.
						</p>
					</div>
					<div className="flex items-start gap-4">
						<div className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-sm">
							3
						</div>
						<p className="text-foreground font-medium pt-1">
							Formez à distance ou en présentiel, en groupe, sans
							immobiliser vos installations ou mobiliser vos
							ressources.
						</p>
					</div>
				</div>

				{/* Image Column */}
				<div className="flex items-center justify-center">
					<div className="relative w-full max-w-lg">
						<div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-wisetwin-blue/20 rounded-2xl blur-3xl transform scale-110" />
						<div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-border/50">
							<Image
								src="/image/loto.webp"
								alt="WiseTrainer Platform Demo"
								width={600}
								height={400}
								className="w-full h-auto object-contain"
							/>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}
