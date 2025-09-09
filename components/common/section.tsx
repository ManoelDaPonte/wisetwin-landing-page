// components/common/section.tsx
"use client";
import React from "react";
import { cn } from "@/lib/utils";

type SectionVariant = "default" | "muted" | "gradient" | "dark";
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
		default: "bg-background",
		muted: "bg-muted",
		gradient: "bg-gradient-to-b from-background to-muted",
		dark: "bg-wisetwin-darkblue text-white",
	};

	// Filtrer les props non-HTML
	const sectionProps = { ...props };
	// @ts-ignore
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
			<div
				className={cn(
					"container mx-auto max-w-7xl px-4",
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
									? "text-wisetwin-blue"
									: "",
								variant === "dark" ? "text-white" : ""
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
		"bg-card p-6 rounded-lg h-full transition-all duration-300",
		highlight
			? "ring-2 ring-wisetwin-blue shadow-lg shadow-wisetwin-blue/15"
			: "ring-1 ring-border hover:shadow-md",
		className
	);

	return (
		<div className={cardClasses} {...props}>
			{icon && (
				<div className="size-12 bg-wisetwin-blue/10 rounded-lg flex items-center justify-center mb-4">
					{icon}
				</div>
			)}
			{title && <h3 className="font-semibold text-xl mb-2">{title}</h3>}
			{children}
		</div>
	);
}