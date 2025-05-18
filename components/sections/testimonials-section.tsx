// components/sections/testimonials-section.tsx
import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";

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
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	return (
		<Section
			id="testimonials"
			className="py-20 bg-gradient-to-b from-background to-muted/30"
		>
			<div className="container px-4 mx-auto">
				{/* Section header */}
				<motion.div
					className="text-center max-w-3xl mx-auto mb-16"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Ce que nos clients{" "}
						<span className="text-secondary">disent de nous</span>
					</h2>
					<p className="text-lg text-muted-foreground">
						Découvrez comment nos solutions de formation
						transforment les entreprises industrielles.
					</p>
				</motion.div>

				{/* Testimonials grid */}
				<motion.div
					className="grid md:grid-cols-3 gap-8"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
				>
					{testimonials.map((testimonial, index) => (
						<motion.div key={index} variants={itemVariants}>
							<Card className="h-full">
								<CardContent className="pt-6">
									<div className="mb-4 text-secondary">
										<Quote className="size-8" />
									</div>
									<p className="mb-6 text-muted-foreground italic">
										"{testimonial.quote}"
									</p>
									<div className="flex items-center gap-3">
										<div className="size-12 rounded-full overflow-hidden bg-muted flex items-center justify-center">
											{testimonial.avatar ? (
												<Image
													src={testimonial.avatar}
													alt={testimonial.author}
													width={48}
													height={48}
												/>
											) : (
												<span className="text-muted-foreground text-xs">
													Photo
												</span>
											)}
										</div>
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
						</motion.div>
					))}
				</motion.div>
			</div>
		</Section>
	);
}
