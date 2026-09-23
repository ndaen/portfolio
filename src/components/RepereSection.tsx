/**
 * Repère numéroté au-dessus d'un titre de section (`01 / Parcours`).
 * Purement visuel : masqué aux lecteurs d'écran, le titre qui suit reste
 * le seul intitulé annoncé.
 */
export function RepereSection({ numero, libelle }: { numero: string; libelle: string }) {
  return (
    <p aria-hidden="true" className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-meta">
      {numero} / {libelle}
    </p>
  )
}
