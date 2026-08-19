"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/ui/reveal";
import { Sprout } from "lucide-react";

const steps = [
	{ key: "listen", number: 1 },
	{ key: "proposal", number: 2 },
	{ key: "build", number: 3 },
	{ key: "deploy", number: 4 },
] as const;

export function MethodSection() {
	const t = useTranslations("method");

	return (
		<Section
			id="methode"
			variant="muted"
			header={{
				eyebrow: t("eyebrow"),
				title: t("title"),
				description: t("subtitle"),
				centered: true,
			}}
		>
			<div className="max-w-5xl mx-auto">
				{/* Desktop timeline */}
				<div className="hidden lg:block">
					<div className="relative">
						<div className="absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-secondary/30" />
						<div className="absolute top-[22px] left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-secondary/60 via-secondary to-secondary/60 rounded-full" />

						<div className="grid grid-cols-4 gap-8">
							{steps.map((step, i) => (
								<Reveal
									key={step.key}
									delay={i * 0.12}
									className="relative flex flex-col items-center text-center"
								>
									<div className="relative z-10 size-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-md shadow-secondary/20">
										{step.number}
									</div>
									<div className="mt-3 mb-4">
										<span className="inline-block text-xs font-semibold text-secondary bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full">
											{t(`steps.${step.key}.duration`)}
										</span>
									</div>
									<h3 className="font-semibold mb-1">
										{t(`steps.${step.key}.title`)}
									</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{t(`steps.${step.key}.description`)}
									</p>
								</Reveal>
							))}
						</div>
					</div>
				</div>

				{/* Mobile timeline */}
				<div className="lg:hidden">
					<div className="relative pl-12">
						<div className="absolute left-5 top-0 bottom-0 w-0.5 bg-secondary/30" />

						<div className="flex flex-col gap-8">
							{steps.map((step) => (
								<div key={step.key} className="relative">
									<div className="absolute -left-12 top-0 z-10 size-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-md shadow-secondary/20">
										{step.number}
									</div>
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-1 flex-wrap">
											<h3 className="font-semibold text-sm">
												{t(`steps.${step.key}.title`)}
											</h3>
											<span className="inline-block text-xs font-medium text-secondary bg-secondary/10 border border-secondary/20 px-2 py-0.5 rounded-full">
												{t(`steps.${step.key}.duration`)}
											</span>
										</div>
										<p className="text-sm text-muted-foreground">
											{t(`steps.${step.key}.description`)}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Start small banner */}
				<Reveal delay={0.2}>
				<div className="mt-12 rounded-2xl border border-secondary/20 bg-gradient-to-r from-secondary/5 via-secondary/10 to-secondary/5 p-6 md:p-8">
					<div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
						<div className="size-14 bg-secondary/15 rounded-xl flex items-center justify-center shrink-0">
							<Sprout className="size-7 text-secondary" />
						</div>
						<div>
							<h3 className="font-semibold text-lg mb-1">
								{t("startSmall.title")}
							</h3>
							<p className="text-sm text-muted-foreground leading-relaxed">
								{t("startSmall.description")}
							</p>
						</div>
					</div>
				</div>
				</Reveal>
			</div>
		</Section>
	);
}
