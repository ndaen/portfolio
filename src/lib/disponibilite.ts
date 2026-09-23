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

/**
 * Valeur « Disponibilité » du bandeau du hero : la date et le contrat, tels
 * qu'écrits dans la section Availability du CV (« 26 septembre 2026 · CDI »).
 */
export function resumeDisponibilite(disponibilite: string): string {
  const [premier, contrat] = disponibilite.split('·').map((s) => s.trim())
  const date = premier.replace(/^disponible\s+(à\s+partir\s+du|dès\s+le|le)\s+/i, '')
  return contrat ? `${date} · ${contrat}` : date
}
