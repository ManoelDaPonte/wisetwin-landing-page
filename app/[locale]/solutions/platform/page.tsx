import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import {
	ClipboardList,
	BarChart3,
	BadgeCheck,
	Bell,
	UserPlus,
	ArrowLeft,
	CheckCircle,
	Cuboid,
	FileText,
	Users,
	TrendingUp,
	PenLine,
	Upload,
	Sparkles,
	LineChart,
} from "lucide-react";
import { ThemeImage } from "@/components/ui/theme-image";

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

export default function PlatformPage() {
	const t = useTranslations("platform");
	const tCommon = useTranslations("common");

	const hubItems = [
		{ key: "wisetrainer", icon: Cuboid, color: "bg-secondary" },
		{ key: "wisepaper", icon: FileText, color: "bg-secondary" },
		{ key: "users", icon: Users, color: "bg-secondary" },
		{ key: "results", icon: TrendingUp, color: "bg-secondary" },
	];

	const features = [
		{ key: "trainingPlans", icon: ClipboardList },
		{ key: "tracking", icon: BarChart3 },
		{ key: "certifications", icon: BadgeCheck },
		{ key: "reminders", icon: Bell },
		{ key: "guests", icon: UserPlus },
	];

	const wisePaperFeatures = [
		{ key: "create", icon: PenLine },
		{ key: "import", icon: Upload },
		{ key: "ai", icon: Sparkles },
		{ key: "tracking", icon: LineChart },
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
									<span className="text-xs text-muted-foreground">app.wisetwin.eu</span>
								</div>
							</div>

							{/* Screenshot */}
							<div className="relative">
								<ThemeImage
									lightSrc="/image/platform-dark.png"
									darkSrc="/image/platform-light.png"
									alt="WiseTwin Platform Dashboard"
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

			{/* Hub Section */}
			<Section
				id="hub"
				variant="dark"
				header={{
					title: t("hub.title"),
					description: t("hub.subtitle"),
					centered: true,
				}}
			>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
					{hubItems.map((item) => {
						const Icon = item.icon;
						return (
							<div
								key={item.key}
								className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center hover:border-secondary/50 transition-all"
							>
								<div className={`size-14 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
									<Icon className="size-7 text-white" />
								</div>
								<h3 className="text-lg font-bold text-white mb-1">
									{t(`hub.items.${item.key}.title`)}
								</h3>
								<p className="text-white/70 text-sm">
									{t(`hub.items.${item.key}.description`)}
								</p>
							</div>
						);
					})}
				</div>
			</Section>

			{/* WisePaper Section */}
			<Section
				id="wisepaper"
				variant="muted"
				header={{
					title: t("wisepaper.title"),
					description: t("wisepaper.subtitle"),
					centered: true,
				}}
			>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
					{wisePaperFeatures.map((feature) => {
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
									{t(`wisepaper.features.${feature.key}.title`)}
								</h3>
								<p className="text-muted-foreground text-sm">
									{t(`wisepaper.features.${feature.key}.description`)}
								</p>
							</div>
						);
					})}
				</div>
			</Section>

			{/* Features */}
			<Section
				id="features"
				variant="default"
				header={{
					title: t("features.title"),
					centered: true,
				}}
			>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
					{features.map((feature, index) => {
						const Icon = feature.icon;
						const isLast = index === features.length - 1;
						return (
							<div
								key={feature.key}
								className={`bg-card border border-border rounded-xl p-6 ${
									isLast ? "md:col-span-2 lg:col-span-1" : ""
								}`}
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
