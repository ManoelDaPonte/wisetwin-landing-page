import { Section } from "@/components/common/section";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
	const faqs = [
		{
			question: "Qu'est-ce que Wise Twin ?",
			answer:
				"Wise Twin est une solution de formation industrielle 100% en ligne qui utilise des environnements 3D immersifs. Elle permet de transformer vos formations traditionnelles en expériences interactives et engageantes, fidèles à votre réalité métier.",
		},
		{
			question: "Comment Wise Twin peut-il aider mon entreprise ?",
			answer:
				"Wise Twin permet de réduire les risques, d'améliorer l'engagement des employés, et d'optimiser les coûts de formation. Vous pouvez simuler des situations dangereuses sans risque, analyser les incidents passés, et former vos équipes sur vos installations réelles en 3D.",
		},
		{
			question: "Quels types de formations puis-je créer avec Wise Twin ?",
			answer:
				"Vous pouvez créer des formations en environnement 3D immersif, intégrer des vidéos directement dans l'espace 3D, et transformer vos documents existants (PDF, PowerPoint) en formations interactives avec validation des connaissances.",
		},
		{
			question: "Wise Twin fonctionne-t-il avec nos contenus existants ?",
			answer:
				"Absolument ! Nous transformons vos PDF, PowerPoint et autres supports de formation en modules interactifs. Vos catalogues sont personnalisés et adaptés à votre secteur et vos procédures spécifiques.",
		},
		{
			question: "Dans quelles langues Wise Twin est-il disponible ?",
			answer:
				"Wise Twin supporte plusieurs langues incluant le français, l'anglais, l'allemand, le hongrois et l'espagnol. Tous les contenus, voix off, sous-titrages et textes peuvent être localisés selon vos besoins.",
		},
		{
			question: "Combien de temps faut-il pour déployer Wise Twin ?",
			answer:
				"Le déploiement de Wise Twin prend moins d'une semaine, comparé aux 3+ mois nécessaires avec les solutions concurrentes. C'est 25x plus rapide que les méthodes traditionnelles de développement de jumeaux numériques.",
		},
		{
			question: "Quels sont les avantages économiques de Wise Twin ?",
			answer:
				"Wise Twin coûte 5x moins cher que les solutions concurrentes et permet un développement 25x plus rapide. Vous bénéficiez d'un retour sur investissement accéléré grâce à une formation plus efficace et des risques réduits.",
		},
		{
			question: "Comment fonctionne le suivi des progressions ?",
			answer:
				"Wise Twin inclut un tableau de bord complet avec suivi des progressions, scores de performance, certifications, et analytics détaillés. Vous avez un contrôle granulaire des permissions et des groupes d'utilisateurs.",
		},
		{
			question: "Wise Twin nécessite-t-il une installation particulière ?",
			answer:
				"Non ! Wise Twin est 100% en ligne et accessible depuis n'importe où, sans installation. Vos équipes peuvent se former depuis leur poste de travail, à domicile, ou en mobilité.",
		},
		{
			question: "Comment gérez-vous les plans de formation ?",
			answer:
				"Wise Twin permet de créer et gérer des plans de formation personnalisés directement depuis la plateforme. Vous pouvez suivre l'avancement de chaque utilisateur en temps réel, définir des parcours par métier et recevoir des rapports détaillés sur les progressions.",
		},
		{
			question: "Wise Twin peut-il s'intégrer à nos systèmes RH ?",
			answer:
				"Oui ! Wise Twin s'intègre directement avec vos services RH et paie pour automatiser l'import des employés et synchroniser leurs informations. Cela évite la double saisie et maintient vos données à jour automatiquement.",
		},
		{
			question: "Comment fonctionnent les certifications ?",
			answer:
				"Les certifications sont automatiquement générées et envoyées par email dès qu'un apprenant valide une formation. Vous pouvez personnaliser les modèles de certificats selon votre branding et vos exigences réglementaires.",
		},
		{
			question: "Puis-je envoyer des rappels aux apprenants ?",
			answer:
				"Absolument ! Wise Twin dispose d'un système de rappels automatiques basé sur vos règles métier, mais vous pouvez aussi envoyer des notifications manuellement. Les apprenants reçoivent des rappels pour les formations obligatoires, les échéances, etc.",
		},
		{
			question: "Les apprenants ont-ils accès à leurs statistiques ?",
			answer:
				"Chaque apprenant dispose de son espace personnel avec un tableau de bord complet : historique des formations, statistiques de performance, certificats obtenus, et progression dans les parcours de formation.",
		},
		{
			question: "Peut-on modifier les formations après leur création ?",
			answer:
				"Oui, les formations ne sont pas figées ! Vous pouvez modifier et actualiser vos contenus 3D et textuels à tout moment sans interruption de service. Les mises à jour sont automatiquement disponibles pour tous les utilisateurs.",
		},
		{
			question: "Wise Twin gère-t-il les multi-sites industriels ?",
			answer:
				"Parfaitement ! Wise Twin supporte la gestion multi-organisation avec des permissions granulaires par site. Vous pouvez gérer plusieurs sites industriels depuis une plateforme unique tout en maintenant l'autonomie de chaque site.",
		},
		{
			question: "Comment fonctionne la tarification ?",
			answer:
				"Wise Twin propose une tarification à l'usage : vous payez uniquement pour les formations réellement suivies. Si vos employés n'utilisent pas le service, il n'y a pas de coût supplémentaire. C'est transparent et adapté à votre utilisation réelle.",
		},
		{
			question: "Quel support est disponible pour Wise Twin ?",
			answer:
				"Une équipe dédiée vous accompagne dans le déploiement et l'utilisation de Wise Twin. Nous proposons un support complet pour la mise en place, la formation de vos équipes, et l'optimisation de vos modules de formation.",
		},
	];

	return (
		<Section
			id="faq"
			variant="muted"
			header={{
				title: "Questions fréquentes",
				description:
					"Retrouvez les réponses aux questions les plus courantes sur Wise Twin",
				centered: true,
			}}
		>
			<div className="max-w-3xl mx-auto">
				<Accordion type="single" collapsible className="space-y-4">
					{faqs.map((faq, index) => (
						<AccordionItem
							key={index}
							value={`item-${index}`}
							className="border border-border rounded-lg px-6 bg-background/50 backdrop-blur-sm"
						>
							<AccordionTrigger className="text-left hover:no-underline">
								<span className="font-semibold">{faq.question}</span>
							</AccordionTrigger>
							<AccordionContent className="text-muted-foreground leading-relaxed">
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</Section>
	);
}