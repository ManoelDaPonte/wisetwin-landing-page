import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import {
	ArrowLeft,
	FileText,
	Camera,
	Box,
	Clapperboard,
	CheckCircle,
	Clock,
	ImageIcon,
	ScanLine,
	Video,
	Boxes,
	Award,
	Flame,
	Biohazard,
	Lock,
	Settings,
} from "lucide-react";
import Image from "next/image";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "wisetrainer" });
	return {
		title: `${t("title")} - WiseTwin`,
		description: t("hero.subtitle"),
	};
}

export default function WiseTrainerPage() {
	const t = useTranslations("wisetrainer");
	const tCommon = useTranslations("common");

	const processSteps = [
		{ key: "quote", icon: FileText, number: 1 },
		{ key: "photos", icon: Camera, number: 2 },
		{ key: "creation", icon: Box, number: 3 },
		{ key: "scenarios", icon: Clapperboard, number: 4 },
		{ key: "delivery", icon: CheckCircle, number: 5 },
	];

	const scenarioItems = [
		{ key: "fire", icon: Flame, color: "text-orange-500" },
		{ key: "chemical", icon: Biohazard, color: "text-yellow-500" },
		{ key: "lockout", icon: Lock, color: "text-blue-500" },
		{ key: "maintenance", icon: Settings, color: "text-green-500" },
	];

	const sourceItems = [
		{ key: "photos", icon: ImageIcon },
		{ key: "videos", icon: Video },
		{ key: "existing3d", icon: Boxes },
		{ key: "scan", icon: ScanLine },
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

					{/* Text content centered */}
					<div className="text-center max-w-3xl mx-auto mb-12">
						<div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
							<Clock className="size-4" />
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

					{/* Screenshot in app window frame */}
					<div className="relative max-w-5xl mx-auto">
						{/* Glow effect */}
						<div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 via-primary/20 to-secondary/20 rounded-2xl blur-2xl opacity-50" />

						{/* Window frame */}
						<div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
							{/* Window header bar */}
							<div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
								<div className="flex gap-1.5">
									<div className="size-3 rounded-full bg-red-500" />
									<div className="size-3 rounded-full bg-yellow-500" />
									<div className="size-3 rounded-full bg-green-500" />
								</div>
								<div className="flex-1 text-center">
									<span className="text-xs text-muted-foreground">WiseTrainer - Simulateur 3D</span>
								</div>
							</div>

							{/* Screenshot */}
							<div className="relative">
								<Image
									src="/image/loto.webp"
									alt="WiseTrainer - Simulateur de formation 3D"
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

			{/* Ownership Section */}
			<Section id="ownership" variant="muted">
				<div className="max-w-4xl mx-auto text-center">
					<div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
						<Award className="size-5" />
						<span className="font-semibold">{t("ownership.badge")}</span>
					</div>
					<h2 className="text-3xl lg:text-4xl font-bold mb-4">
						{t("ownership.title")}
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						{t("ownership.description")}
					</p>
				</div>
			</Section>

			{/* Process - How it works */}
			<Section
				id="process"
				variant="dark"
				header={{
					title: t("process.title"),
					description: t("process.subtitle"),
					centered: true,
				}}
			>
				<div className="max-w-5xl mx-auto">
					{/* Timeline badge + collaboration */}
					<div className="flex flex-col items-center gap-4 mb-12">
						<div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full">
							<Clock className="size-4" />
							<span className="font-medium">{t("process.timeline")}</span>
						</div>
						<p className="text-center text-white/70 max-w-2xl">
							{t("process.collaboration")}
						</p>
					</div>

					{/* Steps */}
					<div className="relative">
						{/* Connection line */}
						<div className="hidden lg:block absolute top-6 left-0 right-0 h-0.5 bg-white/20" />

						<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
							{processSteps.map((step, index) => {
								const Icon = step.icon;
								return (
									<div key={step.key} className="relative flex flex-col items-center text-center">
										{/* Step number circle */}
										<div className="relative z-10 size-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-lg mb-4">
											{step.number}
										</div>

										{/* Icon */}
										<div className="size-14 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center mb-4">
											<Icon className="size-7 text-secondary" />
										</div>

										{/* Content */}
										<h3 className="font-semibold mb-2 text-white">
											{t(`process.steps.${step.key}.title`)}
										</h3>
										<p className="text-sm text-white/70">
											{t(`process.steps.${step.key}.description`)}
										</p>

										{/* Arrow for mobile */}
										{index < processSteps.length - 1 && (
											<div className="lg:hidden mt-4 text-white/50">
												↓
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</Section>

			{/* Sources - Multiple ways to create */}
			<Section
				id="sources"
				variant="muted"
				header={{
					title: t("sources.title"),
					description: t("sources.subtitle"),
					centered: true,
				}}
			>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
					{sourceItems.map((source) => {
						const Icon = source.icon;
						return (
							<div
								key={source.key}
								className="bg-card border border-border rounded-2xl p-6 text-center hover:border-secondary/50 transition-colors"
							>
								<div className="size-14 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
									<Icon className="size-7 text-secondary" />
								</div>
								<h3 className="font-semibold mb-2">
									{t(`sources.items.${source.key}.title`)}
								</h3>
								<p className="text-sm text-muted-foreground">
									{t(`sources.items.${source.key}.description`)}
								</p>
							</div>
						);
					})}
				</div>
			</Section>

			{/* Scenarios Section */}
			<Section
				id="scenarios"
				variant="default"
				header={{
					title: t("scenarios.title"),
					description: t("scenarios.subtitle"),
					centered: true,
				}}
			>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
					{scenarioItems.map((scenario) => {
						const Icon = scenario.icon;
						return (
							<div
								key={scenario.key}
								className="bg-card border border-border rounded-2xl p-6 hover:border-secondary/50 transition-all group"
							>
								<div className="size-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
									<Icon className={`size-7 ${scenario.color}`} />
								</div>
								<h3 className="text-lg font-bold mb-2">
									{t(`scenarios.items.${scenario.key}.title`)}
								</h3>
								<p className="text-muted-foreground text-sm leading-relaxed">
									{t(`scenarios.items.${scenario.key}.description`)}
								</p>
							</div>
						);
					})}
				</div>
			</Section>

			{/* CTA */}
			<Section id="cta" variant="muted">
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
