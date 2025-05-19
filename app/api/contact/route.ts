// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { cookies } from "next/headers";
import { validateCSRFToken } from "@/lib/csrf";

export async function POST(req: NextRequest) {
  try {
    // Récupérer les données du formulaire
    const formData = await req.json();
    const { name, email, subject, company, message, csrfToken } = formData;
    
    // Vérifier le token CSRF
    const cookieStore = await cookies();
    const storedToken = cookieStore.get("csrf_token")?.value;
    
    if (!storedToken || !csrfToken || !validateCSRFToken(csrfToken, storedToken)) {
      return NextResponse.json(
        { error: "Erreur de validation du formulaire. Veuillez réessayer." },
        { status: 403 }
      );
    }
    
    // Nettoyer le cookie CSRF après utilisation
    cookieStore.delete("csrf_token");

    // Validation basique
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Merci de remplir tous les champs obligatoires" },
        { status: 400 }
      );
    }

    // Configuration du transporteur SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false, // true pour le port 465, false pour les autres ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Contenu du mail pour le destinataire
    const mailOptions = {
      from: `"WiseTwin Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `Nouveau message: ${subject || "Formulaire de contact WiseTwin"}`,
      html: `
        <h2>Nouveau message du site WiseTwin</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Entreprise:</strong> ${company}</p>` : ""}
        ${subject ? `<p><strong>Sujet:</strong> ${subject}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>Ce message a été envoyé depuis le formulaire de contact du site WiseTwin.</small></p>
      `,
    };

    // Contenu du mail de confirmation pour l'expéditeur
    const confirmationMailOptions = {
      from: `"WiseTwin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirmation de votre message à WiseTwin",
      html: `
        <h2>Bonjour ${name},</h2>
        <p>Nous avons bien reçu votre message et vous remercions de nous avoir contactés.</p>
        <p>Notre équipe vous répondra dans les meilleurs délais.</p>
        <p>Pour rappel, voici votre message :</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          ${message.replace(/\n/g, "<br>")}
        </div>
        <p>Cordialement,</p>
        <p><strong>L'équipe WiseTwin</strong></p>
        <hr>
        <p><small>Ceci est un message automatique, merci de ne pas y répondre.</small></p>
      `,
    };

    // Envoi des deux emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(confirmationMailOptions);

    // Renvoyer une réponse de succès
    return NextResponse.json(
      { success: true, message: "Votre message a été envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi du mail:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
