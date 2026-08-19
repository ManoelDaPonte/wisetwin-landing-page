"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/common/section";
import { ArrowRight } from "lucide-react";

const tools = [
	{
		key: "wisetrainer",
		href: "/solutions/wisetrainer",
		image: "/image/WiseTrainer.webp",
	},
	{
		key: "wiseatlas",
		href: "/solutions/wiseatlas",
		image: "/image/WiseAtlas.webp",
	},
] as const;

export function ToolsSection() {
	const t = useTranslations("tools");

	return (
		<Section
			id="outils"
			variant="muted"
			header={{
				eyebrow: t("eyebrow"),
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
				{tools.map((tool) => (
					<Link
						key={tool.key}
						href={tool.href}
						className="group relative bg-card border border-border rounded-2xl transition-all hover:border-secondary/50 hover:shadow-lg hover:shadow-secondary/5 flex flex-col overflow-hidden"
					>
						<div className="absolute inset-x-0 top-0 h-1 bg-secondary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 z-10" />

						{/* Product screenshot */}
						<div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-muted">
							<Image
								src={tool.image}
								alt={t(`${tool.key}.title`)}
								fill
								className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
							<span className="absolute top-4 left-4 text-xs font-mono uppercase tracking-wider text-secondary bg-background/85 backdrop-blur-sm border border-secondary/30 px-3 py-1 rounded-full">
								{t(`${tool.key}.tag`)}
							</span>
						</div>

						<div className="p-7 flex flex-col flex-1">
							<h3 className="font-bold text-2xl mb-3">
								{t(`${tool.key}.title`)}
							</h3>
							<p className="text-muted-foreground leading-relaxed mb-6 flex-1">
								{t(`${tool.key}.description`)}
							</p>

							<div className="flex items-center justify-between mt-auto">
								<span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary group-hover:underline underline-offset-4">
									{t("cta")}
									<ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
								</span>
								<span className="text-sm font-medium text-muted-foreground">
									{t(`${tool.key}.price`)}
								</span>
							</div>
						</div>
					</Link>
				))}
			</div>
		</Section>
	);
}
