"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import {
	ArrowRight,
	Cuboid,
	FileText,
	Footprints,
	Sparkles,
	Map,
	LayoutGrid,
	Lock,
} from "lucide-react";

// Tous les outils au même niveau, la plateforme en dernier
const tools = [
	{ key: "bricks.wisetrainer", icon: Cuboid, href: "/solutions/wisetrainer" },
	{ key: "bricks.wisepaper", icon: FileText, href: "/solutions/wisepaper" },
	{ key: "bricks.wisetour", icon: Footprints, href: "/solutions/wisetour" },
	{ key: "bricks.askai", icon: Sparkles, href: "/solutions/askai", locked: true },
	{ key: "wiseatlas", icon: Map, href: "/solutions/wiseatlas" },
	{ key: "platform", icon: LayoutGrid, href: "/solutions/plateforme", highlight: true },
] as const;

export function ToolsSection() {
	const t = useTranslations("tools");

	return (
		<Section
			id="outils"
			variant="default"
			header={{
				eyebrow: t("eyebrow"),
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
				{tools.map((tool, i) => {
					const Icon = tool.icon;
					const locked = "locked" in tool && tool.locked;
					const highlight = "highlight" in tool && tool.highlight;
					return (
						<Reveal key={tool.key} delay={i * 0.06} className="h-full">
							<Link
								href={tool.href}
								className={cn(
									"group h-full bg-card border rounded-2xl p-7 flex flex-col transition-all duration-300",
									"hover:-translate-y-1.5 hover:shadow-xl hover:shadow-secondary/10",
									highlight
										? "border-secondary/50 hover:border-secondary"
										: "border-border hover:border-secondary/50"
								)}
							>
								<div className="flex items-center justify-between mb-5">
									<div
										className={cn(
											"size-12 rounded-xl flex items-center justify-center",
											highlight ? "bg-secondary text-secondary-foreground" : "bg-secondary/10 text-secondary"
										)}
									>
										<Icon className="size-6" />
									</div>
									{locked && (
										<span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-muted border border-border px-2 py-0.5 rounded-full">
											<Lock className="size-3" />
											{t("platformOnly")}
										</span>
									)}
								</div>
								<p className="text-xs font-mono uppercase tracking-wider text-secondary mb-1">
									{t(`${tool.key}.tag`)}
								</p>
								<h3 className="font-bold text-xl mb-2.5">
									{t(`${tool.key}.title`)}
								</h3>
								<p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
									{t(`${tool.key}.description`)}
								</p>
								<div className="flex items-end justify-between mt-auto">
									<span className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary group-hover:underline underline-offset-4">
										{t("cta")}
										<ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
									</span>
									<div className="text-right">
										<p
											className={cn(
												"font-bold tabular-nums",
												locked ? "text-sm font-semibold text-muted-foreground" : "text-lg"
											)}
										>
											{t(`${tool.key}.price`)}
										</p>
										{highlight && (
											<p className="text-xs text-muted-foreground">
												{t("platform.priceNote")}
											</p>
										)}
									</div>
								</div>
							</Link>
						</Reveal>
					);
				})}
			</div>

			<Reveal delay={0.3}>
				<p className="mt-10 text-center text-sm text-muted-foreground">
					{t("pricesNote")}
				</p>
			</Reveal>
		</Section>
	);
}
