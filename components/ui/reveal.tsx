"use client";

import { motion, useReducedMotion } from "framer-motion";

// Apparition douce au scroll, jouée une seule fois. Utiliser `delay` pour
// décaler les éléments d'une même grille (stagger manuel : i * 0.08).
export function Reveal({
	children,
	delay = 0,
	y = 28,
	className,
}: {
	children: React.ReactNode;
	delay?: number;
	y?: number;
	className?: string;
}) {
	const reduceMotion = useReducedMotion();

	return (
		<motion.div
			className={className}
			initial={reduceMotion ? false : { opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
		>
			{children}
		</motion.div>
	);
}
