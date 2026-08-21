"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { PenLine } from "lucide-react";

const steps = ["listen", "proposal", "build", "deploy"] as const;

// Décalages verticaux façon événements posés sur un agenda
const offsets = ["lg:mt-2", "lg:mt-10", "lg:mt-4", "lg:mt-14"] as const;

// La signature du devis se place entre le jour 2 et les itérations
const SIGNATURE_BEFORE = 2;

function SignatureLabel({ label }: { label: string }) {
	return (
		<span className="inline-flex items-center gap-1.5 bg-red-500 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap shadow-md shadow-red-500/30">
			<PenLine className="size-3" />
			{label}
		</span>
	);
}

export function MethodSection() {
	const t = useTranslations("method");

	return (
		<Section
			id="methode"
			variant="default"
			header={{
				eyebrow: t("eyebrow"),
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<Reveal>
				<div className="rounded-3xl border border-border bg-card overflow-hidden">
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
							<div key={step} className="relative">
								{/* Ligne rouge : signature du devis (desktop, sur la frontière de colonne) */}
								{i === SIGNATURE_BEFORE && (
									<>
										<div
											aria-hidden
											className="hidden lg:block absolute -left-px top-0 bottom-0 w-0.5 bg-red-500 z-10"
										>
											<span className="absolute -bottom-1.5 -left-[5px] size-3 rounded-full bg-red-500" />
										</div>
										{/* Version mobile : séparateur horizontal rouge */}
										<div className="lg:hidden relative flex items-center gap-3 px-5 pt-5 z-10">
											<span className="size-3 rounded-full bg-red-500 shrink-0" />
											<div className="h-0.5 flex-1 bg-red-500" />
											<SignatureLabel label={t("signature")} />
										</div>
									</>
								)}

								<div className="p-5 lg:p-6 lg:pb-16">
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
							</div>
						))}
					</div>

					{/* Étiquette de signature, sous le tableau, alignée sur la ligne rouge */}
					<div className="hidden lg:block relative border-t border-border bg-muted/40 py-3">
						<div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
							<SignatureLabel label={t("signature")} />
						</div>
					</div>
				</div>
			</Reveal>
		</Section>
	);
}
