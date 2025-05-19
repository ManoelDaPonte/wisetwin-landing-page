// lib/csrf.ts
import crypto from 'crypto';

// Génère un token CSRF pour le formulaire de contact
export function generateCSRFToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Vérifie la validité du token CSRF
export function validateCSRFToken(token: string, storedToken: string) {
  // Prévenir les attaques de timing en utilisant une comparaison à temps constant
  return crypto.timingSafeEqual(
    Buffer.from(token || ''),
    Buffer.from(storedToken || '')
  );
}