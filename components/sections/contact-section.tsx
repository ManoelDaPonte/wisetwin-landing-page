"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
	Send,
	AlertTriangle,
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
import { Section } from "@/components/common/section";

export function ContactSection() {
	const t = useTranslations("contact");
	const [formState, setFormState] = useState({
		firstName: "",
		lastName: "",
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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(""); // Réinitialiser les erreurs précédentes

		try {
			if (!formState.firstName || !formState.lastName || !formState.email || !formState.message) {
				throw new Error(t("errors.required"));
			}

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(formState.email)) {
				throw new Error(t("errors.invalidEmail"));
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
				throw new Error(data.error || t("errors.generic"));
			}

			setIsSubmitting(false);
			setSubmitted(true);
			setFormState({
				firstName: "",
				lastName: "",
				email: "",
				subject: "",
				company: "",
				message: "",
				csrfToken: formState.csrfToken,
			});

			toast.success(t("success.title"), {
				description: `${t("success.emailSent")} ${formState.email}.`,
				duration: 8000,
				icon: <CheckCircle className="size-4" />,
			});

			setTimeout(() => {
				setSubmitted(false);
			}, 8000);
		} catch (error) {
			console.error("Error sending message:", error);
			setIsSubmitting(false);
			setError(
				(error instanceof Error && error.message) || t("errors.generic")
			);

			toast.error(t("errors.title"), {
				description:
					(error instanceof Error && error.message) || t("errors.generic"),
				duration: 5000,
				icon: <AlertTriangle className="size-4" />,
			});
		}
	};

	return (
		<Section
			id="contact"
			variant="muted"
			header={{
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div className="max-w-3xl mx-auto">
				<Card className="shadow-sm border">
						<CardHeader>
							<CardTitle>{t("cardTitle")}</CardTitle>
							<CardDescription>
								{t("cardDescription")}
							</CardDescription>
						</CardHeader>
						<CardContent>
							{submitted ? (
								<div
									className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 p-6 rounded-lg text-center"
								>
									<div className="flex justify-center mb-4">
										<CheckCircle className="size-12 text-green-500" />
									</div>
									<h3 className="text-xl font-semibold mb-2">
										{t("success.title")}
									</h3>
									<p>{t("success.description")}</p>
									<p className="text-sm mt-4">
										{t("success.emailSent")} {formState.email}
									</p>
								</div>
							) : (
								<form onSubmit={handleSubmit}>
									{error && (
										<div className="flex items-start gap-2 mb-6 p-4 bg-destructive/10 border border-destructive text-destructive rounded-md">
											<AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
											<div>
												<p className="font-medium">{t("errors.title")}</p>
												<p>{error}</p>
											</div>
										</div>
									)}

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
										<div className="space-y-2">
											<label htmlFor="firstName" className="block text-sm font-medium">
												{t("form.firstName")} <span className="text-destructive">{t("form.required")}</span>
											</label>
											<Input
												id="firstName"
												name="firstName"
												value={formState.firstName}
												onChange={handleChange}
												required
												placeholder={t("form.firstNamePlaceholder")}
											/>
										</div>

										<div className="space-y-2">
											<label htmlFor="lastName" className="block text-sm font-medium">
												{t("form.lastName")} <span className="text-destructive">{t("form.required")}</span>
											</label>
											<Input
												id="lastName"
												name="lastName"
												value={formState.lastName}
												onChange={handleChange}
												required
												placeholder={t("form.lastNamePlaceholder")}
											/>
										</div>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
										<div className="space-y-2">
											<label htmlFor="email" className="block text-sm font-medium">
												{t("form.email")} <span className="text-destructive">{t("form.required")}</span>
											</label>
											<Input
												type="email"
												id="email"
												name="email"
												value={formState.email}
												onChange={handleChange}
												required
												placeholder={t("form.emailPlaceholder")}
											/>
										</div>

										<div className="space-y-2">
											<label htmlFor="company" className="block text-sm font-medium">
												{t("form.company")}
											</label>
											<Input
												id="company"
												name="company"
												value={formState.company}
												onChange={handleChange}
												placeholder={t("form.companyPlaceholder")}
											/>
										</div>
									</div>

									<div className="mb-6 space-y-2">
										<label htmlFor="subject" className="block text-sm font-medium">
											{t("form.subject")}
										</label>
										<Input
											id="subject"
											name="subject"
											value={formState.subject}
											onChange={handleChange}
											placeholder={t("form.subjectPlaceholder")}
										/>
									</div>

									<div className="mb-6 space-y-2">
										<label htmlFor="message" className="block text-sm font-medium">
											{t("form.message")} <span className="text-destructive">{t("form.required")}</span>
										</label>
										<Textarea
											id="message"
											name="message"
											value={formState.message}
											onChange={handleChange}
											required
											rows={6}
											placeholder={t("form.messagePlaceholder")}
										/>
									</div>

									<div className="flex justify-end">
										<Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto" size="lg">
											{isSubmitting ? (
												<>
													<div className="h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
													<span>{t("form.sending")}</span>
												</>
											) : (
												<>
													<Send size={18} className="mr-2" />
													<span>{t("form.send")}</span>
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
