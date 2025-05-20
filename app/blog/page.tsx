// app/blog/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
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

// Fonction pour récupérer tous les articles de blog
async function getAllPosts(): Promise<BlogPost[]> {
	// Chemin vers le dossier des articles
	const blogDir = path.join(process.cwd(), "blog");
	
	// Vérifier si le dossier existe
	if (!fs.existsSync(blogDir)) {
		return [];
	}
	
	const filenames = fs.readdirSync(blogDir);

	// Extraire les métadonnées de chaque article
	const posts = filenames
		.filter((filename) => filename.endsWith(".mdx"))
		.map((filename) => {
			const filePath = path.join(blogDir, filename);
			const fileContent = fs.readFileSync(filePath, "utf8");
			const { data } = matter(fileContent);

			// Convertir les données en un objet BlogPost typé
			return {
				slug: filename.replace(/\.mdx$/, ""),
				title: data.title as string,
				excerpt: data.excerpt as string,
				date: data.date as string,
				author: data.author as { name: string; role: string },
				category: data.category as string,
				tags: data.tags as string[],
				readTime: data.readTime as number,
			} as BlogPost;
		});

	// Trier les articles par date (du plus récent au plus ancien)
	return posts.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
}

export default async function BlogPage() {
	const posts = await getAllPosts();

	return (
		<div className="pt-24 pb-16">
			<Section
				id="blog"
				variant="default"
				header={{
					title: "Blog WiseTwin",
					description:
						"Explorez nos derniers articles, insights et actualités sur l&apos;industrie 4.0 et la formation immersive.",
					centered: true,
				}}
			>
				{/* Grille d&apos;articles */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
					{posts.map((post) => (
						<div key={post.slug}>
							<Card className="h-full flex flex-col hover:shadow-md transition-all duration-200 overflow-hidden">
								{/* Image de couverture (simulation) */}
								<div className="h-48 bg-wisetwin-blue/20 relative flex items-center justify-center">
									<p className="text-wisetwin-blue font-medium">
										Image de couverture
									</p>
								</div>

								<CardHeader>
									<div className="flex items-center gap-2 mb-2">
										<Badge
											variant="secondary"
											className="text-xs"
										>
											{post.category}
										</Badge>
										<span className="text-xs text-muted-foreground flex items-center gap-1">
											<CalendarIcon className="size-3" />
											{new Date(
												post.date
											).toLocaleDateString("fr-FR", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</span>
										<span className="text-xs text-muted-foreground">
											{post.readTime} min de lecture
										</span>
									</div>

									<CardTitle className="text-xl hover:text-wisetwin-blue transition-colors">
										<Link href={`/blog/${post.slug}`}>
											{post.title}
										</Link>
									</CardTitle>
								</CardHeader>

								<CardContent className="flex-grow">
									<p className="text-muted-foreground">
										{post.excerpt}
									</p>

									<div className="flex flex-wrap gap-1 mt-4">
										{post.tags.map((tag: string) => (
											<Badge
												key={tag}
												variant="outline"
												className="text-xs font-normal"
											>
												{tag}
											</Badge>
										))}
									</div>
								</CardContent>

								<CardFooter className="border-t pt-4 flex justify-between items-center">
									<div className="flex items-center gap-2">
										<Avatar className="size-8">
											<AvatarFallback>
												{post.author.name.charAt(0)}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="text-sm font-medium">
												{post.author.name}
											</p>
											<p className="text-xs text-muted-foreground">
												{post.author.role}
											</p>
										</div>
									</div>

									<Button variant="ghost" size="sm" asChild>
										<Link href={`/blog/${post.slug}`}>
											<span className="flex items-center gap-1">
												Lire l&apos;article
												<ArrowRight className="size-3 ml-1" />
											</span>
										</Link>
									</Button>
								</CardFooter>
							</Card>
						</div>
					))}
				</div>

				{posts.length === 0 && (
					<div className="text-center py-10">
						<p className="text-muted-foreground">
							Aucun article disponible pour le moment.
						</p>
					</div>
				)}
			</Section>
		</div>
	);
}
