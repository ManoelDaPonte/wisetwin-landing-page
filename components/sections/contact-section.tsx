// components/sections/contact-section.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
	Send,
	AlertTriangle,
	GraduationCap,
	Video,
	PenLine,
	Users,
	Info,
	ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Section } from "@/components/common/section";

export function ContactSection() {
	const [formState, setFormState] = useState({
		name: "",
		email: "",
		subject: "",
		company: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormState((prev) => ({ ...prev, [name]: value }));
		// Réinitialiser les messages d'erreur lorsque l'utilisateur commence à taper
		if (error) setError("");
	};

	const handleSelectChange = (value: any) => {
		setFormState((prev) => ({ ...prev, subject: value }));
		if (error) setError("");
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(""); // Réinitialiser les erreurs précédentes

		try {
			// Simulation d'envoi de formulaire (à remplacer par votre API réelle)
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Message envoyé avec succès
			setIsSubmitting(false);
			setSubmitted(true);
			setFormState({
				name: "",
				email: "",
				subject: "",
				company: "",
				message: "",
			});

			// Reset du message de succès après 5 secondes
			setTimeout(() => {
				setSubmitted(false);
			}, 5000);
		} catch (error) {
			console.error("Erreur lors de l'envoi du message:", error);
			setIsSubmitting(false);
			setError(
				(error instanceof Error && error.message) ||
					"Une erreur est survenue lors de l'envoi du message"
			);
		}
	};

	// Options de sujet pour le formulaire
	const subjectOptions = [
		{
			value: "wisetrainer",
			label: "WiseTrainer",
			icon: <GraduationCap className="size-4 text-secondary" />,
		},
		{
			value: "wisetour",
			label: "WiseTour",
			icon: <Video className="size-4 text-secondary" />,
		},
		{
			value: "demo",
			label: "Demande de démonstration",
			icon: <PenLine className="size-4 text-secondary" />,
		},
		{
			value: "join",
			label: "Nous rejoindre",
			icon: <Users className="size-4 text-secondary" />,
		},
		{
			value: "info",
			label: "Informations générales",
			icon: <Info className="size-4 text-secondary" />,
		},
		{
			value: "other",
			label: "Autre sujet",
			icon: <ArrowRight className="size-4 text-secondary" />,
		},
	];

	return (
		<Section
			id="contact"
			variant="muted"
			header={{
				title: "Contactez-nous",
				description:
					"Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions.",
				centered: true,
			}}
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7 }}
				>
					<Card className="shadow-sm border">
						<CardHeader>
							<CardTitle>Envoyez-nous un message</CardTitle>
							<CardDescription>
								Complétez le formulaire ci-dessous et nous vous
								répondrons dans les plus brefs délais.
							</CardDescription>
						</CardHeader>
						<CardContent>
							{submitted ? (
								<motion.div
									className="bg-secondary/10 border border-secondary text-secondary p-6 rounded-lg text-center"
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.3 }}
								>
									<h3 className="text-xl font-semibold mb-2">
										Message envoyé avec succès !
									</h3>
									<p>
										Merci pour votre message. Notre équipe
										vous répondra dans les plus brefs
										délais.
									</p>
								</motion.div>
							) : (
								<form onSubmit={handleSubmit}>
									{error && (
										<motion.div
											className="flex items-start gap-2 mb-6 p-4 bg-destructive/10 border border-destructive text-destructive rounded-md"
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
										>
											<AlertTriangle
												size={20}
												className="flex-shrink-0 mt-0.5"
											/>
											<div>
												<p className="font-medium">
													Erreur
												</p>
												<p>{error}</p>
											</div>
										</motion.div>
									)}

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
										<div className="space-y-2">
											<label
												htmlFor="name"
												className="block text-sm font-medium"
											>
												Nom complet
											</label>
											<Input
												id="name"
												name="name"
												value={formState.name}
												onChange={handleChange}
												required
												placeholder="Votre nom"
											/>
										</div>

										<div className="space-y-2">
											<label
												htmlFor="email"
												className="block text-sm font-medium"
											>
												Email professionnel
											</label>
											<Input
												type="email"
												id="email"
												name="email"
												value={formState.email}
												onChange={handleChange}
												required
												placeholder="Votre email"
											/>
										</div>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
										<div className="space-y-2">
											<label
												htmlFor="company"
												className="block text-sm font-medium"
											>
												Entreprise
											</label>
											<Input
												id="company"
												name="company"
												value={formState.company}
												onChange={handleChange}
												placeholder="Nom de votre entreprise"
											/>
										</div>

										<div className="space-y-2">
											<label
												htmlFor="subject"
												className="block text-sm font-medium"
											>
												Sujet
											</label>
											<Select
												value={formState.subject}
												onValueChange={
													handleSelectChange
												}
											>
												<SelectTrigger>
													<SelectValue placeholder="Sélectionnez un sujet" />
												</SelectTrigger>
												<SelectContent>
													{subjectOptions.map(
														(option) => (
															<SelectItem
																key={
																	option.value
																}
																value={
																	option.value
																}
															>
																<div className="flex items-center gap-2">
																	{
																		option.icon
																	}
																	<span>
																		{
																			option.label
																		}
																	</span>
																</div>
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
										</div>
									</div>

									<div className="mb-6 space-y-2">
										<label
											htmlFor="message"
											className="block text-sm font-medium"
										>
											Message
										</label>
										<Textarea
											id="message"
											name="message"
											value={formState.message}
											onChange={handleChange}
											required
											rows={6}
											placeholder="Décrivez votre projet ou votre demande..."
										/>
									</div>

									<motion.div
										whileHover={{ scale: 1.01 }}
										whileTap={{ scale: 0.98 }}
										className="flex justify-end"
									>
										<Button
											type="submit"
											disabled={isSubmitting}
											className="w-full sm:w-auto"
											size="lg"
										>
											{isSubmitting ? (
												<>
													<div className="h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
													<span>
														Envoi en cours...
													</span>
												</>
											) : (
												<>
													<Send
														size={18}
														className="mr-2"
													/>
													<span>
														Envoyer le message
													</span>
												</>
											)}
										</Button>
									</motion.div>
								</form>
							)}
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</Section>
	);
}
