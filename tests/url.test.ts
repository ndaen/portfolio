import { describe, it, expect } from 'vitest'
import { avecSchema } from '@/lib/url'

describe('avecSchema', () => {
  it('ajoute https:// à une valeur nue', () => {
    expect(avecSchema('linkedin.com/in/noah-daen')).toBe('https://linkedin.com/in/noah-daen')
  })

  it('laisse inchangée une valeur déjà en https://', () => {
    expect(avecSchema('https://linkedin.com/in/noah-daen')).toBe(
      'https://linkedin.com/in/noah-daen',
    )
  })

  it('laisse inchangée une valeur déjà en http://', () => {
    expect(avecSchema('http://linkedin.com/in/noah-daen')).toBe(
      'http://linkedin.com/in/noah-daen',
    )
  })
})
