import { describe, it, expect } from 'vitest'
import path from 'node:path'
import { listerProjets, lireProjet } from '@/lib/projets'

const dossier = path.resolve(__dirname, '../content/projets')

describe('listerProjets', () => {
  const projets = listerProjets(dossier)

  it('trouve les six projets', () => {
    expect(projets).toHaveLength(6)
  })

  it('les trie par ordre croissant', () => {
    const ordres = projets.map((p) => p.ordre)
    expect(ordres).toEqual([...ordres].sort((a, b) => a - b))
  })

  it('donne un slug à chaque projet', () => {
    for (const p of projets) expect(p.slug).toMatch(/^[a-z0-9-]+$/)
  })

  it('ne met aucun lien de code sur cycle-calculator (dépôt privé)', () => {
    const cycle = projets.find((p) => p.slug === 'cycle-calculator')
    expect(cycle).toBeDefined()
    expect(cycle!.liens.some((l) => l.href.includes('github.com'))).toBe(false)
  })
})

describe('lireProjet', () => {
  it('renvoie le corps MDX', () => {
    const p = lireProjet(dossier, 'cubby')
    expect(p?.corps.length).toBeGreaterThan(50)
  })

  it('renvoie null pour un slug inconnu', () => {
    expect(lireProjet(dossier, 'nexistepas')).toBeNull()
  })
})
