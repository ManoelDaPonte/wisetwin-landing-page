import { GraduationCap, Video, Bot, ChartBar } from "lucide-react";

import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";

export function SolutionsSection() {
	// Animation variants

	return (
		<Section
			id="nos-solutions"
			variant="muted"
			header={{
				title: "Nos autres Solutions",
				description:
					"WiseTwin propose des solutions complémentaires pour compléter votre écosystème de formation et de valorisation industrielle.",
				centered: true,
			}}
		>
			<div className="grid md:grid-cols-3 gap-8">
				{/* WiseTour */}
				<div>
					<Card className="hover:shadow-md transition-all duration-200 h-full">
						<CardContent className="p-6">
							<div className="size-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
								<Video className="size-6 text-secondary" />
							</div>
							<h3 className="text-xl font-semibold mb-2">
								WiseTour
							</h3>
							<p className="text-muted-foreground">
								Visites industrielles virtuelles en
								3D pour présenter vos installations
								et valoriser votre savoir-faire.
							</p>
						</CardContent>
					</Card>
				</div>

				{/* WiseScan */}
				<div>
					<Card className="hover:shadow-md transition-all duration-200 h-full">
						<CardContent className="p-6">
							<div className="size-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
								<ChartBar className="size-6 text-secondary" />
							</div>
							<h3 className="text-xl font-semibold mb-2">
								WiseScan
							</h3>
							<p className="text-muted-foreground">
								Analyse intelligente des accidents
								pour des recommandations sur-mesure.
							</p>
						</CardContent>
					</Card>
				</div>

				{/* WiseAssist */}
				<div>
					<Card className="hover:shadow-md transition-all duration-200 h-full">
						<CardContent className="p-6">
							<div className="size-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
								<Bot className="size-6 text-secondary" />
							</div>
							<h3 className="text-xl font-semibold mb-2">
								WiseAssist
							</h3>
							<p className="text-muted-foreground">
								Assistant IA pour guider vos équipes
								et répondre à leurs questions en
								temps réel.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</Section>
	);
}
