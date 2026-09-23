/**
 * Ligne de métadonnées d'un projet (`Swift 6 · macOS 14+ · Sparkle`).
 * Les espaces internes à une valeur deviennent insécables : un retour à la
 * ligne ne coupe jamais « GitLab CI » ou « Apple Vision » en deux.
 */
export function ligneMeta(valeurs: string[]): string {
  return valeurs.map((v) => v.replace(/ /g, ' ')).join(' · ')
}
