import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { z } from 'zod'

const schema = z.object({
  titre: z.string().min(1),
  type: z.enum(['application', 'projet']),
  resume: z.string().min(1),
  stack: z.array(z.string()).min(1),
  etat: z.string().min(1),
  ordre: z.number().int(),
  vedette: z.boolean(),
  liens: z.array(z.object({ label: z.string(), href: z.url() })),
})

export type Projet = z.infer<typeof schema> & { slug: string; corps: string }

function charger(dossier: string, fichier: string): Projet {
  const brut = fs.readFileSync(path.join(dossier, fichier), 'utf8')
  const { data, content } = matter(brut)
  const parsed = schema.safeParse(data)
  if (!parsed.success) {
    throw new Error(`frontmatter invalide dans ${fichier} : ${parsed.error.message}`)
  }
  return { ...parsed.data, slug: fichier.replace(/\.mdx$/, ''), corps: content.trim() }
}

export function listerProjets(dossier: string): Projet[] {
  return fs
    .readdirSync(dossier)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => charger(dossier, f))
    .sort((a, b) => a.ordre - b.ordre)
}

export function lireProjet(dossier: string, slug: string): Projet | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null
  const fichier = `${slug}.mdx`
  if (!fs.existsSync(path.join(dossier, fichier))) return null
  return charger(dossier, fichier)
}
