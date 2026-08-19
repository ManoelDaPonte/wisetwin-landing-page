"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";

export function StatsSection() {
	const t = useTranslations("stats");
	const items = t.raw("items") as Array<{
		value: string;
		suffix?: string;
		label: string;
	}>;

	return (
		<section className="bg-background py-14 md:py-20 border-b border-border/50">
			<div className="container mx-auto max-w-7xl px-4">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
					{items.map((stat, i) => (
						<Reveal key={i} delay={i * 0.08}>
							<div className="text-center lg:text-left lg:border-l-2 lg:border-secondary/30 lg:pl-6">
								<p className="text-5xl md:text-6xl font-bold tracking-tight text-secondary">
									<CountUp
										value={Number(stat.value)}
										suffix={stat.suffix ?? ""}
									/>
								</p>
								<p className="mt-3 text-sm md:text-base text-muted-foreground leading-snug max-w-[24ch] mx-auto lg:mx-0">
									{stat.label}
								</p>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
