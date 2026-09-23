import Image from 'next/image'
import Link from 'next/link'
import type { Projet } from '@/lib/projets'

/** Index `/projets` : une ligne par projet, vignette, titre et stack alignée à droite. */
export function ListeProjets({ projets }: { projets: Projet[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 pb-(--espace-section) sm:px-6 sm:pt-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Projets</h1>
      <ul className="mt-10 border-t border-line">
        {projets.map((p) => (
          <li key={p.slug} className="apparition border-b border-line">
            <Link
              href={`/projets/${p.slug}`}
              className="group grid grid-cols-[48px_1fr] items-center gap-x-4 gap-y-2 py-5 md:grid-cols-[48px_1fr_minmax(0,18rem)]"
            >
              {p.icone ? (
                <Image src={p.icone} alt="" width={48} height={48} className="rounded-xl" />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-xl bg-surface text-lg font-semibold text-muted"
                >
                  {p.titre.charAt(0)}
                </span>
              )}
              <div>
                <h2 className="text-[17px] font-semibold group-hover:text-accent">{p.titre}</h2>
                <p className="mt-1 text-[14px] leading-relaxed text-muted">{p.resume}</p>
              </div>
              <p className="col-start-2 font-mono text-[11.5px] leading-relaxed text-meta md:col-start-3 md:text-right">
                {p.stack.join(' · ')}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
