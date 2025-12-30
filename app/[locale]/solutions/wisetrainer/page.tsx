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
	Shield,
	Wrench,
	Flame,
	Biohazard,
	Lock,
	Settings,
	ImageIcon,
	ScanLine,
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

	const scenarioItems = [
		{ key: "fire", icon: Flame, color: "text-orange-500" },
		{ key: "chemical", icon: Biohazard, color: "text-yellow-500" },
		{ key: "lockout", icon: Lock, color: "text-blue-500" },
		{ key: "maintenance", icon: Settings, color: "text-green-500" },
	];

	const processSteps = [
		{ key: "quote", icon: FileText, number: 1 },
		{ key: "photos", icon: Camera, number: 2 },
		{ key: "creation", icon: Box, number: 3 },
		{ key: "scenarios", icon: Clapperboard, number: 4 },
		{ key: "delivery", icon: CheckCircle, number: 5 },
	];

	const gammes = [
		{ key: "safe", icon: Shield },
		{ key: "tech", icon: Wrench },
	];

	return (
		<main>
			{/* Hero */}
			<section className="relative py-20 lg:py-32 bg-gradient-to-br from-background via-background to-muted/30">
				<div className="container mx-auto px-4">
					<Link
						href="/"
						className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
					>
						<ArrowLeft className="size-4" />
						<span>{tCommon("back")}</span>
					</Link>

					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div>
							{/* Badge */}
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
						<div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
							<Image
								src="/placeholder.svg"
								alt="WiseTrainer"
								fill
								className="object-cover"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Scenarios Section */}
			<Section
				id="scenarios"
				variant="dark"
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
								className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-secondary/50 transition-all group"
							>
								<div className="size-14 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
									<Icon className={`size-7 ${scenario.color}`} />
								</div>
								<h3 className="text-lg font-bold text-white mb-2">
									{t(`scenarios.items.${scenario.key}.title`)}
								</h3>
								<p className="text-white/70 text-sm leading-relaxed">
									{t(`scenarios.items.${scenario.key}.description`)}
								</p>
							</div>
						);
					})}
				</div>
			</Section>

			{/* Captation Methods Section */}
			<Section
				id="captation"
				variant="muted"
				header={{
					title: t("captation.title"),
					description: t("captation.subtitle"),
					centered: true,
				}}
			>
				<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{/* Photos Option */}
					<div className="bg-card border border-border rounded-2xl p-8 hover:border-secondary/50 transition-colors">
						<div className="size-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
							<ImageIcon className="size-8 text-secondary" />
						</div>
						<h3 className="text-xl font-bold mb-3">
							{t("captation.photos.title")}
						</h3>
						<p className="text-muted-foreground mb-6">
							{t("captation.photos.description")}
						</p>
						<ul className="space-y-3">
							{(t.raw("captation.photos.features") as string[]).map((feature, index) => (
								<li key={index} className="flex items-center gap-3 text-sm">
									<CheckCircle className="size-4 text-secondary shrink-0" />
									<span>{feature}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Scan Option */}
					<div className="bg-card border border-border rounded-2xl p-8 hover:border-secondary/50 transition-colors">
						<div className="size-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
							<ScanLine className="size-8 text-secondary" />
						</div>
						<h3 className="text-xl font-bold mb-3">
							{t("captation.scan.title")}
						</h3>
						<p className="text-muted-foreground mb-6">
							{t("captation.scan.description")}
						</p>
						<ul className="space-y-3">
							{(t.raw("captation.scan.features") as string[]).map((feature, index) => (
								<li key={index} className="flex items-center gap-3 text-sm">
									<CheckCircle className="size-4 text-secondary shrink-0" />
									<span>{feature}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</Section>

			{/* Process - How it works */}
			<Section
				id="process"
				variant="default"
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
						<p className="text-center text-muted-foreground max-w-2xl">
							{t("process.collaboration")}
						</p>
					</div>

					{/* Steps */}
					<div className="relative">
						{/* Connection line */}
						<div className="hidden lg:block absolute top-6 left-0 right-0 h-0.5 bg-border" />

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
										<div className="size-14 bg-card border border-border rounded-xl flex items-center justify-center mb-4">
											<Icon className="size-7 text-secondary" />
										</div>

										{/* Content */}
										<h3 className="font-semibold mb-2">
											{t(`process.steps.${step.key}.title`)}
										</h3>
										<p className="text-sm text-muted-foreground">
											{t(`process.steps.${step.key}.description`)}
										</p>

										{/* Arrow for mobile */}
										{index < processSteps.length - 1 && (
											<div className="lg:hidden mt-4 text-muted-foreground">
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

			{/* Gammes - Types of WiseTrainer */}
			<Section
				id="gammes"
				variant="muted"
				header={{
					title: t("gammes.title"),
					description: t("gammes.subtitle"),
					centered: true,
				}}
			>
				<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{gammes.map((gamme) => {
						const Icon = gamme.icon;
						const features = t.raw(`gammes.${gamme.key}.features`) as string[];
						return (
							<div
								key={gamme.key}
								className="bg-card border border-border rounded-2xl p-6 hover:border-secondary/50 transition-colors"
							>
								{/* Header */}
								<div className="size-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
									<Icon className="size-7 text-secondary" />
								</div>

								<h3 className="text-xl font-bold mb-1">
									{t(`gammes.${gamme.key}.title`)}
								</h3>
								<p className="text-sm text-secondary font-medium mb-3">
									{t(`gammes.${gamme.key}.subtitle`)}
								</p>

								<p className="text-muted-foreground text-sm mb-4">
									{t(`gammes.${gamme.key}.description`)}
								</p>

								{/* Features list */}
								<ul className="space-y-2 mb-6">
									{features.map((feature, index) => (
										<li key={index} className="flex items-center gap-2 text-sm">
											<CheckCircle className="size-4 text-secondary" />
											<span>{feature}</span>
										</li>
									))}
								</ul>

								{/* Price */}
								<div className="pt-4 border-t border-border">
									<p className="text-xs text-muted-foreground mb-1">
										{t(`gammes.${gamme.key}.unit`)}
									</p>
									<p className="text-2xl font-bold">
										{t(`gammes.${gamme.key}.price`)}
										<span className="text-base font-normal text-muted-foreground"> €</span>
									</p>
									<p className="text-xs text-muted-foreground mt-1">
										{t("gammes.includedScenarios")}*
									</p>
								</div>
							</div>
						);
					})}
				</div>

				{/* Additional scenario pricing */}
				<div className="mt-8 text-center space-y-2">
					<p className="text-muted-foreground">
						{t("gammes.scenario.title")}:{" "}
						<span className="font-semibold text-foreground">
							{t("gammes.scenario.price")} € {t("gammes.scenario.unit")}
						</span>
					</p>
					<p className="text-xs text-muted-foreground">
						*<a href="#scenarios" className="text-secondary hover:underline ml-1">
							{t("gammes.scenarioNote")}
						</a>
					</p>
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
