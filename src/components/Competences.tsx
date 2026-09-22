import type { Profil } from '@/lib/profile'

export function Competences({ groupes }: { groupes: Profil['competences'] }) {
  return (
    <section className="mx-auto max-w-6xl border-t border-line px-4 py-14 sm:px-6">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Stack</h2>
      <dl className="mt-7 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {groupes.map((g) => (
          <div key={g.groupe}>
            <dt className="text-[13px] font-semibold text-meta">{g.groupe}</dt>
            <dd className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{g.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
