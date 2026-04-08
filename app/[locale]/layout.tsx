import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd } from "@/components/seo/json-ld";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "metadata" });

	return {
		metadataBase: new URL("https://wisetwin.eu"),
		title: {
			default: t("layout.title"),
			template: `%s | WiseTwin`,
		},
		description: t("layout.description"),
	};
}

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params;

	// Validate that the incoming `locale` parameter is valid
	if (!routing.locales.includes(locale as "fr" | "en")) {
		notFound();
	}

	// Providing all messages to the client
	const messages = await getMessages();

	return (
		<html
			lang={locale}
			className="scroll-smooth"
			suppressHydrationWarning
		>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
			>
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem={false}
						disableTransitionOnChange
					>
						<Header />
						<main className="flex-grow">{children}</main>
						<Footer />
						<Toaster />
					</ThemeProvider>
				</NextIntlClientProvider>
				<JsonLd
					data={{
						"@context": "https://schema.org",
						"@type": "Organization",
						name: "WiseTwin",
						url: "https://wisetwin.eu",
						logo: "https://wisetwin.eu/logo-wisetwin-light.png",
						description:
							"Solutions immersives de jumeaux numériques pour la formation industrielle et la communication territoriale.",
						address: {
							"@type": "PostalAddress",
							streetAddress:
								"Bâtiment EcosystèmeD, 60 route du Pertuis du Môle 2",
							addressLocality: "Dunkerque",
							postalCode: "59140",
							addressCountry: "FR",
						},
						email: "contact@wisetwin.eu",
						sameAs: [],
					}}
				/>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
