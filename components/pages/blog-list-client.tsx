"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/common/section";
import { Calendar, ArrowRight, BookOpen, Clock } from "lucide-react";
import Image from "next/image";

type Post = {
	title: string;
	publishedAt: string;
	slug: string;
	description: string;
	coverImage: string;
	author: { name: string } | string;
	readingTime: number;
};

export default function BlogListClient({ posts }: { posts: Post[] }) {
	const t = useTranslations("blog");

	return (
		<main>
			<Section
				id="blog"
				variant="default"
				header={{
					title: t("title"),
					description: t("subtitle"),
					centered: true,
				}}
				className="pt-32"
			>
				{posts.length === 0 ? (
					<div className="text-center py-12">
						<div className="size-14 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
							<BookOpen className="size-7 text-muted-foreground" />
						</div>
						<p className="text-muted-foreground">
							{t("noPostsYet")}
						</p>
					</div>
				) : (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
												{new Date(post.publishedAt).toLocaleDateString(
													"fr-FR",
													{
														year: "numeric",
														month: "long",
														day: "numeric",
													}
												)}
											</time>
										</span>
										<span className="flex items-center gap-1">
											<Clock className="size-3" />
											{post.readingTime} min
										</span>
									</div>
									<h2 className="text-lg font-bold mb-2 group-hover:text-secondary transition-colors">
										{post.title}
									</h2>
									<p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
										{post.description}
									</p>
									<span className="inline-flex items-center gap-1 text-sm font-semibold text-secondary">
										{t("readMore")}
										<ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
									</span>
								</div>
							</Link>
						))}
					</div>
				)}
			</Section>
		</main>
	);
}
