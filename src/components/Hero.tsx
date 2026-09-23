import Link from 'next/link'

export type FaitBandeau = { libelle: string; valeur: string }

export function Hero({ disponibilite, faits }: { disponibilite: string; faits: FaitBandeau[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-4 pt-16 sm:px-6 sm:pt-24">
      <p className="entree mb-5 flex items-center gap-2 text-sm text-muted">
        <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
        {disponibilite}
      </p>
      <h1 className="entree max-w-[17ch] text-4xl font-bold leading-[0.97] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
        Full stack. Je livre en <span className="text-accent">production</span>.
      </h1>
      <p className="entree [--delai:0.08s] mt-5 max-w-[42ch] text-base leading-relaxed text-muted">
        Symfony, React Native, TypeScript. Deux ans et demi en alternance chez Webedia
        et trois applications à moi, publiées et utilisables.
      </p>
      <div className="entree [--delai:0.16s] mt-7 flex flex-wrap gap-3">
        <Link href="/projets" className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-bg">
          Voir les projets
        </Link>
        <Link href="#contact" className="rounded-full border border-line px-5 py-3 text-sm font-semibold text-text">
          Me contacter
        </Link>
      </div>
      <dl
        data-bandeau
        className="entree [--delai:0.24s] mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-5 md:grid-cols-4"
      >
        {faits.map((f) => (
          <div key={f.libelle}>
            <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-meta">{f.libelle}</dt>
            <dd className="mt-1.5 text-sm leading-snug text-text">{f.valeur}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
