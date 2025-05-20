// components/layout/footer.tsx
"use client";
import React from "react";
import Link from "next/link";
import { Linkedin, Mail, Phone, Map } from "lucide-react";
import Image from "next/image";

export function Footer() {
	const currentYear = new Date().getFullYear();

	// Colonnes de navigation du footer
	const footerSections = [
		{
			title: "Solutions",
			links: [
				{ label: "WiseTrainer", href: "/solutions/wisetrainer" },
				{ label: "WiseTour", href: "/solutions/wisetour" },
			],
		},
		{
			title: "Profils",
			links: [
				{ label: "Responsable HSE", href: "/profils/responsable-hse" },
				{
					label: "Responsable Formation",
					href: "/profils/responsable-formation",
				},
				{
					label: "Chef de Production",
					href: "/profils/chef-production",
				},
				{
					label: "Directeur Industriel",
					href: "/profils/directeur-industriel",
				},
			],
		},
		{
			title: "Ressources",
			links: [
				{ label: "Centre de ressources", href: "/ressources" },
				{ label: "Blog", href: "/blog" },
				{
					label: "Télécharger la brochure",
					href: "/ressources/wisetwin-brochure.pdf",
				},
			],
		},
		{
			title: "Entreprise",
			links: [
				{ label: "À propos", href: "/#notre-histoire" },
				{ label: "Notre équipe", href: "/#notre-equipe" },
				{ label: "Nous contacter", href: "/#contact" },
				{
					label: "Marchés & Applications",
					href: "/#marches-applications",
				},
			],
		},
	];

	// Liens légaux
	const legalLinks = [
		{ label: "Mentions légales", href: "/mentions-legales" },
		{ label: "Politique de confidentialité", href: "/confidentialite" },
		{ label: "CGU", href: "/cgu" },
	];

	// Informations de contact
	const contactInfo = [
		{
			icon: <Mail className="size-4" />,
			text: "lambrecht.mickael@wisetwin.eu",
			link: "mailto:lambrecht.mickael@wisetwin.eu",
		},
		{
			icon: <Phone className="size-4" />,
			text: "+34 613 02 27 72",
			link: "tel:+34613022772",
		},
		{
			icon: <Map className="size-4" />,
			text: "IMT Nord Europe, Centre de recherche, 764 Boulevard Lahure, 59508 Douai",
		},
	];

	// Réseaux sociaux
	const socialLinks = [
		{
			icon: <Linkedin className="size-5" />,
			href: "https://www.linkedin.com/company/wise-twin",
			label: "LinkedIn",
		},
	];

	return (
		<footer className="bg-muted/50 border-t">
			{/* Section principale du footer avec CTA */}
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
					{/* Logo et description */}
					<div className="lg:col-span-4">
						<Link href="/" className="inline-block mb-4">
							<div className="flex items-center gap-3">
								<Image
									src="/wisetwin-logo.png"
									alt="WiseTwin"
									width={150}
									height={40}
									className="h-10 w-auto"
								/>
							</div>
						</Link>
						<p className="text-muted-foreground mb-6 max-w-sm">
							Solutions de jumeaux numériques pour optimiser la
							formation et la valorisation industrielle.
							Transformez votre industrie avec des expériences 3D
							interactives.
						</p>
						<div className="flex items-center gap-3">
							{socialLinks.map((social, idx) => (
								<Link
									key={idx}
									href={social.href}
									className="flex items-center justify-center size-9 rounded-full bg-background border hover:bg-accent transition-colors"
									target="_blank"
									rel="noopener noreferrer"
									aria-label={social.label}
								>
									{social.icon}
								</Link>
							))}
						</div>
					</div>

					{/* Colonnes de navigation */}
					<div className="lg:col-span-6">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
							{footerSections.map((section, idx) => (
								<div key={idx}>
									<h4 className="font-medium text-sm mb-4">
										{section.title}
									</h4>
									<ul className="space-y-3">
										{section.links.map((link, linkIdx) => (
											<li key={linkIdx}>
												<Link
													href={link.href}
													className="text-sm text-muted-foreground hover:text-foreground transition-colors"
												>
													{link.label}
												</Link>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>

					{/* Coordonnées et CTA */}
					<div className="lg:col-span-2">
						<h4 className="font-medium text-sm mb-4">Contact</h4>
						<ul className="space-y-3 mb-6">
							{contactInfo.map((info, idx) => (
								<li
									key={idx}
									className="flex items-start gap-2"
								>
									<span className="text-muted-foreground mt-0.5">
										{info.icon}
									</span>
									{info.link ? (
										<Link
											href={info.link}
											className="text-sm text-muted-foreground hover:text-foreground transition-colors"
										>
											{info.text}
										</Link>
									) : (
										<span className="text-sm text-muted-foreground">
											{info.text}
										</span>
									)}
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Barre séparatrice */}
				<div className="border-t pt-6 mt-6">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<div className="text-sm text-muted-foreground order-2 md:order-1">
							© {currentYear} WiseTwin. Tous droits réservés.
						</div>
						<div className="flex flex-wrap justify-center gap-x-6 gap-y-2 order-1 md:order-2">
							{legalLinks.map((link, idx) => (
								<a
									key={idx}
									href="#"
									onClick={(e) => e.preventDefault()}
									className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
									title="Bientôt disponible"
								>
									{link.label}
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}