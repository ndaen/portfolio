import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { parse as parseYaml } from 'yaml'

const CV_PATH = path.resolve(__dirname, '../content/source/cv.md')
const PROFILE_PATH = path.resolve(__dirname, '../content/source/profile.yml')

const TELEPHONE_RE = /(?:\+33[\s.-]?[1-9]|0[1-9])(?:[\s.-]?\d{2}){4}/

const MONTANT_RE = /\d+K\s*EUR/i

const LISTE_BLANCHE = new Set([
  'candidate.full_name',
  'candidate.email',
  'candidate.location',
  'candidate.linkedin',
  'candidate.github',
  'narrative.headline',
])

function cheminsDeCles(objet: unknown, prefixe = ''): string[] {
  if (objet === null || typeof objet !== 'object') return prefixe ? [prefixe] : []
  return Object.entries(objet as Record<string, unknown>).flatMap(([cle, valeur]) => {
    const chemin = prefixe ? `${prefixe}.${cle}` : cle
    const sousObjet =
      valeur !== null && typeof valeur === 'object' && !Array.isArray(valeur)
    return sousObjet ? cheminsDeCles(valeur, chemin) : [chemin]
  })
}

describe('vie privée des copies synchronisées', () => {
  const cv = fs.readFileSync(CV_PATH, 'utf8')
  const profilBrut = fs.readFileSync(PROFILE_PATH, 'utf8')
  const profil = parseYaml(profilBrut)

  it("cv.md ne contient aucun numéro de téléphone", () => {
    expect(cv).not.toMatch(TELEPHONE_RE)
  })

  it("profile.yml ne contient aucun numéro de téléphone", () => {
    expect(profilBrut).not.toMatch(TELEPHONE_RE)
  })

  it('profile.yml ne contient que des clés de la liste blanche', () => {
    const cles = cheminsDeCles(profil)
    for (const chemin of cles) {
      expect(LISTE_BLANCHE.has(chemin)).toBe(true)
    }
  })

  it("ni cv.md ni profile.yml ne mentionnent la rémunération", () => {
    expect(cv.toLowerCase()).not.toContain('compensation')
    expect(profilBrut.toLowerCase()).not.toContain('compensation')
    expect(cv).not.toMatch(MONTANT_RE)
    expect(profilBrut).not.toMatch(MONTANT_RE)
  })
})
