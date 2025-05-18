// components/layout/footer.tsx
"use client";
import React from "react";
import Link from "next/link";
import { Linkedin, Twitter, Mail, Phone, Map } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Footer() {
	const currentYear = new Date().getFullYear();

	// Colonnes de navigation du footer
	const footerSections = [
		{
			title: "Solutions",
			links: [
				{ label: "Formations 3D", href: "/solutions/formations-3d" },
				{ label: "Sécurité industrielle", href: "/solutions/securite" },
				{ label: "Suivi de progression", href: "/solutions/suivi" },
				{
					label: "Maintenance prédictive",
					href: "/solutions/maintenance",
				},
			],
		},
		{
			title: "Entreprise",
			links: [
				{ label: "À propos", href: "/a-propos" },
				{ label: "Équipe", href: "/equipe" },
				{ label: "Carrières", href: "/carrieres" },
				{ label: "Blog", href: "/blog" },
			],
		},
		{
			title: "Ressources",
			links: [
				{ label: "Centre de ressources", href: "/ressources" },
				{ label: "Études de cas", href: "/etudes-de-cas" },
				{ label: "Webinaires", href: "/webinaires" },
				{ label: "FAQ", href: "/faq" },
			],
		},
	];

	// Liens légaux
	const legalLinks = [
		{ label: "Mentions légales", href: "/mentions-legales" },
		{ label: "Politique de confidentialité", href: "/confidentialite" },
		{ label: "CGU", href: "/cgu" },
		{ label: "Accessibilité", href: "/accessibilite" },
	];

	// Informations de contact
	const contactInfo = [
		{ icon: <Mail className="size-4" />, text: "contact@wisetwin.fr" },
		{ icon: <Phone className="size-4" />, text: "+33 (0)1 23 45 67 89" },
		{
			icon: <Map className="size-4" />,
			text: "12 Rue de l'Innovation, 31000 Toulouse",
		},
	];

	// Réseaux sociaux
	const socialLinks = [
		{ icon: <Linkedin className="size-5" />, href: "https://linkedin.com" },
		{ icon: <Twitter className="size-5" />, href: "https://twitter.com" },
	];

	return (
		<footer className="bg-muted/50 border-t">
			{/* Section principale du footer avec CTA */}
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
					{/* Logo et description */}
					<div className="lg:col-span-4">
						<p className="text-muted-foreground mb-6 max-w-sm">
							Des formations immersives en 3D pour optimiser la
							sécurité et la performance de vos équipes
							industrielles. Solutions sur mesure pour tous types
							d'équipements.
						</p>
						<div className="flex items-center gap-3">
							{socialLinks.map((social, idx) => (
								<Link
									key={idx}
									href={social.href}
									className="flex items-center justify-center size-9 rounded-full bg-background border hover:bg-accent transition-colors"
									target="_blank"
									rel="noopener noreferrer"
								>
									{social.icon}
								</Link>
							))}
						</div>
					</div>

					{/* Colonnes de navigation */}
					<div className="lg:col-span-5">
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
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
					<div className="lg:col-span-3">
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
									<span className="text-sm">{info.text}</span>
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
								<Link
									key={idx}
									href={link.href}
									className="text-xs text-muted-foreground hover:text-foreground transition-colors"
								>
									{link.label}
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
