"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function TerritorySection() {
	const t = useTranslations("territory");
	const facts = t.raw("facts") as Array<{ value: string; label: string }>;

	return (
		<section id="territoire" className="relative overflow-hidden">
			{/* Vue aérienne du bassin dunkerquois (capture WiseAtlas) */}
			<Image
				src="/image/WiseAtlas.webp"
				alt=""
				fill
				className="object-cover"
				sizes="100vw"
			/>
			<div className="absolute inset-0 bg-[#04060f]/80" />
			<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />
			<div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />

			<div className="relative container mx-auto max-w-7xl px-4 py-24 md:py-36 text-white">
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

				<div className="mt-14 md:mt-16 grid sm:grid-cols-3 gap-8 max-w-4xl">
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
		</section>
	);
}
