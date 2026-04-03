import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import {
	Building2,
	Users,
	Construction,
	FileText,
	Database,
	Paintbrush,
	Globe,
	Check,
	Map,
	Box,
	MessageCircle,
	HelpCircle,
	Phone,
	ClipboardList,
	FileCheck,
	Landmark,
	Factory,
	Edit3,
	BarChart3,
	Shield,
	Share2,
	HeadphonesIcon,
	ArrowRight,
} from "lucide-react";
import { ParallaxImage } from "@/components/ui/parallax-image";
import Image from "next/image";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "wiseatlas" });
	return {
		title: `${t("title")} - WiseTwin`,
		description: t("hero.subtitle"),
	};
}

export default function WiseAtlasPage() {
	const t = useTranslations("wiseatlas");

	const steps = [
		{ key: "define", icon: FileText, number: 1 },
		{ key: "data", icon: Database, number: 2 },
		{ key: "design", icon: Paintbrush, number: 3 },
		{ key: "publish", icon: Globe, number: 4 },
	];

	const useCases = [
		{ key: "territory", icon: Building2 },
		{ key: "stakeholders", icon: Users },
		{ key: "infrastructure", icon: Construction },
	];

	const solutionPillars = [
		{ key: "interactive", icon: Map },
		{ key: "integration3d", icon: Box },
		{ key: "multiActors", icon: Users },
	];

	const actionSteps = [
		{ key: "demo", icon: Phone },
		{ key: "needs", icon: ClipboardList },
		{ key: "proposal", icon: FileCheck },
	];

	const features = [
		{ key: "editor", icon: Edit3 },
		{ key: "3d", icon: Box },
		{ key: "analytics", icon: BarChart3 },
		{ key: "security", icon: Shield },
		{ key: "sharing", icon: Share2 },
		{ key: "support", icon: HeadphonesIcon },
	];

	return (
		<main>
			{/* Hero */}
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
				<ParallaxImage src="/image/WiseAtlas.png" alt="WiseAtlas" />
				<div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />

				<div className="relative z-10 container mx-auto max-w-7xl px-4">
					<div className="text-center max-w-4xl mx-auto">
						<span className="inline-block text-sm font-medium text-secondary bg-secondary/10 border border-secondary/20 px-4 py-1.5 rounded-full mb-6">
							{t("hero.badge")}
						</span>
						<h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white">
							{t("hero.title")}
						</h1>
						<p className="text-lg lg:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
							{t("hero.subtitle")}
						</p>
						<Button size="lg" asChild className="text-lg px-8 py-6">
							<Link href="/#contact">
								<MessageCircle className="size-5 mr-2" />
								{t("hero.cta")}
							</Link>
						</Button>
					</div>
				</div>

				{/* Scroll indicator */}
				<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
					<div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
						<div className="w-1 h-3 bg-white/50 rounded-full" />
					</div>
				</div>
			</section>

			{/* Solution - 3 Pillars */}
			<Section
				id="solution"
				variant="default"
				header={{
					title: t("solution.title"),
					description: t("solution.subtitle"),
					centered: true,
				}}
			>
				<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
					{solutionPillars.map((pillar) => {
						const Icon = pillar.icon;
						return (
							<div
								key={pillar.key}
								className="text-center p-6 rounded-2xl border border-border bg-card hover:border-secondary/50 transition-colors"
							>
								<div className="size-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
									<Icon className="size-8 text-secondary" />
								</div>
								<h3 className="text-xl font-bold mb-3">
									{t(`solution.pillars.${pillar.key}.title`)}
								</h3>
								<p className="text-muted-foreground leading-relaxed">
									{t(`solution.pillars.${pillar.key}.description`)}
								</p>
							</div>
						);
					})}
				</div>
			</Section>

			{/* Showcase - Visual section with image */}
			<section className="relative py-24 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-background to-secondary/10" />
				<div className="container mx-auto max-w-7xl px-4 relative z-10">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div>
							<h2 className="text-3xl lg:text-4xl font-bold mb-4">
								{t("showcase.title")}
							</h2>
							<p className="text-lg text-muted-foreground mb-8">
								{t("showcase.subtitle")}
							</p>
							<Button size="lg" variant="outline" asChild>
								<Link href="/#contact">
									{t("showcase.cta")}
									<ArrowRight className="size-4 ml-2" />
								</Link>
							</Button>
						</div>
						<div className="relative">
							<div className="aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl bg-muted">
								<Image
									src="/image/WiseAtlas.png"
									alt="WiseAtlas Interface"
									fill
									className="object-cover"
								/>
							</div>
							{/* Decorative elements */}
							<div className="absolute -top-4 -right-4 size-24 bg-secondary/20 rounded-full blur-2xl" />
							<div className="absolute -bottom-4 -left-4 size-32 bg-secondary/10 rounded-full blur-3xl" />
						</div>
					</div>
				</div>
			</section>

			{/* Collectivités */}
			<Section
				id="collectivites"
				variant="muted"
				header={{
					title: t("collectivites.title"),
					description: t("collectivites.subtitle"),
					centered: true,
				}}
			>
				<div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
					<div className="relative order-2 lg:order-1">
						<div className="aspect-video rounded-2xl overflow-hidden border border-border shadow-xl bg-muted">
							<Image
								src="/image/ecosystemed.wisetwin.eu_.png"
								alt="WiseAtlas pour les collectivités"
								fill
								className="object-cover"
							/>
						</div>
						<div className="absolute -bottom-4 -right-4 size-20 bg-secondary/20 rounded-full blur-xl" />
					</div>
					<div className="order-1 lg:order-2">
						<div className="flex items-center gap-3 mb-6">
							<div className="size-12 bg-secondary/10 rounded-xl flex items-center justify-center">
								<Landmark className="size-6 text-secondary" />
							</div>
							<h3 className="text-2xl font-bold">{t("collectivites.title")}</h3>
						</div>
						<ul className="space-y-4 mb-8">
							{(t.raw("collectivites.features") as string[]).map((feature, i) => (
								<li key={i} className="flex items-start gap-3">
									<Check className="size-5 text-secondary shrink-0 mt-0.5" />
									<span>{feature}</span>
								</li>
							))}
						</ul>
						<Button size="lg" asChild>
							<Link href="/#contact">
								<MessageCircle className="size-4 mr-2" />
								{t("collectivites.cta")}
							</Link>
						</Button>
					</div>
				</div>
			</Section>

			{/* Entreprises */}
			<Section
				id="entreprises"
				variant="default"
				header={{
					title: t("entreprises.title"),
					description: t("entreprises.subtitle"),
					centered: true,
				}}
			>
				<div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
					<div>
						<div className="flex items-center gap-3 mb-6">
							<div className="size-12 bg-secondary/10 rounded-xl flex items-center justify-center">
								<Factory className="size-6 text-secondary" />
							</div>
							<h3 className="text-2xl font-bold">{t("entreprises.title")}</h3>
						</div>
						<ul className="space-y-4 mb-8">
							{(t.raw("entreprises.features") as string[]).map((feature, i) => (
								<li key={i} className="flex items-start gap-3">
									<Check className="size-5 text-secondary shrink-0 mt-0.5" />
									<span>{feature}</span>
								</li>
							))}
						</ul>
						<Button size="lg" asChild>
							<Link href="/#contact">
								<MessageCircle className="size-4 mr-2" />
								{t("entreprises.cta")}
							</Link>
						</Button>
					</div>
					<div className="relative">
						<div className="aspect-video rounded-2xl overflow-hidden border border-border shadow-xl bg-muted">
							<Image
								src="/image/WiseAtlas-entreprises.png"
								alt="WiseAtlas pour les entreprises"
								fill
								className="object-cover"
							/>
						</div>
						<div className="absolute -top-4 -left-4 size-20 bg-secondary/20 rounded-full blur-xl" />
					</div>
				</div>
			</Section>

			{/* Consultation Publique */}
			<section className="relative py-24 overflow-hidden">
				<div className="absolute inset-0">
					<Image
						src="/image/WiseAtlas.png"
						alt="Consultation publique"
						fill
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-black/80" />
				</div>
				<div className="container mx-auto max-w-7xl px-4 relative z-10">
					<div className="max-w-3xl mx-auto text-center text-white">
						<span className="inline-block text-sm font-medium text-secondary bg-secondary/10 border border-secondary/20 px-4 py-1.5 rounded-full mb-6">
							{t("consultation.subtitle")}
						</span>
						<h2 className="text-3xl lg:text-4xl font-bold mb-6">
							{t("consultation.title")}
						</h2>
						<p className="text-lg text-white/80 mb-8 italic">
							"{t("consultation.description")}"
						</p>
						<ul className="grid sm:grid-cols-2 gap-4 text-left mb-10 max-w-2xl mx-auto">
							{(t.raw("consultation.features") as string[]).map((feature, i) => (
								<li key={i} className="flex items-start gap-3">
									<Check className="size-5 text-secondary shrink-0 mt-0.5" />
									<span className="text-white/90">{feature}</span>
								</li>
							))}
						</ul>
						<Button size="lg" variant="secondary" asChild>
							<Link href="/#contact">
								<MessageCircle className="size-4 mr-2" />
								{t("consultation.cta")}
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* How it works - Timeline */}
			<Section
				id="how-it-works"
				variant="default"
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
										<div
											key={step.key}
											className="relative flex flex-col items-center text-center"
										>
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

			{/* Use Cases */}
			<Section
				id="use-cases"
				variant="muted"
				header={{
					title: t("useCases.title"),
					description: t("useCases.subtitle"),
					centered: true,
				}}
			>
				<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
					{useCases.map((useCase) => {
						const Icon = useCase.icon;
						return (
							<div
								key={useCase.key}
								className="text-center p-6 rounded-2xl border border-border bg-card"
							>
								<div className="size-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
									<Icon className="size-8 text-secondary" />
								</div>
								<h3 className="text-xl font-bold mb-3">
									{t(`useCases.${useCase.key}.title`)}
								</h3>
								<p className="text-muted-foreground leading-relaxed mb-4">
									{t(`useCases.${useCase.key}.description`)}
								</p>
								<div className="flex flex-wrap gap-2 justify-center">
									{(t.raw(`useCases.${useCase.key}.tags`) as string[]).map((tag) => (
										<span
											key={tag}
											className="text-xs font-medium bg-secondary/10 text-secondary px-3 py-1 rounded-full"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						);
					})}
				</div>
			</Section>

			{/* Features Grid */}
			<Section
				id="features"
				variant="default"
				header={{
					title: t("features.title"),
					centered: true,
				}}
			>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
					{features.map((feature) => {
						const Icon = feature.icon;
						return (
							<div
								key={feature.key}
								className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-secondary/50 transition-colors"
							>
								<div className="size-12 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
									<Icon className="size-6 text-secondary" />
								</div>
								<div>
									<h3 className="font-semibold mb-1">
										{t(`features.items.${feature.key}.title`)}
									</h3>
									<p className="text-sm text-muted-foreground">
										{t(`features.items.${feature.key}.description`)}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</Section>

			{/* Action - 3 steps CTA */}
			<section className="relative py-24 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-background to-secondary/5" />
				<div className="container mx-auto max-w-7xl px-4 relative z-10">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h2 className="text-3xl lg:text-4xl font-bold mb-4">
							{t("action.title")}
						</h2>
						<p className="text-lg text-muted-foreground">
							{t("action.subtitle")}
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
						{actionSteps.map((step) => {
							const Icon = step.icon;
							return (
								<div key={step.key} className="text-center">
									<div className="relative mb-6">
										<span className="text-6xl font-bold text-secondary/20">
											{t(`action.steps.${step.key}.number`)}
										</span>
									</div>
									<div className="size-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
										<Icon className="size-8 text-secondary" />
									</div>
									<h3 className="text-lg font-bold mb-2">
										{t(`action.steps.${step.key}.title`)}
									</h3>
									<p className="text-muted-foreground">
										{t(`action.steps.${step.key}.description`)}
									</p>
								</div>
							);
						})}
					</div>

					<div className="text-center">
						<Button size="lg" asChild className="text-lg px-8 py-6">
							<Link href="/#contact">
								<MessageCircle className="size-5 mr-2" />
								{t("action.cta")}
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<Section id="cta" variant="muted">
				<div className="text-center max-w-2xl mx-auto">
					<h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
					<p className="text-muted-foreground mb-8">{t("cta.description")}</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" asChild>
							<Link href="/#contact">
								<MessageCircle className="size-4 mr-2" />
								{t("cta.button")}
							</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<Link href="/faq">
								<HelpCircle className="size-4 mr-2" />
								{t("cta.faq")}
							</Link>
						</Button>
					</div>
				</div>
			</Section>
		</main>
	);
}
