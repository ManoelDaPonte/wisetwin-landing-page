import { Quote } from "lucide-react";

import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function TestimonialsSection() {
	// Sample testimonials - replace with real data
	const testimonials = [
		{
			quote: "WiseTwin a transformé notre façon de former les techniciens. Les résultats sont impressionnants : temps de formation réduit de 40% et satisfaction à 95%.",
			author: "Sophie Martin",
			role: "Responsable Formation, Industrie Automobile",
			avatar: "/placeholder.png",
		},
		{
			quote: "La qualité des simulations 3D est remarquable. Nos équipes peuvent maintenant s'entraîner sur des scénarios critiques sans aucun risque.",
			author: "Thomas Dubois",
			role: "Directeur Sécurité, Production Énergétique",
			avatar: "/placeholder.png",
		},
		{
			quote: "Le suivi analytique nous permet d'identifier précisément les besoins de nos collaborateurs et d'adapter leur parcours de formation.",
			author: "Marie Leroy",
			role: "DRH, Agroalimentaire",
			avatar: "/placeholder.png",
		},
	];

	// Animation variants


	return (
		<Section 
			id="testimonials" 
			variant="muted" 
			className="py-20"
			header={{
				title: "Ce que nos clients disent de nous",
				description: "Découvrez comment nos solutions de formation transforment les entreprises industrielles.",
				centered: true,
				highlight: true
			}}
		>
			<div className="grid md:grid-cols-3 gap-12">
				{testimonials.map((testimonial, index) => (
						<Card className="h-full hover:shadow-md transition-all duration-200">
							<CardContent className="pt-6">
								<div className="mb-4 text-secondary">
									<Quote className="size-8" />
								</div>
								<p className="mb-6 text-muted-foreground italic">
									"{testimonial.quote}"
								</p>
								<div className="flex items-center gap-3">
									<Avatar className="size-12">
										{testimonial.avatar ? (
											<AvatarImage
												src={testimonial.avatar}
												alt={testimonial.author}
											/>
										) : null}
										<AvatarFallback className="bg-secondary/20 text-secondary">
											{testimonial.author
												.split(" ")
												.map((name) => name[0])
												.join("")}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="font-medium">
											{testimonial.author}
										</p>
										<p className="text-sm text-muted-foreground">
											{testimonial.role}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
				))}
			</div>
		</Section>
	);
}