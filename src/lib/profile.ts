import fs from 'node:fs'
import { parse as parseYaml } from 'yaml'

export type Profil = {
  nomComplet: string
  email: string
  localisation: string
  linkedin: string
  github: string
  titre: string
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
  if (!c?.full_name || !c?.email) {
    throw new Error(`profil incomplet dans ${cheminYml}`)
  }

  return {
    nomComplet: c.full_name,
    email: c.email,
    localisation: c.location ?? '',
    linkedin: c.linkedin ?? '',
    github: c.github ?? '',
    titre: yml?.narrative?.headline ?? '',
    disponibilite: section(cv, 'Availability'),
    competences: competences(section(cv, 'Skills')),
  }
}
