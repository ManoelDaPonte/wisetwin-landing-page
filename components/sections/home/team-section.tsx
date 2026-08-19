"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Section } from "@/components/common/section";

// Remplacer /placeholder.png par les vraies photos (ex. /image/team/manoel.jpg)
const members = [
	{ key: "manoel", photo: "/placeholder.png" },
	{ key: "mickael", photo: "/placeholder.png" },
	{ key: "gauthier", photo: "/placeholder.png" },
] as const;

export function TeamSection() {
	const t = useTranslations("team");

	return (
		<Section
			id="equipe"
			variant="default"
			header={{
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
				{members.map((member) => {
					const skills = t.raw(`members.${member.key}.skills`) as string[];
					return (
						<div
							key={member.key}
							className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:border-secondary/30 transition-colors"
						>
							<div className="relative aspect-square bg-muted">
								<Image
									src={member.photo}
									alt={t(`members.${member.key}.name`)}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
							</div>
							<div className="p-6 flex flex-col flex-1">
								<h3 className="text-xl font-bold">
									{t(`members.${member.key}.name`)}
								</h3>
								<p className="text-sm font-medium text-secondary mb-3">
									{t(`members.${member.key}.role`)}
								</p>
								<p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
									{t(`members.${member.key}.bio`)}
								</p>
								<div className="flex flex-wrap gap-1.5">
									{skills.map((skill, i) => (
										<span
											key={i}
											className="text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20 px-2.5 py-1 rounded-full"
										>
											{skill}
										</span>
									))}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</Section>
	);
}
