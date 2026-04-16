"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import Image from "next/image";

type Props = {
	title: string;
	publishedAt: string;
	author: { name: string } | string;
	coverImage: string;
	contentHtml: string;
};

export default function BlogPostClient({
	title,
	publishedAt,
	author,
	coverImage,
	contentHtml,
}: Props) {
	const t = useTranslations("blog");

	const authorName =
		typeof author === "string" ? author : author?.name || "WiseTwin";

	return (
		<main>
			<Section id="blog-post" variant="default" className="pt-32">
				<div className="max-w-3xl mx-auto">
					{/* Back link */}
					<Button variant="ghost" size="sm" asChild className="mb-8">
						<Link href="/blog">
							<ArrowLeft className="size-4 mr-2" />
							{t("backToBlog")}
						</Link>
					</Button>

					{/* Header */}
					<header className="mb-8">
						<h1 className="text-3xl lg:text-4xl font-bold mb-4">
							{title}
						</h1>
						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							<div className="flex items-center gap-2">
								<Calendar className="size-4" />
								<time>
									{t("publishedOn")}{" "}
									{new Date(publishedAt).toLocaleDateString("fr-FR", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</time>
							</div>
							<span>{authorName}</span>
						</div>
					</header>

					{/* Cover image */}
					{coverImage && (
						<div className="relative aspect-video rounded-xl overflow-hidden mb-8 border border-border">
							<Image
								src={coverImage}
								alt={title}
								fill
								className="object-cover"
								priority
							/>
						</div>
					)}

					{/* Content */}
					<article
						className="prose prose-lg dark:prose-invert max-w-none
							prose-headings:font-bold
							prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
							prose-img:rounded-xl prose-img:border prose-img:border-border prose-img:mx-auto
							prose-figure:text-center
							prose-figcaption:text-center prose-figcaption:text-sm
							prose-pre:bg-muted prose-pre:border prose-pre:border-border
							[&_img]:mx-auto [&_img]:block"
						dangerouslySetInnerHTML={{ __html: contentHtml }}
					/>

					{/* Bottom nav */}
					<div className="mt-12 pt-8 border-t border-border">
						<Button variant="outline" asChild>
							<Link href="/blog">
								<ArrowLeft className="size-4 mr-2" />
								{t("backToBlog")}
							</Link>
						</Button>
					</div>
				</div>
			</Section>
		</main>
	);
}
