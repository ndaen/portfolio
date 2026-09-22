import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { parse as parseYaml } from 'yaml'
import { expurgerTelephone, TELEPHONE_RE } from '../scripts/redact.mjs'

const CV_PATH = path.resolve(__dirname, '../content/source/cv.md')
const PROFILE_PATH = path.resolve(__dirname, '../content/source/profile.yml')

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

describe('expurgerTelephone', () => {
  it('retire le numéro et son séparateur sur la ligne de contact', () => {
    const ligne = 'Paris · daennoah@gmail.com · 06 39 98 12 34 · [linkedin](https://x) · [github](https://y)'
    const resultat = expurgerTelephone(ligne)
    expect(resultat).toBe(
      'Paris · daennoah@gmail.com · [linkedin](https://x) · [github](https://y)',
    )
    expect(resultat).not.toMatch(TELEPHONE_RE)
  })

  it('retire un numéro seul au milieu d’un paragraphe', () => {
    const paragraphe = 'Vous pouvez me joindre au 06 39 98 12 34 en journée.'
    expect(expurgerTelephone(paragraphe)).not.toMatch(TELEPHONE_RE)
  })

  it('retire un numéro dans un élément de liste', () => {
    const liste = '- Téléphone : 06 39 98 12 34'
    expect(expurgerTelephone(liste)).not.toMatch(TELEPHONE_RE)
  })

  it.each([
    ['06 39 98 12 34'],
    ['+33 6 39 98 12 34'],
    ['0639981234'],
    ['06.39.98.12.34'],
  ])('retire le format %s', (numero) => {
    const texte = `Contact : ${numero} disponible.`
    expect(expurgerTelephone(texte)).not.toMatch(TELEPHONE_RE)
  })

  it('laisse inchangé un texte sans numéro de téléphone', () => {
    const texte =
      'App à 78 000 utilisateurs en 2024, 17 tickets résolus, TOEIC 780.'
    expect(expurgerTelephone(texte)).toBe(texte)
  })
})
