"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const steps = ["listen", "proposal", "build", "deploy"] as const;

// Décalages verticaux façon événements posés sur un agenda
const offsets = ["lg:mt-2", "lg:mt-10", "lg:mt-4", "lg:mt-14"] as const;

export function MethodSection() {
	const t = useTranslations("method");

	return (
		<Section
			id="methode"
			variant="muted"
			header={{
				eyebrow: t("eyebrow"),
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<Reveal>
				<div className="max-w-6xl mx-auto rounded-3xl border border-border bg-card overflow-hidden">
					{/* Barre de titre façon agenda */}
					<div className="flex items-center gap-2 px-6 py-3.5 border-b border-border bg-muted/50">
						<div className="flex gap-1.5">
							<span className="size-2.5 rounded-full bg-border" />
							<span className="size-2.5 rounded-full bg-border" />
							<span className="size-2.5 rounded-full bg-secondary/60" />
						</div>
						<span className="flex-1 text-center text-xs text-muted-foreground font-mono">
							{t("calendarTitle")}
						</span>
					</div>

					{/* Vue semaine */}
					<div
						className="relative grid lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-border"
						style={{
							backgroundImage:
								"repeating-linear-gradient(to bottom, transparent 0, transparent 47px, color-mix(in oklab, var(--color-border) 45%, transparent) 47px, color-mix(in oklab, var(--color-border) 45%, transparent) 48px)",
						}}
					>
						{steps.map((step, i) => (
							<div key={step} className="p-5 lg:p-6 lg:pb-16">
								{/* En-tête de colonne : le "jour" */}
								<p className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground pb-3 mb-4 border-b border-border/60">
									{t(`steps.${step}.when`)}
								</p>

								{/* Événement */}
								<Reveal delay={i * 0.12} y={16}>
									<div
										className={cn(
											"rounded-xl bg-secondary/10 border border-secondary/15 border-l-4 border-l-secondary p-4 lg:p-5",
											"hover:bg-secondary/15 transition-colors",
											offsets[i]
										)}
									>
										<h3 className="font-semibold mb-1.5">
											{t(`steps.${step}.title`)}
										</h3>
										<p className="text-sm text-muted-foreground leading-relaxed">
											{t(`steps.${step}.description`)}
										</p>
									</div>
								</Reveal>
							</div>
						))}
					</div>
				</div>
			</Reveal>
		</Section>
	);
}
