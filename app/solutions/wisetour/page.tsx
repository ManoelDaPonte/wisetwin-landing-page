// app/solutions/wisetour/page.tsx
import {
	WiseTourHeroSection,
	WiseTourFeaturesSection,
} from "@/components/solutions/wisetour";

export default function WiseTourPage() {
	return (
		<main className="flex-1">
			<WiseTourHeroSection />
			<WiseTourFeaturesSection />
		</main>
	);
}
