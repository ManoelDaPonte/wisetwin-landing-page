import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { TryFreeButton } from "@/components/ui/try-free-button";
import { Section } from "@/components/common/section";
import {
	ArrowLeft,
	CheckCircle,
	PenLine,
	BarChart3,
	Route,
	ShieldCheck,
	Users,
	FileOutput,
	Check,
} from "lucide-react";
import Image from "next/image";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "platform" });
	return {
		title: `${t("title")} - WiseTwin`,
		description: t("hero.subtitle"),
	};
}

const featureGroups = [
	{ key: "contentManagement", icon: PenLine },
	{ key: "tracking", icon: BarChart3 },
	{ key: "planning", icon: Route },
	{ key: "security", icon: ShieldCheck },
	{ key: "collaboration", icon: Users },
	{ key: "exports", icon: FileOutput },
] as const;

export default function PlatformPage() {
	const t = useTranslations("platform");
	const tCommon = useTranslations("common");

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
						<TryFreeButton size="lg">
							{t("hero.cta")}
						</TryFreeButton>
					</div>

					<div className="relative max-w-5xl mx-auto">
						<div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-gradient-to-r from-secondary/20 via-primary/20 to-secondary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
						<div className="relative flex items-end justify-center overflow-hidden -mt-16">
							<div className="relative w-[220%] -ml-[20%] z-20">
								<Image
									src="/frame/WiseTrainer-wisetwin.png"
									alt="WiseTrainer - Simulation 3D sur laptop"
									width={1200}
									height={750}
									className="w-full h-auto"
									priority
								/>
							</div>
							<div className="relative w-[140%] -ml-[68%] z-30">
								<Image
									src="/frame/WiseTour-wisetwin.png"
									alt="WiseTour - Visite virtuelle sur tablette"
									width={800}
									height={600}
									className="w-full h-auto"
								/>
							</div>
							<div className="relative w-[90%] -ml-[45%] z-40">
								<Image
									src="/frame/WiseAtlas-wisetwin.png"
									alt="WiseAtlas - Carte interactive sur mobile"
									width={400}
									height={800}
									className="w-full h-auto"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features */}
			<Section
				id="features"
				variant="muted"
				header={{
					title: t("features.title"),
					description: t("features.subtitle"),
					centered: true,
				}}
			>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
					{featureGroups.map((group) => {
						const Icon = group.icon;
						const items = t.raw(
							`features.${group.key}.items`,
						) as string[];
						return (
							<div
								key={group.key}
								className="bg-card border border-border rounded-xl p-6 flex flex-col"
							>
								<div className="size-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
									<Icon className="size-6 text-secondary" />
								</div>
								<h3 className="text-lg font-semibold mb-2">
									{t(`features.${group.key}.title`)}
								</h3>
								<p className="text-sm text-muted-foreground mb-4">
									{t(`features.${group.key}.description`)}
								</p>
								<ul className="space-y-2 mt-auto">
									{items.map((item, i) => (
										<li
											key={i}
											className="flex items-start gap-2"
										>
											<Check className="size-4 text-secondary shrink-0 mt-0.5" />
											<span className="text-sm">
												{item}
											</span>
										</li>
									))}
								</ul>
							</div>
						);
					})}
				</div>
			</Section>

			{/* CTA */}
			<Section id="cta" variant="default">
				<div className="text-center max-w-2xl mx-auto">
					<h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
					<p className="text-muted-foreground mb-8">
						{t("cta.description")}
					</p>
					<TryFreeButton size="lg">{t("cta.button")}</TryFreeButton>
				</div>
			</Section>
		</main>
	);
}
