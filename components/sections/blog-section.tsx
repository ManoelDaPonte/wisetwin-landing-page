// components/sections/blog-section.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarIcon } from "lucide-react";

import { Section } from "@/components/common/section";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/types/blog";

interface BlogSectionProps {
	posts: BlogPost[];
}

export function BlogSection({ posts }: BlogSectionProps) {
	if (posts.length === 0) {
		return null; // Ne pas afficher la section s'il n'y a pas d'articles
	}

	return (
		<Section
			id="blog-preview"
			variant="default"
			header={{
				title: "Derniers articles",
				// description:
				// 	"Suivez nos articles sur l'industrie 4.0 et la formation immersive",
				centered: true,
			}}
		>
			<div className="grid md:grid-cols-3 gap-12">
				{posts.map((post) => (
					<Link
						key={post.slug}
						href={`/blog/${post.slug}`}
						className="group"
					>
						<Card
							noPaddingTop
							className="h-full flex flex-col hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer "
						>
							{/* Image de couverture */}
							<div className="h-32 bg-secondary/20 relative flex items-center justify-center overflow-hidden">
								{post.coverImage ? (
									<Image
										src={post.coverImage}
										alt={post.title}
										width={400}
										height={128}
										className="w-full h-full object-cover"
									/>
								) : (
									<p className="text-secondary font-medium text-sm">
										Image de couverture
									</p>
								)}
							</div>

							<CardHeader className="pt-4">
								<div className="flex items-center gap-2 mb-2">
									<Badge
										variant="secondary"
										className="text-xs"
									>
										{post.category}
									</Badge>
									<span className="text-xs text-muted-foreground flex items-center gap-1">
										<CalendarIcon className="size-3" />
										{new Date(post.date).toLocaleDateString(
											"fr-FR",
											{
												day: "numeric",
												month: "short",
											}
										)}
									</span>
								</div>

								<CardTitle className="text-lg group-hover:text-secondary transition-colors line-clamp-2">
									{post.title}
								</CardTitle>
							</CardHeader>

							<CardContent className="flex-grow">
								<p className="text-muted-foreground text-sm line-clamp-3">
									{post.excerpt}
								</p>
							</CardContent>

							<CardFooter className="border-t pt-3 flex justify-between items-center">
								<div className="flex items-center gap-2">
									<Avatar className="size-6">
										<AvatarFallback className="text-xs">
											{post.author.name.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="text-xs font-medium">
											{post.author.name}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-1 text-xs text-muted-foreground">
									{post.readTime} min
									<ArrowRight className="size-3 group-hover:text-secondary group-hover:translate-x-0.5 transition-all duration-200" />
								</div>
							</CardFooter>
						</Card>
					</Link>
				))}
			</div>

			{/* Lien vers tous les articles */}
			<div className="flex justify-center mt-12">
				<Button asChild variant="outline">
					<Link href="/blog">
						<div className="flex items-center gap-2">
							Voir tous les articles
							<ArrowRight className="size-4" />
						</div>
					</Link>
				</Button>
			</div>
		</Section>
	);
}
