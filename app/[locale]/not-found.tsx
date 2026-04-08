import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	const t = useTranslations("metadata.notFound");

	return (
		<div className="min-h-[60vh] flex items-center justify-center">
			<div className="text-center px-4">
				<h1 className="text-7xl font-bold text-secondary mb-4">404</h1>
				<h2 className="text-2xl font-semibold mb-2">{t("heading")}</h2>
				<p className="text-muted-foreground mb-8 max-w-md mx-auto">
					{t("description")}
				</p>
				<Button asChild>
					<Link href="/">
						<ArrowLeft className="size-4 mr-2" />
						{t("backHome")}
					</Link>
				</Button>
			</div>
		</div>
	);
}
