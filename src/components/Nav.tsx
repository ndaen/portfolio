import Link from 'next/link'

const liens = [
  { href: '/projets', label: 'Projets' },
  { href: '/#parcours', label: 'Parcours' },
]

export function Nav({ disponibilite }: { disponibilite: string }) {
  return (
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-y-2 px-4 py-3 sm:h-16 sm:flex-nowrap sm:py-0 sm:px-6">
      <div className="flex w-full items-center justify-between sm:w-auto sm:contents">
        <Link href="/" className="text-[15px] font-semibold text-text">
          Noah Daën
        </Link>
        <nav aria-label="Navigation principale" className="flex items-center gap-5">
          {liens.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-muted hover:text-text">
              {l.label}
            </Link>
          ))}
          {/* Fichier statique : une ancre simple, pas de préchargement par next/link. */}
          <a href="/cv.pdf" className="text-sm text-muted hover:text-text">
            CV
          </a>
          <span className="hidden rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-bg sm:inline">
            {disponibilite}
          </span>
        </nav>
      </div>
      <span className="rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-bg sm:hidden">
        {disponibilite}
      </span>
    </header>
  )
}
