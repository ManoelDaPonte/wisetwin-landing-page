"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import {
	Check,
	Cuboid,
	FileText,
	Footprints,
	Sparkles,
	Camera,
	FileInput,
	KeyRound,
	Plug,
	ScrollText,
	Palette,
	ArrowRight,
	MessageCircle,
	MinusCircle,
	FlaskConical,
	type LucideIcon,
} from "lucide-react";

type Brick = {
	key: string;
	icon: LucideIcon;
	/** Sans prix annuel : WiseTrainer diffusé sans surcoût (CGV 6.2), éditeur WisePaper dans le socle */
	included?: boolean;
	/** Facturé en plus de la totale (SSO, au coût de la connexion) */
	separate?: boolean;
};

type Family = {
	key: "content" | "ai" | "integrations" | "governance";
	bricks: readonly Brick[];
};

// Les 4 familles de briques du LMS, alignées sur `lib/features.ts` du SaaS.
// Activables/désactivables client par client depuis le superadmin : le prix suit.
const families: readonly Family[] = [
	{
		key: "content",
		bricks: [
			{ key: "wisetrainer", icon: Cuboid, included: true },
			{ key: "wisepaper", icon: FileText, included: true },
			{ key: "wisetour", icon: Footprints },
		],
	},
	{
		key: "ai",
		bricks: [
			{ key: "askai", icon: Sparkles },
			{ key: "riskhunt", icon: Camera },
			{ key: "wisepaperImport", icon: FileInput },
		],
	},
	{
		key: "integrations",
		bricks: [
			{ key: "sso", icon: KeyRound, separate: true },
			{ key: "api", icon: Plug },
		],
	},
	{
		key: "governance",
		bricks: [
			{ key: "audit", icon: ScrollText },
			{ key: "whitelabel", icon: Palette },
		],
	},
];

const blueprintGrid = {
	backgroundImage:
		"linear-gradient(color-mix(in oklab, var(--color-border) 45%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--color-border) 45%, transparent) 1px, transparent 1px)",
	backgroundSize: "48px 48px",
} as const;

function CornerMarks() {
	return (
		<>
			<span
				aria-hidden
				className="pointer-events-none absolute left-3 top-3 size-3 border-l border-t border-secondary/50"
			/>
			<span
				aria-hidden
				className="pointer-events-none absolute right-3 top-3 size-3 border-r border-t border-secondary/50"
			/>
			<span
				aria-hidden
				className="pointer-events-none absolute bottom-3 left-3 size-3 border-b border-l border-secondary/50"
			/>
			<span
				aria-hidden
				className="pointer-events-none absolute bottom-3 right-3 size-3 border-b border-r border-secondary/50"
			/>
		</>
	);
}

export function ModularPricingSection() {
	const t = useTranslations("pricing");
	const coreFeatures = t.raw("core.features") as string[];

	return (
		<Section
			id="pricing"
			variant="default"
			className="overflow-hidden"
			header={{
				eyebrow: t("eyebrow"),
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			{/* Grille de plan en fond, signature industrielle */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
				style={blueprintGrid}
			/>

			<div className="relative">
				<div className="grid lg:grid-cols-5 gap-6 items-start">
					{/* Le socle LMS, prenable seul */}
					<Reveal className="lg:col-span-2 lg:self-start">
						<div className="relative rounded-2xl border-2 border-secondary bg-card p-8 flex flex-col shadow-lg shadow-secondary/10">
							<CornerMarks />
							<div className="flex items-center justify-between gap-3">
								<span className="text-xs font-semibold uppercase tracking-wider text-secondary-foreground bg-secondary px-3 py-1.5 rounded-full">
									{t("core.badge")}
								</span>
								<span className="text-xs font-mono uppercase tracking-[0.2em] text-secondary">
									SOCLE-00
								</span>
							</div>

							<div className="mt-6 mb-1 flex items-baseline gap-2">
								<span className="text-5xl font-bold tabular-nums">
									{t("core.price")}
								</span>
								<span className="text-lg text-muted-foreground">
									{t("perYear")}
								</span>
							</div>
							<p className="text-xs text-muted-foreground mb-5">
								{t("core.note")}
							</p>
							<p className="text-muted-foreground leading-relaxed mb-6">
								{t("core.description")}
							</p>

							<ul className="space-y-3 mb-6">
								{coreFeatures.map((feature, i) => (
									<li key={i} className="flex items-start gap-2">
										<Check className="size-5 text-secondary shrink-0 mt-0.5" />
										<span className="text-sm">{feature}</span>
									</li>
								))}
							</ul>

							{/* L'essai gratuit existe dans le produit : mention sobre */}
							<p className="mb-8 flex items-start gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-xs text-muted-foreground">
								<FlaskConical className="size-4 shrink-0 text-secondary" />
								<span>{t("core.trial")}</span>
							</p>

							<Button size="lg" className="mt-auto w-full" asChild>
								<Link href="/#contact">
									{t("core.cta")}
									<ArrowRight className="size-4 ml-2" />
								</Link>
							</Button>
						</div>
					</Reveal>

					{/* Les briques en option, par famille */}
					<div className="lg:col-span-3 flex flex-col">
						<div className="mb-5">
							<h3 className="text-xl font-bold mb-1">{t("modules.title")}</h3>
							<p className="text-sm text-muted-foreground">
								{t("modules.subtitle")}
							</p>
						</div>

						<div className="grid sm:grid-cols-2 gap-4 flex-1">
							{families.map((family, familyIndex) => (
								<Reveal
									key={family.key}
									delay={familyIndex * 0.06}
									className="h-full"
								>
									<div className="relative h-full bg-card border border-border rounded-xl p-5 hover:border-secondary/40 transition-colors flex flex-col overflow-hidden">
										<span
											aria-hidden
											className="absolute -top-5 -right-1 font-mono font-bold text-[96px] leading-none text-secondary/[0.06] select-none"
										>
											{familyIndex + 1}
										</span>

										<div className="relative mb-4">
											<span className="block text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-1">
												FAM-{String(familyIndex + 1).padStart(2, "0")}
											</span>
											<h4 className="font-semibold">
												{t(`modules.items.${family.key}.title`)}
											</h4>
											<p className="text-xs text-muted-foreground">
												{t(`modules.items.${family.key}.subtitle`)}
											</p>
										</div>

										<ul className="relative divide-y divide-border/70 border-t border-border/70">
											{family.bricks.map((brick) => {
												const Icon = brick.icon;
												const base = `modules.items.${family.key}.bricks.${brick.key}`;
												return (
													<li key={brick.key} className="py-3">
														<div className="flex items-start justify-between gap-3">
															<div className="flex items-center gap-2.5 min-w-0">
																<div className="size-8 bg-secondary/10 rounded-md flex items-center justify-center shrink-0">
																	<Icon className="size-4 text-secondary" />
																</div>
																<p className="font-medium text-sm leading-tight">
																	{t(`${base}.title`)}
																</p>
															</div>
															{brick.included ? (
																<p className="text-xs font-medium text-secondary whitespace-nowrap text-right leading-tight pt-1.5">
																	{t(`${base}.price`)}
																</p>
															) : (
																<p className="font-bold tabular-nums whitespace-nowrap text-right leading-tight pt-1">
																	+{t(`${base}.price`)}
																	<span className="text-xs text-muted-foreground font-normal">
																		{" "}
																		{t("perYear")}
																	</span>
																</p>
															)}
														</div>
														{brick.separate && (
															<span className="mt-2 ml-[42px] inline-block text-[10px] font-mono uppercase tracking-wider text-muted-foreground border border-border rounded px-1.5 py-0.5">
																{t("modules.separateTag")}
															</span>
														)}
														<p className="mt-1.5 ml-[42px] text-xs text-muted-foreground leading-relaxed">
															{t(`${base}.description`)}
														</p>
													</li>
												);
											})}
										</ul>
									</div>
								</Reveal>
							))}
						</div>

						{/* La totale */}
						<div className="mt-4 rounded-xl border border-secondary/30 bg-secondary/5 px-5 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
							<div className="flex items-start gap-3">
								<MinusCircle className="size-4.5 text-secondary shrink-0 mt-0.5" />
								<div>
									<p className="text-sm font-medium">{t("modules.note")}</p>
									<p className="text-xs text-muted-foreground leading-relaxed">
										{t("total.detail")}
									</p>
								</div>
							</div>
							<p className="font-bold tabular-nums whitespace-nowrap md:text-right">
								{t("total.label")}{" "}
								<span className="text-xl text-secondary">
									{t("total.price")}
								</span>
								<span className="text-xs text-muted-foreground font-normal">
									{" "}
									{t("perYear")}
								</span>
								<span className="block md:inline md:ml-2 text-xs font-mono uppercase tracking-wider text-muted-foreground font-normal">
									{t("total.suffix")}
								</span>
							</p>
						</div>
					</div>
				</div>

				{/* Les formations sur mesure, facturées au projet */}
				<div className="mt-8 rounded-2xl border border-secondary/20 bg-gradient-to-r from-secondary/5 via-secondary/10 to-secondary/5 p-6 md:p-8">
					<div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
						<div className="flex flex-col md:flex-row items-center gap-5">
							<div className="size-14 bg-secondary/15 rounded-xl flex items-center justify-center shrink-0">
								<Cuboid className="size-7 text-secondary" />
							</div>
							<div>
								<h3 className="font-semibold text-lg mb-1">
									{t("formations.title")}
								</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">
									{t("formations.description")}
								</p>
							</div>
						</div>
						<Button size="lg" variant="outline" className="shrink-0" asChild>
							<Link href="/#contact">
								<MessageCircle className="size-4 mr-2" />
								{t("formations.cta")}
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</Section>
	);
}
