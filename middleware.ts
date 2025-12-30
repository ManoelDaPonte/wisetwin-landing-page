import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
	// Handle CORS for API routes
	if (request.nextUrl.pathname.startsWith("/api/")) {
		const response = NextResponse.next();

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

	// Handle internationalization for all other routes
	return intlMiddleware(request);
}

export const config = {
	matcher: [
		// Match all pathnames except for
		// - API routes
		// - Static files (/_next, /image, /video, etc.)
		// - Favicon, robots, sitemap
		"/((?!api|_next|image|video|storyset|ressources|.*\\..*|icon\\.ico).*)",
		"/",
		"/(fr|en)/:path*",
	],
};
