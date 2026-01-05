"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X, AlertTriangle } from "lucide-react";

const STORAGE_KEY = "wisetwin-dev-banner-dismissed";

export function DevBanner() {
	const t = useTranslations("devBanner");
	const [isVisible, setIsVisible] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		// Check if banner was previously dismissed
		const isDismissed = localStorage.getItem(STORAGE_KEY);
		if (!isDismissed) {
			setIsVisible(true);
		}
	}, []);

	const handleDismiss = () => {
		setIsVisible(false);
		localStorage.setItem(STORAGE_KEY, "true");
	};

	// Don't render anything until mounted to avoid hydration mismatch
	if (!isMounted || !isVisible) return null;

	return (
		<div className="bg-yellow-500 text-yellow-950 relative">
			<div className="container mx-auto max-w-7xl px-4 py-2">
				<div className="flex items-center justify-center gap-2 text-sm font-medium pr-8">
					<AlertTriangle className="size-4 shrink-0" />
					<p className="text-center">{t("message")}</p>
				</div>
				<button
					onClick={handleDismiss}
					className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-yellow-600/20 rounded transition-colors"
					aria-label={t("dismiss")}
				>
					<X className="size-4" />
				</button>
			</div>
		</div>
	);
}
