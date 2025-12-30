"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// Toutes les clés de FAQ avec leurs catégories
const allFaqKeys = [
	{ key: "whatIsWisetwin", category: "general" },
	{ key: "howHelps", category: "general" },
	{ key: "deploymentTime", category: "technical" },
	{ key: "pricingModel", category: "pricing" },
	{ key: "security", category: "technical" },
	{ key: "trainingTypes", category: "features" },
	{ key: "existingContent", category: "features" },
	{ key: "languages", category: "features" },
	{ key: "economicBenefits", category: "pricing" },
	{ key: "progressTracking", category: "features" },
	{ key: "installation", category: "technical" },
	{ key: "trainingPlans", category: "features" },
	{ key: "hrIntegration", category: "technical" },
	{ key: "certifications", category: "features" },
	{ key: "reminders", category: "features" },
	{ key: "learnerStats", category: "features" },
	{ key: "modifyTrainings", category: "features" },
	{ key: "multiSite", category: "technical" },
	{ key: "support", category: "general" },
] as const;

type Category = "all" | "general" | "features" | "pricing" | "technical";

export default function FaqPage() {
	const t = useTranslations("faq");
	const tCommon = useTranslations("common");
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<Category>("all");

	const categories: Category[] = [
		"all",
		"general",
		"features",
		"pricing",
		"technical",
	];

	const filteredFaqs = useMemo(() => {
		return allFaqKeys.filter((faq) => {
			const question = t(`items.${faq.key}.question`).toLowerCase();
			const answer = t(`items.${faq.key}.answer`).toLowerCase();
			const query = searchQuery.toLowerCase();

			const matchesSearch =
				!searchQuery || question.includes(query) || answer.includes(query);
			const matchesCategory =
				selectedCategory === "all" || faq.category === selectedCategory;

			return matchesSearch && matchesCategory;
		});
	}, [searchQuery, selectedCategory, t]);

	return (
		<div className="min-h-screen bg-background pt-24 pb-16">
			<div className="container mx-auto px-4">
				{/* Back button */}
				<Link
					href="/"
					className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
				>
					<ArrowLeft className="size-4" />
					<span>{tCommon("back")}</span>
				</Link>

				{/* Header */}
				<div className="mb-8 max-w-4xl mx-auto">
					<h1 className="text-4xl font-bold mb-2">{t("title")}</h1>
					<p className="text-muted-foreground text-lg">{t("subtitle")}</p>
				</div>

				{/* Content */}
				<div className="max-w-4xl mx-auto">
					{/* Search */}
					<div className="relative mb-6">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
						<Input
							type="text"
							placeholder={t("searchPlaceholder")}
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-10 h-12"
						/>
					</div>

					{/* Category filters */}
					<div className="flex flex-wrap gap-2 mb-8">
						{categories.map((category) => (
							<Button
								key={category}
								variant={selectedCategory === category ? "default" : "outline"}
								size="sm"
								onClick={() => setSelectedCategory(category)}
								className={cn(
									selectedCategory === category && "bg-secondary text-secondary-foreground"
								)}
							>
								{t(`categories.${category}`)}
							</Button>
						))}
					</div>

					{/* FAQ List */}
					{filteredFaqs.length > 0 ? (
						<Accordion type="single" collapsible className="space-y-4 pb-1">
							{filteredFaqs.map((faq, index) => (
								<AccordionItem
									key={faq.key}
									value={`item-${index}`}
									className="border border-border rounded-lg px-6 bg-card"
								>
									<AccordionTrigger className="text-left hover:no-underline">
										<span className="font-semibold">
											{t(`items.${faq.key}.question`)}
										</span>
									</AccordionTrigger>
									<AccordionContent className="text-muted-foreground leading-relaxed">
										{t(`items.${faq.key}.answer`)}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					) : (
						<div className="text-center py-12 text-muted-foreground">
							<p>{t("noResults")}</p>
						</div>
					)}

					{/* Results count */}
					<div className="mt-6 text-sm text-muted-foreground text-center">
						{filteredFaqs.length} / {allFaqKeys.length} questions
					</div>
				</div>
			</div>
		</div>
	);
}
