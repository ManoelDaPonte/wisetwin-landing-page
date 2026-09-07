"use client";

import { useMemo, useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
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
	FlaskConical,
	type LucideIcon,
} from "lucide-react";

// Prix HT, par an, par site. Source de vérité des montants affichés dans le
// configurateur ; les traductions ne portent que du texte.
const CORE_PRICE = 1200;
const BUNDLE_PRICE = 4800; // socle + toutes les briques, sauf le SSO

type Brick = {
	key: string;
	icon: LucideIcon;
	/** null = sans prix annuel (WiseTrainer diffusé sans surcoût, éditeur WisePaper dans le socle) */
	price: number | null;
	/** Facturé en plus de la totale (SSO, au coût de la connexion) */
	separate?: boolean;
};

type Family = {
	key: "content" | "ai" | "integrations" | "governance";
	bricks: readonly Brick[];
};

// Les 4 familles de briques, alignées sur `lib/features.ts` du SaaS.
const families: readonly Family[] = [
	{
		key: "content",
		bricks: [
			{ key: "wisetrainer", icon: Cuboid, price: null },
			{ key: "wisepaper", icon: FileText, price: null },
			{ key: "wisetour", icon: Footprints, price: 900 },
		],
	},
	{
		key: "ai",
		bricks: [
			{ key: "askai", icon: Sparkles, price: 900 },
			{ key: "riskhunt", icon: Camera, price: 600 },
			{ key: "wisepaperImport", icon: FileInput, price: 600 },
		],
	},
	{
		key: "integrations",
		bricks: [
			{ key: "sso", icon: KeyRound, price: 1800, separate: true },
			{ key: "api", icon: Plug, price: 600 },
		],
	},
	{
		key: "governance",
		bricks: [
			{ key: "audit", icon: ScrollText, price: 300 },
			{ key: "whitelabel", icon: Palette, price: 900 },
		],
	},
];

const allBricks = families.flatMap((f) => f.bricks);
const pricedBricks = allBricks.filter(
	(b): b is Brick & { price: number } => b.price !== null,
);
const bundleKeys = pricedBricks.filter((b) => !b.separate).map((b) => b.key);

const blueprintGrid = {
	backgroundImage:
		"linear-gradient(color-mix(in oklab, var(--color-border) 45%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--color-border) 45%, transparent) 1px, transparent 1px)",
	backgroundSize: "48px 48px",
} as const;

function Switch({
	checked,
	label,
	onClick,
}: {
	checked: boolean;
	label: string;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			role="switch"
			aria-checked={checked}
			aria-label={label}
			onClick={onClick}
			className={cn(
				"relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-200 motion-reduce:transition-none",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
				checked
					? "bg-secondary border-secondary"
					: "bg-muted border-border hover:border-secondary/50",
			)}
		>
			<span
				aria-hidden
				className={cn(
					"absolute top-0.5 left-0.5 size-4.5 rounded-full bg-background shadow-sm transition-transform duration-200 motion-reduce:transition-none",
					checked && "translate-x-5",
				)}
			/>
		</button>
	);
}

export function ModularPricingSection() {
	const t = useTranslations("pricing");
	const format = useFormatter();
	const coreFeatures = t.raw("core.features") as string[];

	const [active, setActive] = useState<ReadonlySet<string>>(() => new Set());

	const toggle = (key: string) =>
		setActive((prev) => {
			const next = new Set(prev);
			if (next.has(key)) next.delete(key);
			else next.add(key);
			return next;
		});

	const { total, isBundle, saving } = useMemo(() => {
		const alaCarte =
			CORE_PRICE +
			pricedBricks
				.filter((b) => active.has(b.key))
				.reduce((sum, b) => sum + b.price, 0);
		const isBundle = bundleKeys.every((k) => active.has(k));
		if (!isBundle) return { total: alaCarte, isBundle, saving: 0 };
		const ssoOnTop = pricedBricks
			.filter((b) => b.separate && active.has(b.key))
			.reduce((sum, b) => sum + b.price, 0);
		const total = BUNDLE_PRICE + ssoOnTop;
		return { total, isBundle, saving: alaCarte - total };
	}, [active]);

	// L'espace fine insécable (U+202F) du format français disparaît aux petites
	// tailles : on la remplace par une insécable classique.
	const num = (n: number) => format.number(n).replace(/\u202f/g, "\u00a0");
	const price = (n: number) => `${num(n)}€`;

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
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
				style={blueprintGrid}
			/>

			<Reveal className="relative">
				<div className="grid lg:grid-cols-5 gap-6 items-start">
					{/* Le socle, toujours inclus, et le total de la configuration */}
					<div className="lg:col-span-2 lg:sticky lg:top-24 rounded-2xl border-2 border-secondary bg-card shadow-lg shadow-secondary/10 flex flex-col">
						<div className="p-8 pb-6">
							<div className="flex items-center justify-between gap-3">
								<h3 className="text-lg font-semibold">{t("core.badge")}</h3>
								<span className="inline-flex items-center gap-1.5 text-xs text-secondary">
									<Check className="size-3.5" />
									{t("core.always")}
								</span>
							</div>

							<div className="mt-4 mb-1 flex items-baseline gap-2">
								<span className="text-5xl font-bold tabular-nums">
									{num(CORE_PRICE)}
								</span>
								<span className="text-lg text-muted-foreground">
									{t("perYear")}
								</span>
							</div>
							<p className="text-xs text-muted-foreground mb-5">
								{t("core.note")}
							</p>
							<p className="text-sm text-muted-foreground leading-relaxed mb-5">
								{t("core.description")}
							</p>

							<ul className="space-y-2.5">
								{coreFeatures.map((feature, i) => (
									<li key={i} className="flex items-start gap-2">
										<Check className="size-4 text-secondary shrink-0 mt-0.5" />
										<span className="text-sm">{feature}</span>
									</li>
								))}
							</ul>

							<p className="mt-5 flex items-start gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-xs text-muted-foreground">
								<FlaskConical className="size-4 shrink-0 text-secondary" />
								<span>{t("core.trial")}</span>
							</p>
						</div>

						{/* Le total suit les interrupteurs de droite */}
						<div className="border-t border-border bg-secondary/5 rounded-b-2xl p-8 pt-6">
							<p className="text-sm font-semibold">{t("config.title")}</p>
							<p className="text-xs text-muted-foreground">
								{t("config.summary", { count: active.size })}
							</p>
							<div
								className="mt-3 flex items-baseline justify-between gap-3"
								aria-live="polite"
							>
								<span className="text-sm text-muted-foreground">
									{t("config.total")}
								</span>
								<span className="font-bold tabular-nums">
									<span className="text-3xl text-secondary">
										{num(total)}
									</span>
									<span className="text-sm text-muted-foreground font-normal">
										{" "}
										{t("perYear")}
									</span>
								</span>
							</div>
							<p className="mt-2 text-xs text-muted-foreground leading-relaxed">
								{isBundle
									? t("config.bundle", { saving: price(saving) })
									: t("config.bundleHint", { price: price(BUNDLE_PRICE) })}
								{isBundle && active.has("sso") && ` ${t("config.ssoOnTop")}`}
							</p>

							<Button size="lg" className="mt-5 w-full" asChild>
								<Link href="/#contact">
									{t("core.cta")}
									<ArrowRight className="size-4 ml-2" />
								</Link>
							</Button>
						</div>
					</div>

					{/* Les briques : un interrupteur par brique */}
					<div className="lg:col-span-3 flex flex-col">
						<div className="mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
							<div>
								<h3 className="text-xl font-bold mb-1">{t("modules.title")}</h3>
								<p className="text-sm text-muted-foreground">
									{t("modules.subtitle")}
								</p>
							</div>
							<div className="flex gap-2 shrink-0">
								<Button
									type="button"
									size="sm"
									variant="outline"
									onClick={() => setActive(new Set(bundleKeys))}
								>
									{t("modules.presetAll")}
								</Button>
								<Button
									type="button"
									size="sm"
									variant="ghost"
									onClick={() => setActive(new Set())}
								>
									{t("modules.presetNone")}
								</Button>
							</div>
						</div>

						<div className="grid sm:grid-cols-2 gap-4">
							{families.map((family) => {
								const toggleable = family.bricks.filter((b) => b.price !== null);
								const activeCount = toggleable.filter((b) =>
									active.has(b.key),
								).length;
								return (
									<div
										key={family.key}
										className="bg-card border border-border rounded-xl p-5 flex flex-col"
									>
										<div className="mb-3 flex items-start justify-between gap-3">
											<div>
												<h4 className="font-semibold">
													{t(`modules.items.${family.key}.title`)}
												</h4>
												<p className="text-xs text-muted-foreground">
													{t(`modules.items.${family.key}.subtitle`)}
												</p>
											</div>
											<span className="text-xs tabular-nums text-muted-foreground whitespace-nowrap pt-1">
												{t("modules.familyCount", {
													active: activeCount,
													total: toggleable.length,
												})}
											</span>
										</div>

										<ul className="divide-y divide-border/70 border-t border-border/70">
											{family.bricks.map((brick) => {
												const Icon = brick.icon;
												const base = `modules.items.${family.key}.bricks.${brick.key}`;
												const on = active.has(brick.key);
												const included = brick.price === null;
												const yearly = brick.price ?? 0;
												return (
													<li
														key={brick.key}
														className={cn(
															"py-3 transition-colors",
															!included && !on && "text-muted-foreground",
														)}
													>
														<div className="flex items-center justify-between gap-3">
															<div className="flex items-center gap-2.5 min-w-0">
																<div
																	className={cn(
																		"size-8 rounded-md flex items-center justify-center shrink-0 transition-colors",
																		included || on
																			? "bg-secondary/10 text-secondary"
																			: "bg-muted text-muted-foreground",
																	)}
																>
																	<Icon className="size-4" />
																</div>
																<div className="min-w-0">
																	<p className="font-medium text-sm leading-tight text-foreground">
																		{t(`${base}.title`)}
																	</p>
																	{included ? (
																		<p className="text-xs text-secondary">
																			{t(`${base}.included`)}
																		</p>
																	) : (
																		<p
																			className={cn(
																				"text-xs tabular-nums",
																				on ? "text-foreground" : "text-muted-foreground",
																			)}
																		>
																			+{num(yearly)} {t("perYear")}
																			{brick.separate && (
																				<span className="text-muted-foreground">
																					{" · "}
																					{t("modules.separateTag")}
																				</span>
																			)}
																		</p>
																	)}
																</div>
															</div>
															{included ? (
																<Check className="size-4 text-secondary shrink-0" />
															) : (
																<Switch
																	checked={on}
																	label={`${t(`${base}.title`)} : ${on ? t("modules.switchOn") : t("modules.switchOff")}`}
																	onClick={() => toggle(brick.key)}
																/>
															)}
														</div>
														<p className="mt-1.5 ml-[42px] text-xs text-muted-foreground leading-relaxed">
															{t(`${base}.description`)}
														</p>
													</li>
												);
											})}
										</ul>
									</div>
								);
							})}
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
			</Reveal>
		</Section>
	);
}
