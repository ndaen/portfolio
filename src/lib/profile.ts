import fs from 'node:fs'
import { parse as parseYaml } from 'yaml'

export type Profil = {
  nomComplet: string
  email: string
  localisation: string
  linkedin: string
  github: string
  titre: string
  role: string
  stackPrincipale: string
  disponibilite: string
  competences: { groupe: string; items: string[] }[]
}

function section(markdown: string, titre: string): string {
  const titreRe = new RegExp(`^##\\s+${titre}\\s*$`)
  const blocs = markdown.split(/^##\s+/m)
  for (const bloc of blocs) {
    const [premiereLigne, ...reste] = bloc.split('\n')
    if (titreRe.test(`## ${premiereLigne}`)) {
      return reste.join('\n').trim()
    }
  }
  return ''
}

/**
 * Ligne en gras sous le nom dans le CV :
 * `**Développeur Full Stack · Symfony / API Platform · React Native**`.
 * Premier segment = rôle, les suivants = stack principale.
 */
function accroche(cv: string): { role: string; stackPrincipale: string } | null {
  const avantSections = cv.split(/^##\s+/m)[0]
  const m = avantSections.match(/^\*\*(.+?)\*\*\s*$/m)
  if (!m) return null
  const [role, ...stack] = m[1].split('·').map((s) => s.trim()).filter(Boolean)
  if (!role || stack.length === 0) return null
  return { role, stackPrincipale: stack.join(' · ') }
}

function competences(bloc: string): { groupe: string; items: string[] }[] {
  return bloc
    .split('\n')
    .map((l) => l.match(/^-\s+\*\*(.+?)\s*:?\*\*\s*(.+)$/))
    .filter((m): m is RegExpMatchArray => m !== null)
    .map((m) => ({
      groupe: m[1].replace(/\s*:$/, '').trim(),
      items: m[2].split(',').map((s) => s.trim()).filter(Boolean),
    }))
}

export function lireProfil(cheminCv: string, cheminYml: string): Profil {
  const cv = fs.readFileSync(cheminCv, 'utf8')
  const yml = parseYaml(fs.readFileSync(cheminYml, 'utf8'))

  const c = yml?.candidate
  if (!c?.full_name || !c?.email || !c?.location) {
    throw new Error(`profil incomplet dans ${cheminYml}`)
  }

  const disponibilite = section(cv, 'Availability')
  if (!disponibilite) {
    throw new Error(`section Availability absente ou vide dans ${cheminCv}`)
  }

  const listeCompetences = competences(section(cv, 'Skills'))
  if (listeCompetences.length === 0) {
    throw new Error(`section Skills absente ou vide dans ${cheminCv}`)
  }

  const ligneAccroche = accroche(cv)
  if (!ligneAccroche) {
    throw new Error(
      `ligne d'accroche (**Rôle · Stack**) absente ou incomplète sous le nom dans ${cheminCv}`,
    )
  }

  return {
    nomComplet: c.full_name,
    email: c.email,
    localisation: c.location,
    linkedin: c.linkedin ?? '',
    github: c.github ?? '',
    titre: yml?.narrative?.headline ?? '',
    ...ligneAccroche,
    disponibilite,
    competences: listeCompetences,
  }
}
