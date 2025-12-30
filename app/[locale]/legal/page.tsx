import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "footer" });
	return {
		title: `${t("legal")} - WiseTwin`,
	};
}

export default function LegalPage() {
	const t = useTranslations();

	return (
		<main className="py-20">
			<div className="container mx-auto max-w-4xl px-4">
				<Link
					href="/"
					className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
				>
					<ArrowLeft className="size-4" />
					<span>{t("common.back")}</span>
				</Link>

				<h1 className="text-4xl font-bold mb-8">{t("footer.legal")}</h1>

				<div className="prose prose-neutral dark:prose-invert max-w-none prose-li:my-2">
					<h2>Wise Software Solution SAS</h2>
					<p>Exploitant la marque commerciale <strong>WiseTwin</strong></p>

					<table className="not-prose w-full border-collapse my-6">
						<tbody className="divide-y divide-border">
							<tr>
								<td className="py-2 font-medium">Forme juridique</td>
								<td className="py-2">SAS (Société par Actions Simplifiée)</td>
							</tr>
							<tr>
								<td className="py-2 font-medium">Siège social</td>
								<td className="py-2">Bâtiment EcosystèmeD, 60 route du Pertuis du Môle 2, 59140 Dunkerque, France</td>
							</tr>
							<tr>
								<td className="py-2 font-medium">SIRET</td>
								<td className="py-2">987 906 765 00019</td>
							</tr>
							<tr>
								<td className="py-2 font-medium">TVA Intracommunautaire</td>
								<td className="py-2">FR58 987 906 765</td>
							</tr>
							<tr>
								<td className="py-2 font-medium">Représentant légal</td>
								<td className="py-2">Mickaël Lambrecht, Président</td>
							</tr>
							<tr>
								<td className="py-2 font-medium">Email</td>
								<td className="py-2"><a href="mailto:contact@wisetwin.eu" className="text-secondary hover:underline">contact@wisetwin.eu</a></td>
							</tr>
						</tbody>
					</table>

					<h2>Délégué à la Protection des Données (DPO)</h2>
					<table className="not-prose w-full border-collapse my-6">
						<tbody className="divide-y divide-border">
							<tr>
								<td className="py-2 font-medium">Nom</td>
								<td className="py-2">Manoel Da Ponte</td>
							</tr>
							<tr>
								<td className="py-2 font-medium">Email</td>
								<td className="py-2"><a href="mailto:daponte.manoel@wisetwin.eu" className="text-secondary hover:underline">daponte.manoel@wisetwin.eu</a></td>
							</tr>
						</tbody>
					</table>

					<h2>Hébergement</h2>
					<p>Ce site est hébergé par :</p>
					<ul>
						<li><strong>Application</strong> : Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA (Edge locations UE)</li>
						<li><strong>Base de données</strong> : Neon (serveurs Union Européenne - Allemagne)</li>
						<li><strong>Fichiers de formation</strong> : Microsoft Azure (Union Européenne - Pays-Bas, Irlande)</li>
					</ul>

					<h2>Propriété intellectuelle</h2>
					<p>
						L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos, marques, logiciels,
						simulateurs 3D) est la propriété exclusive de Wise Software Solution SAS ou de ses partenaires.
					</p>
					<p>
						Toute reproduction, représentation, modification, publication, adaptation de tout ou partie
						des éléments du site est interdite sans autorisation écrite préalable, conformément aux
						dispositions du Code de la propriété intellectuelle.
					</p>

					<hr />
					<p className="text-sm text-muted-foreground">
						Dernière mise à jour : Décembre 2025
					</p>
				</div>
			</div>
		</main>
	);
}
