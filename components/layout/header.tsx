// components/layout/header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
	Video,
	GraduationCap,
	Shield,
	HardHat,
	ChartBar,
	School,
	Bot,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// Menu items configuration
type MenuChild = {
	title: string;
	href: string;
	description: string;
	icon: string;
	iconComponent?: React.ReactNode;
};

type MenuItem = {
	title: string;
	href: string;
	children?: MenuChild[];
};

const menuItems: MenuItem[] = [
	{
		title: "Solutions",
		href: "/#nos-solutions",
		children: [
			{
				title: "WiseTrainer",
				href: "/#nos-solutions",
				description: "Formations immersives en 3D pour vos équipes",
				icon: "/globe.svg",
				iconComponent: (
					<GraduationCap className="size-4 text-secondary" />
				),
			},
			{
				title: "WiseTour",
				href: "/#nos-solutions",
				description: "Visites industrielles virtuelles interactives",
				icon: "/window.svg",
				iconComponent: <Video className="size-4 text-secondary" />,
			},
			{
				title: "WiseScan",
				href: "/#nos-solutions",
				description:
					"Analyse intelligente des accidents pour des recommandations sur-mesure",
				icon: "/chart.svg",
				iconComponent: <ChartBar className="size-4 text-secondary" />,
			},
			{
				title: "WiseAssist",
				href: "/#nos-solutions",
				description:
					"Assistant IA pour guider vos équipes en temps réel",
				icon: "/bot.svg",
				iconComponent: <Bot className="size-4 text-secondary" />,
			},
		],
	},
	{
		title: "Vous êtes ?",
		href: "#vous-etes",
		children: [
			{
				title: "Responsable HSE",
				href: "/#vous-etes",
				description: "Diminuez les incidents et améliorez la sécurité",
				icon: "/shield.svg",
				iconComponent: <Shield className="size-4 text-secondary" />,
			},
			{
				title: "Responsable Formation",
				href: "/#vous-etes",
				description: "Centralisez et optimisez vos formations",
				icon: "/school.svg",
				iconComponent: <School className="size-4 text-secondary" />,
			},
			{
				title: "Chef de Production",
				href: "/#vous-etes",
				description: "Augmentez la productivité et réduisez les arrêts",
				icon: "/factory.svg",
				iconComponent: <HardHat className="size-4 text-secondary" />,
			},
			{
				title: "Directeur Industriel",
				href: "/#vous-etes",
				description:
					"Modernisez vos processus et valorisez votre savoir-faire",
				icon: "/chart.svg",
				iconComponent: <ChartBar className="size-4 text-secondary" />,
			},
		],
	},
	{
		title: "Blog",
		href: "/blog",
	},
	{
		title: "Contact",
		href: "/#contact",
	},
];

export function Header() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={cn(
				"fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 border-b border-border/20 py-4",
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
							<Image
								src="/logo_wisetwin.svg"
								alt="WiseTwin Logo"
								width={120}
								height={32}
							/>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden lg:block">
						<NavigationMenu>
							<NavigationMenuList>
								{menuItems.map((item) => (
									<NavigationMenuItem key={item.title}>
										{item.children ? (
											<>
												<div>
													<NavigationMenuTrigger>
														{item.title}
													</NavigationMenuTrigger>
												</div>
												<NavigationMenuContent>
													<div className="grid w-[600px] grid-cols-2 gap-3 p-4">
														{item.children?.map(
															(child) => (
																<div
																	key={
																		child.title
																	}
																>
																	<Link
																		href={
																			child.href
																		}
																	>
																		<div className="flex gap-2 items-start p-3 hover:bg-accent rounded-md transition-colors">
																			<div className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-muted/50">
																				{
																					child.iconComponent
																				}
																			</div>
																			<div>
																				<div className="flex items-center gap-2">
																					<span className="font-medium">
																						{
																							child.title
																						}
																					</span>
																					{child.title === "WiseTrainer" && (
																						<Badge variant="secondary" className="text-xs">
																							Phare
																						</Badge>
																					)}
																				</div>
																				<p className="text-muted-foreground text-sm leading-tight mt-1">
																					{
																						child.description
																					}
																				</p>
																			</div>
																		</div>
																	</Link>
																</div>
															)
														)}
													</div>
												</NavigationMenuContent>
											</>
										) : (
											<div>
												<Link
													href={item.href}
													className={navigationMenuTriggerStyle()}
												>
													{item.title}
												</Link>
											</div>
										)}
									</NavigationMenuItem>
								))}
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					{/* CTA Button */}
					<div className="flex items-center gap-2">
						<Button asChild>
							<Link href="/#contact">
								<div>Demander une démo</div>
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
