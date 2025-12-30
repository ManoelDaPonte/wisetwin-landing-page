"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/common/section";
import { cn } from "@/lib/utils";
import {
	Factory,
	Zap,
	Globe,
	Repeat,
	ShieldCheck,
	Share2,
} from "lucide-react";

const items = ["noDowntime", "fastDelivery", "noVR", "unlimited", "safe", "interop"] as const;

const icons = {
	noDowntime: Factory,
	fastDelivery: Zap,
	noVR: Globe,
	unlimited: Repeat,
	safe: ShieldCheck,
	interop: Share2,
};

export function AdvantagesSection() {
	const t = useTranslations("advantages");
	const [selected, setSelected] = useState<(typeof items)[number]>("noDowntime");

	return (
		<Section
			id="advantages"
			variant="dark"
			header={{
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div className="grid lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
				{/* Cards de sélection à gauche */}
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
										: "bg-white/5 hover:bg-white/10 text-white/80 hover:text-white"
								)}
							>
								<div
									className={cn(
										"flex items-center justify-center size-12 rounded-lg shrink-0",
										isSelected ? "bg-white/20" : "bg-white/10"
									)}
								>
									<Icon className="size-6" />
								</div>
								<div>
									<div className="font-bold text-lg">{t(`items.${item}.label`)}</div>
									<div
										className={cn(
											"text-sm",
											isSelected ? "text-secondary-foreground/80" : "text-white/60"
										)}
									>
										{t(`items.${item}.shortDesc`)}
									</div>
								</div>
							</button>
						);
					})}
				</div>

				{/* Zone de détail à droite */}
				<div className="lg:col-span-3">
					<AnimatePresence mode="wait">
						<motion.div
							key={selected}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
							className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 h-full flex flex-col justify-between"
						>
							<div>
								<h3 className="text-2xl font-bold text-white mb-4">
									{t(`items.${selected}.title`)}
								</h3>
								<p className="text-white/70 text-lg leading-relaxed">
									{t(`items.${selected}.description`)}
								</p>
							</div>

							{/* Stats */}
							<div className="grid grid-cols-2 gap-6 mt-8">
								<div className="bg-white/5 rounded-xl p-6 text-center">
									<div className="text-4xl font-bold text-secondary mb-1">
										{t(`items.${selected}.stats.value1`)}
									</div>
									<div className="text-sm text-white/60">
										{t(`items.${selected}.stats.label1`)}
									</div>
								</div>
								<div className="bg-white/5 rounded-xl p-6 text-center">
									<div className="text-4xl font-bold text-secondary mb-1">
										{t(`items.${selected}.stats.value2`)}
									</div>
									<div className="text-sm text-white/60">
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
