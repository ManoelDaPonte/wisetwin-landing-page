// types/blog.ts
export interface Author {
	name: string;
	role: string;
	avatar?: string;
}

export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	author: Author;
	category: string;
	tags: string[];
	readTime: number;
	content?: string;
	coverImage?: string;
	images?: string[];
}
