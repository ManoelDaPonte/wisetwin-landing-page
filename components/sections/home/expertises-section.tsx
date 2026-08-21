"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import {
	GraduationCap,
	Cuboid,
	BrainCircuit,
	Compass,
	ArrowRight,
	ChevronDown,
} from "lucide-react";

const domains = [
	{ key: "training", icon: GraduationCap },
	{ key: "immersive", icon: Cuboid },
	{ key: "software", icon: BrainCircuit },
	{ key: "consulting", icon: Compass },
] as const;

type DomainKey = (typeof domains)[number]["key"];

// Grille de plan technique en fond de panneau
const blueprintGrid = {
	backgroundImage:
		"linear-gradient(color-mix(in oklab, var(--color-border) 55%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--color-border) 55%, transparent) 1px, transparent 1px)",
	backgroundSize: "44px 44px",
};

export function ExpertisesSection() {
	const t = useTranslations("expertises");
	const [active, setActive] = useState<DomainKey>("training");
	const [mobileOpen, setMobileOpen] = useState<DomainKey | null>("training");

	return (
		<Section
			id="expertises"
			variant="muted"
			header={{
				eyebrow: t("eyebrow"),
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			{/* Desktop : panneaux dépliants, façon travées d'atelier */}
			<Reveal className="hidden lg:block">
				<div className="flex h-[600px] max-w-7xl mx-auto rounded-3xl border border-border overflow-hidden bg-card">
					{domains.map((domain, i) => {
						const isActive = active === domain.key;
						const Icon = domain.icon;
						const items = t.raw(`domains.${domain.key}.items`) as string[];
						return (
							<div
								key={domain.key}
								onMouseEnter={() => setActive(domain.key)}
								onFocus={() => setActive(domain.key)}
								onClick={() => setActive(domain.key)}
								tabIndex={0}
								role="button"
								aria-expanded={isActive}
								className={cn(
									"relative basis-0 min-w-0 overflow-hidden cursor-pointer outline-none",
									"border-r border-border last:border-r-0",
									"transition-[flex-grow,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
									isActive ? "bg-card" : "bg-muted/40 hover:bg-muted/70"
								)}
								style={{ flexGrow: isActive ? 3 : 1 }}
							>
								{/* Fond : grille de plan + numéro géant */}
								<div aria-hidden className="absolute inset-0" style={blueprintGrid} />
								<span
									aria-hidden
									className={cn(
										"absolute -bottom-10 -right-4 font-mono font-bold text-[200px] leading-none select-none transition-colors duration-500",
										isActive ? "text-secondary/10" : "text-foreground/[0.04]"
									)}
								>
									{i + 1}
								</span>
								{/* Liseré d'activation, façon marquage au sol */}
								<span
									aria-hidden
									className={cn(
										"absolute top-0 left-0 right-0 h-1 bg-secondary origin-left transition-transform duration-500",
										isActive ? "scale-x-100" : "scale-x-0"
									)}
								/>

								{/* Code technique, toujours visible */}
								<span className="absolute top-5 left-5 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
									DOM-{String(i + 1).padStart(2, "0")}
								</span>

								{/* État replié : titre vertical */}
								<div
									className={cn(
										"absolute inset-0 flex flex-col items-center justify-between py-16 transition-opacity duration-300",
										isActive ? "opacity-0 pointer-events-none" : "opacity-100 delay-200"
									)}
								>
									<span
										className="text-xl font-bold tracking-tight text-muted-foreground whitespace-nowrap [writing-mode:vertical-rl] rotate-180"
									>
										{t(`domains.${domain.key}.title`)}
									</span>
									<div className="size-11 rounded-xl bg-secondary/10 flex items-center justify-center">
										<Icon className="size-5.5 text-secondary" />
									</div>
								</div>

								{/* État déplié : contenu complet */}
								<AnimatePresence>
									{isActive && (
										<motion.div
											initial={{ opacity: 0, x: 24 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: 12 }}
											transition={{ duration: 0.35, delay: 0.15 }}
											className="absolute inset-y-0 left-0 w-[26rem] xl:w-[30rem] flex flex-col justify-end p-8 xl:p-10"
										>
											{/* Largeur fixe : le panneau masque/révèle le texte sans le faire
											    re-wrapper pendant la transition de largeur */}
											<div>
												<div className="size-12 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center mb-5">
													<Icon className="size-6" />
												</div>
												<h3 className="text-3xl xl:text-4xl font-bold tracking-tight mb-3 whitespace-nowrap">
													{t(`domains.${domain.key}.title`)}
												</h3>
												<p className="text-lg text-muted-foreground leading-snug mb-6 max-w-sm">
													{t(`domains.${domain.key}.hook`)}
												</p>
												<ul className="space-y-2.5">
													{items.map((item, j) => (
														<li
															key={j}
															className="flex items-center gap-3 text-sm font-medium"
														>
															<span className="font-mono text-[10px] text-secondary tabular-nums">
																{String(j + 1).padStart(2, "0")}
															</span>
															<span className="h-px flex-none w-4 bg-secondary/40" />
															{item}
														</li>
													))}
												</ul>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						);
					})}
				</div>
			</Reveal>

			{/* Mobile : accordéon */}
			<div className="lg:hidden max-w-xl mx-auto rounded-2xl border border-border overflow-hidden divide-y divide-border bg-card">
				{domains.map((domain, i) => {
					const isOpen = mobileOpen === domain.key;
					const Icon = domain.icon;
					const items = t.raw(`domains.${domain.key}.items`) as string[];
					return (
						<div key={domain.key} className="relative">
							<button
								type="button"
								onClick={() => setMobileOpen(isOpen ? null : domain.key)}
								aria-expanded={isOpen}
								className="w-full flex items-center gap-4 p-5 text-left"
							>
								<span className="text-[11px] font-mono text-muted-foreground">
									DOM-{String(i + 1).padStart(2, "0")}
								</span>
								<span className="flex-1 font-bold">
									{t(`domains.${domain.key}.title`)}
								</span>
								<ChevronDown
									className={cn(
										"size-4 text-secondary transition-transform",
										isOpen && "rotate-180"
									)}
								/>
							</button>
							<AnimatePresence initial={false}>
								{isOpen && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.3 }}
										className="overflow-hidden"
									>
										<div className="px-5 pb-5" style={blueprintGrid}>
											<div className="flex items-start gap-3 mb-4">
												<div className="size-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
													<Icon className="size-4.5 text-secondary" />
												</div>
												<p className="text-sm text-muted-foreground leading-snug pt-1.5">
													{t(`domains.${domain.key}.hook`)}
												</p>
											</div>
											<ul className="space-y-2">
												{items.map((item, j) => (
													<li key={j} className="flex items-center gap-3 text-sm font-medium">
														<span className="font-mono text-[10px] text-secondary tabular-nums">
															{String(j + 1).padStart(2, "0")}
														</span>
														<span className="h-px flex-none w-4 bg-secondary/40" />
														{item}
													</li>
												))}
											</ul>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					);
				})}
			</div>

			{/* Hors catalogue */}
			<Reveal delay={0.1}>
				<p className="mt-12 text-center text-lg md:text-xl max-w-2xl mx-auto">
					{t("note")}{" "}
					<a
						href="#contact"
						className="inline-flex items-center gap-1.5 font-semibold text-secondary hover:underline underline-offset-4"
					>
						{t("cta")}
						<ArrowRight className="size-4" />
					</a>
				</p>
			</Reveal>
		</Section>
	);
}
