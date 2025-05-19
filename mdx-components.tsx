// mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

// Personnaliser les composants MDX pour améliorer le style et la fonctionnalité
export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		// Utiliser les composants par défaut
		...components,

		// Remplacer certains tags HTML par des composants React améliorés
		a: ({ href, children, ...props }) => {
			if (href && href.startsWith("/")) {
				return (
					<Link href={href} {...props}>
						{children}
					</Link>
				);
			}
			return (
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					{...props}
				>
					{children}
				</a>
			);
		},

		img: ({ src, alt, ...props }) => {
			if (src) {
				return (
					<Image
						src={src}
						alt={alt || ""}
						width={800}
						height={450}
						className="rounded-md my-4"
						{...props}
					/>
				);
			}
			return null;
		},

		// Améliorer les titres, paragraphes, etc. pour un style cohérent
		h1: ({ children }) => (
			<h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
		),
		h2: ({ children }) => (
			<h2 className="text-2xl font-bold mt-6 mb-3 text-wisetwin-darkblue">
				{children}
			</h2>
		),
		h3: ({ children }) => (
			<h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>
		),
		p: ({ children }) => <p className="my-4 leading-7">{children}</p>,
		ul: ({ children }) => (
			<ul className="my-4 ml-6 list-disc">{children}</ul>
		),
		ol: ({ children }) => (
			<ol className="my-4 ml-6 list-decimal">{children}</ol>
		),
		li: ({ children }) => <li className="mb-1">{children}</li>,
		blockquote: ({ children }) => (
			<blockquote className="border-l-4 border-wisetwin-blue pl-4 italic my-4 text-gray-700">
				{children}
			</blockquote>
		),
		code: ({ children }) => (
			<code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm">
				{children}
			</code>
		),
	};
}
