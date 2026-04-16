"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/common/section";
import { cn } from "@/lib/utils";
import { Zap, BarChart3, BadgePercent, Share2, Monitor } from "lucide-react";

const items = [
	"reactivity",
	"tracking",
	"costEffective",
	"easyIntegration",
	"noEquipment",
] as const;

const icons = {
	reactivity: Zap,
	tracking: BarChart3,
	costEffective: BadgePercent,
	easyIntegration: Share2,
	noEquipment: Monitor,
};

const float = (duration: number, delay: number, distance = 12) => ({
	y: [-distance, distance, -distance],
	transition: { duration, delay, repeat: Infinity, ease: "easeInOut" as const },
});

const floatX = (duration: number, delay: number, distance = 8) => ({
	x: [-distance, distance, -distance],
	transition: { duration, delay, repeat: Infinity, ease: "easeInOut" as const },
});

function GeometricBackground({ item }: { item: (typeof items)[number] }) {
	switch (item) {
		case "reactivity":
			return (
				<>
					<motion.div animate={float(5, 0)} className="absolute top-8 right-12 w-0 h-0 border-l-[30px] border-l-transparent border-b-[50px] border-b-secondary/15 border-r-[30px] border-r-transparent" />
					<motion.div animate={float(6, 1.5, 10)} className="absolute bottom-12 left-16 w-0 h-0 border-l-[20px] border-l-transparent border-b-[35px] border-b-secondary/10 border-r-[20px] border-r-transparent" />
					<motion.div animate={floatX(7, 0.5)} className="absolute top-1/3 left-1/4 w-48 h-px bg-secondary/15 rotate-45 origin-left" />
					<motion.div animate={floatX(8, 2)} className="absolute top-1/2 left-1/3 w-32 h-px bg-secondary/10 rotate-45 origin-left" />
					<motion.div animate={float(5.5, 0.8, 8)} className="absolute bottom-1/4 right-1/4 w-0 h-0 border-l-[15px] border-l-transparent border-b-[25px] border-b-secondary/10 border-r-[15px] border-r-transparent rotate-12" />
				</>
			);
		case "tracking":
			return (
				<>
					{[0, 1, 2, 3, 4].map((row) =>
						[0, 1, 2, 3, 4].map((col) => (
							<motion.div
								key={`${row}-${col}`}
								animate={float(4 + ((row + col) % 3), (row * 0.3 + col * 0.2), 6)}
								className="absolute size-2 rounded-full bg-secondary/15"
								style={{
									top: `${20 + row * 15}%`,
									left: `${15 + col * 18}%`,
								}}
							/>
						)),
					)}
					<motion.div animate={floatX(7, 0)} className="absolute top-[27%] left-[23%] w-[18%] h-px bg-secondary/10 rotate-[30deg]" />
					<motion.div animate={floatX(8, 1)} className="absolute top-[42%] left-[32%] w-[18%] h-px bg-secondary/10 -rotate-[15deg]" />
					<motion.div animate={floatX(6, 2)} className="absolute top-[50%] left-[50%] w-[18%] h-px bg-secondary/10 rotate-[45deg]" />
					<motion.div animate={floatX(7.5, 0.5)} className="absolute top-[35%] left-[55%] w-[18%] h-px bg-secondary/10 -rotate-[30deg]" />
				</>
			);
		case "costEffective":
			return (
				<>
					<motion.div animate={{ scale: [1, 1.06, 1], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-48 rounded-full border-2 border-secondary/20" />
					<motion.div animate={{ scale: [1, 1.08, 1], transition: { duration: 5, delay: 0.5, repeat: Infinity, ease: "easeInOut" } }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-32 rounded-full border-2 border-secondary/15" />
					<motion.div animate={{ scale: [1, 1.15, 1], transition: { duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" } }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-16 rounded-full bg-secondary/10" />
					<motion.div animate={float(7, 0, 4)} className="absolute top-1/4 left-8 right-8 h-px bg-secondary/10" />
					<motion.div animate={float(6, 1, 4)} className="absolute top-1/2 left-8 right-8 h-px bg-secondary/10" />
					<motion.div animate={float(8, 0.5, 4)} className="absolute top-3/4 left-8 right-8 h-px bg-secondary/10" />
				</>
			);
		case "easyIntegration":
			return (
				<>
					<motion.div animate={float(6, 0, 10)} className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 size-32 rounded-full border-2 border-secondary/15" />
					<motion.div animate={float(6, 1.5, 10)} className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 size-32 rounded-full border-2 border-secondary/15" />
					<motion.div animate={float(5, 0.8, 8)} className="absolute top-1/4 left-1/2 -translate-x-1/2 size-20 rounded-full border-2 border-secondary/10" />
					<motion.div animate={float(5, 2, 8)} className="absolute bottom-1/4 left-1/2 -translate-x-1/2 size-20 rounded-full border-2 border-secondary/10" />
				</>
			);
		case "noEquipment":
			return (
				<>
					<motion.div animate={{ scale: [1, 1.05, 1], transition: { duration: 7, repeat: Infinity, ease: "easeInOut" } }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-40 rounded-full border-2 border-secondary/15" />
					<motion.div animate={float(4, 0, 6)} className="absolute top-6 left-1/2 -translate-x-1/2 size-3 rounded-full bg-secondary/20" />
					<motion.div animate={float(4, 1, 6)} className="absolute bottom-6 left-1/2 -translate-x-1/2 size-3 rounded-full bg-secondary/20" />
					<motion.div animate={floatX(4, 0.5, 6)} className="absolute top-1/2 -translate-y-1/2 left-6 size-3 rounded-full bg-secondary/20" />
					<motion.div animate={floatX(4, 1.5, 6)} className="absolute top-1/2 -translate-y-1/2 right-6 size-3 rounded-full bg-secondary/20" />
					<motion.div animate={float(5, 0.3, 5)} className="absolute top-10 left-10 size-2 rounded-full bg-secondary/15" />
					<motion.div animate={float(5, 1.2, 5)} className="absolute top-10 right-10 size-2 rounded-full bg-secondary/15" />
					<motion.div animate={float(5, 0.8, 5)} className="absolute bottom-10 left-10 size-2 rounded-full bg-secondary/15" />
					<motion.div animate={float(5, 2, 5)} className="absolute bottom-10 right-10 size-2 rounded-full bg-secondary/15" />
				</>
			);
	}
}

export function AdvantagesSection() {
	const t = useTranslations("advantages");
	const [selected, setSelected] =
		useState<(typeof items)[number]>("reactivity");

	return (
		<Section
			id="advantages"
			variant="muted"
			header={{
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div className="grid lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
				{/* Cards de selection */}
				<div className="lg:col-span-2 flex flex-col gap-3">
					{items.map((item) => {
						const Icon = icons[item];
						const isSelected = selected === item;

						return (
							<button
								key={item}
								onClick={() => setSelected(item)}
								className={cn(
									"flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300",
									isSelected
										? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20"
										: "bg-card border border-border hover:border-secondary/50 text-foreground",
								)}
							>
								<div
									className={cn(
										"flex items-center justify-center size-12 rounded-lg shrink-0",
										isSelected
											? "bg-white/20"
											: "bg-secondary/10",
									)}
								>
									<Icon className="size-6" />
								</div>
								<div>
									<div className="font-bold text-lg">
										{t(`items.${item}.label`)}
									</div>
									<div
										className={cn(
											"text-sm",
											isSelected
												? "text-secondary-foreground/80"
												: "text-muted-foreground",
										)}
									>
										{t(`items.${item}.shortDesc`)}
									</div>
								</div>
							</button>
						);
					})}
				</div>

				{/* Detail panel */}
				<div className="lg:col-span-3">
					<AnimatePresence mode="wait">
						<motion.div
							key={selected}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
							className="relative rounded-2xl p-8 h-full flex flex-col justify-between overflow-hidden bg-card border border-border"
						>
							{/* Geometric background */}
							<div className="absolute inset-0">
								<GeometricBackground item={selected} />
							</div>

							{/* Content */}
							<div className="relative z-10">
								<h3 className="text-2xl font-bold text-foreground mb-4">
									{t(`items.${selected}.title`)}
								</h3>
								<p className="text-muted-foreground text-lg leading-relaxed">
									{t(`items.${selected}.description`)}
								</p>
							</div>

							{/* Stats */}
							<div className="relative z-10 grid grid-cols-2 gap-6 mt-8">
								<div className="bg-secondary/10 rounded-xl p-6 text-center">
									<div className="text-4xl font-bold text-secondary mb-1">
										{t(`items.${selected}.stats.value1`)}
									</div>
									<div className="text-sm text-muted-foreground">
										{t(`items.${selected}.stats.label1`)}
									</div>
								</div>
								<div className="bg-secondary/10 rounded-xl p-6 text-center">
									<div className="text-4xl font-bold text-secondary mb-1">
										{t(`items.${selected}.stats.value2`)}
									</div>
									<div className="text-sm text-muted-foreground">
										{t(`items.${selected}.stats.label2`)}
									</div>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</Section>
	);
}
