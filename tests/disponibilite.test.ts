import { describe, it, expect } from 'vitest'
import { pastilleDisponibilite, resumeDisponibilite } from '@/lib/disponibilite'

describe('pastilleDisponibilite', () => {
  it('extrait le jour et le mois de la disponibilité actuelle', () => {
    expect(
      pastilleDisponibilite(
        'Disponible à partir du 26 septembre 2026 · CDI · Paris et Île-de-France, télétravail partiel',
      ),
    ).toBe('Disponible le 26 septembre')
  })

  it("gère le 1er du mois", () => {
    expect(
      pastilleDisponibilite('Disponible à partir du 1er janvier 2027 · CDI · Lyon'),
    ).toBe('Disponible le 1er janvier')
  })

  it("renvoie 'Disponible' si aucune date n'est trouvée", () => {
    expect(pastilleDisponibilite('Disponible immédiatement')).toBe('Disponible')
  })
})

describe('resumeDisponibilite', () => {
  it('garde la date et le contrat', () => {
    expect(
      resumeDisponibilite(
        'Disponible à partir du 26 septembre 2026 · CDI · Paris et Île-de-France, télétravail partiel',
      ),
    ).toBe('26 septembre 2026 · CDI')
  })

  it('renvoie la phrase seule sans contrat', () => {
    expect(resumeDisponibilite('Disponible immédiatement')).toBe('Disponible immédiatement')
  })
})
