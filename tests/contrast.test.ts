import { describe, it, expect } from 'vitest'
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
  const paires: [string, string, string][] = [
    ['texte sur fond', tokens.text, tokens.bg],
    ['texte secondaire sur fond', tokens.textMuted, tokens.bg],
    ['texte sur surface', tokens.text, tokens.surface],
    ['texte secondaire sur surface', tokens.textMuted, tokens.surface],
    ['métadonnées sur surface', tokens.meta, tokens.surface],
    ['accent sur fond', tokens.accent, tokens.bg],
    ['fond sur accent', tokens.bg, tokens.accent],
  ]
  it.each(paires)('%s atteint AA', (_nom, avant, arriere) => {
    expect(contrastRatio(avant, arriere)).toBeGreaterThanOrEqual(4.5)
  })
})
