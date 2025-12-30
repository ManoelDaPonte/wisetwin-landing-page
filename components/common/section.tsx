// components/common/section.tsx
"use client";
import React from "react";
import { cn } from "@/lib/utils";

type SectionVariant = "default" | "muted" | "gradient" | "dark" | "accent";
type SectionHeader = {
	title: string;
	description?: string;
	highlight?: boolean;
	centered?: boolean;
};

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
	id?: string;
	variant?: SectionVariant;
	header?: SectionHeader;
	containerClassName?: string;
	children: React.ReactNode;
}

export function Section({
	id,
	variant = "default",
	header,
	containerClassName,
	className,
	children,
	...props
}: SectionProps) {
	// Background variants
	const variantStyles = {
		default: "bg-background text-foreground",
		muted: "bg-muted text-foreground",
		gradient: "bg-gradient-to-b from-background to-muted text-foreground",
		dark: "bg-gradient-to-br from-[#0a0a1a] via-[#0f0b40] to-[#0a1a2a] text-white relative overflow-hidden",
		accent: "bg-secondary/5 dark:bg-secondary/10 text-foreground relative overflow-hidden",
	};

	// Filtrer les props non-HTML
	const sectionProps = { ...props };
	// @ts-expect-error - animate prop is not a valid HTML attribute
	delete sectionProps.animate;

	return (
		<section
			id={id}
			className={cn(
				variantStyles[variant],
				"py-16 md:py-20",
				"relative",
				className
			)}
			{...sectionProps}
		>
			{/* Effets visuels spéciaux pour le variant dark */}
			{variant === "dark" && (
				<>
					{/* Grille animée subtile */}
					<div className="absolute inset-0 opacity-10">
						<div 
							className="absolute inset-0 w-full h-full"
							style={{
								backgroundImage: `
									linear-gradient(hsl(var(--color-secondary) / 0.3) 1px, transparent 1px),
									linear-gradient(90deg, hsl(var(--color-secondary) / 0.3) 1px, transparent 1px)
								`,
								backgroundSize: "60px 60px",
							}}
						/>
					</div>
					{/* Points lumineux */}
					<div className="absolute inset-0 opacity-20">
						<div 
							className="absolute inset-0"
							style={{
								backgroundImage: `
									radial-gradient(circle at 10% 20%, hsl(var(--color-secondary) / 0.4) 1px, transparent 1px),
									radial-gradient(circle at 80% 80%, hsl(var(--color-secondary) / 0.3) 1px, transparent 1px),
									radial-gradient(circle at 40% 40%, hsl(var(--color-secondary) / 0.2) 1px, transparent 1px)
								`,
								backgroundSize: "100px 100px, 150px 150px, 200px 200px"
							}}
						/>
					</div>
					{/* Effet de lueur en bordure */}
					<div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
					<div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
				</>
			)}
			<div
				className={cn(
					"container mx-auto max-w-7xl px-4 relative z-10",
					containerClassName
				)}
			>
				{header && (
					<div
						className={cn(
							"mb-12",
							header.centered ? "text-center" : ""
						)}
					>
						<h2
							className={cn(
								"text-3xl font-bold mb-4",
								header.highlight
									? "text-secondary"
									: "",
								variant === "dark" ? "text-white" : "text-foreground"
							)}
						>
							{header.title}
						</h2>
						{header.description && (
							<p
								className={cn(
									"text-lg",
									header.centered
										? "max-w-2xl mx-auto"
										: "",
									variant === "dark"
										? "text-white/80"
										: "text-muted-foreground"
								)}
							>
								{header.description}
							</p>
						)}
					</div>
				)}
				<div className="relative">{children}</div>
			</div>
		</section>
	);
}

// Card component for consistent card styling within sections
export interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
	highlight?: boolean;
	icon?: React.ReactNode;
	title?: string;
	children: React.ReactNode;
}

export function SectionCard({
	highlight = false,
	icon,
	title,
	className,
	children,
	...props
}: SectionCardProps) {
	const cardClasses = cn(
		"bg-card text-card-foreground p-6 rounded-lg h-full transition-all duration-300",
		highlight
			? "ring-2 ring-secondary shadow-lg shadow-secondary/15"
			: "ring-1 ring-border hover:shadow-md",
		className
	);

	return (
		<div className={cardClasses} {...props}>
			{icon && (
				<div className="size-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
					{icon}
				</div>
			)}
			{title && <h3 className="font-semibold text-xl mb-2">{title}</h3>}
			{children}
		</div>
	);
}