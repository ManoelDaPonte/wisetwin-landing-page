import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import {
	Building2,
	Users,
	Construction,
	Check,
	MessageCircle,
	HelpCircle,
	Landmark,
	Factory,
	Scale,
	Layers,
	UserCog,
	Share2,
} from "lucide-react";
import Image from "next/image";
import { ParallaxImage } from "@/components/ui/parallax-image";

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

	const pillars = [
		{ key: "rendering", icon: Layers },
		{ key: "collaboration", icon: UserCog },
		{ key: "sharing", icon: Share2 },
	];

	const steps = [
		{ key: "define", number: 1 },
		{ key: "data", number: 2 },
		{ key: "design", number: 3 },
		{ key: "publish", number: 4 },
	];

	const useCases = [
		{ key: "territory", icon: Building2 },
		{ key: "stakeholders", icon: Users },
		{ key: "infrastructure", icon: Construction },
		{ key: "consultation", icon: Scale },
	];

	const audiences = [
		{
			key: "collectivites",
			icon: Landmark,
			image: "/image/ecosystemed.wisetwin.eu_.png",
		},
		{
			key: "entreprises",
			icon: Factory,
			image: "/image/WiseAtlas-entreprises.png",
		},
	];

	const actionSteps = [
		{ key: "demo" },
		{ key: "needs" },
		{ key: "proposal" },
	];

	return (
		<main>
			{/* Hero */}
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
				<ParallaxImage src="/image/WiseAtlas.png" alt="WiseAtlas" />
				<div className="absolute inset-0 hero-overlay" />

				<div className="relative z-10 container mx-auto max-w-7xl px-4">
					<div className="text-center max-w-3xl mx-auto">
						<h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-foreground dark:text-white">
							{t("hero.title")}
						</h1>
						<p className="text-lg lg:text-xl text-foreground/70 dark:text-white/80 mb-10 leading-relaxed">
							{t("hero.subtitle")}
						</p>
						<Button size="lg" asChild>
							<Link href="/#contact">
								<MessageCircle className="size-4 mr-2" />
								{t("hero.cta")}
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Pillars - What WiseAtlas is */}
			<Section
				id="pillars"
				variant="muted"
				header={{
					title: t("pillars.title"),
					description: t("pillars.subtitle"),
					centered: true,
				}}
			>
				<div className="max-w-6xl mx-auto">
					<div className="grid md:grid-cols-3 gap-8 mb-12">
						{pillars.map((pillar) => {
						const Icon = pillar.icon;
						return (
							<div
								key={pillar.key}
								className="bg-card border border-border rounded-xl p-6 text-center"
							>
								<div className="size-14 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
									<Icon className="size-7 text-secondary" />
								</div>
								<h3 className="text-lg font-bold mb-2">
									{t(`pillars.${pillar.key}.title`)}
								</h3>
								<p className="text-muted-foreground text-sm leading-relaxed">
									{t(`pillars.${pillar.key}.description`)}
								</p>
							</div>
						);
					})}
					</div>

					{/* Showcase image */}
					<div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-border shadow-xl bg-muted">
						<Image
							src="/image/WiseAtlas.png"
							alt="WiseAtlas platform"
							fill
							className="object-cover"
						/>
					</div>
				</div>
			</Section>

			{/* Audiences - Who it's for */}
			<Section
				id="audiences"
				variant="default"
				header={{
					title: t("audiences.title"),
					description: t("audiences.subtitle"),
					centered: true,
				}}
			>
				<div className="max-w-6xl mx-auto flex flex-col gap-16">
					{audiences.map((audience, index) => {
						const Icon = audience.icon;
						const isReversed = index % 2 !== 0;
						return (
							<div
								key={audience.key}
								className="grid lg:grid-cols-2 gap-12 items-center"
							>
								<div className={isReversed ? "lg:order-2" : ""}>
									<div className="flex items-center gap-3 mb-6">
										<div className="size-12 bg-secondary/10 rounded-xl flex items-center justify-center">
											<Icon className="size-6 text-secondary" />
										</div>
										<div>
											<h3 className="text-2xl font-bold">
												{t(`audiences.${audience.key}.title`)}
											</h3>
											<p className="text-sm text-muted-foreground">
												{t(`audiences.${audience.key}.subtitle`)}
											</p>
										</div>
									</div>
									<ul className="space-y-3">
										{(t.raw(`audiences.${audience.key}.features`) as string[]).map((feature, i) => (
											<li key={i} className="flex items-start gap-3">
												<Check className="size-5 text-secondary shrink-0 mt-0.5" />
												<span>{feature}</span>
											</li>
										))}
									</ul>
								</div>
								<div className={isReversed ? "lg:order-1" : ""}>
									{/* Browser frame */}
									<div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-xl">
										<div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
											<div className="flex gap-1.5">
												<div className="size-3 rounded-full bg-red-500" />
												<div className="size-3 rounded-full bg-yellow-500" />
												<div className="size-3 rounded-full bg-green-500" />
											</div>
											<div className="flex-1 text-center">
												<span className="text-xs text-muted-foreground">
													{t(`audiences.${audience.key}.title`)}
												</span>
											</div>
										</div>
										<div className="relative aspect-video">
											<Image
												src={audience.image}
												alt={t(`audiences.${audience.key}.title`)}
												fill
												className="object-cover"
											/>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</Section>

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
							<div className="absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-secondary/30" />
							<div className="absolute top-[22px] left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-secondary/60 via-secondary to-secondary/60 rounded-full" />

							<div className="grid grid-cols-4 gap-8">
								{steps.map((step) => (
									<div
										key={step.key}
										className="relative flex flex-col items-center text-center"
									>
										<div className="relative z-10 size-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-md shadow-secondary/20">
											{step.number}
										</div>
										<div className="mt-3 mb-4">
											<span className="inline-block text-xs font-semibold text-secondary bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full">
												{t(`howItWorks.steps.${step.key}.duration`)}
											</span>
										</div>
										<h3 className="font-semibold mb-1">
											{t(`howItWorks.steps.${step.key}.title`)}
										</h3>
										<p className="text-sm text-muted-foreground leading-relaxed">
											{t(`howItWorks.steps.${step.key}.description`)}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Mobile timeline */}
					<div className="lg:hidden">
						<div className="relative pl-12">
							<div className="absolute left-5 top-0 bottom-0 w-0.5 bg-secondary/30" />

							<div className="flex flex-col gap-8">
								{steps.map((step) => (
									<div key={step.key} className="relative">
										<div className="absolute -left-12 top-0 z-10 size-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-md shadow-secondary/20">
											{step.number}
										</div>
										<div className="flex-1">
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
								))}
							</div>
						</div>
					</div>
				</div>
			</Section>

			{/* Use Cases */}
			<Section
				id="use-cases"
				variant="default"
				header={{
					title: t("useCases.title"),
					centered: true,
				}}
			>
				<div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
					{useCases.map((useCase) => {
						const Icon = useCase.icon;
						return (
							<div
								key={useCase.key}
								className="flex items-start gap-4 bg-card border border-border rounded-xl p-6"
							>
								<div className="size-12 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
									<Icon className="size-6 text-secondary" />
								</div>
								<div>
									<h3 className="text-lg font-bold mb-1">
										{t(`useCases.${useCase.key}.title`)}
									</h3>
									<p className="text-muted-foreground text-sm leading-relaxed">
										{t(`useCases.${useCase.key}.description`)}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</Section>

			{/* CTA with action steps */}
			<Section id="cta" variant="muted">
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
						<p className="text-muted-foreground">{t("cta.subtitle")}</p>
					</div>

					{/* Action steps */}
					<div className="grid md:grid-cols-3 gap-8 mb-12">
						{actionSteps.map((step) => (
							<div key={step.key} className="text-center">
								<span className="text-4xl font-bold text-secondary">
									{t(`cta.steps.${step.key}.number`)}
								</span>
								<h3 className="font-semibold mt-2 mb-1">
									{t(`cta.steps.${step.key}.title`)}
								</h3>
								<p className="text-sm text-muted-foreground">
									{t(`cta.steps.${step.key}.description`)}
								</p>
							</div>
						))}
					</div>

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
