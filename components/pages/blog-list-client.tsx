"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/common/section";
import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";

type Post = {
	title: string;
	publishedAt: string;
	slug: string;
	description: string;
	coverImage: string;
	author: { name: string } | string;
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
					<p className="text-center text-muted-foreground">
						{t("noPostsYet")}
					</p>
				) : (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{posts.map((post) => (
							<Link
								key={post.slug}
								href={`/blog/${post.slug}`}
								className="group bg-card border border-border rounded-xl overflow-hidden hover:border-secondary/30 transition-all"
							>
								{post.coverImage && (
									<div className="relative aspect-video overflow-hidden">
										<Image
											src={post.coverImage}
											alt={post.title}
											fill
											className="object-cover group-hover:scale-105 transition-transform duration-300"
										/>
									</div>
								)}
								<div className="p-6">
									<div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
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
									</div>
									<h2 className="text-lg font-bold mb-2 group-hover:text-secondary transition-colors">
										{post.title}
									</h2>
									<p className="text-sm text-muted-foreground line-clamp-3 mb-4">
										{post.description}
									</p>
									<span className="inline-flex items-center gap-1 text-sm font-medium text-secondary">
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
