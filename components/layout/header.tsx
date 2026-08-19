"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Logo } from "@/components/ui/logo";
import { Cuboid, Map, Menu, ChevronDown } from "lucide-react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
} from "@/components/ui/sheet";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";


export function Header() {
	const t = useTranslations("nav");
	const tGlobal = useTranslations();
	const [scrolled, setScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [toolsOpen, setToolsOpen] = useState(false);

	// L'ordre suit celui des sections de la page d'accueil
	const menuItemsBefore = [
		{ title: t("team"), href: "/#equipe" },
		{ title: t("expertise"), href: "/#expertises" },
		{ title: t("method"), href: "/#methode" },
	];
	const menuItemsAfter = [
		{ title: t("blog"), href: "/blog" },
		{ title: t("faq"), href: "/faq" },
	];

	const toolItems = [
		{
			title: tGlobal("tools.platform.title"),
			description: t("platformShort"),
			href: "/solutions/plateforme",
			icon: Cuboid,
			tag: t("training"),
		},
		{
			title: tGlobal("tools.wiseatlas.title"),
			description: t("wiseatlasShort"),
			href: "/solutions/wiseatlas",
			icon: Map,
			tag: t("communication"),
		},
	];

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="fixed top-0 left-0 right-0 w-full z-50">
			<header
				className={cn(
					"w-full transition-all duration-300 border-b border-border/20 py-4",
					scrolled
						? "bg-background shadow-sm border-border/50"
						: "bg-background"
				)}
			>
			<div className="container mx-auto max-w-7xl px-6 sm:px-8 md:px-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link href="/">
						<div className="flex items-center gap-2 cursor-pointer">
							<Logo variant="wisetwin" width={120} height={32} />
						</div>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden lg:block">
						<NavigationMenu>
							<NavigationMenuList>
								{menuItemsBefore.map((item) => (
									<NavigationMenuItem key={item.title}>
										<Link
											href={item.href}
											className={cn(
												navigationMenuTriggerStyle(),
												"bg-transparent hover:bg-accent/50"
											)}
										>
											{item.title}
										</Link>
									</NavigationMenuItem>
								))}

								{/* Tools Dropdown */}
								<NavigationMenuItem>
									<NavigationMenuTrigger className="bg-transparent hover:bg-accent/50">
										{t("tools")}
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<div className="p-4 w-[460px] space-y-2">
											{toolItems.map((item) => {
												const Icon = item.icon;
												return (
													<Link
														key={item.href}
														href={item.href}
														className="flex items-center gap-4 rounded-xl p-4 transition-all border border-transparent hover:border-secondary/30 hover:bg-secondary/5"
													>
														<div className="size-12 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
															<Icon className="size-6 text-secondary" />
														</div>
														<div className="flex-1">
															<div className="flex items-center gap-2 mb-0.5">
																<span className="font-semibold">{item.title}</span>
																<span className="text-xs font-medium text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">{item.tag}</span>
															</div>
															<p className="text-xs text-muted-foreground leading-snug">{item.description}</p>
														</div>
													</Link>
												);
											})}
											<Link
												href="/#outils"
												className="flex items-center justify-between rounded-xl px-4 py-3 border border-transparent hover:border-secondary/30 hover:bg-secondary/5 transition-all"
											>
												<span className="text-sm font-medium">{t("allTools")}</span>
												<span className="text-xs text-muted-foreground font-mono">
													WiseTrainer · WisePaper · WiseTour · Ask AI
												</span>
											</Link>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>

								{menuItemsAfter.map((item) => (
									<NavigationMenuItem key={item.title}>
										<Link
											href={item.href}
											className={cn(
												navigationMenuTriggerStyle(),
												"bg-transparent hover:bg-accent/50"
											)}
										>
											{item.title}
										</Link>
									</NavigationMenuItem>
								))}
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					{/* Right side */}
					<div className="flex items-center gap-2">
						<LanguageSwitcher />
						<ThemeToggle />

						{/* Primary CTA — desktop */}
						<Button className="hidden sm:inline-flex" asChild>
							<Link href="/#contact">{t("quote")}</Link>
						</Button>

						{/* Mobile Menu */}
						<Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="lg:hidden"
									aria-label="Menu"
								>
									<Menu className="size-5" />
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="w-80 p-0">
								<div className="flex flex-col h-full">
									{/* Mobile Header */}
									<div className="p-6 border-b border-border">
										<Logo variant="wisetwin" width={120} height={32} />
									</div>

									{/* Mobile Navigation */}
									<nav className="flex-1 overflow-y-auto p-4">
										{menuItemsBefore.map((item) => (
											<SheetClose asChild key={item.title}>
												<Link
													href={item.href}
													className="flex items-center p-3 rounded-lg hover:bg-accent transition-colors font-medium"
													onClick={() => setMobileMenuOpen(false)}
												>
													{item.title}
												</Link>
											</SheetClose>
										))}

										{/* Tools Collapsible */}
										<Collapsible
											open={toolsOpen}
											onOpenChange={setToolsOpen}
											className="mb-2"
										>
											<CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-accent transition-colors">
												<span className="font-medium">{t("tools")}</span>
												<ChevronDown
													className={cn(
														"size-4 transition-transform",
														toolsOpen && "rotate-180"
													)}
												/>
											</CollapsibleTrigger>
											<CollapsibleContent className="pl-4 mt-1 space-y-1">
												{toolItems.map((item) => {
													const Icon = item.icon;
													return (
														<SheetClose asChild key={item.title}>
															<Link
																href={item.href}
																className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
																onClick={() => setMobileMenuOpen(false)}
															>
																<div className="size-8 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
																	<Icon className="size-4 text-secondary" />
																</div>
																<div>
																	<div className="font-medium text-sm">
																		{item.title}
																	</div>
																	<p className="text-xs text-muted-foreground line-clamp-2">
																		{item.description}
																	</p>
																</div>
															</Link>
														</SheetClose>
													);
												})}
											</CollapsibleContent>
										</Collapsible>

										{/* Other Menu Items */}
										{menuItemsAfter.map((item) => (
											<SheetClose asChild key={item.title}>
												<Link
													href={item.href}
													className="flex items-center p-3 rounded-lg hover:bg-accent transition-colors font-medium"
													onClick={() => setMobileMenuOpen(false)}
												>
													{item.title}
												</Link>
											</SheetClose>
										))}

										{/* Primary CTA */}
										<SheetClose asChild>
											<Button className="w-full mt-4" size="lg" asChild>
												<Link
													href="/#contact"
													onClick={() => setMobileMenuOpen(false)}
												>
													{t("quote")}
												</Link>
											</Button>
										</SheetClose>
									</nav>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
		</div>
	);
}
