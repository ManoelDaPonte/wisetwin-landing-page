"use client";

import { useEffect, useState } from "react";
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

// Fallback tant que le pool public/videos/temoignages/ est vide
const FALLBACK_YOUTUBE_ID = "dQw4w9WgXcQ";

// Désorganisation contrôlée : rotations et décalages propres à chaque carte
const scatter = [
	"rotate-[-1.5deg] lg:rotate-[-4deg] lg:translate-y-6",
	"rotate-[1deg] lg:rotate-[2deg] lg:-translate-y-2 lg:scale-[1.05] z-10",
	"rotate-[-1deg] lg:rotate-[3.5deg] lg:translate-y-8",
	"rotate-[1.5deg] lg:rotate-[-2.5deg] lg:translate-y-2 lg:-translate-x-6",
	"rotate-[-0.5deg] lg:rotate-[2.5deg] lg:-translate-y-3 lg:translate-x-6",
] as const;

function shuffle<T>(arr: T[]): T[] {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

export function TestimonialsSection({ videoPool }: { videoPool: string[] }) {
	const t = useTranslations("testimonials");
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	// Tirage aléatoire côté client uniquement (pas de Math.random au SSR)
	const [assigned, setAssigned] = useState<(string | null)[]>([]);
	const items = t.raw("items") as Array<{
		quote: string;
		author: string;
		context: string;
	}>;

	useEffect(() => {
		if (videoPool.length === 0) {
			setAssigned(items.map(() => null));
			return;
		}
		const shuffled = shuffle(videoPool);
		setAssigned(items.map((_, i) => shuffled[i % shuffled.length]));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [videoPool.length]);

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
			<div className="flex flex-wrap justify-center gap-8 lg:gap-6 max-w-6xl mx-auto lg:py-8">
				{items.map((item, i) => (
					<Reveal
						key={i}
						delay={i * 0.09}
						className="w-full sm:w-[300px] shrink-0"
					>
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
										<span className="absolute size-14 rounded-full bg-secondary/30 animate-ping [animation-duration:2.5s]" />
										<span className="relative size-12 rounded-full bg-white/95 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
											<Play className="size-5 text-[#0f0b40] fill-[#0f0b40] translate-x-0.5" />
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
							{assigned[openIndex] ? (
								<video
									src={assigned[openIndex] as string}
									controls
									autoPlay
									playsInline
									className="w-full h-full object-contain bg-black"
								/>
							) : (
								<iframe
									src={`https://www.youtube-nocookie.com/embed/${FALLBACK_YOUTUBE_ID}?autoplay=1&rel=0`}
									title={items[openIndex]?.author}
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
									className="w-full h-full border-0"
								/>
							)}
						</div>
					)}
				</DialogContent>
			</Dialog>
		</Section>
	);
}
