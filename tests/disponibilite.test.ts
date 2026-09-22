import { describe, it, expect } from 'vitest'
import { pastilleDisponibilite } from '@/lib/disponibilite'

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
