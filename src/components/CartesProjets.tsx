import Link from 'next/link'
import type { Projet } from '@/lib/projets'
import { Reveal } from '@/components/Reveal'

export function CartesProjets({ projets }: { projets: Projet[] }) {
  return (
    <section className="mx-auto max-w-6xl border-t border-line px-4 py-14 sm:px-6">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Projets</h2>
      <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projets.map((p, i) => (
          <li key={p.slug}>
            <Reveal delai={i * 0.04}>
              <Link
                href={`/projets/${p.slug}`}
                className="block h-full rounded-2xl bg-surface p-5 transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
              >
                <h3 className="text-[15px] font-semibold">{p.titre}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{p.resume}</p>
                <p className="mt-3 text-[11.5px] text-meta">{p.stack.join(', ')}</p>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
