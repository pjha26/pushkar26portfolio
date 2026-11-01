import type { MetadataRoute } from 'next'
import { CASES } from '@/lib/dossier-data'

const siteUrl = 'https://pushkar26portfolio.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: 'monthly', priority: 1 },
    ...['work', 'about', 'toolkit', 'contact'].map((page) => ({
      url: `${siteUrl}/${page}`,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...CASES.map((project) => ({
      url: `${siteUrl}/projects/${project.id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
