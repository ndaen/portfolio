// Motif générique de numéro de téléphone français : 06 39 98 12 34,
// +33 6 39 98 12 34, 0639981234, avec espaces, points ou tirets comme
// séparateurs. Volontairement pas de valeur en dur.
// `(?<!\d)` / `(?!\d)` évitent de capturer un numéro à l'intérieur d'une
// séquence de chiffres plus longue (ex. un identifiant).
// Pas de flag `g` sur l'export : un regex global est mutable (`lastIndex`)
// et se corrompt silencieusement s'il est réutilisé entre plusieurs
// `.test()`/`toMatch()` — dangereux à exporter tel quel. `expurgerTelephone`
// se construit sa propre instance globale à chaque appel.
export const TELEPHONE_RE = /(?<!\d)(?:\+33[\s.-]?[1-9]|0[1-9])(?:[\s.-]?\d{2}){4}(?!\d)/

const TELEPHONE_SEGMENT_RE = /^(?:\+33[\s.-]?[1-9]|0[1-9])(?:[\s.-]?\d{2}){4}$/

function nettoyerSeparateurs(ligne) {
  return ligne
    .replace(/(?:\s*·\s*){2,}/g, ' · ') // séparateurs dupliqués laissés par un segment retiré
    .replace(/^\s*·\s*/, '') // séparateur orphelin en début de ligne
    .replace(/\s*·\s*$/, '') // séparateur orphelin en fin de ligne
    .replace(/[ \t]+$/, '') // espace traînant
}

/**
 * Retire tout numéro de téléphone français d'un texte markdown, en deux
 * passes : (1) traitement propre de la ligne de contact au format
 * `segment · segment · segment`, qui retire le segment entier et son
 * séparateur ; (2) une passe globale sur tout le document qui capture
 * n'importe quel numéro restant (paragraphe, liste, section Contact…), quel
 * que soit son emplacement, suivie d'un nettoyage des séparateurs orphelins
 * que la passe 1 aurait pu laisser.
 */
export function expurgerTelephone(texte) {
  const sansSegmentContact = texte
    .split('\n')
    .map((ligne) => {
      if (!ligne.includes('·')) return ligne
      const segments = ligne
        .split(' · ')
        .filter((segment) => !TELEPHONE_SEGMENT_RE.test(segment.trim()))
      return segments.join(' · ')
    })
    .join('\n')

  const telephoneGlobal = new RegExp(TELEPHONE_RE.source, 'g')
  const sansTelephoneRestant = sansSegmentContact.replace(telephoneGlobal, '')

  return sansTelephoneRestant
    .split('\n')
    .map(nettoyerSeparateurs)
    .join('\n')
}
