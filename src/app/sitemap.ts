import path from 'node:path'
import type { MetadataRoute } from 'next'
import { listerProjets } from '@/lib/projets'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://ndaen.xyz'
  const projets = listerProjets(path.join(process.cwd(), 'content/projets'))
  return [
    { url: base, priority: 1 },
    { url: `${base}/projets`, priority: 0.8 },
    ...projets.map((p) => ({ url: `${base}/projets/${p.slug}`, priority: 0.6 })),
  ]
}
