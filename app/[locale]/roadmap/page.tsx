import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export const metadata = {
	title: "Roadmap | WiseTwin",
	description: "Découvrez notre feuille de route et les fonctionnalités à venir pour WiseTwin",
};

export default function RoadmapPage() {
	const tCommon = useTranslations("common");

	return (
		<div className="min-h-screen bg-background pt-24 pb-8">
			<div className="container mx-auto px-4">
				{/* Back button */}
				<Link
					href="/"
					className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
				>
					<ArrowLeft className="size-4" />
					<span>{tCommon("back")}</span>
				</Link>

				{/* Header */}
				<div className="mb-6">
					<h1 className="text-4xl font-bold mb-2">Roadmap</h1>
					<p className="text-muted-foreground text-lg">
						Découvrez notre feuille de route et les fonctionnalités à venir
					</p>
				</div>

				{/* Notion embed */}
				<iframe
					src="https://purrfect-promise-b19.notion.site/ebd/2a7b5d4baf94809a8647d1c6e72b2bf6?v=2a7b5d4baf9480a1b09b000c77433552"
					className="w-full h-[calc(100vh-16rem)] rounded-lg"
					style={{ border: 0 }}
					allowFullScreen
				/>
			</div>
		</div>
	);
}
