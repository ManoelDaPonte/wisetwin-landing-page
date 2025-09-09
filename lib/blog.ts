// lib/blog.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "@/types/blog";

// Fonction pour récupérer les 3 derniers articles de blog
export async function getLatestPosts(): Promise<BlogPost[]> {
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

	// Trier les articles par date (du plus récent au plus ancien) et prendre les 3 premiers
	return posts
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 3);
}