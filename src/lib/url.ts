/**
 * Préfixe `https://` à une valeur, sauf si elle porte déjà un schéma
 * (`http://` ou `https://`). Évite le `https://https://…` qu'un préfixage
 * inconditionnel produirait si la valeur en profil venait à inclure son
 * propre schéma.
 */
export function avecSchema(valeur: string): string {
  return /^https?:\/\//.test(valeur) ? valeur : `https://${valeur}`
}
