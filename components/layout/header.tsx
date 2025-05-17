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
	const [scrolled, setScrolled] = useState(false);

	// Gérer le défilement et l'effet de scroll
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const navItems = [
		{ name: "Formations", href: "#features" },
		{ name: "Comment ça marche", href: "#how-it-works" },
		{ name: "Suivi", href: "#tracking" },
		{ name: "Tarifs", href: "#pricing" },
		{ name: "Contact", href: "#contact" },
	];

	return (
		<motion.header
			className={cn(
				"sticky top-0 z-50 w-full backdrop-blur-md border-b transition-all duration-300",
				scrolled
					? "bg-background/95 shadow-sm"
					: "bg-background/80 border-transparent"
			)}
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
						<Link href="/" className="flex items-center gap-2">
							<Image
								src="/wisetwin-logo.png"
								alt="Logo"
								width={40}
								height={40}
								className="h-8 w-8 rounded-full"
							/>

							<span className="text-foreground font-bold text-xl">
								<span className="text-wisetwin-darkblue">
									Wise
								</span>
								<span className="text-wisetwin-blue">Twin</span>
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
										className={cn(
											"transition-colors text-sm font-medium px-3 py-2 rounded-md hover:bg-accent",
											item.name === "Contact"
												? "text-wisetwin-blue hover:text-wisetwin-blue-dark"
												: "text-muted-foreground hover:text-foreground"
										)}
									>
										{item.name}
									</Link>
								</motion.div>
							))}
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									delay: 0.5,
									duration: 0.5,
								}}
							>
								<Button
									variant="default"
									className="bg-wisetwin-darkblue hover:bg-wisetwin-darkblue-light"
									onClick={() => {
										document
											.getElementById("contact")
											?.scrollIntoView({
												behavior: "smooth",
											});
									}}
								>
									Demander une démo
								</Button>
							</motion.div>
						</div>
					</div>

					<div className="md:hidden">
						<motion.button
							onClick={toggleMenu}
							className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
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
						<div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md shadow-lg">
							{navItems.map((item, index) => (
								<motion.div
									key={item.name}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{
										delay: 0.05 * index,
										duration: 0.3,
									}}
								>
									<Link
										href={item.href}
										className={cn(
											"block px-3 py-2 rounded-md text-base font-medium hover:bg-accent transition-colors",
											item.name === "Contact"
												? "text-wisetwin-blue"
												: "text-muted-foreground hover:text-foreground"
										)}
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
									delay: 0.3,
									duration: 0.3,
								}}
								className="pt-2"
							>
								<Button
									className="w-full bg-wisetwin-darkblue hover:bg-wisetwin-darkblue-light"
									onClick={() => {
										document
											.getElementById("contact")
											?.scrollIntoView({
												behavior: "smooth",
											});
										toggleMenu();
									}}
								>
									Demander une démo
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
