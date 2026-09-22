#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml'
import { expurgerTelephone } from './redact.mjs'

const SOURCE = process.env.CAREER_OPS_ROOT ?? path.join(process.env.HOME, 'career-ops')
const DEST = path.join(process.cwd(), 'content', 'source')

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
