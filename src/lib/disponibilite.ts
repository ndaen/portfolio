const MOIS = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
]

/**
 * Dérive la pastille de disponibilité affichée dans la navigation à partir
 * du texte brut de la section Availability du CV, pour ne jamais diverger
 * de la source de vérité.
 */
export function pastilleDisponibilite(disponibilite: string): string {
  const re = new RegExp(`(\\d{1,2}(?:er)?)\\s+(${MOIS.join('|')})`, 'i')
  const m = disponibilite.match(re)
  if (!m) return 'Disponible'
  const [, jour, mois] = m
  return `Disponible le ${jour} ${mois.toLowerCase()}`
}
