// components/layout/header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/ui/logo";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// Menu items configuration
type MenuItem = {
	title: string;
	href: string;
};

const menuItems: MenuItem[] = [
	{
		title: "Wise Trainer",
		href: "/#wisetrainer",
	},
	{
		title: "Vous êtes ?",
		href: "/#vous-etes",
	},
	// {
	// 	title: "Notre technologie",
	// 	href: "/#notre-technologie",
	// },
	{
		title: "FAQ",
		href: "/#faq",
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
							<Logo variant="wisetwin" width={120} height={32} />
						</div>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden lg:block">
						<NavigationMenu>
							<NavigationMenuList>
								{menuItems.map((item) => (
									<NavigationMenuItem key={item.title}>
										<Link
											href={item.href}
											className={navigationMenuTriggerStyle()}
										>
											{item.title}
										</Link>
									</NavigationMenuItem>
								))}
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					{/* CTA Button */}
					<div className="flex items-center gap-2">
						<ThemeToggle />
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
