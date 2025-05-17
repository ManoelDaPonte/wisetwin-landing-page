// components/common/section.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

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
	gridCols?: 1 | 2 | 3 | 4;
	gridGap?: "default" | "small" | "large";
	animate?: boolean;
	noPadding?: boolean;
	children: React.ReactNode;
}

export function Section({
	id,
	variant = "default",
	header,
	containerClassName,
	gridCols,
	gridGap = "default",
	animate = true,
	noPadding = false,
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

	// Grid columns
	const gridColsStyles = {
		1: "",
		2: "grid md:grid-cols-2",
		3: "grid md:grid-cols-3",
		4: "grid md:grid-cols-4",
	};

	// Grid gap
	const gridGapStyles = {
		small: "gap-4",
		default: "gap-8",
		large: "gap-12",
	};

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.1,
				duration: 0.5,
			},
		},
	};

	const childVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5 },
		},
	};

	if (animate) {
		// When animation is enabled, use motion components
		return (
			<motion.section
				id={id}
				className={cn(
					variantStyles[variant],
					noPadding ? "" : "py-16 md:py-20",
					"relative",
					className
				)}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={containerVariants}
				{...(props as HTMLMotionProps<"section">)}
			>
				<div
					className={cn("container mx-auto px-4", containerClassName)}
				>
					{header && (
						<motion.div
							className={cn(
								"mb-12",
								header.centered ? "text-center" : ""
							)}
							variants={childVariants}
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
						</motion.div>
					)}
					{gridCols ? (
						<motion.div
							className={cn(
								gridColsStyles[gridCols],
								gridGapStyles[gridGap],
								"relative"
							)}
							variants={childVariants}
						>
							{children}
						</motion.div>
					) : (
						<motion.div
							variants={childVariants}
							className="relative"
						>
							{children}
						</motion.div>
					)}
				</div>
			</motion.section>
		);
	} else {
		// When animation is disabled, use regular HTML elements
		return (
			<section
				id={id}
				className={cn(
					variantStyles[variant],
					noPadding ? "" : "py-16 md:py-20",
					"relative",
					className
				)}
				{...props}
			>
				<div
					className={cn("container mx-auto px-4", containerClassName)}
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
					{gridCols ? (
						<div
							className={cn(
								gridColsStyles[gridCols],
								gridGapStyles[gridGap],
								"relative"
							)}
						>
							{children}
						</div>
					) : (
						<div className="relative">{children}</div>
					)}
				</div>
			</section>
		);
	}
}

// Card component for consistent card styling within sections
export interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
	highlight?: boolean;
	icon?: React.ReactNode;
	title?: string;
	animate?: boolean;
	children: React.ReactNode;
}

export function SectionCard({
	highlight = false,
	icon,
	title,
	animate = true,
	className,
	children,
	...props
}: SectionCardProps) {
	// Animation props
	const animationProps = {
		initial: { opacity: 0, y: 20 },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: true },
		transition: { duration: 0.5 },
		whileHover: { y: -5, transition: { duration: 0.2 } },
	};

	const cardClasses = cn(
		"bg-card p-6 rounded-lg h-full transition-all duration-300",
		highlight
			? "ring-2 ring-wisetwin-blue shadow-lg shadow-wisetwin-blue/15"
			: "ring-1 ring-border hover:shadow-md",
		className
	);

	if (animate) {
		return (
			<motion.div
				className={cardClasses}
				{...animationProps}
				{...(props as HTMLMotionProps<"div">)}
			>
				{icon && (
					<div className="size-12 bg-wisetwin-blue/10 rounded-lg flex items-center justify-center mb-4">
						{icon}
					</div>
				)}
				{title && (
					<h3 className="font-semibold text-xl mb-2">{title}</h3>
				)}
				{children}
			</motion.div>
		);
	} else {
		return (
			<div className={cardClasses} {...props}>
				{icon && (
					<div className="size-12 bg-wisetwin-blue/10 rounded-lg flex items-center justify-center mb-4">
						{icon}
					</div>
				)}
				{title && (
					<h3 className="font-semibold text-xl mb-2">{title}</h3>
				)}
				{children}
			</div>
		);
	}
}
