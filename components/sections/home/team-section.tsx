"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/ui/reveal";

// Remplacer /placeholder.png par les vraies photos (ex. /image/team/manoel.jpg)
const members = [
	{ key: "gauthier", photo: "/placeholder.png" },
	{ key: "manoel", photo: "/placeholder.png" },
	{ key: "mickael", photo: "/placeholder.png" },
] as const;

export function TeamSection() {
	const t = useTranslations("team");

	return (
		<Section
			id="equipe"
			variant="default"
			header={{
				eyebrow: t("eyebrow"),
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
				{members.map((member, i) => {
					const skills = t.raw(`members.${member.key}.skills`) as string[];
					return (
						<Reveal key={member.key} delay={i * 0.12} className="h-full">
							<div className="group h-full bg-card border border-border rounded-3xl overflow-hidden flex flex-col hover:border-secondary/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300">
								<div className="relative aspect-[4/5] bg-muted overflow-hidden">
									<Image
										src={member.photo}
										alt={t(`members.${member.key}.name`)}
										fill
										className="object-cover group-hover:scale-105 transition-transform duration-700"
										sizes="(max-width: 768px) 100vw, 33vw"
									/>
									{/* Pôle chip */}
									<span className="absolute top-4 left-4 text-xs font-mono uppercase tracking-wider text-secondary bg-background/85 backdrop-blur-sm border border-secondary/30 px-3 py-1 rounded-full">
										{t(`members.${member.key}.pole`)}
									</span>
									{/* Name overlay */}
									<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pt-16 pb-5 px-5">
										<h3 className="text-2xl font-bold text-white">
											{t(`members.${member.key}.name`)}
										</h3>
										<p className="text-sm font-medium text-secondary">
											{t(`members.${member.key}.role`)}
										</p>
									</div>
								</div>
								<div className="p-6 flex flex-col flex-1">
									<p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
										{t(`members.${member.key}.bio`)}
									</p>
									<div className="flex flex-wrap gap-1.5">
										{skills.map((skill, j) => (
											<span
												key={j}
												className="text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20 px-2.5 py-1 rounded-full"
											>
												{skill}
											</span>
										))}
									</div>
								</div>
							</div>
						</Reveal>
					);
				})}
			</div>

			{/* Équipe à la volée */}
			<Reveal delay={0.2}>
				<p className="mt-12 text-center text-lg md:text-xl font-medium max-w-2xl mx-auto">
					{t("note")}{" "}
					<span className="text-secondary">{t("noteHighlight")}</span>
				</p>
			</Reveal>
		</Section>
	);
}
