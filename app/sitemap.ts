import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wisetwin.fr' // Remplacez par votre domaine réel

  // Pages statiques
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Pages de blog dynamiques
  const blogDir = path.join(process.cwd(), 'blog')
  let blogPages: MetadataRoute.Sitemap = []

  if (fs.existsSync(blogDir)) {
    const filenames = fs.readdirSync(blogDir)
    
    blogPages = filenames
      .filter(filename => filename.endsWith('.mdx'))
      .map(filename => {
        const filePath = path.join(blogDir, filename)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContent)
        const slug = filename.replace(/\.mdx$/, '')

        return {
          url: `${baseUrl}/blog/${slug}`,
          lastModified: data.date ? new Date(data.date) : new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }
      })
  }

  return [...staticPages, ...blogPages]
}