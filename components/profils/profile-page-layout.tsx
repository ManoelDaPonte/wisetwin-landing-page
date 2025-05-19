// components/profils/profile-page-layout.tsx
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

// Types pour les différentes sections
export type ProfileHeroProps = {
	title: string;
	description: string;
	icon: ReactNode;
	profileTitle: string;
	ctaButtons?: {
		primary?: { text: string; href: string };
		secondary?: { text: string; href: string };
	};
	imageAlt?: string;
};

export type ChallengeItem = {
	icon: ReactNode;
	title: string;
	description: string;
};

export type SolutionItem = {
	title: string;
	description: string;
	stats: string;
	icon: ReactNode;
};

export type CaseStudyItem = {
	title: string;
	description: string;
	highlight: string;
};

export type BenefitGroupItem = {
	title: string;
	items: string[];
};

export type ProfilePageProps = {
	hero: ProfileHeroProps;
	challenges: ChallengeItem[];
	solutions: SolutionItem[];
	caseStudies: CaseStudyItem[];
	benefits: BenefitGroupItem[];
};

// Variants pour les animations
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6 },
	},
};

export function ProfilePageLayout({
	hero,
	challenges,
	solutions,
	caseStudies,
	benefits,
}: ProfilePageProps) {
	return (
		<div className="pt-24">
			{/* Hero Section */}
			<Section
				id={`hero-${hero.profileTitle.toLowerCase().replace(" ", "-")}`}
				variant="default"
				className="py-20"
			>
				<div className="container mx-auto px-4">
					<div className="flex flex-col md:flex-row gap-12 items-center">
						<motion.div
							className="md:w-1/2"
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
						>
							<div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
								{hero.icon}
								<span>{hero.profileTitle}</span>
							</div>
							<h1 className="text-4xl md:text-5xl font-bold mb-6">
								{hero.title.split(" ").map((word, i, arr) =>
									i === arr.length - 1 ? (
										<span
											key={i}
											className="text-secondary"
										>
											{word}{" "}
										</span>
									) : (
										<span key={i}>{word} </span>
									)
								)}
							</h1>
							<p className="text-xl text-muted-foreground mb-8">
								{hero.description}
							</p>
							<div className="flex flex-wrap gap-4">
								{hero.ctaButtons?.primary && (
									<Button size="lg" asChild>
										<Link
											href={hero.ctaButtons.primary.href}
										>
											<div className="flex items-center">
												{hero.ctaButtons.primary.text}
												<ArrowRight className="ml-2 size-4" />
											</div>
										</Link>
									</Button>
								)}
								{hero.ctaButtons?.secondary && (
									<Button size="lg" variant="outline" asChild>
										<Link
											href={
												hero.ctaButtons.secondary.href
											}
										>
											<div>
												{hero.ctaButtons.secondary.text}
											</div>
										</Link>
									</Button>
								)}
							</div>
						</motion.div>
						<motion.div
							className="md:w-1/2"
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.7, delay: 0.2 }}
						>
							<div className="aspect-video bg-gradient-to-br from-wisetwin-darkblue to-wisetwin-blue rounded-xl overflow-hidden shadow-lg relative">
								<div className="absolute inset-0 flex items-center justify-center">
									<p className="text-white text-lg font-medium">
										{hero.imageAlt ||
											"Simulation en 3D pour votre métier"}
									</p>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</Section>

			{/* Challenges Section */}
			<Section
				id={`defis-${hero.profileTitle
					.toLowerCase()
					.replace(" ", "-")}`}
				variant="muted"
				header={{
					title: `Les défis des ${hero.profileTitle}s`,
					description: `Les professionnels ${hero.profileTitle.toLowerCase()} font face à des enjeux complexes dans l'industrie moderne`,
					centered: true,
				}}
			>
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="grid md:grid-cols-2 gap-6"
				>
					{challenges.map((challenge, index) => (
						<motion.div key={index} variants={itemVariants}>
							<Card className="h-full hover:shadow-md transition-all duration-200">
								<CardContent className="p-6">
									<div className="flex gap-4 items-start">
										<div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
											{challenge.icon}
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2">
												{challenge.title}
											</h3>
											<p className="text-muted-foreground">
												{challenge.description}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>
			</Section>

			{/* Solutions Section */}
			<Section
				id={`solutions-${hero.profileTitle
					.toLowerCase()
					.replace(" ", "-")}`}
				variant="default"
				className="py-20"
				header={{
					title: `Nos solutions pour les ${hero.profileTitle}s`,
					description:
						"WiseTwin transforme votre approche métier avec des formations immersives et des analyses comportementales",
					centered: true,
				}}
			>
				<div className="max-w-5xl mx-auto">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid md:grid-cols-3 gap-8"
					>
						{solutions.map((solution, index) => (
							<motion.div key={index} variants={itemVariants}>
								<Card className="h-full hover:shadow-md transition-all duration-200">
									<CardContent className="p-6">
										<div className="size-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
											{solution.icon}
										</div>
										<h3 className="text-xl font-semibold mb-2">
											{solution.title}
										</h3>
										<p className="text-muted-foreground mb-4">
											{solution.description}
										</p>
										<div className="mt-auto pt-4 border-t">
											<p className="text-secondary font-medium text-sm">
												{solution.stats}
											</p>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</div>
			</Section>

			{/* Case Studies Section */}
			<Section
				id={`etudes-cas-${hero.profileTitle
					.toLowerCase()
					.replace(" ", "-")}`}
				variant="muted"
				header={{
					title: `Études de cas ${hero.profileTitle.toLowerCase()}`,
					description:
						"Découvrez comment nos clients ont amélioré leur performance grâce à WiseTwin",
					centered: true,
				}}
			>
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="grid md:grid-cols-3 gap-6"
				>
					{caseStudies.map((caseStudy, index) => (
						<motion.div key={index} variants={itemVariants}>
							<Card className="h-full hover:shadow-md transition-all duration-200">
								<CardContent className="p-6">
									<h3 className="text-xl font-semibold mb-4">
										{caseStudy.title}
									</h3>
									<p className="text-muted-foreground mb-6">
										{caseStudy.description}
									</p>
									<div className="bg-secondary/10 p-3 rounded-lg text-center">
										<p className="text-secondary font-medium">
											{caseStudy.highlight}
										</p>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>

				<motion.div
					className="text-center mt-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<Button size="lg" variant="default" asChild>
						<Link href="/#contact">
							<div className="flex items-center">
								Discuter de votre projet avec un expert
								<ArrowRight className="ml-2 size-4" />
							</div>
						</Link>
					</Button>
				</motion.div>
			</Section>

			{/* Custom Benefits Section */}
			<Section
				id={`benefices-${hero.profileTitle
					.toLowerCase()
					.replace(" ", "-")}`}
				variant="default"
				className="py-20"
			>
				<div className="container mx-auto px-4">
					<div className="bg-wisetwin-blue/5 border border-wisetwin-blue/20 rounded-xl p-8 relative overflow-hidden">
						<div className="absolute top-0 right-0 w-80 h-80 bg-wisetwin-blue/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>

						<div className="relative z-10">
							<div className="text-center mb-10 max-w-3xl mx-auto">
								<h2 className="text-3xl font-bold mb-4">
									Pourquoi les {hero.profileTitle}s
									choisissent WiseTwin
								</h2>
								<p className="text-lg text-muted-foreground">
									Notre plateforme offre des avantages
									concrets pour répondre aux enjeux
									spécifiques des professionnels de votre
									secteur
								</p>
							</div>

							<div className="grid md:grid-cols-2 gap-8">
								{benefits.map((benefitGroup, index) => (
									<div
										key={index}
										className="bg-white/50 backdrop-blur-sm p-6 rounded-lg"
									>
										<h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
											<span className="size-8 bg-wisetwin-darkblue/10 rounded-full flex items-center justify-center text-wisetwin-darkblue font-bold">
												{index + 1}
											</span>
											{benefitGroup.title}
										</h3>
										<ul className="space-y-3">
											{benefitGroup.items.map(
												(item, i) => (
													<li
														key={i}
														className="flex items-start gap-2"
													>
														<CheckCircle className="size-5 text-secondary flex-shrink-0 mt-0.5" />
														<span>{item}</span>
													</li>
												)
											)}
										</ul>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</Section>
		</div>
	);
}
