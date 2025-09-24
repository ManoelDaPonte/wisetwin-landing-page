// components/layout/footer.tsx
"use client";
import React from "react";
import Link from "next/link";
import { Linkedin, Mail, Phone, Map } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export function Footer() {
	const currentYear = new Date().getFullYear();

	// Colonnes de navigation du footer
	const footerSections = [
		{
			title: "Navigation",
			links: [
				{ label: "Notre solution", href: "/#wisetrainer" },
				{ label: "Vous êtes ?", href: "/#vous-etes" },
				{ label: "Notre technologie", href: "/#notre-technologie" },
				{ label: "Blog", href: "/blog" },
				{ label: "Contact", href: "/#contact" },
			],
		},
		{
			title: "Notre solution",
			links: [
				{ label: "Fonctionnalités", href: "/#wisetrainer" },
				{ label: "Avantages", href: "/#wisetrainer-advantages" },
			],
		},
		{
			title: "Profils métiers",
			links: [
				{ label: "Responsable HSE", href: "/#vous-etes" },
				{ label: "Responsable Formation", href: "/#vous-etes" },
				{ label: "Chef de Production", href: "/#vous-etes" },
				{ label: "Directeur Industriel", href: "/#vous-etes" },
			],
		},
		{
			title: "Ressources",
			links: [
				{ label: "Articles de blog", href: "/blog" },
				{
					label: "Brochure Wise Twin",
					href: "/WiseTrainer-Plaquette-B.pdf",
				},
				{ label: "Demander une démo", href: "/#contact" },
				{ label: "Notre technologie", href: "/#notre-technologie" },
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
			text: "delmarre.gauthier@wisetwin.eu",
			link: "mailto:delmarre.gauthier@wisetwin.eu",
		},
		{
			icon: <Phone className="size-4" />,
			text: "+33 6 03 91 44 47",
			link: "tel:+34613022772",
		},
		{
			icon: <Map className="size-4" />,
			text: "Bâtiment ÉcosystèmeD, 60 route du pertuis - Môle 2, Dunkerque - FRANCE",
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
								<Logo variant="wisetwin" width={150} height={40} className="h-10 w-auto" />
							</div>
						</Link>
						<p className="text-muted-foreground mb-6 max-w-sm">
							Vous voulez ancrer une culture sécurité durable au sein de vos équipes? 
							Nous développons des simulateurs immersifs,
							répliques exactes de vos installations, 
							qui transforment vos formations en expériences  
							et vos procédures en réflexes.
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
						<div className="text-sm text-muted-foreground order-1 md:order-1">
							© {currentYear} WiseTwin. Tous droits réservés.
						</div>
						<div className="flex flex-wrap justify-center gap-x-6 gap-y-2 order-3 md:order-3">
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
						<div className="text-xs text-muted-foreground order-2 md:order-2">
							<a
								href="https://storyset.com/work"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-foreground transition-colors"
							>
								Illustrations by Storyset
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
