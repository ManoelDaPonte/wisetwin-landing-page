"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export function CountUp({
	value,
	suffix = "",
	duration = 1.4,
}: {
	value: number;
	suffix?: string;
	duration?: number;
}) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: "-40px" });
	const reduceMotion = useReducedMotion();
	const [display, setDisplay] = useState(0);

	useEffect(() => {
		if (!inView) return;
		if (reduceMotion) {
			setDisplay(value);
			return;
		}
		const start = performance.now();
		let raf: number;
		const tick = (now: number) => {
			const progress = Math.min(1, (now - start) / (duration * 1000));
			const eased = 1 - Math.pow(1 - progress, 3);
			setDisplay(Math.round(eased * value));
			if (progress < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [inView, value, duration, reduceMotion]);

	return (
		<span ref={ref} className="tabular-nums">
			{display}
			{suffix}
		</span>
	);
}
