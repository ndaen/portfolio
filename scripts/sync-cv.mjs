#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml'

const SOURCE = process.env.CAREER_OPS_ROOT ?? path.join(process.env.HOME, 'career-ops')
const DEST = path.join(process.cwd(), 'content', 'source')

// Motif générique de numéro de téléphone français : 06 39 98 12 34,
// +33 6 39 98 12 34, 0639981234, avec espaces, points ou tirets comme
// séparateurs. Volontairement pas de valeur en dur.
const TELEPHONE_RE = /^(?:\+33[\s.-]?[1-9]|0[1-9])(?:[\s.-]?\d{2}){4}$/

// Seuls ces chemins de clés quittent career-ops : tout le reste
// (téléphone, compensation, ciblage, spend_tier, pipeline…) reste privé.
const LISTE_BLANCHE_PROFIL = [
  ['candidate', 'full_name'],
  ['candidate', 'email'],
  ['candidate', 'location'],
  ['candidate', 'linkedin'],
  ['candidate', 'github'],
  ['narrative', 'headline'],
]

function expurgerTelephone(cv) {
  return cv
    .split('\n')
    .map((ligne) => {
      if (!ligne.includes('·')) return ligne
      const segments = ligne
        .split(' · ')
        .filter((segment) => !TELEPHONE_RE.test(segment.trim()))
      return segments.join(' · ')
    })
    .join('\n')
}

function extraireProfilExpurge(yml, cheminSrc) {
  const source = parseYaml(yml)
  const resultat = {}

  for (const [groupe, champ] of LISTE_BLANCHE_PROFIL) {
    const valeur = source?.[groupe]?.[champ]
    if (valeur === undefined || valeur === null || valeur === '') {
      console.error(`champ obligatoire manquant dans ${cheminSrc} : ${groupe}.${champ}`)
      process.exit(1)
    }
    resultat[groupe] ??= {}
    resultat[groupe][champ] = valeur
  }

  const entete = [
    '# Fichier généré par `npm run sync:cv` — ne pas éditer à la main.',
    '# Seuls les champs de la liste blanche (identité + titre) sont copiés',
    "# depuis career-ops ; téléphone, rémunération et ciblage restent privés.",
    '',
  ].join('\n')

  return entete + stringifyYaml(resultat)
}

fs.mkdirSync(DEST, { recursive: true })

const cvSrc = path.join(SOURCE, 'cv.md')
if (!fs.existsSync(cvSrc)) {
  console.error(`introuvable : ${cvSrc}`)
  process.exit(1)
}
const cvExpurge = expurgerTelephone(fs.readFileSync(cvSrc, 'utf8'))
fs.writeFileSync(path.join(DEST, 'cv.md'), cvExpurge)
console.log('copié (expurgé) : cv.md')

const profilSrc = path.join(SOURCE, 'config', 'profile.yml')
if (!fs.existsSync(profilSrc)) {
  console.error(`introuvable : ${profilSrc}`)
  process.exit(1)
}
const profilExpurge = extraireProfilExpurge(fs.readFileSync(profilSrc, 'utf8'), profilSrc)
fs.writeFileSync(path.join(DEST, 'profile.yml'), profilExpurge)
console.log('copié (liste blanche) : profile.yml')
