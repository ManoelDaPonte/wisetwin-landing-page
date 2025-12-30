"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const logos = [
	{ name: "AFPA", src: "/logos/afpa-seeklogo.svg" },
	{ name: "AGC", src: "/logos/AGC_Logo.svg" },
	{ name: "Bpifrance", src: "/logos/Logo_Bpifrance.svg" },
	{
		name: "Institut Mines-Télécom",
		src: "/logos/Logo_Institut_Mines-Télécom.svg",
	},
	{ name: "Ecosystème D", src: "/logos/Logo-Ecosysteme-D_CMJN.png" },
	{ name: "AD", src: "/logos/logo-ad.png" },
];

export function TrustedBySection() {
	return (
		<section className="py-8 md:py-12 border-t border-border/50 bg-muted/30">
			<div className="container mx-auto px-4">
				{/* Marquee container */}
				<div className="relative overflow-hidden">
					{/* Gradient masks */}
					<div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
					<div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />

					{/* Scrolling logos */}
					<div className="flex animate-marquee">
						{[...logos, ...logos].map((logo, index) => (
							<div
								key={index}
								className={cn(
									"flex-shrink-0 mx-8 md:mx-12",
									"flex items-center justify-center",
									"h-12 w-32 md:w-40"
								)}
							>
								<Image
									src={logo.src}
									alt={logo.name}
									width={160}
									height={48}
									className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
