"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Linkedin, Mail } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export function Footer() {
	const t = useTranslations();
	const currentYear = new Date().getFullYear();

	const navLinks = [
		{ label: t("nav.solutions"), href: "/#solutions" },
		{ label: t("nav.pricing"), href: "/#pricing" },
		{ label: t("nav.faq"), href: "/faq" },
		{ label: t("nav.roadmap"), href: "/roadmap" },
		{ label: t("nav.contact"), href: "/#contact" },
	];

	const solutionLinks = [
		{ label: t("wisetrainer.title"), href: "/solutions/wisetrainer" },
		{ label: t("wisepaper.title"), href: "/solutions/wisepaper" },
		{ label: t("platform.title"), href: "/solutions/platform" },
	];

	const legalLinks = [
		{ label: t("footer.legal"), href: "/legal" },
		{ label: t("footer.privacy"), href: "/privacy" },
		{ label: t("footer.terms"), href: "/terms" },
	];

	return (
		<footer className="bg-muted/50 border-t">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
					<div className="lg:col-span-1">
						<Link href="/" className="inline-block mb-4">
							<Logo variant="wisetwin" width={150} height={40} className="h-10 w-auto" />
						</Link>
						<p className="text-sm text-muted-foreground mb-6 max-w-sm">
							{t("footer.description")}
						</p>
						<div className="flex items-center gap-3">
							<a
								href="https://www.linkedin.com/company/wise-twin"
								className="flex items-center justify-center size-9 rounded-full bg-background border hover:bg-accent transition-colors"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="LinkedIn"
							>
								<Linkedin className="size-5" />
							</a>
							<a
								href="mailto:contact@wisetwin.eu"
								className="flex items-center justify-center size-9 rounded-full bg-background border hover:bg-accent transition-colors"
								aria-label="Email"
							>
								<Mail className="size-5" />
							</a>
						</div>
					</div>

					<div>
						<h4 className="font-medium text-sm mb-4">{t("footer.navigation")}</h4>
						<ul className="space-y-3">
							{navLinks.map((link, idx) => (
								<li key={idx}>
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

					<div>
						<h4 className="font-medium text-sm mb-4">{t("footer.solutions")}</h4>
						<ul className="space-y-3">
							{solutionLinks.map((link, idx) => (
								<li key={idx}>
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

					<div>
						<h4 className="font-medium text-sm mb-4">{t("footer.contact")}</h4>
						<ul className="space-y-3">
							<li>
								<a
									href="mailto:contact@wisetwin.eu"
									className="text-sm text-muted-foreground hover:text-foreground transition-colors"
								>
									contact@wisetwin.eu
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t pt-6">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<div className="text-sm text-muted-foreground">
							© {currentYear} WiseTwin. {t("footer.rights")}
						</div>
						<div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
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
