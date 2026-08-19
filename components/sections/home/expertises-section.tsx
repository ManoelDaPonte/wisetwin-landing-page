"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight } from "lucide-react";

const domains = ["training", "immersive", "software", "consulting"] as const;

export function ExpertisesSection() {
	const t = useTranslations("expertises");

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
			<div className="max-w-6xl mx-auto border-t border-border">
				{domains.map((domain, i) => {
					const items = t.raw(`domains.${domain}.items`) as string[];
					return (
						<Reveal key={domain} delay={0.05}>
							<div className="group grid lg:grid-cols-12 gap-6 lg:gap-12 py-14 md:py-20 border-b border-border">
								{/* Numéro + titre */}
								<div className="lg:col-span-5 flex items-start gap-6">
									<span className="font-mono text-sm text-secondary tabular-nums pt-2.5 md:pt-4">
										{String(i + 1).padStart(2, "0")}
									</span>
									<h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.05] group-hover:text-secondary transition-colors duration-300">
										{t(`domains.${domain}.title`)}
									</h3>
								</div>

								{/* Hook + liste */}
								<div className="lg:col-span-7 lg:pt-2">
									<p className="text-lg md:text-xl font-medium leading-snug mb-6 max-w-lg">
										{t(`domains.${domain}.hook`)}
									</p>
									<p className="text-muted-foreground leading-loose">
										{items.map((item, j) => (
											<span key={j} className="whitespace-nowrap">
												{item}
												{j < items.length - 1 && (
													<span className="text-secondary/60 mx-3 select-none">
														·
													</span>
												)}
											</span>
										))}
									</p>
								</div>
							</div>
						</Reveal>
					);
				})}
			</div>

			{/* Hors catalogue */}
			<Reveal delay={0.1}>
				<p className="mt-14 text-center text-lg md:text-xl max-w-2xl mx-auto">
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
