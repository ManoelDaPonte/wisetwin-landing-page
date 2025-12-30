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
		title: `${t("terms")} - WiseTwin`,
	};
}

export default function TermsPage() {
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

				<h1 className="text-4xl font-bold mb-8">{t("footer.terms")}</h1>

				<div className="prose prose-neutral dark:prose-invert max-w-none prose-li:my-2">
					<h2>1. Objet et champ d&apos;application</h2>
					<p>
						Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre <strong>Wise Software Solution SAS</strong>, exploitant la marque commerciale WiseTwin, et tout client professionnel souhaitant souscrire aux services proposés.
					</p>
					<p>
						L&apos;acceptation des présentes CGV est un préalable indispensable à la souscription de tout abonnement ou service WiseTwin.
					</p>

					<h2>2. Identification du prestataire</h2>
					<table className="not-prose w-full border-collapse my-6">
						<tbody className="divide-y divide-border">
							<tr>
								<td className="py-2 font-medium">Dénomination sociale</td>
								<td className="py-2">Wise Software Solution SAS</td>
							</tr>
							<tr>
								<td className="py-2 font-medium">Marque commerciale</td>
								<td className="py-2">WiseTwin</td>
							</tr>
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
								<td className="py-2 font-medium">Email</td>
								<td className="py-2"><a href="mailto:contact@wisetwin.eu" className="text-secondary hover:underline">contact@wisetwin.eu</a></td>
							</tr>
						</tbody>
					</table>

					<h2>3. Description des services</h2>
					<p>WiseTwin propose les services suivants :</p>
					<h3>3.1 WiseTrainer</h3>
					<p>
						Simulateurs 3D immersifs personnalisés pour la formation industrielle. Les simulateurs sont développés sur mesure à partir des équipements et processus spécifiques du client.
					</p>
					<h3>3.2 WisePaper</h3>
					<p>
						Outil de création et de digitalisation de formations textuelles. Permet de transformer des contenus de formation existants en modules interactifs.
					</p>
					<h3>3.3 Plateforme de gestion</h3>
					<p>
						Accessible à l&apos;adresse <strong>app.wisetwin.eu</strong>, comprenant :
					</p>
					<ul>
						<li>Gestion des utilisateurs et des organisations</li>
						<li>Suivi de la progression des apprenants</li>
						<li>Tableaux de bord et rapports statistiques</li>
						<li>Plans de formation personnalisés</li>
						<li>Génération de certificats de formation</li>
					</ul>

					<h2>4. Tarification et paiement</h2>
					<h3>4.1 Formules d&apos;abonnement</h3>
					<p>
						Les tarifs en vigueur sont disponibles sur la page Tarifs du site web. Tous les prix s&apos;entendent en euros, hors taxes (HT). La TVA applicable sera ajoutée selon la législation en vigueur.
					</p>
					<h3>4.2 Développement sur mesure (WiseTrainer)</h3>
					<p>
						Les projets de développement de simulateurs 3D font l&apos;objet d&apos;un devis spécifique établi après analyse des besoins du client. Le tarif est calculé en fonction de la complexité du projet.
					</p>
					<h3>4.3 Modalités de paiement</h3>
					<ul>
						<li>Abonnements : facturation mensuelle ou annuelle, payable par prélèvement automatique ou virement bancaire</li>
						<li>Développement sur mesure : acompte de 30% à la commande, solde à la livraison</li>
						<li>Délai de paiement : 30 jours à compter de la date de facturation</li>
					</ul>
					<h3>4.4 Retard de paiement</h3>
					<p>
						Tout retard de paiement entraînera l&apos;application de pénalités de retard au taux légal en vigueur, ainsi qu&apos;une indemnité forfaitaire de 40 euros pour frais de recouvrement.
					</p>

					<h2>5. Durée et renouvellement</h2>
					<h3>5.1 Durée des abonnements</h3>
					<ul>
						<li><strong>Abonnement mensuel</strong> : engagement minimum d&apos;un mois, renouvelable tacitement</li>
						<li><strong>Abonnement annuel</strong> : engagement de 12 mois, renouvelable tacitement</li>
					</ul>
					<h3>5.2 Résiliation</h3>
					<p>
						L&apos;abonnement peut être résilié à tout moment par l&apos;une ou l&apos;autre des parties. La résiliation prend effet à la fin de la période de facturation en cours. Aucun remboursement prorata temporis n&apos;est effectué.
					</p>

					<h2>6. Propriété intellectuelle</h2>
					<h3>6.1 Propriété de WiseTwin</h3>
					<p>
						La plateforme WiseTwin, son interface, son code source, ainsi que tous les éléments qui la composent (marques, logos, logiciels, bases de données) sont la propriété exclusive de Wise Software Solution SAS.
					</p>
					<h3>6.2 Simulateurs 3D (WiseTrainer)</h3>
					<p>
						Les simulateurs 3D développés par WiseTwin restent la propriété de Wise Software Solution SAS. Le client bénéficie d&apos;une licence d&apos;utilisation non exclusive, non transférable, pour la durée de son abonnement.
					</p>
					<h3>6.3 Contenus du client</h3>
					<p>
						Les contenus créés par le client via WisePaper, ainsi que les données importées, restent la propriété exclusive du client. WiseTwin ne revendique aucun droit sur ces contenus.
					</p>

					<h2>7. Obligations des parties</h2>
					<h3>7.1 Obligations de WiseTwin</h3>
					<ul>
						<li>Fournir un accès continu à la plateforme (objectif de disponibilité de 99,5%)</li>
						<li>Assurer la sécurité et la confidentialité des données</li>
						<li>Fournir un support technique dans les délais raisonnables</li>
						<li>Effectuer les mises à jour nécessaires au bon fonctionnement du service</li>
					</ul>
					<h3>7.2 Obligations du client</h3>
					<ul>
						<li>Fournir des informations exactes lors de l&apos;inscription</li>
						<li>Maintenir la confidentialité de ses identifiants de connexion</li>
						<li>Ne pas tenter de contourner les mesures de sécurité</li>
						<li>Respecter les conditions d&apos;utilisation et la législation en vigueur</li>
						<li>S&apos;acquitter des paiements dans les délais convenus</li>
					</ul>

					<h2>8. Responsabilités et garanties</h2>
					<h3>8.1 Limitation de responsabilité</h3>
					<p>
						La responsabilité de WiseTwin est limitée aux dommages directs et prévisibles. En aucun cas, WiseTwin ne pourra être tenue responsable des dommages indirects tels que perte de données, perte d&apos;exploitation, perte de chiffre d&apos;affaires, ou préjudice d&apos;image.
					</p>
					<h3>8.2 Plafonnement</h3>
					<p>
						La responsabilité de WiseTwin est plafonnée au montant des sommes versées par le client au cours des 12 derniers mois précédant le dommage.
					</p>
					<h3>8.3 Force majeure</h3>
					<p>
						WiseTwin ne pourra être tenue responsable en cas de force majeure, incluant notamment : catastrophes naturelles, pannes de réseau, cyberattaques, décisions gouvernementales.
					</p>

					<h2>9. Protection des données personnelles</h2>
					<p>
						WiseTwin traite les données personnelles conformément au RGPD et à la loi Informatique et Libertés. Pour plus de détails, consultez notre <a href="/privacy" className="text-secondary hover:underline">Politique de Confidentialité</a>.
					</p>

					<h2>10. Modification des conditions</h2>
					<p>
						WiseTwin se réserve le droit de modifier les présentes CGV à tout moment. Les clients existants seront informés par email au moins 30 jours avant l&apos;entrée en vigueur des nouvelles conditions. L&apos;utilisation continue du service après cette date vaut acceptation des nouvelles conditions.
					</p>

					<h2>11. Droit applicable et juridiction</h2>
					<p>
						Les présentes CGV sont soumises au droit français. En cas de litige, les parties s&apos;engagent à rechercher une solution amiable. À défaut d&apos;accord, tout litige sera soumis à la compétence exclusive des tribunaux de commerce de Lille (France).
					</p>

					<h2>12. Contact</h2>
					<p>
						Pour toute question relative aux présentes CGV :
					</p>
					<ul>
						<li><strong>Par email</strong> : <a href="mailto:contact@wisetwin.eu" className="text-secondary hover:underline">contact@wisetwin.eu</a></li>
						<li><strong>Par courrier</strong> : Wise Software Solution SAS, Bâtiment EcosystèmeD, 60 route du Pertuis du Môle 2, 59140 Dunkerque, France</li>
					</ul>

					<hr />
					<p className="text-sm text-muted-foreground">
						Dernière mise à jour : Décembre 2025
					</p>
				</div>
			</div>
		</main>
	);
}
