"use client";

import React from "react";

export default function MDXWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	// Filtrer les enfants pour supprimer le contenu des métadonnées
	const filterChildren = (node: React.ReactNode): React.ReactNode => {
		// Filtrer les éléments <hr> qui viennent des séparateurs ---
		if (
			React.isValidElement(node) &&
			node.type === 'hr'
		) {
			return null;
		}
		
		// Si c'est un string qui contient "title:" ou "excerpt:" etc., on le filtre
		if (typeof node === "string") {
			const metadataPattern =
				/^(title:|excerpt:|date:|author:|category:|tags:|readTime:)/m;
			if (metadataPattern.test(node)) {
				return null;
			}

			// Filtrer aussi les lignes qui ressemblent à des valeurs YAML
			const yamlPattern = /^\s*(name:|role:|".*"|\[.*\]|\d+)$/m;
			if (yamlPattern.test(node)) {
				return null;
			}
		}

		// Si c'est un élément React avec des enfants
		if (
			React.isValidElement(node) &&
			typeof node.props === "object" &&
			node.props !== null &&
			"children" in node.props
		) {
			const filteredChildren = React.Children.map(
				node.props.children as React.ReactNode,
				filterChildren
			);

			// Si tous les enfants ont été filtrés, retourner null
			if (
				!filteredChildren ||
				filteredChildren.every((child) => child === null)
			) {
				return null;
			}

			return React.cloneElement(node as React.ReactElement<any>, {
				...node.props,
				children: filteredChildren,
			});
		}

		return node;
	};

	return <>{React.Children.map(children, filterChildren)}</>;
}
