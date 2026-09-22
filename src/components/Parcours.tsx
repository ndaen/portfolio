const faits = [
  'Application mobile Sampleo utilisée par 78 000 personnes chaque mois.',
  'Page « Mes défis » menée de bout en bout : endpoints API Platform et écran React Native.',
  'Extraction automatique du RIB sur myCreators, avec repli par IA, en production.',
  'Refonte de zéro de l’application mobile en Expo et TypeScript, menée seul, en cours de test.',
  'Chantier accessibilité RGAA découpé en 17 tickets : score Lighthouse accessibilité de 100 sur les pages auditées.',
]

export function Parcours() {
  return (
    <section id="parcours" className="mx-auto max-w-6xl scroll-mt-20 px-4 sm:px-6">
      <div className="border-t border-line py-14">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Ce que j&apos;ai livré en production
        </h2>
        <p className="mt-3 max-w-[60ch] text-muted">
          Deux ans et demi en alternance chez Sampleo, groupe Webedia, dans une équipe
          tech de six personnes, sur deux produits en production.
        </p>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {faits.map((f, i) => (
            <li
              key={f}
              className={`rounded-2xl bg-surface p-5 text-[14.5px] leading-relaxed ${i === 0 ? 'sm:col-span-2' : ''}`}
            >
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
