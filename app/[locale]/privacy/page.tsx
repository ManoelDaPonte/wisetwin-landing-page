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
		title: `${t("privacy")} - WiseTwin`,
	};
}

export default function PrivacyPage() {
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

				<h1 className="text-4xl font-bold mb-8">{t("footer.privacy")}</h1>

				<div className="prose prose-neutral dark:prose-invert max-w-none">
					<h2>1. Introduction</h2>
					<p>
						La société <strong>Wise Software Solution SAS</strong>, dont le siège social est situé Bâtiment EcosystèmeD, 60 route du Pertuis du Môle 2, 59140 Dunkerque, France, immatriculée sous le numéro SIRET 987 906 765 00019, (ci-après &quot;WiseTwin&quot;, &quot;nous&quot;, &quot;notre&quot;) s&apos;engage à protéger la vie privée des utilisateurs de sa plateforme.
					</p>
					<p>
						Cette politique de confidentialité décrit comment nous collectons, utilisons, stockons et protégeons vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
					</p>

					<h2>2. Responsable du traitement</h2>
					<table className="not-prose w-full border-collapse my-6">
						<tbody className="divide-y divide-border">
							<tr>
								<td className="py-2 font-medium">Responsable du traitement</td>
								<td className="py-2">Wise Software Solution SAS</td>
							</tr>
							<tr>
								<td className="py-2 font-medium">Délégué à la Protection des Données (DPO)</td>
								<td className="py-2">Manoel Da Ponte</td>
							</tr>
							<tr>
								<td className="py-2 font-medium">Email DPO</td>
								<td className="py-2"><a href="mailto:daponte.manoel@wisetwin.eu" className="text-secondary hover:underline">daponte.manoel@wisetwin.eu</a></td>
							</tr>
							<tr>
								<td className="py-2 font-medium">Adresse</td>
								<td className="py-2">Bâtiment EcosystèmeD, 60 route du Pertuis du Môle 2, 59140 Dunkerque, France</td>
							</tr>
						</tbody>
					</table>

					<h2>3. Données collectées</h2>
					<h3>3.1 Données que vous nous fournissez</h3>
					<p><strong>Données d&apos;identification :</strong></p>
					<ul>
						<li>Nom et prénom</li>
						<li>Adresse email professionnelle</li>
						<li>Mot de passe (stocké sous forme hashée, jamais en clair)</li>
					</ul>
					<p><strong>Données professionnelles :</strong></p>
					<ul>
						<li>Nom de votre organisation</li>
						<li>Rôle au sein de l&apos;organisation</li>
					</ul>

					<h3>3.2 Données collectées automatiquement</h3>
					<p><strong>Données techniques :</strong></p>
					<ul>
						<li>Adresse IP</li>
						<li>Type de navigateur et version</li>
						<li>Système d&apos;exploitation</li>
						<li>Pages visitées et actions effectuées</li>
						<li>Date et heure de connexion</li>
					</ul>
					<p><strong>Données d&apos;utilisation :</strong></p>
					<ul>
						<li>Progression dans les formations</li>
						<li>Temps passé sur la plateforme</li>
						<li>Résultats aux évaluations</li>
					</ul>

					<h3>3.3 Données sensibles</h3>
					<p>
						Nous ne collectons <strong>aucune donnée sensible</strong> au sens de l&apos;article 9 du RGPD (origine raciale, opinions politiques, convictions religieuses, données de santé, orientation sexuelle, etc.).
					</p>

					<h2>4. Finalités et bases légales</h2>
					<table className="not-prose w-full border-collapse my-6">
						<thead>
							<tr className="border-b border-border">
								<th className="py-2 text-left font-medium">Finalité</th>
								<th className="py-2 text-left font-medium">Base légale</th>
								<th className="py-2 text-left font-medium">Article RGPD</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							<tr>
								<td className="py-2">Création et gestion de votre compte</td>
								<td className="py-2">Exécution du contrat</td>
								<td className="py-2">Art. 6.1.b</td>
							</tr>
							<tr>
								<td className="py-2">Fourniture du service de formation</td>
								<td className="py-2">Exécution du contrat</td>
								<td className="py-2">Art. 6.1.b</td>
							</tr>
							<tr>
								<td className="py-2">Suivi de votre progression</td>
								<td className="py-2">Exécution du contrat</td>
								<td className="py-2">Art. 6.1.b</td>
							</tr>
							<tr>
								<td className="py-2">Facturation et paiement</td>
								<td className="py-2">Exécution du contrat</td>
								<td className="py-2">Art. 6.1.b</td>
							</tr>
							<tr>
								<td className="py-2">Sécurité de la plateforme</td>
								<td className="py-2">Intérêt légitime</td>
								<td className="py-2">Art. 6.1.f</td>
							</tr>
							<tr>
								<td className="py-2">Amélioration du service</td>
								<td className="py-2">Intérêt légitime</td>
								<td className="py-2">Art. 6.1.f</td>
							</tr>
							<tr>
								<td className="py-2">Respect des obligations légales</td>
								<td className="py-2">Obligation légale</td>
								<td className="py-2">Art. 6.1.c</td>
							</tr>
							<tr>
								<td className="py-2">Communication marketing</td>
								<td className="py-2">Consentement</td>
								<td className="py-2">Art. 6.1.a</td>
							</tr>
						</tbody>
					</table>

					<h2>5. Destinataires des données</h2>
					<h3>5.1 Accès interne</h3>
					<p>Vos données sont accessibles uniquement aux personnes habilitées :</p>
					<ul>
						<li>Équipe technique WiseTwin (maintenance et support)</li>
						<li>Administrateurs de votre organisation (données de leur organisation uniquement)</li>
					</ul>

					<h3>5.2 Sous-traitants</h3>
					<p>Nous faisons appel aux sous-traitants suivants, tous conformes au RGPD :</p>
					<table className="not-prose w-full border-collapse my-6">
						<thead>
							<tr className="border-b border-border">
								<th className="py-2 text-left font-medium">Sous-traitant</th>
								<th className="py-2 text-left font-medium">Service</th>
								<th className="py-2 text-left font-medium">Localisation</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							<tr>
								<td className="py-2">Neon</td>
								<td className="py-2">Base de données</td>
								<td className="py-2">Union Européenne (Allemagne)</td>
							</tr>
							<tr>
								<td className="py-2">WorkOS</td>
								<td className="py-2">Authentification SSO</td>
								<td className="py-2">Union Européenne</td>
							</tr>
							<tr>
								<td className="py-2">Microsoft Azure</td>
								<td className="py-2">Hébergement des fichiers</td>
								<td className="py-2">Union Européenne (Pays-Bas, Irlande)</td>
							</tr>
							<tr>
								<td className="py-2">Vercel</td>
								<td className="py-2">Hébergement de l&apos;application</td>
								<td className="py-2">Union Européenne</td>
							</tr>
						</tbody>
					</table>

					<h3>5.3 Transferts hors UE</h3>
					<p>
						<strong>Aucun transfert de données hors de l&apos;Union Européenne n&apos;est effectué.</strong> Toutes vos données sont hébergées exclusivement dans des datacenters situés en Union Européenne.
					</p>

					<h2>6. Durée de conservation</h2>
					<table className="not-prose w-full border-collapse my-6">
						<thead>
							<tr className="border-b border-border">
								<th className="py-2 text-left font-medium">Type de données</th>
								<th className="py-2 text-left font-medium">Durée de conservation</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							<tr>
								<td className="py-2">Données de compte utilisateur</td>
								<td className="py-2">Durée du contrat + 30 jours après suppression</td>
							</tr>
							<tr>
								<td className="py-2">Données de progression</td>
								<td className="py-2">Durée du contrat de l&apos;organisation</td>
							</tr>
							<tr>
								<td className="py-2">Données de facturation</td>
								<td className="py-2">10 ans (obligation légale comptable)</td>
							</tr>
							<tr>
								<td className="py-2">Logs de sécurité</td>
								<td className="py-2">1 an</td>
							</tr>
							<tr>
								<td className="py-2">Cookies de session</td>
								<td className="py-2">Durée de la session</td>
							</tr>
						</tbody>
					</table>
					<p>
						À l&apos;expiration de ces délais, vos données sont supprimées ou anonymisées de manière irréversible.
					</p>

					<h2>7. Vos droits</h2>
					<p>Conformément au RGPD, vous disposez des droits suivants :</p>
					<ul>
						<li><strong>Droit d&apos;accès (Article 15)</strong> : Vous pouvez obtenir la confirmation que vos données sont traitées et en obtenir une copie.</li>
						<li><strong>Droit de rectification (Article 16)</strong> : Vous pouvez demander la correction de données inexactes ou incomplètes.</li>
						<li><strong>Droit à l&apos;effacement (Article 17)</strong> : Vous pouvez demander la suppression de vos données, sauf si nous avons une obligation légale de les conserver.</li>
						<li><strong>Droit à la limitation du traitement (Article 18)</strong> : Vous pouvez demander la limitation du traitement de vos données dans certains cas.</li>
						<li><strong>Droit à la portabilité (Article 20)</strong> : Vous pouvez recevoir vos données dans un format structuré et lisible par machine.</li>
						<li><strong>Droit d&apos;opposition (Article 21)</strong> : Vous pouvez vous opposer au traitement de vos données pour des motifs légitimes.</li>
					</ul>

					<h3>Exercer vos droits</h3>
					<p>Pour exercer vos droits, contactez-nous :</p>
					<ul>
						<li><strong>Par email</strong> : <a href="mailto:daponte.manoel@wisetwin.eu" className="text-secondary hover:underline">daponte.manoel@wisetwin.eu</a> (DPO)</li>
						<li><strong>Par courrier</strong> : Bâtiment EcosystèmeD, 60 route du Pertuis du Môle 2, 59140 Dunkerque, France</li>
					</ul>
					<p>Nous répondrons à votre demande dans un délai de <strong>30 jours maximum</strong>.</p>

					<h3>Réclamation</h3>
					<p>Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL :</p>
					<ul>
						<li><strong>Site</strong> : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">www.cnil.fr</a></li>
						<li><strong>Adresse</strong> : CNIL, 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07</li>
					</ul>

					<h2>8. Sécurité des données</h2>
					<p>Nous mettons en oeuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :</p>
					<p><strong>Mesures techniques :</strong></p>
					<ul>
						<li>Chiffrement des données en transit (HTTPS/TLS 1.2+)</li>
						<li>Chiffrement des données au repos (AES-256)</li>
						<li>Mots de passe hashés avec bcrypt</li>
						<li>Authentification multi-facteurs (MFA) disponible</li>
						<li>Isolation des données par organisation</li>
					</ul>
					<p><strong>Mesures organisationnelles :</strong></p>
					<ul>
						<li>Accès restreint sur le principe du &quot;besoin d&apos;en connaître&quot;</li>
						<li>Journalisation des accès</li>
						<li>Procédures de gestion des incidents</li>
						<li>Tests de sécurité réguliers</li>
					</ul>

					<h2>9. Cookies</h2>
					<h3>Cookies utilisés</h3>
					<table className="not-prose w-full border-collapse my-6">
						<thead>
							<tr className="border-b border-border">
								<th className="py-2 text-left font-medium">Nom</th>
								<th className="py-2 text-left font-medium">Finalité</th>
								<th className="py-2 text-left font-medium">Durée</th>
								<th className="py-2 text-left font-medium">Type</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							<tr>
								<td className="py-2">next-auth.csrf-token</td>
								<td className="py-2">Sécurité (CSRF)</td>
								<td className="py-2">Session</td>
								<td className="py-2">Strictement nécessaire</td>
							</tr>
							<tr>
								<td className="py-2">next-auth.session-token</td>
								<td className="py-2">Authentification</td>
								<td className="py-2">Session</td>
								<td className="py-2">Strictement nécessaire</td>
							</tr>
							<tr>
								<td className="py-2">theme</td>
								<td className="py-2">Préférence thème</td>
								<td className="py-2">1 an</td>
								<td className="py-2">Fonctionnel</td>
							</tr>
						</tbody>
					</table>
					<p>
						Les cookies strictement nécessaires au fonctionnement du service ne nécessitent pas votre consentement. Sans eux, la plateforme ne peut pas fonctionner. Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.
					</p>

					<h2>10. Modifications de la politique</h2>
					<p>
						Nous pouvons mettre à jour cette politique de confidentialité. En cas de modification substantielle, nous vous en informerons par email ou via une notification sur la plateforme. La date de dernière mise à jour est indiquée en bas de ce document.
					</p>

					<h2>11. Contact</h2>
					<p>Pour toute question relative à cette politique de confidentialité ou à vos données personnelles :</p>
					<ul>
						<li><strong>Par email</strong> : <a href="mailto:daponte.manoel@wisetwin.eu" className="text-secondary hover:underline">daponte.manoel@wisetwin.eu</a> (DPO)</li>
						<li><strong>Par courrier</strong> : Bâtiment EcosystèmeD, 60 route du Pertuis du Môle 2, 59140 Dunkerque, France</li>
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
