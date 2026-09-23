import Image from 'next/image'
import Link from 'next/link'
import type { Projet } from '@/lib/projets'

export function TuilesProduit({ projets }: { projets: Projet[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h2 className="sr-only">Mes applications</h2>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {projets.map((p) => (
          <li key={p.slug} className="apparition h-full">
            <Link
              href={`/projets/${p.slug}`}
              className="block h-full rounded-2xl bg-surface p-5 transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
            >
              {p.icone && (
                <Image src={p.icone} alt="" width={48} height={48} className="rounded-xl" />
              )}
              <h3 className="mt-4 text-[15px] font-semibold">{p.titre}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{p.resume}</p>
              <p className="mt-3 font-mono text-[11.5px] leading-relaxed text-meta">
                {[...p.stack, p.etat].join(' · ')}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
