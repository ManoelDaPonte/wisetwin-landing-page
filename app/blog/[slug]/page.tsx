// app/blog/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarIcon, Clock } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import MDXWrapper from "@/components/mdx-wrapper";

// Type pour un article récupéré
type PostWithFrontmatter = {
	slug: string;
	frontmatter: {
		title: string;
		excerpt: string;
		date: string;
		author: {
			name: string;
			role: string;
		};
		category: string;
		tags: string[];
		readTime: number;
	};
};

// Fonction pour obtenir tous les slugs d&apos;articles pour la génération statique
export async function generateStaticParams() {
	const blogDir = path.join(process.cwd(), "blog");

	// Vérifier si le dossier blog existe
	if (!fs.existsSync(blogDir)) {
		return [];
	}

	const files = fs.readdirSync(blogDir);

	return files
		.filter((file) => file.endsWith(".mdx"))
		.map((file) => ({
			slug: file.replace(/\.mdx$/, ""),
		}));
}

// Fonction pour obtenir le contenu d&apos;un article spécifique
async function getPostBySlug(
	slug: string
): Promise<PostWithFrontmatter | null> {
	const filePath = path.join(process.cwd(), "blog", `${slug}.mdx`);

	try {
		// Vérifier si le fichier existe
		if (!fs.existsSync(filePath)) {
			return null;
		}

		// Lire le fichier et extraire les métadonnées avec gray-matter
		const fileContent = fs.readFileSync(filePath, "utf8");
		const { data } = matter(fileContent);

		return {
			slug,
			frontmatter: {
				title: data.title as string,
				excerpt: data.excerpt as string,
				date: data.date as string,
				author: data.author as { name: string; role: string },
				category: data.category as string,
				tags: data.tags as string[],
				readTime: data.readTime as number,
			},
		};
	} catch (error) {
		console.error("Error reading post:", error);
		return null;
	}
}

// Générer les métadonnées pour le SEO
export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) {
		return {
			title: "Article non trouvé",
		};
	}

	return {
		title: post.frontmatter.title,
		description: post.frontmatter.excerpt,
		openGraph: {
			title: post.frontmatter.title,
			description: post.frontmatter.excerpt,
			type: "article",
			authors: [post.frontmatter.author.name],
		},
	};
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	// Importer dynamiquement le contenu MDX
	let MDXContent;
	try {
		const MDXModule = await import(`@/blog/${slug}.mdx`);
		MDXContent = MDXModule.default;
	} catch {
		notFound();
	}

	return (
		<div className="pt-24 pb-16">
			<article className="max-w-4xl mx-auto px-4">
				{/* Header de l&apos;article */}
				<div className="mb-8">
					<Link
						href="/blog"
						className="inline-flex items-center text-muted-foreground hover:text-wisetwin-blue mb-4"
					>
						<ArrowLeft className="mr-1 size-4" />
						Retour aux articles
					</Link>

					<h1 className="text-3xl md:text-4xl font-bold mb-4">
						{post.frontmatter.title}
					</h1>

					<div className="flex flex-wrap gap-3 mb-4">
						<Badge variant="secondary">
							{post.frontmatter.category}
						</Badge>
						<span className="text-sm text-muted-foreground flex items-center">
							<CalendarIcon className="size-4 mr-1" />
							{new Date(post.frontmatter.date).toLocaleDateString(
								"fr-FR",
								{
									year: "numeric",
									month: "long",
									day: "numeric",
								}
							)}
						</span>
						<span className="text-sm text-muted-foreground flex items-center">
							<Clock className="size-4 mr-1" />
							{post.frontmatter.readTime} min de lecture
						</span>
					</div>

					<p className="text-lg text-muted-foreground mb-6">
						{post.frontmatter.excerpt}
					</p>

					<div className="flex items-center border-y py-4">
						<div className="flex items-center gap-3">
							<Avatar className="size-10">
								<AvatarFallback>
									{post.frontmatter.author.name.charAt(0)}
								</AvatarFallback>
							</Avatar>
							<div>
								<p className="font-medium">
									{post.frontmatter.author.name}
								</p>
								<p className="text-sm text-muted-foreground">
									{post.frontmatter.author.role}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Image principale (simulée) */}
				<div className="aspect-video bg-wisetwin-blue/20 rounded-lg flex items-center justify-center mb-8">
					<p className="text-wisetwin-blue font-medium">
						Image principale de l&apos;article
					</p>
				</div>

				{/* Contenu de l&apos;article */}
				<div className="">
					<MDXWrapper>
						<MDXContent />
					</MDXWrapper>
				</div>

				{/* Tags */}
				<div className="mb-12">
					<h3 className="text-sm font-medium mb-2">Tags :</h3>
					<div className="flex flex-wrap gap-2">
						{post.frontmatter.tags.map((tag: string) => (
							<Badge key={tag} variant="outline">
								{tag}
							</Badge>
						))}
					</div>
				</div>
			</article>
		</div>
	);
}
