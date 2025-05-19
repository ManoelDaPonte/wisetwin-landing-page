// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "WiseTwin - Formation industrielle en réalité 3D",
	description:
		"WiseTwin propose des formations 3D interactives pour améliorer la sécurité et les compétences des intervenants sur les machines industrielles.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr" className="scroll-smooth">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
			>
				{/* <Test /> */}
				<Header />
				<main className="flex-grow">{children}</main>
				<Footer />
				<Toaster />
			</body>
		</html>
	);
}
