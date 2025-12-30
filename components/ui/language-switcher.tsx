"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher() {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	const switchLocale = () => {
		const newLocale = locale === "fr" ? "en" : "fr";
		router.replace(pathname, { locale: newLocale });
	};

	return (
		<button
			onClick={switchLocale}
			className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
			aria-label="Switch language"
		>
			<span className="text-xs font-semibold uppercase">
				{locale === "fr" ? "EN" : "FR"}
			</span>
		</button>
	);
}
