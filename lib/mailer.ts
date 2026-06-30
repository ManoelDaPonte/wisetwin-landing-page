/**
 * Mailer basé sur Microsoft Graph API (OAuth2 client-credentials, app-only).
 *
 * Remplace l'ancien transport SMTP nodemailer (bloqué par le MFA des boîtes
 * M365 → erreur 535). L'envoi se fait depuis la boîte M365 `EMAIL_FROM` via une
 * app Entra ID disposant de la permission application `Mail.Send`.
 *
 * Env requis : GRAPH_TENANT_ID, GRAPH_CLIENT_ID, GRAPH_CLIENT_SECRET, EMAIL_FROM.
 */

const GRAPH_SCOPE = "https://graph.microsoft.com/.default";
const DEFAULT_FROM_NAME = "WiseTwin";

// Cache du token en mémoire (survit entre invocations "chaudes").
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60_000) {
    return cachedToken.value;
  }

  const tenant = process.env.GRAPH_TENANT_ID;
  const res = await fetch(
    `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GRAPH_CLIENT_ID ?? "",
        client_secret: process.env.GRAPH_CLIENT_SECRET ?? "",
        scope: GRAPH_SCOPE,
        grant_type: "client_credentials",
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Graph token failed (${res.status}): ${await res.text()}`);
  }

  const json = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };
  cachedToken = {
    value: json.access_token,
    expiresAt: now + json.expires_in * 1000,
  };
  return json.access_token;
}

export interface MailOptions {
  /** Conservé pour compat ; seul le nom d'affichage est repris, l'adresse = EMAIL_FROM. */
  from?: string;
  to: string | string[];
  replyTo?: string;
  subject: string;
  html?: string;
  text?: string;
}

function toRecipients(addresses: string | string[]) {
  return (Array.isArray(addresses) ? addresses : [addresses])
    .flatMap((a) => a.split(","))
    .map((a) => a.trim())
    .filter(Boolean)
    .map((address) => ({ emailAddress: { address } }));
}

function parseFromName(from?: string): string {
  if (!from) return DEFAULT_FROM_NAME;
  const m = from.match(/^\s*"?([^"<]*?)"?\s*</);
  return m && m[1].trim() ? m[1].trim() : DEFAULT_FROM_NAME;
}

async function sendMail(options: MailOptions): Promise<void> {
  const sender = process.env.EMAIL_FROM;
  if (!sender) throw new Error("EMAIL_FROM manquant");

  const token = await getAccessToken();

  const message: Record<string, unknown> = {
    subject: options.subject,
    from: { emailAddress: { address: sender, name: parseFromName(options.from) } },
    body: options.html
      ? { contentType: "HTML", content: options.html }
      : { contentType: "Text", content: options.text ?? "" },
    toRecipients: toRecipients(options.to),
  };
  if (options.replyTo) message.replyTo = toRecipients(options.replyTo);

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, saveToSentItems: false }),
    }
  );

  if (!res.ok) {
    throw new Error(`Graph sendMail failed (${res.status}): ${await res.text()}`);
  }
}

/** Remplacement drop-in du transporter nodemailer. */
export const transporter = { sendMail };
