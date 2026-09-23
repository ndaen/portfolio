import { describe, it, expect } from 'vitest'
import { ligneMeta } from '@/lib/meta'

describe('ligneMeta', () => {
  it('sépare les valeurs par un point médian', () => {
    expect(ligneMeta(['Swift 6', 'Sparkle'])).toBe('Swift 6 · Sparkle')
  })

  it('ne laisse aucune espace sécable à l’intérieur d’une valeur', () => {
    const [valeur] = ligneMeta(['GitLab CI', 'Expo']).split(' · ')
    expect(valeur).not.toContain(' ')
  })
})
