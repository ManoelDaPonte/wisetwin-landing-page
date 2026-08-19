"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/ui/reveal";
import {
	Dialog,
	DialogContent,
	DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Play, Quote } from "lucide-react";

// Vidéos placeholders en attendant les vrais témoignages clients filmés
const VIDEO_IDS = ["dQw4w9WgXcQ", "dQw4w9WgXcQ", "dQw4w9WgXcQ"] as const;

// Désorganisation contrôlée : rotations et décalages propres à chaque carte
const scatter = [
	"rotate-[-1.5deg] lg:rotate-[-4deg] lg:translate-y-8",
	"rotate-[1deg] lg:rotate-[2.5deg] lg:-translate-y-2 lg:scale-[1.06] z-10",
	"rotate-[-1deg] lg:rotate-[4deg] lg:translate-y-10",
] as const;

export function TestimonialsSection() {
	const t = useTranslations("testimonials");
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const items = t.raw("items") as Array<{
		quote: string;
		author: string;
		context: string;
	}>;

	return (
		<Section
			id="temoignages"
			variant="muted"
			header={{
				eyebrow: t("eyebrow"),
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div className="grid md:grid-cols-3 gap-8 lg:gap-6 max-w-5xl mx-auto lg:py-10">
				{items.map((item, i) => (
					<Reveal key={i} delay={i * 0.12}>
						<button
							type="button"
							onClick={() => setOpenIndex(i)}
							aria-label={`${t("watchCta")} : ${item.author}`}
							className={cn(
								"group relative block w-full text-left bg-card border border-border rounded-2xl p-3 pb-5 shadow-lg shadow-black/5",
								"transition-all duration-300 hover:rotate-0 hover:scale-[1.05] hover:z-20 hover:shadow-2xl hover:shadow-secondary/10 hover:border-secondary/40",
								scatter[i % scatter.length]
							)}
						>
							{/* Ruban adhésif décoratif */}
							<span className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-secondary/20 border border-secondary/10 rotate-[-2deg] rounded-sm backdrop-blur-[1px]" />

							{/* Zone vidéo */}
							<div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-[#0f0b40] via-[#0a1a2a] to-[#04060f]">
								<Quote className="absolute top-4 left-4 size-10 text-white/10" aria-hidden />
								<span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider text-white/70 bg-white/10 border border-white/15 px-2 py-0.5 rounded-full">
									{t("videoBadge")}
								</span>
								{/* Bouton play */}
								<span className="absolute inset-0 flex items-center justify-center">
									<span className="relative flex items-center justify-center">
										<span className="absolute size-16 rounded-full bg-secondary/30 animate-ping [animation-duration:2.5s]" />
										<span className="relative size-14 rounded-full bg-white/95 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
											<Play className="size-6 text-[#0f0b40] fill-[#0f0b40] translate-x-0.5" />
										</span>
									</span>
								</span>
								<span className="absolute bottom-3 left-4 right-4 text-xs text-white/60 line-clamp-1 italic">
									&ldquo;{item.quote}&rdquo;
								</span>
							</div>

							{/* Légende */}
							<figcaption className="mt-4 px-2">
								<p className="font-semibold text-sm">{item.author}</p>
								<p className="text-xs text-muted-foreground mt-0.5">
									{item.context}
								</p>
							</figcaption>
						</button>
					</Reveal>
				))}
			</div>

			{/* Modale vidéo */}
			<Dialog
				open={openIndex !== null}
				onOpenChange={(open) => !open && setOpenIndex(null)}
			>
				<DialogContent className="max-w-3xl p-0 overflow-hidden border-border bg-black">
					<DialogTitle className="sr-only">
						{openIndex !== null ? items[openIndex]?.author : ""}
					</DialogTitle>
					{openIndex !== null && (
						<div className="aspect-video w-full">
							<iframe
								src={`https://www.youtube-nocookie.com/embed/${VIDEO_IDS[openIndex % VIDEO_IDS.length]}?autoplay=1&rel=0`}
								title={items[openIndex]?.author}
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								className="w-full h-full border-0"
							/>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</Section>
	);
}
