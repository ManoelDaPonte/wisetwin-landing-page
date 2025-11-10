export const metadata = {
	title: "Roadmap | WiseTwin",
	description: "Découvrez notre feuille de route et les fonctionnalités à venir pour WiseTwin",
};

export default function RoadmapPage() {
	return (
		<div className="min-h-screen pt-24 px-4 pb-4">
			<iframe
				src="https://purrfect-promise-b19.notion.site/ebd/2a7b5d4baf94809a8647d1c6e72b2bf6?v=2a7b5d4baf9480a1b09b000c77433552"
				className="w-full h-[calc(100vh-8rem)] rounded-lg"
				style={{ border: 0 }}
				allowFullScreen
			/>
		</div>
	);
}
