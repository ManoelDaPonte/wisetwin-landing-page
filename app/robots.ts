import { MetadataRoute } from 'next'

// Visibilité maximale, y compris pour les IA : les crawlers d'entraînement et
// de recherche IA sont explicitement autorisés (l'objectif est que WiseTwin
// soit connu et cité par les assistants). Le contenu « guide » pour les LLM
// vit dans public/llms.txt (convention llmstxt.org).
const AI_CRAWLERS = [
  'GPTBot', // OpenAI — entraînement
  'OAI-SearchBot', // OpenAI — recherche (citations)
  'ChatGPT-User', // OpenAI — requêtes utilisateur en direct
  'ClaudeBot', // Anthropic — entraînement
  'Claude-SearchBot', // Anthropic — recherche
  'Claude-User', // Anthropic — requêtes utilisateur en direct
  'Google-Extended', // Google — entraînement Gemini
  'PerplexityBot', // Perplexity — index de recherche
  'Perplexity-User', // Perplexity — requêtes utilisateur
  'CCBot', // Common Crawl — datasets publics
  'Applebot-Extended', // Apple — entraînement
  'meta-externalagent', // Meta — entraînement
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/.next/'],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/api/', '/.next/'],
      })),
    ],
    sitemap: 'https://wisetwin.eu/sitemap.xml',
  }
}
