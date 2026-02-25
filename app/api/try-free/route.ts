import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
	try {
		const { email } = await req.json();

		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return NextResponse.json(
				{ error: "Email invalide" },
				{ status: 400 }
			);
		}

		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: Number(process.env.EMAIL_PORT),
			secure: false,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		// Email to the user with the app link
		await transporter.sendMail({
			from: `"WiseTwin" <${process.env.EMAIL_USER}>`,
			to: email,
			subject: "Votre accès à la plateforme WiseTwin",
			html: `
				<h2>Bienvenue sur WiseTwin !</h2>
				<p>Voici votre lien d'accès à la plateforme :</p>
				<p style="margin: 20px 0;">
					<a href="https://app.wisetwin.eu" style="display: inline-block; background-color: #0F0B66; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
						Accéder à la plateforme
					</a>
				</p>
				<p>Ou copiez ce lien : <a href="https://app.wisetwin.eu">https://app.wisetwin.eu</a></p>
				<p>Si vous avez la moindre question, n'hésitez pas à nous contacter à <a href="mailto:contact@wisetwin.eu">contact@wisetwin.eu</a>.</p>
				<p>Cordialement,</p>
				<p><strong>L'équipe WiseTwin</strong></p>
			`,
		});

		// Notification email to the team
		await transporter.sendMail({
			from: `"WiseTwin Platform" <${process.env.EMAIL_USER}>`,
			to: process.env.EMAIL_RECEIVER,
			subject: `Nouveau lead - Essai gratuit: ${email}`,
			html: `
				<h2>Nouveau lead - Essai gratuit</h2>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Date:</strong> ${new Date().toLocaleString("fr-FR")}</p>
				<p><small>Cette personne a demandé un accès à la plateforme depuis le site.</small></p>
			`,
		});

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error("Error sending try-free email:", error);
		return NextResponse.json(
			{ error: "Erreur lors de l'envoi" },
			{ status: 500 }
		);
	}
}
