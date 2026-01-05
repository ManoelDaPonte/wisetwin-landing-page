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

export default function PlatformPage() {
	const t = useTranslations("platform");
	const tCommon = useTranslations("common");

	const hubItems = [
		{ key: "wisetrainer", icon: Cuboid, color: "bg-blue-500" },
		{ key: "wisepaper", icon: FileText, color: "bg-purple-500" },
		{ key: "users", icon: Users, color: "bg-green-500" },
		{ key: "results", icon: TrendingUp, color: "bg-orange-500" },
	];

	const features = [
		{ key: "trainingPlans", icon: ClipboardList },
		{ key: "tracking", icon: BarChart3 },
		{ key: "certifications", icon: BadgeCheck },
		{ key: "reminders", icon: Bell },
		{ key: "guests", icon: UserPlus },
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
						<div className="relative w-full">
							<div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl transform scale-110" />
							<div className="relative aspect-video rounded-2xl overflow-hidden bg-muted shadow-2xl">
								<Image
									src="/image/dashboard.webp"
									alt="WiseTwin Platform"
									fill
									className="object-cover"
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

				{/* Features */}
			<Section
				id="features"
				variant="muted"
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
			<Section id="cta" variant="default">
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
