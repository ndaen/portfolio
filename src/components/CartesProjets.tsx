import Link from 'next/link'
import type { Projet } from '@/lib/projets'
import { RepereSection } from '@/components/RepereSection'

export function CartesProjets({ projets, repere }: { projets: Projet[]; repere?: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="border-t border-line py-(--espace-section)">
        {repere && <RepereSection numero={repere} libelle="Sélection" />}
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Projets</h2>
        <ul className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {projets.map((p) => (
            <li key={p.slug} className="apparition h-full">
              <Link
                href={`/projets/${p.slug}`}
                className="block h-full rounded-2xl bg-surface p-5 transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
              >
                <h3 className="text-[15px] font-semibold">{p.titre}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{p.resume}</p>
                <p className="mt-3 font-mono text-[11.5px] leading-relaxed text-meta">{p.stack.join(' · ')}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
