"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Image from "next/image";

type Props = {
	title: string;
	publishedAt: string;
	author: { name?: string; picture?: string } | string;
	contentHtml: string;
	readingTime: number;
};

export default function BlogPostClient({
	title,
	publishedAt,
	author,
	contentHtml,
	readingTime,
}: Props) {
	const t = useTranslations("blog");

	const authorName =
		typeof author === "string" ? author : author?.name || "WiseTwin";
	const authorPicture =
		typeof author === "object" && author?.picture ? author.picture : null;

	return (
		<main className="pt-32 pb-20">
			<div className="container mx-auto max-w-3xl px-4">
				{/* Back link */}
				<Button variant="ghost" size="sm" asChild className="mb-8">
					<Link href="/blog">
						<ArrowLeft className="size-4 mr-2" />
						{t("backToBlog")}
					</Link>
				</Button>

				{/* Title */}
				<h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
					{title}
				</h1>

				{/* Author + date */}
				<div className="flex items-center gap-3 mb-10">
					{authorPicture ? (
						<Image
							src={authorPicture}
							alt={authorName}
							width={36}
							height={36}
							className="rounded-full"
						/>
					) : (
						<div className="size-9 bg-secondary/10 rounded-full flex items-center justify-center">
							<User className="size-4 text-secondary" />
						</div>
					)}
					<div>
						<p className="text-sm font-medium">{authorName}</p>
						<div className="flex items-center gap-3 text-xs text-muted-foreground">
							<span className="flex items-center gap-1">
								<Calendar className="size-3" />
								<time>
									{new Date(publishedAt).toLocaleDateString("fr-FR", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</time>
							</span>
							<span className="flex items-center gap-1">
								<Clock className="size-3" />
								{readingTime} min
							</span>
						</div>
					</div>
				</div>

				{/* Content */}
				<article
					className="prose prose-lg max-w-none
						text-foreground
						prose-headings:text-foreground prose-headings:font-bold
						prose-p:text-foreground/85
						prose-strong:text-foreground
						prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
						prose-blockquote:border-secondary prose-blockquote:text-muted-foreground
						prose-img:rounded-xl prose-img:border prose-img:border-border prose-img:mx-auto
						prose-figure:text-center
						prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-muted-foreground
						prose-pre:bg-muted prose-pre:border prose-pre:border-border
						prose-code:text-secondary prose-code:bg-secondary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
						prose-li:text-foreground/85
						prose-hr:border-border
						[&_img]:mx-auto [&_img]:block"
					dangerouslySetInnerHTML={{ __html: contentHtml }}
				/>
			</div>
		</main>
	);
}
