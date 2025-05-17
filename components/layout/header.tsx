// components/layout/header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [mounted, setMounted] = useState(false);

	// Après le montage du composant
	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const navItems = [
		{ name: "Fonctionnalités", href: "#features" },
		{ name: "Comment ça marche", href: "#how-it-works" },
		{ name: "Tarifs", href: "#pricing" },
		{ name: "Contact", href: "#contact" },
	];

	return (
		<motion.header
			className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border"
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<motion.div
						className="flex-shrink-0"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.8 }}
					>
						<Link href="/" className="flex items-center space-x-2">
							<Image
								src="/wisetwin-logo.png"
								alt="WiseTwin Logo"
								width={32}
								height={32}
								className="h-8 w-8"
							/>
							<span className="text-foreground font-bold text-xl">
								WiseTwin
							</span>
						</Link>
					</motion.div>

					<div className="hidden md:block">
						<div className="ml-10 flex items-center space-x-6">
							{navItems.map((item, index) => (
								<motion.div
									key={item.name}
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										delay: 0.1 * index,
										duration: 0.5,
									}}
								>
									<Link
										href={item.href}
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
										{item.name}
									</Link>
								</motion.div>
							))}
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									delay: 0.4,
									duration: 0.5,
								}}
								className="flex items-center space-x-4 ml-6"
							>
								<Button variant="ghost">Se connecter</Button>
								<Button>Commencer gratuitement</Button>
							</motion.div>
						</div>
					</div>

					<div className="md:hidden">
						<motion.button
							onClick={toggleMenu}
							className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
							whileTap={{ scale: 0.95 }}
						>
							<AnimatePresence mode="wait">
								{isMenuOpen ? (
									<motion.div
										key="close"
										initial={{ rotate: 180, opacity: 0 }}
										animate={{ rotate: 0, opacity: 1 }}
										exit={{ rotate: -180, opacity: 0 }}
										transition={{ duration: 0.2 }}
									>
										<X className="h-6 w-6" />
									</motion.div>
								) : (
									<motion.div
										key="menu"
										initial={{ rotate: -180, opacity: 0 }}
										animate={{ rotate: 0, opacity: 1 }}
										exit={{ rotate: 180, opacity: 0 }}
										transition={{ duration: 0.2 }}
									>
										<Menu className="h-6 w-6" />
									</motion.div>
								)}
							</AnimatePresence>
						</motion.button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						className="md:hidden"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md">
							{navItems.map((item, index) => (
								<motion.div
									key={item.name}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{
										delay: 0.1 * index,
										duration: 0.3,
									}}
								>
									<Link
										href={item.href}
										className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
										onClick={toggleMenu}
									>
										{item.name}
									</Link>
								</motion.div>
							))}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{
									delay: 0.4,
									duration: 0.3,
								}}
								className="pt-4 space-y-2"
							>
								<Button
									variant="outline"
									className="w-full"
									onClick={toggleMenu}
								>
									Se connecter
								</Button>
								<Button className="w-full" onClick={toggleMenu}>
									Commencer gratuitement
								</Button>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.header>
	);
};

export default Header;
