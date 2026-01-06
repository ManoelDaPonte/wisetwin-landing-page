"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Logo } from "@/components/ui/logo";
import { Cuboid, LayoutDashboard, Menu, ChevronDown } from "lucide-react";
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
import { DevBanner } from "@/components/layout/dev-banner";

export function Header() {
	const t = useTranslations("nav");
	const tSolutions = useTranslations();
	const tCommon = useTranslations("common");
	const [scrolled, setScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [solutionsOpen, setSolutionsOpen] = useState(false);

	const menuItems = [
		{ title: t("pricing"), href: "/#pricing" },
		{ title: t("faq"), href: "/faq" },
		{ title: t("roadmap"), href: "/roadmap" },
		{ title: t("contact"), href: "/#contact" },
	];

	const solutionItems = [
		{
			title: tSolutions("wisetrainer.title"),
			description: tSolutions("wisetrainer.subtitle"),
			href: "/solutions/wisetrainer",
			icon: Cuboid,
			featured: true,
		},
		{
			title: tSolutions("platform.title"),
			description: tSolutions("platform.subtitle"),
			href: "/solutions/platform",
			icon: LayoutDashboard,
			featured: false,
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
			<DevBanner />
			<header
				className={cn(
					"w-full transition-all duration-300 border-b border-border/20 py-4",
					scrolled
						? "bg-background/90 backdrop-blur-md shadow-sm border-border/50"
						: "bg-transparent border-border/20"
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
										<div className="grid grid-cols-2 gap-3 p-4 w-[420px]">
											{/* WiseTrainer - Flagship */}
											<Link
												href="/solutions/wisetrainer"
												className="flex flex-col items-center text-center rounded-xl p-4 bg-secondary/5 border border-secondary/20 hover:border-secondary/40 hover:bg-secondary/10 transition-all"
											>
												<div className="size-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-3">
													<Cuboid className="size-6 text-secondary" />
												</div>
												<div className="font-semibold mb-1">
													{tSolutions("wisetrainer.title")}
												</div>
												<p className="text-xs text-muted-foreground leading-snug">
													{tSolutions("wisetrainer.subtitle")}
												</p>
											</Link>

											{/* Platform */}
											<Link
												href="/solutions/platform"
												className="flex flex-col items-center text-center rounded-xl p-4 border border-transparent hover:border-secondary/30 hover:bg-secondary/5 transition-all"
											>
												<div className="size-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-3">
													<LayoutDashboard className="size-6 text-secondary" />
												</div>
												<div className="font-semibold mb-1">
													{tSolutions("platform.title")}
												</div>
												<p className="text-xs text-muted-foreground leading-snug">
													{tSolutions("platform.subtitle")}
												</p>
											</Link>
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

					{/* CTA Buttons */}
					<div className="flex items-center gap-2">
						<LanguageSwitcher />
						<ThemeToggle />
						<Button asChild className="hidden sm:inline-flex">
							<a
								href="https://app.wisetwin.eu"
								target="_blank"
								rel="noopener noreferrer"
							>
								{tCommon("tryFree")}
							</a>
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
																className={cn(
																	"flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors",
																	item.featured &&
																		"bg-secondary/5 hover:bg-secondary/10"
																)}
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

									{/* Mobile Footer */}
									<div className="p-4 border-t border-border">
										<Button asChild className="w-full">
											<a
												href="https://app.wisetwin.eu"
												target="_blank"
												rel="noopener noreferrer"
											>
												{tCommon("tryFree")}
											</a>
										</Button>
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
