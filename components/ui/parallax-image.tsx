"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function ParallaxImage({ src, alt }: { src: string; alt: string }) {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div
			className="absolute inset-0"
			style={{ transform: `translateY(${scrollY * 0.5}px) scale(1.2)` }}
		>
			<Image
				src={src}
				alt={alt}
				fill
				className="object-cover"
				priority
			/>
		</div>
	);
}
