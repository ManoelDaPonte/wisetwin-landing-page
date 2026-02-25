import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import {
	ArrowLeft,
	CheckCircle,
	Camera,
	Cpu,
	PenTool,
	GraduationCap,
	ShieldCheck,
	UserPlus,
	Wrench,
	Check,
	X,
	Cuboid,
	FileText,
	Map,
	ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "wisetour" });
	return {
		title: `${t("title")} - WiseTwin`,
		description: t("hero.subtitle"),
	};
}

const productSolutions = [
	{ key: "wisetrainer", icon: Cuboid, href: "/solutions/wisetrainer" },
	{ key: "wisepaper", icon: FileText, href: "/solutions/wisepaper" },
	{ key: "wisetour", icon: Camera, href: "/solutions/wisetour" },
	{ key: "wiseatlas", icon: Map, href: "/solutions/wiseatlas" },
] as const;

const comparisonKeys = [
	"devTime",
	"activityInterruption",
	"serviceType",
	"userTracking",
	"realism",
	"interactivity",
	"networkDemand",
	"equipment",
	"web",
	"interactionTracking",
] as const;

export default function WiseTourPage() {
	const t = useTranslations("wisetour");
	const tCommon = useTranslations("common");
	const tSolutions = useTranslations();

	const steps = [
		{ key: "capture", icon: Camera, number: 1 },
		{ key: "processing", icon: Cpu, number: 2 },
		{ key: "editor", icon: PenTool, number: 3 },
		{ key: "training", icon: GraduationCap, number: 4 },
	];

	const useCases = [
		{ key: "safety", icon: ShieldCheck },
		{ key: "onboarding", icon: UserPlus },
		{ key: "maintenance", icon: Wrench },
	];

	return (
		<main>
			{/* Hero */}
			<section className="relative py-20 lg:py-28 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
				<div className="container mx-auto max-w-7xl px-4">
					<Link
						href="/"
						className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
					>
						<ArrowLeft className="size-4" />
						<span>{tCommon("back")}</span>
					</Link>

					<div className="text-center max-w-3xl mx-auto mb-12">
						<div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
							<CheckCircle className="size-4" />
							<span className="font-medium text-sm">{t("hero.badge")}</span>
						</div>

						<h1 className="text-4xl lg:text-5xl font-bold mb-6">
							{t("hero.title")}
						</h1>
						<p className="text-xl text-muted-foreground mb-8">
							{t("hero.subtitle")}
						</p>
						<Button size="lg" asChild>
							<Link href="/#contact">{t("hero.cta")}</Link>
						</Button>
					</div>

					{/* Screenshot */}
					<div className="relative max-w-5xl mx-auto">
						<div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 via-primary/20 to-secondary/20 rounded-2xl blur-2xl opacity-50" />
						<div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
							<div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
								<div className="flex gap-1.5">
									<div className="size-3 rounded-full bg-red-500" />
									<div className="size-3 rounded-full bg-yellow-500" />
									<div className="size-3 rounded-full bg-green-500" />
								</div>
								<div className="flex-1 text-center">
									<span className="text-xs text-muted-foreground">WiseTour - Visite virtuelle 360</span>
								</div>
							</div>
							<div className="relative">
								<Image
									src="/placeholder.png"
									alt="WiseTour - Visite virtuelle 360"
									width={1200}
									height={750}
									className="w-full h-auto"
									priority
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* How it works - Timeline */}
			<Section
				id="how-it-works"
				variant="muted"
				header={{
					title: t("howItWorks.title"),
					description: t("howItWorks.subtitle"),
					centered: true,
				}}
			>
				<div className="max-w-5xl mx-auto">
					{/* Desktop timeline */}
					<div className="hidden lg:block">
						<div className="relative">
							{/* Connecting line */}
							<div className="absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-secondary/30" />
							<div className="absolute top-[22px] left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-secondary/60 via-secondary to-secondary/60 rounded-full" />

							<div className="grid grid-cols-4 gap-8">
								{steps.map((step) => {
									const Icon = step.icon;
									return (
										<div key={step.key} className="relative flex flex-col items-center text-center">
											<div className="relative z-10 size-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-md shadow-secondary/20">
												{step.number}
											</div>
											<div className="mt-3 mb-2">
												<span className="inline-block text-xs font-semibold text-secondary bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full">
													{t(`howItWorks.steps.${step.key}.duration`)}
												</span>
											</div>
											<div className="size-12 bg-muted rounded-xl flex items-center justify-center mb-3">
												<Icon className="size-6 text-muted-foreground" />
											</div>
											<h3 className="font-semibold mb-1">
												{t(`howItWorks.steps.${step.key}.title`)}
											</h3>
											<p className="text-sm text-muted-foreground leading-relaxed">
												{t(`howItWorks.steps.${step.key}.description`)}
											</p>
										</div>
									);
								})}
							</div>
						</div>
					</div>

					{/* Mobile timeline */}
					<div className="lg:hidden">
						<div className="relative pl-12">
							<div className="absolute left-5 top-0 bottom-0 w-0.5 bg-secondary/30" />

							<div className="flex flex-col gap-8">
								{steps.map((step) => {
									const Icon = step.icon;
									return (
										<div key={step.key} className="relative">
											<div className="absolute -left-12 top-0 z-10 size-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-md shadow-secondary/20">
												{step.number}
											</div>
											<div className="flex items-start gap-3">
												<div className="size-10 bg-muted rounded-xl flex items-center justify-center shrink-0">
													<Icon className="size-5 text-muted-foreground" />
												</div>
												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-2 mb-1">
														<h3 className="font-semibold text-sm">
															{t(`howItWorks.steps.${step.key}.title`)}
														</h3>
														<span className="inline-block text-xs font-medium text-secondary bg-secondary/10 border border-secondary/20 px-2 py-0.5 rounded-full">
															{t(`howItWorks.steps.${step.key}.duration`)}
														</span>
													</div>
													<p className="text-sm text-muted-foreground">
														{t(`howItWorks.steps.${step.key}.description`)}
													</p>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</Section>

			{/* Comparison table */}
			<Section
				id="comparison"
				variant="default"
				header={{
					title: tSolutions("solutions.title"),
					description: tSolutions("solutions.subtitle"),
					centered: true,
				}}
			>
				<div className="max-w-6xl mx-auto overflow-x-auto">
					<table className="w-full border-collapse min-w-[700px]">
						<thead>
							<tr className="border-b-2 border-border">
								<th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground w-[200px]" />
								{productSolutions.map((solution) => {
									const SolIcon = solution.icon;
									const isCurrent = solution.key === "wisetour";
									return (
										<th
											key={solution.key}
											className={cn(
												"py-4 px-3 text-center",
												isCurrent && "bg-secondary/5",
											)}
										>
											<Link href={solution.href} className="flex flex-col items-center gap-2 group">
												<div
													className={cn(
														"size-10 rounded-xl flex items-center justify-center",
														isCurrent
															? "bg-secondary text-secondary-foreground"
															: "bg-secondary/10",
													)}
												>
													<SolIcon
														className={cn(
															"size-5",
															isCurrent
																? "text-secondary-foreground"
																: "text-secondary",
														)}
													/>
												</div>
												<span className={cn(
													"text-base font-bold group-hover:text-secondary transition-colors",
													isCurrent && "text-secondary",
												)}>
													{tSolutions(`solutions.${solution.key}.title`)}
												</span>
												<span className={cn(
													"text-sm font-semibold",
													isCurrent ? "text-secondary" : "text-foreground",
												)}>
													{tSolutions(`pricing.products.${solution.key}.price`)}
												</span>
											</Link>
										</th>
									);
								})}
							</tr>
						</thead>
						<tbody>
							{comparisonKeys.map((key, i) => (
								<tr
									key={key}
									className={cn(
										"border-b border-border/50",
										i % 2 === 0 && "bg-muted/30",
									)}
								>
									<td className="py-3 px-4 text-sm font-medium">
										{tSolutions(`solutions.comparison.labels.${key}`)}
									</td>
									{productSolutions.map((solution) => {
										const value = tSolutions.raw(
											`solutions.comparison.values.${solution.key}.${key}`,
										);
										const isCurrent = solution.key === "wisetour";
										return (
											<td
												key={solution.key}
												className={cn(
													"py-3 px-3 text-center",
													isCurrent && "bg-secondary/5",
												)}
											>
												{value === true ? (
													<Check className="size-5 text-emerald-500 mx-auto" />
												) : value === false ? (
													<X className="size-5 text-muted-foreground/40 mx-auto" />
												) : (
													<span className="text-sm">
														{String(value)}
													</span>
												)}
											</td>
										);
									})}
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr>
								<td />
								{productSolutions.map((solution) => {
									const isCurrent = solution.key === "wisetour";
									return (
										<td
											key={solution.key}
											className={cn(
												"py-4 px-3 text-center",
												isCurrent && "bg-secondary/5",
											)}
										>
											{!isCurrent && (
												<Button variant="outline" size="sm" asChild>
													<Link href={solution.href} className="inline-flex items-center gap-1">
														{tCommon("learnMore")}
														<ArrowRight className="size-3" />
													</Link>
												</Button>
											)}
										</td>
									);
								})}
							</tr>
						</tfoot>
					</table>
				</div>
			</Section>

			{/* Use Cases - Centered blocks */}
			<Section
				id="use-cases"
				variant="muted"
				header={{
					title: t("useCases.title"),
					centered: true,
				}}
			>
				<div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
					{useCases.map((useCase) => {
						const Icon = useCase.icon;
						return (
							<div key={useCase.key} className="text-center">
								<div className="size-14 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
									<Icon className="size-7 text-secondary" />
								</div>
								<h3 className="text-lg font-bold mb-2">
									{t(`useCases.${useCase.key}.title`)}
								</h3>
								<p className="text-muted-foreground text-sm leading-relaxed">
									{t(`useCases.${useCase.key}.description`)}
								</p>
							</div>
						);
					})}
				</div>
			</Section>

			{/* CTA */}
			<Section id="cta" variant="default">
				<div className="text-center max-w-2xl mx-auto">
					<h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
					<p className="text-muted-foreground mb-8">{t("cta.description")}</p>
					<Button size="lg" asChild>
						<Link href="/#contact">{t("cta.button")}</Link>
					</Button>
				</div>
			</Section>
		</main>
	);
}
