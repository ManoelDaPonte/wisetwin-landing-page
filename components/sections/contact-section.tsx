// components/sections/contact-section.tsx
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
	Send,
	AlertTriangle,
	GraduationCap,
	Video,
	PenLine,
	Users,
	Info,
	ArrowRight,
	CheckCircle,
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
		csrfToken: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");

	// Obtenir un token CSRF au chargement du composant
	useEffect(() => {
		const fetchCsrfToken = async () => {
			try {
				const response = await fetch("/api/csrf");
				const data = await response.json();
				if (data.csrfToken) {
					setFormState((prev) => ({
						...prev,
						csrfToken: data.csrfToken,
					}));
				}
			} catch (error) {
				console.error(
					"Erreur lors de la récupération du token CSRF:",
					error
				);
			}
		};

		fetchCsrfToken();
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormState((prev) => ({ ...prev, [name]: value }));
		// Réinitialiser les messages d'erreur lorsque l'utilisateur commence à taper
		if (error) setError("");
	};

	const handleSelectChange = (value: string) => {
		setFormState((prev) => ({ ...prev, subject: value }));
		if (error) setError("");
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(""); // Réinitialiser les erreurs précédentes

		try {
			// Validation côté client
			if (!formState.name || !formState.email || !formState.message) {
				throw new Error(
					"Veuillez remplir tous les champs obligatoires"
				);
			}

			// Email validation
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(formState.email)) {
				throw new Error("Veuillez entrer une adresse e-mail valide");
			}

			// Appel à l'API de contact
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formState),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.error ||
						"Une erreur est survenue lors de l'envoi du message"
				);
			}

			// Message envoyé avec succès
			setIsSubmitting(false);
			setSubmitted(true);
			setFormState({
				name: "",
				email: "",
				subject: "",
				company: "",
				message: "",
				csrfToken: formState.csrfToken, // Conserver le token CSRF
			});

			// Afficher un toast de succès avec Sonner
			toast.success("Message envoyé avec succès !", {
				description: `Un email de confirmation a été envoyé à ${formState.email}.`,
				duration: 8000,
				icon: <CheckCircle className="size-4" />,
			});

			// Reset du message de succès après 8 secondes
			setTimeout(() => {
				setSubmitted(false);
			}, 8000);
		} catch (error) {
			console.error("Erreur lors de l'envoi du message:", error);
			setIsSubmitting(false);
			setError(
				(error instanceof Error && error.message) ||
					"Une erreur est survenue lors de l'envoi du message"
			);

			// Afficher un toast d'erreur avec Sonner
			toast.error("Erreur", {
				description:
					(error instanceof Error && error.message) ||
					"Une erreur est survenue lors de l'envoi du message",
				duration: 5000,
				icon: <AlertTriangle className="size-4" />,
			});
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
			<div className="max-w-3xl mx-auto">
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
								<div
									className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg text-center"
								>
									<div className="flex justify-center mb-4">
										<CheckCircle className="size-12 text-green-500" />
									</div>
									<h3 className="text-xl font-semibold mb-2">
										Message envoyé avec succès !
									</h3>
									<p>
										Merci pour votre message. Notre équipe
										vous répondra dans les plus brefs
										délais.
									</p>
									<p className="text-sm mt-4">
										Un email de confirmation a été envoyé à
										l'adresse {formState.email}
									</p>
								</div>
							) : (
								<form onSubmit={handleSubmit}>
									{error && (
										<div
											className="flex items-start gap-2 mb-6 p-4 bg-destructive/10 border border-destructive text-destructive rounded-md"
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
										</div>
									)}

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
										<div className="space-y-2">
											<label
												htmlFor="name"
												className="block text-sm font-medium"
											>
												Nom complet{" "}
												<span className="text-destructive">
													*
												</span>
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
												Email professionnel{" "}
												<span className="text-destructive">
													*
												</span>
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
											Message{" "}
											<span className="text-destructive">
												*
											</span>
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

									<div
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
									</div>
								</form>
							)}
						</CardContent>
				</Card>
			</div>
		</Section>
	);
}
