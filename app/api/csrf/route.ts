// app/api/csrf/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateCSRFToken } from "@/lib/csrf";

export async function GET() {
  // Générer un nouveau token CSRF
  const csrfToken = generateCSRFToken();
  
  // Stocker dans un cookie
  const cookieStore = await cookies();
  cookieStore.set("csrf_token", csrfToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 // 1 heure
  });
  
  // Renvoyer le token pour l'inclure dans le formulaire
  return NextResponse.json({ csrfToken });
}