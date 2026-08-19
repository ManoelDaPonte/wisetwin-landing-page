"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const items = ["tailored", "accessible", "local"] as const;

export function ConvictionsSection() {
	const t = useTranslations("convictions");

	return (
		<Section id="convictions" variant="muted">
			<div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-24 w-full">
				{/* Manifesto statement */}
				<div className="lg:col-span-5">
					<Reveal className="lg:sticky lg:top-32">
						<p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-4">
							{t("eyebrow")}
						</p>
						<h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
							{t("title")}
						</h2>
						<p className="text-lg text-muted-foreground leading-relaxed max-w-md">
							{t("subtitle")}
						</p>
					</Reveal>
				</div>

				{/* Convictions list */}
				<div className="lg:col-span-7 flex flex-col divide-y divide-border">
					{items.map((item, index) => (
						<Reveal key={item} delay={index * 0.1}>
							{/* Le padding est géré par index : le div est seul enfant du Reveal,
							    donc first:/last: s'appliqueraient à toutes les cartes */}
							<div
								className={cn(
									"group flex gap-8 py-20 md:py-28",
									index === 0 && "pt-0 md:pt-0",
									index === items.length - 1 && "pb-0 md:pb-0"
								)}
							>
								<span className="shrink-0 font-mono text-4xl md:text-5xl font-bold text-secondary/20 group-hover:text-secondary/50 transition-colors tabular-nums leading-none pt-1">
									{String(index + 1).padStart(2, "0")}
								</span>
								<div>
									<h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 group-hover:text-secondary transition-colors">
										{t(`items.${item}.title`)}
									</h3>
									<p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
										{t(`items.${item}.description`)}
									</p>
								</div>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</Section>
	);
}
