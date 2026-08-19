"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import {
	GraduationCap,
	Cuboid,
	BrainCircuit,
	Compass,
	ArrowRight,
} from "lucide-react";

const domains = [
	{ key: "training", icon: GraduationCap },
	{ key: "immersive", icon: Cuboid },
	{ key: "software", icon: BrainCircuit },
	{ key: "consulting", icon: Compass },
] as const;

type DomainKey = (typeof domains)[number]["key"];

function CapabilityMarquee({ items }: { items: string[] }) {
	const half = Math.ceil(items.length / 2);
	const rows = [items.slice(0, half), items.slice(half)];

	return (
		<div className="space-y-4 mb-14 md:mb-20">
			{rows.map((row, r) => (
				<div key={r} className="relative overflow-hidden group">
					<div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
					<div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
					<div
						className={cn(
							"flex w-max animate-marquee-slow group-hover:[animation-play-state:paused]",
							r === 1 && "[animation-direction:reverse]"
						)}
					>
						{[...row, ...row].map((label, i) => (
							<span
								key={i}
								className="flex items-center shrink-0 text-lg md:text-2xl font-semibold text-muted-foreground/70 whitespace-nowrap"
							>
								<span className="mx-5 md:mx-7">{label}</span>
								<span className="text-secondary text-sm md:text-base select-none">
									◆
								</span>
							</span>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

export function ExpertisesSection() {
	const t = useTranslations("expertises");
	const [selected, setSelected] = useState<DomainKey>("training");

	const allItems = domains.flatMap(
		(d) => t.raw(`domains.${d.key}.items`) as string[]
	);
	const selectedItems = t.raw(`domains.${selected}.items`) as string[];
	const SelectedIcon = domains.find((d) => d.key === selected)!.icon;

	return (
		<Section
			id="expertises"
			variant="default"
			header={{
				eyebrow: t("eyebrow"),
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			{/* Marquee des compétences — le catalogue qui défile */}
			<CapabilityMarquee items={allItems} />

			{/* Desktop : explorateur interactif */}
			<div className="hidden lg:grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch">
				<Reveal className="lg:col-span-5 flex flex-col justify-center">
					<div className="flex flex-col">
						{domains.map((domain, i) => {
							const isActive = selected === domain.key;
							return (
								<button
									key={domain.key}
									onMouseEnter={() => setSelected(domain.key)}
									onFocus={() => setSelected(domain.key)}
									onClick={() => setSelected(domain.key)}
									className={cn(
										"group flex items-center gap-5 py-6 text-left border-b border-border transition-colors first:border-t",
										isActive && "border-b-secondary/40"
									)}
								>
									<span
										className={cn(
											"font-mono text-sm tabular-nums transition-colors",
											isActive
												? "text-secondary"
												: "text-muted-foreground/50"
										)}
									>
										{String(i + 1).padStart(2, "0")}
									</span>
									<span
										className={cn(
											"text-2xl xl:text-3xl font-bold tracking-tight transition-colors flex-1",
											isActive
												? "text-foreground"
												: "text-muted-foreground/40 group-hover:text-muted-foreground"
										)}
									>
										{t(`domains.${domain.key}.title`)}
									</span>
									<ArrowRight
										className={cn(
											"size-5 transition-all",
											isActive
												? "text-secondary translate-x-0 opacity-100"
												: "-translate-x-2 opacity-0"
										)}
									/>
								</button>
							);
						})}
					</div>
				</Reveal>

				<Reveal delay={0.1} className="lg:col-span-7">
					<AnimatePresence mode="wait">
						<motion.div
							key={selected}
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -12 }}
							transition={{ duration: 0.25 }}
							className="relative h-full min-h-[380px] rounded-2xl border border-border bg-card p-9 overflow-hidden flex flex-col"
						>
							{/* Fond géométrique discret */}
							<div className="absolute -top-16 -right-16 size-56 rounded-full border-2 border-secondary/10" />
							<div className="absolute -bottom-20 -left-10 size-44 rounded-full border-2 border-secondary/10" />

							<div className="relative size-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
								<SelectedIcon className="size-7 text-secondary" />
							</div>
							<p className="relative text-xl xl:text-2xl font-medium leading-snug mb-8 max-w-md">
								{t(`domains.${selected}.hook`)}
							</p>
							<div className="relative flex flex-wrap gap-2.5 mt-auto">
								{selectedItems.map((item, i) => (
									<motion.span
										key={item}
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 0.1 + i * 0.04, duration: 0.25 }}
										className="text-sm font-medium bg-secondary/10 text-secondary border border-secondary/20 px-3.5 py-1.5 rounded-full"
									>
										{item}
									</motion.span>
								))}
							</div>
						</motion.div>
					</AnimatePresence>
				</Reveal>
			</div>

			{/* Mobile : blocs empilés */}
			<div className="lg:hidden space-y-5 max-w-xl mx-auto">
				{domains.map((domain, i) => {
					const Icon = domain.icon;
					const items = t.raw(`domains.${domain.key}.items`) as string[];
					return (
						<Reveal key={domain.key} delay={i * 0.06}>
							<div className="bg-card border border-border rounded-2xl p-6">
								<div className="flex items-center gap-4 mb-3">
									<div className="size-11 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
										<Icon className="size-5.5 text-secondary" />
									</div>
									<h3 className="text-lg font-bold">
										{t(`domains.${domain.key}.title`)}
									</h3>
								</div>
								<p className="text-sm text-muted-foreground mb-4">
									{t(`domains.${domain.key}.hook`)}
								</p>
								<div className="flex flex-wrap gap-2">
									{items.map((item, j) => (
										<span
											key={j}
											className="text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20 px-2.5 py-1 rounded-full"
										>
											{item}
										</span>
									))}
								</div>
							</div>
						</Reveal>
					);
				})}
			</div>

			{/* "Doesn't fit a box" CTA banner */}
			<Reveal delay={0.15}>
				<div className="mt-12 max-w-6xl mx-auto rounded-2xl border border-secondary/20 bg-gradient-to-r from-secondary/5 via-secondary/10 to-secondary/5 p-6 md:p-8">
					<div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
						<div>
							<h3 className="font-semibold text-lg mb-1">{t("note")}</h3>
							<p className="text-sm text-muted-foreground">
								{t("noteDescription")}
							</p>
						</div>
						<Button size="lg" className="shrink-0" asChild>
							<a href="#contact">
								{t("cta")}
								<ArrowRight className="size-4 ml-2" />
							</a>
						</Button>
					</div>
				</div>
			</Reveal>
		</Section>
	);
}
