import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { contrastRatio } from '@/lib/contrast'
import { tokens } from '@/lib/tokens'

describe('contrastRatio', () => {
  it('donne 21 pour noir sur blanc', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 1)
  })
  it('donne 1 pour deux couleurs identiques', () => {
    expect(contrastRatio('#10382A', '#10382A')).toBeCloseTo(1, 2)
  })
})

describe('jetons du thème', () => {
  // contrastRatio sorts light/dark internally, so each pair is listed only once
  const paires: [string, string, string][] = [
    ['texte sur fond', tokens.text, tokens.bg],
    ['texte secondaire sur fond', tokens.textMuted, tokens.bg],
    ['métadonnées sur fond', tokens.meta, tokens.bg],
    ['texte sur surface', tokens.text, tokens.surface],
    ['texte secondaire sur surface', tokens.textMuted, tokens.surface],
    ['métadonnées sur surface', tokens.meta, tokens.surface],
    ['accent sur fond', tokens.accent, tokens.bg],
    ['accent sur surface', tokens.accent, tokens.surface],
  ]
  it.each(paires)('%s atteint AA', (_nom, avant, arriere) => {
    expect(contrastRatio(avant, arriere)).toBeGreaterThanOrEqual(4.5)
  })
})

describe('jetons du CSS livré vs tokens.ts', () => {
  // tokens.ts et globals.css divergent de nom pour certaines clés :
  // clé tokens.ts -> nom --color-* dans globals.css
  const CORRESPONDANCE: Record<keyof typeof tokens, string> = {
    bg: 'bg',
    surface: 'surface',
    accent: 'accent',
    text: 'text',
    textMuted: 'muted',
    meta: 'meta',
    border: 'line',
  }

  const css = fs.readFileSync(
    path.resolve(__dirname, '../src/app/globals.css'),
    'utf8',
  )
  // Ne dépend que des lignes --color-* du bloc @theme, jamais des variables
  // de police qu'un autre agent peut y ajouter en parallèle.
  const blocTheme = css.match(/@theme\s*\{([\s\S]*?)\n\}/)?.[1] ?? ''
  const couleursCss = new Map<string, string>()
  for (const m of blocTheme.matchAll(/--color-([\w-]+)\s*:\s*(#[0-9a-fA-F]{6})\s*;/g)) {
    couleursCss.set(m[1], m[2].toUpperCase())
  }

  it('extrait au moins une couleur du bloc @theme', () => {
    expect(couleursCss.size).toBeGreaterThan(0)
  })

  const entrees = Object.entries(CORRESPONDANCE) as [keyof typeof tokens, string][]
  it.each(entrees)('%s (tokens.ts) correspond à --color-%s dans globals.css', (cleToken, nomCss) => {
    expect(couleursCss.get(nomCss)).toBe(tokens[cleToken].toUpperCase())
  })
})
