import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
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

  it('rejette un frontmatter invalide avec le nom du fichier dans le message', () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'projets-'))
    try {
      fs.writeFileSync(
        path.join(tmp, 'invalide.mdx'),
        '---\ntype: projet\nresume: Sans titre.\nstack: [Test]\netat: Test\nordre: 1\nvedette: false\nliens: []\n---\n\nCorps.\n',
      )
      expect(() => listerProjets(tmp)).toThrow(/invalide\.mdx/)
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true })
    }
  })

  it('rejette un projet vedette sans icône, en nommant le fichier', () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'projets-'))
    try {
      fs.writeFileSync(
        path.join(tmp, 'sans-icone.mdx'),
        '---\ntitre: Sans icône\ntype: projet\nresume: Un résumé.\nstack: [Test]\netat: Test\nordre: 1\nvedette: true\nliens: []\n---\n\nCorps.\n',
      )
      expect(() => listerProjets(tmp)).toThrow(/sans-icone\.mdx/)
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true })
    }
  })

  it('rejette un nom de fichier qui ne donne pas un slug valide', () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'projets-'))
    try {
      fs.writeFileSync(
        path.join(tmp, 'Mon-Projet.mdx'),
        '---\ntitre: Mon projet\ntype: projet\nresume: Un résumé.\nstack: [Test]\netat: Test\nordre: 1\nvedette: false\nliens: []\n---\n\nCorps.\n',
      )
      expect(() => listerProjets(tmp)).toThrow(/Mon-Projet\.mdx/)
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true })
    }
  })

  it('rejette une capture mal formée', () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'projets-'))
    try {
      fs.writeFileSync(
        path.join(tmp, 'capture-invalide.mdx'),
        [
          '---',
          'titre: Capture invalide',
          'type: projet',
          'resume: Un résumé.',
          'stack: [Test]',
          'etat: Test',
          'ordre: 1',
          'vedette: false',
          'liens: []',
          'capture:',
          '  src: /projets/x.png',
          '  alt: ""',
          '  largeur: 0',
          '  hauteur: 100',
          '---',
          '',
          'Corps.',
          '',
        ].join('\n'),
      )
      expect(() => listerProjets(tmp)).toThrow(/capture-invalide\.mdx/)
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true })
    }
  })

  it('accepte les six vrais projets avec leurs visuels', () => {
    for (const p of projets) {
      if (p.vedette) expect(p.icone).toMatch(/^\//)
      if (p.capture) {
        expect(p.capture.alt.length).toBeGreaterThan(0)
        expect(Number.isInteger(p.capture.largeur)).toBe(true)
        expect(Number.isInteger(p.capture.hauteur)).toBe(true)
      }
    }
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

  it('renvoie null pour un slug qui tente une traversée de chemin', () => {
    expect(lireProjet(dossier, '../package')).toBeNull()
    expect(lireProjet(dossier, 'cubby/../cubby')).toBeNull()
  })
})
