"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/common/section";
import { Quote, MapPin } from "lucide-react";

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
			<div className="max-w-5xl mx-auto">
				<div className="grid md:grid-cols-3 gap-6">
					{items.map((item, i) => (
						<figure
							key={i}
							className="bg-card border border-border rounded-2xl p-7 flex flex-col hover:border-secondary/30 transition-colors"
						>
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
					))}
				</div>

				{/* Ancrage Dunkerque */}
				<div className="mt-8 rounded-2xl border border-secondary/20 bg-gradient-to-r from-secondary/5 via-secondary/10 to-secondary/5 p-6 md:p-8">
					<div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
						<div className="size-14 bg-secondary/15 rounded-xl flex items-center justify-center shrink-0">
							<MapPin className="size-7 text-secondary" />
						</div>
						<div>
							<h3 className="font-semibold text-lg mb-1">
								{t("local.title")}
							</h3>
							<p className="text-sm text-muted-foreground leading-relaxed">
								{t("local.description")}
							</p>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}
