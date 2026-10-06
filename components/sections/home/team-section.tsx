"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/ui/reveal";

const members = [
	{ key: "gauthier", photo: "/image/team/gauthier.jpg" },
	{ key: "manoel", photo: "/image/team/manoel-2.jpg" },
	{ key: "mickael", photo: "/image/team/mickael.jpg" },
] as const;

export function TeamSection() {
	const t = useTranslations("team");

	return (
		<Section
			id="equipe"
			variant="muted"
			header={{ title: t("title"), description: t("subtitle") }}
		>
			<div className="grid sm:grid-cols-3 gap-6 lg:gap-10">
				{members.map((member, i) => (
					<Reveal key={member.key} delay={i * 0.1}>
						<figure className="group">
							<div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
								<Image
									src={member.photo}
									alt={t(`members.${member.key}.name`)}
									fill
									className="object-cover grayscale transition-transform duration-700 group-hover:scale-105"
									sizes="(max-width: 640px) 100vw, 33vw"
								/>
							</div>
							<figcaption className="mt-5">
								<p className="text-2xl font-semibold">{t(`members.${member.key}.name`)}</p>
								<p className="mt-1 text-muted-foreground">{t(`members.${member.key}.role`)}</p>
							</figcaption>
						</figure>
					</Reveal>
				))}
			</div>

			<Reveal delay={0.2}>
				<p className="mt-14 text-xl md:text-2xl font-medium max-w-2xl">
					{t("note")} <span className="text-secondary">{t("noteHighlight")}</span>
				</p>
			</Reveal>
		</Section>
	);
}
