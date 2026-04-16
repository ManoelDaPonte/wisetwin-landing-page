"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Logo } from "@/components/ui/logo";
import { Cuboid, Map, Menu, ChevronDown, ExternalLink, LogIn } from "lucide-react";
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
	const tSolutions = useTranslations();
	const [scrolled, setScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [solutionsOpen, setSolutionsOpen] = useState(false);

	const menuItems = [
		{ title: t("security"), href: "/#security" },
		{ title: t("blog"), href: "/blog" },
		{ title: t("faq"), href: "/faq" },
		{ title: t("contact"), href: "/#contact" },
	];

	const platformItems = [
		{
			title: "WiseTrainer",
			description: t("platformWisetrainer"),
			href: "https://app.wisetwin.eu",
			icon: Cuboid,
		},
		{
			title: "WiseAtlas",
			description: t("platformWiseatlas"),
			href: "#",
			icon: Map,
			disabled: true,
		},
	];

	const solutionItems = [
		{
			title: tSolutions("wisetrainer.title"),
			description: tSolutions("solutions.formation.description"),
			href: "/solutions/wisetrainer",
			icon: Cuboid,
			tag: t("training"),
		},
		{
			title: tSolutions("wiseatlas.title"),
			description: tSolutions("wiseatlas.subtitle"),
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
								{/* Solutions Dropdown */}
								<NavigationMenuItem>
									<NavigationMenuTrigger className="bg-transparent hover:bg-accent/50">
										{t("solutions")}
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<div className="p-4 w-[460px] space-y-2">
											{solutionItems.map((item) => {
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
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>

								{/* Other menu items */}
								{menuItems.map((item) => (
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

						{/* Login dropdown — desktop */}
						<div className="hidden sm:block">
							<NavigationMenu>
								<NavigationMenuList>
									<NavigationMenuItem>
										<NavigationMenuTrigger className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg px-4">
											<LogIn className="size-4 mr-2" />
											{t("login")}
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<div className="p-3 w-[280px] space-y-1">
												{platformItems.map((item) => {
													const PIcon = item.icon;
													return (
														<a
															key={item.title}
															href={item.disabled ? undefined : item.href}
															target={item.disabled ? undefined : "_blank"}
															rel="noopener noreferrer"
															className={cn(
																"flex items-center gap-3 rounded-lg p-3 transition-all",
																item.disabled
																	? "opacity-50 cursor-not-allowed"
																	: "hover:bg-secondary/5",
															)}
														>
															<div className="size-9 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
																<PIcon className="size-4 text-secondary" />
															</div>
															<div className="flex-1">
																<div className="flex items-center gap-2">
																	<span className="font-semibold text-sm">{item.title}</span>
																	{!item.disabled && <ExternalLink className="size-3 text-muted-foreground" />}
																	{item.disabled && <span className="text-xs text-muted-foreground italic">{t("comingSoon")}</span>}
																</div>
																<p className="text-xs text-muted-foreground">{item.description}</p>
															</div>
														</a>
													);
												})}
											</div>
										</NavigationMenuContent>
									</NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>
						</div>

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
										{/* Solutions Collapsible */}
										<Collapsible
											open={solutionsOpen}
											onOpenChange={setSolutionsOpen}
											className="mb-2"
										>
											<CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-accent transition-colors">
												<span className="font-medium">{t("solutions")}</span>
												<ChevronDown
													className={cn(
														"size-4 transition-transform",
														solutionsOpen && "rotate-180"
													)}
												/>
											</CollapsibleTrigger>
											<CollapsibleContent className="pl-4 mt-1 space-y-1">
												{solutionItems.map((item) => {
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
																	<p className="text-xs text-muted-foreground">
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
										{menuItems.map((item) => (
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
									</nav>

									{/* Mobile Footer — Login */}
									<div className="p-4 border-t border-border space-y-2">
										<p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">{t("login")}</p>
										{platformItems.map((item) => {
											const PIcon = item.icon;
											return (
												<a
													key={item.title}
													href={item.disabled ? undefined : item.href}
													target={item.disabled ? undefined : "_blank"}
													rel="noopener noreferrer"
													className={cn(
														"flex items-center gap-3 p-3 rounded-lg",
														item.disabled
															? "opacity-50 cursor-not-allowed"
															: "hover:bg-accent transition-colors",
													)}
												>
													<div className="size-8 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
														<PIcon className="size-4 text-secondary" />
													</div>
													<div className="flex items-center gap-2">
														<span className="font-medium text-sm">{item.title}</span>
														{!item.disabled && <ExternalLink className="size-3 text-muted-foreground" />}
														{item.disabled && <span className="text-xs text-muted-foreground italic">{t("comingSoon")}</span>}
													</div>
												</a>
											);
										})}
									</div>
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
