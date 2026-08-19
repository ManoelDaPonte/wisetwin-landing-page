"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/ui/reveal";

const items = ["tailored", "accessible", "interoperable", "local"] as const;

export function ConvictionsSection() {
	const t = useTranslations("convictions");

	return (
		<Section id="convictions" variant="muted">
			<div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-20">
				{/* Manifesto statement */}
				<div className="lg:col-span-5">
					<Reveal className="lg:sticky lg:top-32">
						<p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-3">
							{t("eyebrow")}
						</p>
						<h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-5">
							{t("title")}
						</h2>
						<p className="text-lg text-muted-foreground leading-relaxed">
							{t("subtitle")}
						</p>
					</Reveal>
				</div>

				{/* Convictions list */}
				<div className="lg:col-span-7 flex flex-col divide-y divide-border">
					{items.map((item, index) => (
						<Reveal key={item} delay={index * 0.08}>
							<div className="group flex gap-6 py-8 first:pt-0 last:pb-0">
								<span className="shrink-0 font-mono text-sm text-secondary pt-1.5 tabular-nums">
									{String(index + 1).padStart(2, "0")}
								</span>
								<div>
									<h3 className="text-xl font-semibold mb-2 group-hover:text-secondary transition-colors">
										{t(`items.${item}.title`)}
									</h3>
									<p className="text-muted-foreground leading-relaxed">
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
