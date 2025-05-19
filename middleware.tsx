// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	// Ajouter des en-têtes CORS pour les routes API
	if (request.nextUrl.pathname.startsWith("/api/")) {
		const response = NextResponse.next();

		// Définir les en-têtes CORS
		response.headers.set(
			"Access-Control-Allow-Origin",
			process.env.NODE_ENV === "production"
				? "https://wisetwin.eu"
				: "http://localhost:3000"
		);
		response.headers.set(
			"Access-Control-Allow-Methods",
			"GET, POST, OPTIONS"
		);
		response.headers.set("Access-Control-Allow-Headers", "Content-Type");

		return response;
	}

	return NextResponse.next();
}

// Configuration du middleware pour ne s'appliquer qu'aux routes API
export const config = {
	matcher: ["/api/:path*"],
};
