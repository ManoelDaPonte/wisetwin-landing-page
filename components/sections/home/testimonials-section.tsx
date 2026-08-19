"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/ui/reveal";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
	const t = useTranslations("testimonials");
	// Citations placeholders — à remplacer par de vraies citations clients (avec leur accord)
	const items = t.raw("items") as Array<{
		quote: string;
		author: string;
		context: string;
	}>;

	return (
		<Section
			id="temoignages"
			variant="default"
			header={{
				eyebrow: t("eyebrow"),
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
				{items.map((item, i) => (
					<Reveal key={i} delay={i * 0.1} className="h-full">
						<figure className="h-full bg-card border border-border rounded-2xl p-7 flex flex-col hover:border-secondary/30 hover:-translate-y-1 transition-all duration-300">
							<Quote className="size-7 text-secondary/40 mb-4" aria-hidden />
							<blockquote className="text-[15px] leading-relaxed flex-1">
								{item.quote}
							</blockquote>
							<figcaption className="mt-6 pt-5 border-t border-border">
								<p className="font-semibold text-sm">{item.author}</p>
								<p className="text-xs text-muted-foreground mt-0.5">
									{item.context}
								</p>
							</figcaption>
						</figure>
					</Reveal>
				))}
			</div>
		</Section>
	);
}
