import { describe, it, expect } from 'vitest'
import path from 'node:path'
import { lireProfil } from '@/lib/profile'

const profil = lireProfil(
  path.resolve(__dirname, 'fixtures/cv.fixture.md'),
  path.resolve(__dirname, 'fixtures/profile.fixture.yml'),
)

describe('lireProfil', () => {
  it('lit les identités depuis le YAML', () => {
    expect(profil.nomComplet).toBe('Jean Exemple')
    expect(profil.email).toBe('jean@exemple.fr')
    expect(profil.github).toBe('github.com/jexemple')
  })

  it('lit le titre depuis narrative.headline', () => {
    expect(profil.titre).toBe('Développeur Test, deux ans en production')
  })

  it('extrait la disponibilité du CV', () => {
    expect(profil.disponibilite).toContain('1er janvier 2027')
  })

  it('extrait les groupes de compétences du CV', () => {
    expect(profil.competences).toEqual([
      { groupe: 'Backend', items: ['PHP', 'Symfony'] },
      { groupe: 'Front', items: ['TypeScript', 'React'] },
    ])
  })

  it('échoue bruyamment si un champ obligatoire manque', () => {
    expect(() => lireProfil('/introuvable.md', '/introuvable.yml')).toThrow()
  })

  it('échoue en nommant la section si Availability est renommée ou absente', () => {
    expect(() =>
      lireProfil(
        path.resolve(__dirname, 'fixtures/cv-sans-availability.fixture.md'),
        path.resolve(__dirname, 'fixtures/profile.fixture.yml'),
      ),
    ).toThrow(/Availability/)
  })

  it('échoue en nommant la section si Skills est renommée ou absente', () => {
    expect(() =>
      lireProfil(
        path.resolve(__dirname, 'fixtures/cv-sans-skills.fixture.md'),
        path.resolve(__dirname, 'fixtures/profile.fixture.yml'),
      ),
    ).toThrow(/Skills/)
  })
})
