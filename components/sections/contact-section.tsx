// components/sections/contact-section.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Section } from "@/components/common/section";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export function ContactSection() {
	return (
		<Section
			id="contact"
			variant="muted"
			header={{
				title: "Contactez-nous",
				description:
					"Discutez avec nos experts de vos besoins en formation et obtenez une démonstration personnalisée de notre solution.",
				centered: true,
			}}
		>
			<div className="max-w-md mx-auto">
				<motion.div
					className="bg-card rounded-lg overflow-hidden shadow-sm border"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<div className="bg-wisetwin-darkblue text-white p-4">
						<h3 className="font-semibold text-lg">
							Demande de démonstration
						</h3>
						<p className="text-sm opacity-80">
							Remplissez le formulaire ci-dessous pour être
							contacté par un expert
						</p>
					</div>
					<div className="p-6 space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="text-sm font-medium">
									Prénom
								</label>
								<input
									type="text"
									className="w-full px-3 py-2 bg-background rounded-md border outline-none focus-visible:ring-2 focus-visible:ring-wisetwin-blue"
								/>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">
									Nom
								</label>
								<input
									type="text"
									className="w-full px-3 py-2 bg-background rounded-md border outline-none focus-visible:ring-2 focus-visible:ring-wisetwin-blue"
								/>
							</div>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">
								Email professionnel
							</label>
							<input
								type="email"
								className="w-full px-3 py-2 bg-background rounded-md border outline-none focus-visible:ring-2 focus-visible:ring-wisetwin-blue"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">
								Entreprise
							</label>
							<input
								type="text"
								className="w-full px-3 py-2 bg-background rounded-md border outline-none focus-visible:ring-2 focus-visible:ring-wisetwin-blue"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">
								Message
							</label>
							<Textarea
								rows={4}
								className="resize-none focus-visible:ring-wisetwin-blue"
								placeholder="Décrivez brièvement vos besoins en formation..."
							/>
						</div>
						<Button className="w-full bg-wisetwin-darkblue hover:bg-wisetwin-darkblue-light">
							<Send className="w-4 h-4 mr-2" />
							Envoyer la demande
						</Button>
					</div>
				</motion.div>

				<div className="mt-8 text-center">
					<p className="text-sm text-muted-foreground">
						Vous préférez nous appeler ? Notre équipe est disponible
						au{" "}
						<span className="text-wisetwin-darkblue font-medium">
							01 23 45 67 89
						</span>
					</p>
				</div>
			</div>
		</Section>
	);
}
