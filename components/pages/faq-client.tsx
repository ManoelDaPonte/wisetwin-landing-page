"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/common/section";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { allFaqKeys } from "@/data/faq-keys";

type Category = "all" | "general" | "features" | "pricing" | "technical";

export default function FaqClient() {
	const t = useTranslations("faq");
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
		<Section
			id="faq"
			variant="default"
			header={{
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
			className="pt-32"
		>
			<div className="max-w-5xl mx-auto">
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
		</Section>
	);
}
