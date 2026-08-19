"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
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
	Lock,
} from "lucide-react";

// Briques individuelles : chacune s'achète seule (sauf Ask AI, réservé à la plateforme)
const bricks = [
	{ key: "wisetrainer", icon: Cuboid, href: "/solutions/wisetrainer" },
	{ key: "wisepaper", icon: FileText, href: "/solutions/wisetrainer" },
	{ key: "wisetour", icon: Footprints, href: "/solutions/wisetrainer" },
	{ key: "askai", icon: Sparkles, href: "/solutions/wisetrainer", locked: true },
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
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-5 max-w-6xl mx-auto">
				{/* La plateforme LMS : la carte vedette */}
				<Reveal className="lg:col-span-7 h-full">
					<Link
						href="/solutions/wisetrainer"
						className="group relative h-full bg-card border-2 border-secondary/40 rounded-3xl transition-all duration-300 hover:border-secondary hover:shadow-xl hover:shadow-secondary/10 hover:-translate-y-1.5 flex flex-col overflow-hidden"
					>
						<div className="relative aspect-[16/8] overflow-hidden border-b border-border bg-muted">
							<Image
								src="/image/WiseTrainer.webp"
								alt={t("platform.title")}
								fill
								className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
								sizes="(max-width: 1024px) 100vw, 58vw"
							/>
							<span className="absolute top-4 left-4 text-xs font-mono uppercase tracking-wider text-secondary-foreground bg-secondary px-3 py-1 rounded-full font-semibold">
								{t("platform.tag")}
							</span>
						</div>
						<div className="p-7 flex flex-col flex-1">
							<h3 className="font-bold text-2xl mb-2">{t("platform.title")}</h3>
							<p className="text-muted-foreground leading-relaxed mb-5">
								{t("platform.description")}
							</p>
							<ul className="space-y-2 mb-6">
								{(t.raw("platform.features") as string[]).map((f, i) => (
									<li key={i} className="flex items-start gap-2.5 text-sm">
										<span className="size-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
										{f}
									</li>
								))}
							</ul>
							<div className="flex items-end justify-between mt-auto">
								<span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary group-hover:underline underline-offset-4">
									{t("platform.cta")}
									<ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
								</span>
								<div className="text-right">
									<p className="text-2xl font-bold tabular-nums">
										{t("platform.price")}
									</p>
									<p className="text-xs text-muted-foreground">
										{t("platform.priceNote")}
									</p>
								</div>
							</div>
						</div>
					</Link>
				</Reveal>

				{/* WiseAtlas */}
				<Reveal delay={0.1} className="lg:col-span-5 h-full">
					<Link
						href="/solutions/wiseatlas"
						className="group relative h-full bg-card border border-border rounded-3xl transition-all duration-300 hover:border-secondary/50 hover:shadow-xl hover:shadow-secondary/10 hover:-translate-y-1.5 flex flex-col overflow-hidden"
					>
						<div className="relative aspect-[16/8] overflow-hidden border-b border-border bg-muted">
							<Image
								src="/image/WiseAtlas.webp"
								alt={t("wiseatlas.title")}
								fill
								className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
								sizes="(max-width: 1024px) 100vw, 42vw"
							/>
							<span className="absolute top-4 left-4 text-xs font-mono uppercase tracking-wider text-secondary bg-background/85 backdrop-blur-sm border border-secondary/30 px-3 py-1 rounded-full">
								{t("wiseatlas.tag")}
							</span>
						</div>
						<div className="p-7 flex flex-col flex-1">
							<h3 className="font-bold text-2xl mb-2">{t("wiseatlas.title")}</h3>
							<p className="text-muted-foreground leading-relaxed mb-6 flex-1">
								{t("wiseatlas.description")}
							</p>
							<div className="flex items-end justify-between mt-auto">
								<span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary group-hover:underline underline-offset-4">
									{t("cta")}
									<ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
								</span>
								<p className="text-2xl font-bold tabular-nums">
									{t("wiseatlas.price")}
								</p>
							</div>
						</div>
					</Link>
				</Reveal>

				{/* Les briques à la carte */}
				{bricks.map((brick, i) => {
					const Icon = brick.icon;
					const locked = "locked" in brick && brick.locked;
					return (
						<Reveal
							key={brick.key}
							delay={0.15 + i * 0.06}
							className="lg:col-span-3 h-full"
						>
							<Link
								href={brick.href}
								className={cn(
									"group h-full bg-card border border-border rounded-2xl p-6 flex flex-col transition-all duration-300",
									"hover:border-secondary/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-secondary/5"
								)}
							>
								<div className="flex items-center justify-between mb-4">
									<div className="size-11 bg-secondary/10 rounded-xl flex items-center justify-center">
										<Icon className="size-5.5 text-secondary" />
									</div>
									{locked && (
										<span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-muted border border-border px-2 py-0.5 rounded-full">
											<Lock className="size-3" />
											{t("platformOnly")}
										</span>
									)}
								</div>
								<p className="text-xs font-mono uppercase tracking-wider text-secondary mb-1">
									{t(`bricks.${brick.key}.tag`)}
								</p>
								<h3 className="font-bold text-lg mb-2">
									{t(`bricks.${brick.key}.title`)}
								</h3>
								<p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
									{t(`bricks.${brick.key}.description`)}
								</p>
								<p className="text-lg font-bold tabular-nums mt-auto">
									{locked ? (
										<span className="text-sm font-semibold text-muted-foreground">
											{t("bricks.askai.price")}
										</span>
									) : (
										t(`bricks.${brick.key}.price`)
									)}
								</p>
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
