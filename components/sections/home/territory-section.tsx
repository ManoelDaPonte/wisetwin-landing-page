"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function TerritorySection() {
	const t = useTranslations("territory");
	const facts = t.raw("facts") as Array<{ value: string; label: string }>;

	return (
		<section id="territoire" className="relative overflow-hidden">
			{/* Toile dynamique : flux d'énergie et de matières entre industriels du bassin.
			    Le réseau est cadré dans la moitié droite ; sur grand écran, le texte tient dans la colonne de gauche. */}
			<Image
				src="/image/territoire-toile-dynamique.webp"
				alt=""
				fill
				className="object-cover object-[72%_center]"
				sizes="100vw"
			/>
			{/* Voile : plein sous le texte, effacé sur la Toile (plus couvrant sur mobile) */}
			<div className="absolute inset-0 bg-[#04060f]/80 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#04060f]/95 lg:via-[#04060f]/75 lg:via-40% lg:to-[#04060f]/0" />
			<div className="absolute inset-0 bg-gradient-to-b from-[#04060f]/60 via-transparent via-30% to-[#04060f]/50" />
			<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />
			<div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />

			<div className="relative container mx-auto max-w-7xl px-4 py-24 md:py-36 text-white">
				<div className="lg:max-w-[600px]">
					<Reveal>
						<p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-4">
							{t("eyebrow")}
						</p>
						<h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] max-w-3xl">
							{t("title")}
						</h2>
						<p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
							{t("description")}
						</p>
					</Reveal>

					<div className="mt-14 md:mt-16 grid sm:grid-cols-3 lg:grid-cols-1 gap-8 lg:gap-7 max-w-4xl">
						{facts.map((fact, i) => (
							<Reveal key={i} delay={0.1 + i * 0.1}>
								<div className="border-l-2 border-secondary pl-5">
									<p className="text-2xl md:text-3xl font-bold tracking-tight">
										{fact.value}
									</p>
									<p className="mt-2 text-sm text-white/65 leading-snug">
										{fact.label}
									</p>
								</div>
							</Reveal>
						))}
					</div>

					<Reveal delay={0.25}>
						<p className="mt-14 md:mt-16 text-xl md:text-2xl font-medium leading-snug max-w-3xl">
							<span className="text-secondary">{t("ambitionLabel")}</span>{" "}
							{t("ambition")}
						</p>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
