import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import {
	FileUp,
	Brain,
	BarChart3,
	ArrowLeft,
	PenLine,
	FileText,
	CheckCircle,
	ArrowRight,
	Gift,
} from "lucide-react";
import Image from "next/image";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "wisepaper" });
	return {
		title: `${t("title")} - WiseTwin`,
		description: t("hero.subtitle"),
	};
}

export default function WisePaperPage() {
	const t = useTranslations("wisepaper");
	const tCommon = useTranslations("common");

	const flowSteps = [
		{ key: "import", icon: FileUp, color: "bg-blue-500" },
		{ key: "process", icon: Brain, color: "bg-purple-500" },
		{ key: "track", icon: BarChart3, color: "bg-green-500" },
	];

	const features = [
		{ key: "create", icon: PenLine },
		{ key: "import", icon: FileUp },
		{ key: "ai", icon: Brain },
		{ key: "tracking", icon: BarChart3 },
	];

	const benefits = [
		{ key: "paper", icon: FileText },
		{ key: "free", icon: Gift },
	];

	return (
		<main>
			{/* Hero */}
			<section className="relative py-20 lg:py-32 bg-gradient-to-br from-background via-background to-muted/30">
				<div className="container mx-auto max-w-7xl px-4">
					<Link
						href="/"
						className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
					>
						<ArrowLeft className="size-4" />
						<span>{tCommon("back")}</span>
					</Link>

					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div>
							{/* Badge Inclus */}
							<div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium mb-4">
								<CheckCircle className="size-4" />
								{t("hero.badge")}
							</div>

							<h1 className="text-4xl lg:text-5xl font-bold mb-6">
								{t("hero.title")}
							</h1>
							<p className="text-xl text-muted-foreground mb-8">
								{t("hero.subtitle")}
							</p>
							<Button size="lg" asChild>
								<a
									href="https://app.wisetwin.eu"
									target="_blank"
									rel="noopener noreferrer"
								>
									{t("hero.cta")}
								</a>
							</Button>
						</div>
						<div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
							<Image
								src="/placeholder.svg"
								alt="WisePaper"
								fill
								className="object-cover"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Flow Section - How it works */}
			<Section
				id="flow"
				variant="dark"
				header={{
					title: t("flow.title"),
					description: t("flow.subtitle"),
					centered: true,
				}}
			>
				<div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 max-w-4xl mx-auto">
					{flowSteps.map((step, index) => {
						const Icon = step.icon;
						return (
							<div key={step.key} className="flex items-center gap-4">
								{/* Step Card */}
								<div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center min-w-[200px]">
									<div className={`size-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
										<Icon className="size-8 text-white" />
									</div>
									<h3 className="text-xl font-bold text-white mb-2">
										{t(`flow.steps.${step.key}.title`)}
									</h3>
									<p className="text-white/70 text-sm">
										{t(`flow.steps.${step.key}.description`)}
									</p>
								</div>

								{/* Arrow between steps */}
								{index < flowSteps.length - 1 && (
									<div className="hidden md:flex items-center justify-center">
										<ArrowRight className="size-8 text-secondary" />
									</div>
								)}
								{index < flowSteps.length - 1 && (
									<div className="md:hidden flex items-center justify-center rotate-90">
										<ArrowRight className="size-6 text-secondary" />
									</div>
								)}
							</div>
						);
					})}
				</div>
			</Section>

			{/* Features */}
			<Section
				id="features"
				variant="muted"
				header={{
					title: t("features.title"),
					centered: true,
				}}
			>
				<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{features.map((feature) => {
						const Icon = feature.icon;
						return (
							<div
								key={feature.key}
								className="bg-card border border-border rounded-xl p-6"
							>
								<div className="size-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
									<Icon className="size-6 text-secondary" />
								</div>
								<h3 className="text-lg font-semibold mb-2">
									{t(`features.${feature.key}.title`)}
								</h3>
								<p className="text-muted-foreground">
									{t(`features.${feature.key}.description`)}
								</p>
							</div>
						);
					})}
				</div>
			</Section>

			{/* Benefits / Why WisePaper */}
			<Section
				id="benefits"
				variant="default"
				header={{
					title: t("benefits.title"),
					centered: true,
				}}
			>
				<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{benefits.map((benefit) => {
						const Icon = benefit.icon;
						return (
							<div
								key={benefit.key}
								className="bg-card border border-border rounded-xl p-8 text-center"
							>
								<div className="size-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
									<Icon className="size-8 text-secondary" />
								</div>
								<h3 className="text-xl font-semibold mb-3">
									{t(`benefits.${benefit.key}.title`)}
								</h3>
								<p className="text-muted-foreground">
									{t(`benefits.${benefit.key}.description`)}
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
						<a
							href="https://app.wisetwin.eu"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("cta.button")}
						</a>
					</Button>
				</div>
			</Section>
		</main>
	);
}
