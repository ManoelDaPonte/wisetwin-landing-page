import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Test() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<h1 className="text-4xl font-bold mb-4">Test Component</h1>
			<p className="text-lg text-gray-700 mb-6">
				This is a test component to check the layout.
			</p>
			<Button>Button</Button>
		</div>
	);
}
