import Image from 'next/image'
import Link from 'next/link'
import type { Projet } from '@/lib/projets'
import { Reveal } from '@/components/Reveal'

const icones: Record<string, string> = {
  cubby: '/apps/cubby.png',
  snappy: '/apps/snappy.png',
  'cycle-calculator': '/apps/cycle.png',
}

export function TuilesProduit({ projets }: { projets: Projet[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h2 className="sr-only">Mes applications</h2>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {projets.map((p, i) => (
          <li key={p.slug}>
            <Reveal delai={i * 0.06}>
              <Link
                href={`/projets/${p.slug}`}
                className="block h-full rounded-2xl bg-surface p-5 transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
              >
                <Image src={icones[p.slug]} alt="" width={48} height={48} className="rounded-xl" />
                <h3 className="mt-4 text-[15px] font-semibold">{p.titre}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{p.resume}</p>
                <p className="mt-3 text-[11.5px] text-meta">
                  {p.stack.slice(0, 2).join(', ')}. {p.etat}.
                </p>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
