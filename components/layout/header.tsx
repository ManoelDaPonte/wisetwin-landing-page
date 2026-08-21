"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Logo } from "@/components/ui/logo";
import {
	Cuboid,
	FileText,
	Footprints,
	Map,
	LayoutGrid,
	Menu,
	ChevronDown,
} from "lucide-react";
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
	];

	// Toutes les briques, dans le même ordre que la section Outils (plateforme en dernier)
	const toolItems = [
		{
			title: tGlobal("tools.bricks.wisetrainer.title"),
			tag: tGlobal("tools.bricks.wisetrainer.tag"),
			href: "/solutions/wisetrainer",
			icon: Cuboid,
		},
		{
			title: tGlobal("tools.bricks.wisepaper.title"),
			tag: tGlobal("tools.bricks.wisepaper.tag"),
			href: "/solutions/wisepaper",
			icon: FileText,
		},
		{
			title: tGlobal("tools.bricks.wisetour.title"),
			tag: tGlobal("tools.bricks.wisetour.tag"),
			href: "/solutions/wisetour",
			icon: Footprints,
		},
		{
			title: tGlobal("tools.wiseatlas.title"),
			tag: tGlobal("tools.wiseatlas.tag"),
			href: "/solutions/wiseatlas",
			icon: Map,
		},
		{
			title: tGlobal("tools.platform.title"),
			tag: tGlobal("tools.platform.tag"),
			href: "/solutions/plateforme",
			icon: LayoutGrid,
			highlight: true,
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
										<div className="p-4 w-[560px]">
											<div className="grid grid-cols-2 gap-1.5">
												{toolItems.map((item) => {
													const Icon = item.icon;
													return (
														<Link
															key={item.href}
															href={item.href}
															className={cn(
																"flex items-center gap-3 rounded-xl p-3 transition-all border hover:bg-secondary/5",
																"highlight" in item && item.highlight
																	? "border-secondary/40 hover:border-secondary"
																	: "border-transparent hover:border-secondary/30"
															)}
														>
															<div className="size-10 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
																<Icon className="size-5 text-secondary" />
															</div>
															<div className="flex-1 min-w-0">
																<p className="font-semibold text-sm">{item.title}</p>
																<p className="text-[11px] font-mono uppercase tracking-wide text-muted-foreground truncate">
																	{item.tag}
																</p>
															</div>
														</Link>
													);
												})}
											</div>
											<Link
												href="/#outils"
												className="mt-1.5 flex items-center justify-center rounded-xl px-4 py-2.5 border border-transparent hover:border-secondary/30 hover:bg-secondary/5 transition-all text-sm font-medium text-secondary"
											>
												{t("allTools")}
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
																	<p className="text-[11px] font-mono uppercase tracking-wide text-muted-foreground">
																		{item.tag}
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
