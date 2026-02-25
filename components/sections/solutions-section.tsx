"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Section } from "@/components/common/section";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";

const products = [
	{
		key: "wisetrainer",
		image: "/image/loto.webp",
		href: "/solutions/wisetrainer",
	},
	{
		key: "wisepaper",
		image: "/placeholder.png",
		href: "/solutions/wisepaper",
	},
	{ key: "wisetour", image: "/placeholder.png", href: "/solutions/wisetour" },
	{
		key: "wiseatlas",
		image: "/placeholder.png",
		href: "/solutions/wiseatlas",
	},
] as const;

export function SolutionsSection() {
	const t = useTranslations("pricing.products");
	const tSolutions = useTranslations("solutions");

	return (
		<Section
			id="solutions"
			variant="default"
			header={{
				title: tSolutions("title"),
				description: tSolutions("subtitle"),
				centered: true,
			}}
		>
			<div className="relative max-w-6xl mx-auto">
				<Carousel
					opts={{
						align: "start",
						loop: true,
					}}
					className="w-full"
				>
					<CarouselContent className="-ml-4">
						{products.map((product) => (
							<CarouselItem
								key={product.key}
								className="pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3"
							>
								<Link
									href={product.href}
									className="block group"
								>
									<div className="rounded-2xl border border-border overflow-hidden bg-card transition-all hover:shadow-lg hover:border-secondary/30">
										{/* Browser chrome */}
										<div className="bg-muted/50 px-4 py-2.5 flex items-center gap-1.5 border-b border-border">
											<span className="size-2.5 rounded-full bg-red-400/60" />
											<span className="size-2.5 rounded-full bg-yellow-400/60" />
											<span className="size-2.5 rounded-full bg-green-400/60" />
										</div>
										{/* Screenshot */}
										<div className="relative h-48 overflow-hidden">
											<Image
												src={product.image}
												alt={t(`${product.key}.title`)}
												fill
												className="object-cover"
											/>
										</div>
										{/* Content */}
										<div className="p-5">
											<h3 className="font-bold text-lg mb-1.5">
												{t(`${product.key}.title`)}
											</h3>
											<p className="text-sm text-muted-foreground line-clamp-3 mb-4">
												{t(
													`${product.key}.description`,
												)}
											</p>
											<div className="flex items-center justify-between">
												<span className="text-sm font-semibold text-secondary">
													{t(`${product.key}.price`)}
												</span>
												<span className="inline-flex items-center gap-1 text-sm font-semibold text-secondary group-hover:underline underline-offset-4">
													{tSolutions("cta")}
													<ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
												</span>
											</div>
										</div>
									</div>
								</Link>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="hidden md:flex -left-12" />
					<CarouselNext className="hidden md:flex -right-12" />
				</Carousel>
			</div>
		</Section>
	);
}
