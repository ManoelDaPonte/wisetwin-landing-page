import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/.next/'],
    },
    sitemap: 'https://wisetwin.fr/sitemap.xml', // Remplacez par votre domaine réel
  }
}