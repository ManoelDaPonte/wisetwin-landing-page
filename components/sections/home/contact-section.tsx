"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { toast } from "sonner";
import {
	Send,
	AlertTriangle,
	BadgeEuro,
	Handshake,
	UserRound,
	CalendarCheck,
	Check,
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
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const poles = ["gauthier", "manoel", "mickael"] as const;
type PoleKey = (typeof poles)[number] | "any";

// Créneaux "à la Calendly" faits main : 2 jours et 2 horaires (10h-12h)
// qui tournent chaque semaine pour refléter nos disponibilités réelles.
const DAY_PAIRS = [
	[2, 4], // mardi / jeudi
	[1, 3], // lundi / mercredi
	[3, 5], // mercredi / vendredi
	[2, 5], // mardi / vendredi
] as const;
const TIME_PAIRS = [
	["10:00", "11:30"],
	["10:30", "11:00"],
	["10:00", "11:00"],
	["10:30", "11:30"],
] as const;

function getWeekNumber(d: Date): number {
	const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	const dayNum = date.getUTCDay() || 7;
	date.setUTCDate(date.getUTCDate() + 4 - dayNum);
	const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
	return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

// Prochaine occurrence d'un jour de semaine (1 = lundi … 5 = vendredi),
// à au moins 2 jours d'ici pour laisser le créneau réellement réservable.
function nextDate(weekday: number, minDaysAhead = 2): Date {
	const d = new Date();
	d.setHours(12, 0, 0, 0);
	d.setDate(d.getDate() + minDaysAhead);
	while (((d.getDay() + 6) % 7) + 1 !== weekday) {
		d.setDate(d.getDate() + 1);
	}
	return d;
}

type DaySlot = { date: Date; label: string; dayNum: string; dayName: string };

export function ContactSection() {
	const t = useTranslations("contact");
	const locale = useLocale();
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
	const [cooldown, setCooldown] = useState(false);
	const [error, setError] = useState("");

	const [selectedPole, setSelectedPole] = useState<PoleKey>("any");
	const [days, setDays] = useState<DaySlot[]>([]);
	const [times, setTimes] = useState<string[]>([]);
	const [selectedSlot, setSelectedSlot] = useState<{
		dayIndex: number;
		time: string;
	} | null>(null);

	// Calcul des créneaux côté client uniquement (évite tout écart d'hydratation)
	useEffect(() => {
		const now = new Date();
		const week = getWeekNumber(now);
		const dayPair = DAY_PAIRS[week % DAY_PAIRS.length];
		const timePair = TIME_PAIRS[(week + now.getFullYear()) % TIME_PAIRS.length];

		const dates = dayPair
			.map((weekday) => nextDate(weekday))
			.sort((a, b) => a.getTime() - b.getTime());

		const fmtLong = new Intl.DateTimeFormat(locale, {
			weekday: "long",
			day: "numeric",
			month: "long",
		});
		const fmtDay = new Intl.DateTimeFormat(locale, { weekday: "short" });

		setDays(
			dates.map((date) => ({
				date,
				label: fmtLong.format(date),
				dayNum: String(date.getDate()),
				dayName: fmtDay.format(date).replace(".", ""),
			}))
		);
		setTimes([...timePair]);
	}, [locale]);

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

	const formatTime = (time: string) =>
		locale === "fr" ? time.replace(":", "h") : time;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormState((prev) => ({ ...prev, [name]: value }));
		if (error) setError("");
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (cooldown) return;
		setIsSubmitting(true);
		setError("");

		try {
			if (!formState.firstName || !formState.lastName || !formState.email || !formState.message) {
				throw new Error(t("errors.required"));
			}

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(formState.email)) {
				throw new Error(t("errors.invalidEmail"));
			}

			// Interlocuteur et créneau choisis, transmis en tête du message
			const meta: string[] = [];
			if (selectedPole !== "any") {
				meta.push(
					`${t("email.poleLine")}: ${t(`interlocutor.poles.${selectedPole}.name`)} (${t(`interlocutor.poles.${selectedPole}.pole`)})`
				);
			}
			if (selectedSlot && days[selectedSlot.dayIndex]) {
				meta.push(
					`${t("email.slotLine")}: ${days[selectedSlot.dayIndex].label}, ${formatTime(selectedSlot.time)}`
				);
			}
			const message = meta.length
				? `${meta.join("\n")}\n\n${formState.message}`
				: formState.message;

			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...formState, message }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || t("errors.generic"));
			}

			setIsSubmitting(false);
			setCooldown(true);
			setFormState({
				firstName: "",
				lastName: "",
				email: "",
				subject: "",
				company: "",
				message: "",
				csrfToken: formState.csrfToken,
			});
			setSelectedSlot(null);
			setSelectedPole("any");

			toast.success(t("success.title"));

			// Cooldown 60s anti-spam
			setTimeout(() => {
				setCooldown(false);
			}, 60000);
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
				eyebrow: t("eyebrow"),
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div className="max-w-6xl mx-auto">
				<div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12">
					{(
						[
							{ key: "quote", icon: BadgeEuro },
							{ key: "commitment", icon: Handshake },
							{ key: "dedicated", icon: UserRound },
						] as const
					).map(({ key, icon: Icon }) => (
						<div key={key} className="flex items-center gap-2">
							<div className="size-8 bg-secondary/10 rounded-lg flex items-center justify-center">
								<Icon className="size-4 text-secondary" />
							</div>
							<span className="text-sm font-medium">{t(`trust.${key}`)}</span>
						</div>
					))}
				</div>

				<div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
					{/* Colonne gauche : interlocuteur + créneau */}
					<div className="lg:col-span-2 space-y-6">
						{/* Étape 1 : l'interlocuteur */}
						<Reveal>
							<div className="bg-card border border-border rounded-2xl p-6">
								<p className="text-xs font-mono uppercase tracking-[0.15em] text-secondary mb-1">
									{t("interlocutor.step")}
								</p>
								<h3 className="font-semibold text-lg mb-4">
									{t("interlocutor.title")}
								</h3>
								<div className="space-y-2">
									{poles.map((pole) => {
										const active = selectedPole === pole;
										return (
											<button
												key={pole}
												type="button"
												onClick={() =>
													setSelectedPole(active ? "any" : pole)
												}
												className={cn(
													"w-full flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all",
													active
														? "border-secondary bg-secondary/10"
														: "border-border hover:border-secondary/40 hover:bg-secondary/5"
												)}
											>
												<span
													className={cn(
														"size-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
														active
															? "border-secondary bg-secondary"
															: "border-muted-foreground/40"
													)}
												>
													{active && (
														<Check className="size-3 text-secondary-foreground" />
													)}
												</span>
												<span className="flex-1 min-w-0">
													<span className="flex items-baseline gap-2">
														<span className="font-semibold text-sm">
															{t(`interlocutor.poles.${pole}.name`)}
														</span>
														<span className="text-xs text-secondary font-medium">
															{t(`interlocutor.poles.${pole}.pole`)}
														</span>
													</span>
													<span className="block text-xs text-muted-foreground mt-0.5 truncate">
														{t(`interlocutor.poles.${pole}.domains`)}
													</span>
												</span>
											</button>
										);
									})}
								</div>
								<p className="text-xs text-muted-foreground mt-3">
									{t("interlocutor.anyHint")}
								</p>
							</div>
						</Reveal>

						{/* Étape 2 : le créneau */}
						<Reveal delay={0.1}>
							<div className="bg-card border border-border rounded-2xl p-6">
								<p className="text-xs font-mono uppercase tracking-[0.15em] text-secondary mb-1">
									{t("slots.step")}
								</p>
								<h3 className="font-semibold text-lg mb-1">
									{t("slots.title")}
								</h3>
								<p className="text-xs text-muted-foreground mb-4">
									{t("slots.hint")}
								</p>

								{days.length === 0 ? (
									<div className="grid grid-cols-2 gap-3">
										{[0, 1].map((i) => (
											<div
												key={i}
												className="h-32 rounded-xl bg-muted animate-pulse"
											/>
										))}
									</div>
								) : (
									<div className="grid grid-cols-2 gap-3">
										{days.map((day, dayIndex) => (
											<div
												key={dayIndex}
												className="rounded-xl border border-border overflow-hidden"
											>
												{/* Tuile calendrier */}
												<div className="bg-muted/60 border-b border-border px-3 py-2 text-center">
													<p className="text-[10px] font-mono uppercase tracking-wider text-secondary">
														{day.dayName}
													</p>
													<p className="text-2xl font-bold tabular-nums leading-tight">
														{day.dayNum}
													</p>
												</div>
												<div className="p-2 space-y-1.5">
													{times.map((time) => {
														const active =
															selectedSlot?.dayIndex === dayIndex &&
															selectedSlot?.time === time;
														return (
															<button
																key={time}
																type="button"
																onClick={() =>
																	setSelectedSlot(
																		active
																			? null
																			: { dayIndex, time }
																	)
																}
																className={cn(
																	"w-full rounded-lg border px-2 py-1.5 text-sm font-medium tabular-nums transition-all",
																	active
																		? "border-secondary bg-secondary text-secondary-foreground"
																		: "border-border hover:border-secondary/50 hover:bg-secondary/5"
																)}
															>
																{formatTime(time)}
															</button>
														);
													})}
												</div>
											</div>
										))}
									</div>
								)}

								{selectedSlot && days[selectedSlot.dayIndex] && (
									<p className="flex items-center gap-2 text-xs text-secondary font-medium mt-4">
										<CalendarCheck className="size-4 shrink-0" />
										{days[selectedSlot.dayIndex].label},{" "}
										{formatTime(selectedSlot.time)}
										<span className="text-muted-foreground font-normal">
											· {t("slots.confirmNote")}
										</span>
									</p>
								)}
							</div>
						</Reveal>
					</div>

					{/* Colonne droite : le formulaire */}
					<Reveal delay={0.15} className="lg:col-span-3">
						<Card className="shadow-sm border">
							<CardHeader>
								<p className="text-xs font-mono uppercase tracking-[0.15em] text-secondary">
									{t("formStep")}
								</p>
								<CardTitle>{t("cardTitle")}</CardTitle>
								<CardDescription>
									{t("cardDescription")}
								</CardDescription>
							</CardHeader>
							<CardContent>
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
													{t("form.firstName")} <span className="text-secondary">{t("form.required")}</span>
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
													{t("form.lastName")} <span className="text-secondary">{t("form.required")}</span>
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
													{t("form.email")} <span className="text-secondary">{t("form.required")}</span>
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
												{t("form.message")} <span className="text-secondary">{t("form.required")}</span>
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
											<Button type="submit" disabled={isSubmitting || cooldown} className="w-full sm:w-auto" size="lg">
												{isSubmitting ? (
													<>
														<div className="h-5 w-5 border-t-2 border-r-2 border-current rounded-full animate-spin mr-2"></div>
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
							</CardContent>
						</Card>
					</Reveal>
				</div>
			</div>
		</Section>
	);
}
