"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/common/section";

const items = ["tailored", "accessible", "interoperable", "local"] as const;

export function ConvictionsSection() {
	const t = useTranslations("convictions");

	return (
		<Section id="convictions" variant="default">
			<div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-20">
				{/* Manifesto statement */}
				<div className="lg:col-span-5">
					<div className="lg:sticky lg:top-32">
						<p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-3">
							{t("eyebrow")}
						</p>
						<h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
							{t("title")}
						</h2>
						<p className="text-lg text-muted-foreground leading-relaxed">
							{t("subtitle")}
						</p>
					</div>
				</div>

				{/* Convictions list */}
				<div className="lg:col-span-7 flex flex-col divide-y divide-border">
					{items.map((item, index) => (
						<div key={item} className="group flex gap-6 py-7 first:pt-0 last:pb-0">
							<span className="shrink-0 font-mono text-sm text-secondary pt-1 tabular-nums">
								{String(index + 1).padStart(2, "0")}
							</span>
							<div>
								<h3 className="text-lg font-semibold mb-2 group-hover:text-secondary transition-colors">
									{t(`items.${item}.title`)}
								</h3>
								<p className="text-muted-foreground leading-relaxed">
									{t(`items.${item}.description`)}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</Section>
	);
}
