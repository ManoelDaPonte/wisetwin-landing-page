"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock, BookOpen } from "lucide-react";
import Image from "next/image";

type Post = {
	title: string;
	publishedAt: string;
	slug: string;
	description: string;
	coverImage: string;
	readingTime: number;
};

export function BlogSection({ posts }: { posts: Post[] }) {
	const t = useTranslations("blog");

	if (posts.length === 0) return null;

	return (
		<Section
			id="blog"
			variant="default"
			header={{
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
				{posts.map((post) => (
					<Link
						key={post.slug}
						href={`/blog/${post.slug}`}
						className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-secondary/30 hover:shadow-lg hover:shadow-secondary/5 transition-all"
					>
						{post.coverImage ? (
							<div className="relative aspect-video overflow-hidden">
								<Image
									src={post.coverImage}
									alt={post.title}
									fill
									className="object-cover group-hover:scale-105 transition-transform duration-500"
								/>
							</div>
						) : (
							<div className="relative aspect-video bg-muted flex items-center justify-center">
								<BookOpen className="size-10 text-muted-foreground/30" />
							</div>
						)}
						<div className="flex flex-col flex-1 p-6">
							<div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
								<span className="flex items-center gap-1">
									<Calendar className="size-3" />
									<time>
										{new Date(post.publishedAt).toLocaleDateString("fr-FR", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</time>
								</span>
								<span className="flex items-center gap-1">
									<Clock className="size-3" />
									{post.readingTime} min
								</span>
							</div>
							<h3 className="text-lg font-bold mb-2 group-hover:text-secondary transition-colors">
								{post.title}
							</h3>
							<p className="text-sm text-muted-foreground line-clamp-2 flex-1">
								{post.description}
							</p>
						</div>
					</Link>
				))}
			</div>

			<div className="text-center">
				<Button variant="outline" asChild>
					<Link href="/blog">
						{t("readMore")}
						<ArrowRight className="size-4 ml-2" />
					</Link>
				</Button>
			</div>
		</Section>
	);
}
