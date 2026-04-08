import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "WiseTwin - Formation industrielle immersive",
		short_name: "WiseTwin",
		description:
			"Solutions immersives de jumeaux numériques pour la formation industrielle.",
		start_url: "/",
		display: "standalone",
		background_color: "#0F0B66",
		theme_color: "#00C7FF",
		icons: [
			{
				src: "/icon.ico",
				sizes: "any",
				type: "image/x-icon",
			},
		],
	};
}
